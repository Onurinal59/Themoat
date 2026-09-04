const MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";

export class AiServiceError extends Error {
  constructor(message: string, public readonly status: number, public readonly upstreamStatus?: number) {
    super(message);
  }
}

/**
 * Qwen3 is a reasoning model: it can wrap its scratchpad in <think>...</think>
 * (and may leave the block unclosed when the token budget runs out). None of
 * that should reach the student, or the JSON parser in evaluate-defense.
 */
function stripReasoningTags(text: string): string {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<think>[\s\S]*$/i, "")
    .replace(/<\/?think>/gi, "")
    .trim();
}

export async function runCloudflareAi(
  messages: Array<{ role: "system" | "user"; content: string }>,
  options: { maxTokens?: number; temperature?: number } = {},
): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new AiServiceError("AI service is not configured.", 503);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        max_tokens: options.maxTokens ?? 900,
        temperature: options.temperature ?? 0.35,
        top_p: 0.9,
      }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.success === false) {
      console.error("Cloudflare Workers AI request failed.", {
        status: response.status,
        errorCodes: Array.isArray(data?.errors) ? data.errors.map((item: any) => item?.code) : [],
      });
      throw new AiServiceError(response.status === 429 ? "AI usage limit reached." : "AI generation failed.", response.status === 429 ? 429 : 502, response.status);
    }
    const reply = data?.result?.response ?? data?.result?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) throw new AiServiceError("AI returned an empty response.", 502);
    const cleaned = stripReasoningTags(reply);
    if (!cleaned) throw new AiServiceError("AI returned an empty response.", 502);
    return cleaned;
  } catch (error: any) {
    if (error instanceof AiServiceError) throw error;
    const timedOut = error?.name === "AbortError";
    console.error("Cloudflare Workers AI transport error.", { timedOut });
    throw new AiServiceError(timedOut ? "AI response timed out." : "AI is temporarily unavailable.", timedOut ? 504 : 502);
  } finally {
    clearTimeout(timeout);
  }
}

export { MODEL as CLOUDFLARE_AI_MODEL };
