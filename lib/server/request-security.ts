const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 6;
const MAX_TRACKED_CLIENTS = 5_000;

type RateEntry = { count: number; resetAt: number };
const rateStore = new Map<string, RateEntry>();

function getClientKey(req: any): string {
  const forwarded = req.headers?.["x-vercel-forwarded-for"] ?? req.headers?.["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return String(raw || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
}

export function enforceApiSecurity(req: any, res: any): boolean {
  const contentType = String(req.headers?.["content-type"] || "").toLowerCase();
  if (!contentType.startsWith("application/json")) {
    res.status(415).json({ error: "Content-Type must be application/json." });
    return false;
  }
  if (String(req.headers?.["sec-fetch-site"] || "").toLowerCase() === "cross-site") {
    res.status(403).json({ error: "Cross-site requests are not allowed." });
    return false;
  }

  const now = Date.now();
  const key = getClientKey(req);
  const current = rateStore.get(key);
  const entry = !current || current.resetAt <= now ? { count: 0, resetAt: now + WINDOW_MS } : current;
  entry.count += 1;
  rateStore.set(key, entry);

  if (rateStore.size > MAX_TRACKED_CLIENTS) {
    for (const [storedKey, storedEntry] of rateStore) {
      if (storedEntry.resetAt <= now) rateStore.delete(storedKey);
    }
  }

  res.setHeader("RateLimit-Limit", String(MAX_REQUESTS_PER_WINDOW));
  res.setHeader("RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS_PER_WINDOW - entry.count)));
  res.setHeader("RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    res.setHeader("Retry-After", String(Math.max(1, Math.ceil((entry.resetAt - now) / 1000))));
    res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
    return false;
  }
  return true;
}
