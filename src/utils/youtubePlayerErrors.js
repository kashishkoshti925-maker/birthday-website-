const YT_ERROR_MESSAGES = {
  2: "Invalid video ID or player parameter (error 2).",
  5: "HTML5 player error (error 5).",
  100: "Video unavailable or removed (error 100).",
  101: "Embedding disabled by the video owner (error 101). Hidden playback is not allowed for this video.",
  150: "Embedding disabled by the video owner (error 150). Hidden playback is not allowed for this video.",
  153: "Embedded playback blocked — missing or invalid HTTP Referer / origin (error 153).",
};

export function youtubeErrorMessage(code) {
  if (code == null || Number.isNaN(Number(code))) {
    return "Unknown YouTube player error.";
  }
  return YT_ERROR_MESSAGES[code] ?? `YouTube player error (code ${code}).`;
}

export const YT_STATE_LABELS = {
  [-1]: "unstarted",
  0: "ended",
  1: "playing",
  2: "paused",
  3: "buffering",
  5: "cued",
};