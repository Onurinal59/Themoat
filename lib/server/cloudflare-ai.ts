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

export type ChatMessage = { role: "system" | "user"; content: string };

/**
 * Qwen3 spends its token budget on reasoning before it writes a single word of
 * the answer, which truncates coach replies mid-sentence and leaves
 * evaluate-defense with no JSON at all. "/no_think" is Qwen3's documented soft
 * switch for turning that scratchpad off; stripReasoningTags stays as the
 * belt-and-braces fallback for when the model ignores it.
 */
function withoutThinking(messages: ChatMessage[]): ChatMessage[] {
  return messages.map((message) =>
    message.role === "system" ? { ...message, content: `${message.content}\n/no_think` } : message,
  );
}

export async function runCloudflareAi(
  messages: ChatMessage[],
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
        messages: withoutThinking(messages),
        max_tokens: options.maxTokens ?? 1_400,
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
