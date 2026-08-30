export default function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const configured = Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.CLOUDFLARE_API_TOKEN
  );

  return res.status(configured ? 200 : 503).json({
    status: configured ? "ok" : "configuration_required",
    provider: "Cloudflare Workers AI",
    model: "@cf/qwen/qwen3-30b-a3b-fp8",
  });
}
