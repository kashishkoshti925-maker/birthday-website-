/**
 * Accepts a bare 11-char ID or common YouTube / youtu.be URLs.
 * @returns {string} Video ID or empty string if invalid
 */
export function parseYouTubeVideoId(input) {
  const raw = String(input ?? "").trim();
  if (!raw) return "";

  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return raw;
  }

  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);

    if (url.hostname === "youtu.be" || url.hostname === "www.youtu.be") {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      return id.length === 11 ? id : "";
    }

    if (url.hostname.includes("youtube.com")) {
      const fromQuery = url.searchParams.get("v");
      if (fromQuery && /^[a-zA-Z0-9_-]{11}$/.test(fromQuery)) {
        return fromQuery;
      }
      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];
    }
  } catch {
    /* not a URL */
  }

  return "";
}

export function describeYouTubeConfigInput(input) {
  const parsed = parseYouTubeVideoId(input);
  return { raw: String(input ?? "").trim(), parsed, valid: Boolean(parsed) };
}