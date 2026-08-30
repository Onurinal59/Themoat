const MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";

const SYSTEM_PROMPT = `You are the Socratic AI Coach of Economic Moat Academy.
Teach Michael Mauboussin and Dan Callahan's economic moat framework accurately and pedagogically.

Rules:
- Reply in the same language as the student's question (Turkish or English).
- Explain concepts clearly before using technical terminology.
- Focus on ROIC, WACC, NOPAT, invested capital, competitive advantage period, Value Stick, DuPont analysis, cash conversion cycle, reverse DCF and capital allocation.
- Use practical BIST/KAP or global 10-K examples when helpful, while clearly labeling illustrative assumptions.
- Never present an illustrative figure as current verified company data.
- Do not provide personalized investment advice, price targets, buy/sell instructions or guaranteed returns.
- End with one short Socratic question that helps the student apply the concept.
- Keep the answer concise and under 700 words.`;

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    console.error("Cloudflare Workers AI environment variables are missing.");
    return res.status(503).json({
      error: "AI Coach is temporarily unavailable.",
    });
  }

  const { question, currentTopic } = req.body ?? {};

  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "A question is required." });
  }

  const cleanQuestion = question.trim();
  if (cleanQuestion.length > 600) {
    return res.status(400).json({
      error: "Question is too long. Please keep it under 600 characters.",
    });
  }

  const cleanTopic =
    typeof currentTopic === "string"
      ? currentTopic.trim().slice(0, 160)
      : "Economic moat and sustainable value creation";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `${SYSTEM_PROMPT}\nCurrent lesson context: ${cleanTopic}`,
            },
            { role: "user", content: cleanQuestion },
          ],
          max_tokens: 900,
          temperature: 0.45,
          top_p: 0.9,
        }),
        signal: controller.signal,
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok || data?.success === false) {
      console.error("Cloudflare Workers AI request failed.", {
        status: response.status,
        errors: data?.errors,
      });

      if (response.status === 429) {
        return res.status(429).json({
          error: "AI Coach has reached its temporary usage limit. Please try again later.",
        });
      }

      return res.status(502).json({
        error: "AI Coach could not generate a response.",
      });
    }

    const reply =
      data?.result?.response ??
      data?.result?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      console.error("Cloudflare Workers AI returned an empty response.");
      return res.status(502).json({
        error: "AI Coach returned an empty response.",
      });
    }

    return res.status(200).json({
      reply: reply.trim(),
      model: MODEL,
    });
  } catch (error: any) {
    const timedOut = error?.name === "AbortError";
    console.error("Cloudflare Workers AI error.", {
      message: error?.message ?? String(error),
      timedOut,
    });

    return res.status(timedOut ? 504 : 502).json({
      error: timedOut
        ? "AI Coach response timed out."
        : "AI Coach is temporarily unavailable.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
