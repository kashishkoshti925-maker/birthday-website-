import { BIRTHDAY_YOUTUBE_DEBUG_LOG } from "../data/birthdayMusicConfig";

/**
 * Loads the YouTube IFrame Player API once per page.
 * @returns {Promise<typeof window.YT>}
 */
export function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API requires a browser"));
  }

  if (window.YT?.Player) {
    if (BIRTHDAY_YOUTUBE_DEBUG_LOG) console.log("[BirthdayMusic]", "YouTube API already available");
    return Promise.resolve(window.YT);
  }

  if (!window.__birthdayYtApiPromise) {
    window.__birthdayYtApiPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (existing) {
        const poll = () => {
          if (window.YT?.Player) resolve(window.YT);
          else window.setTimeout(poll, 50);
        };
        poll();
        return;
      }

      window.__birthdayYtApiPrevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (BIRTHDAY_YOUTUBE_DEBUG_LOG) {
          console.log("[BirthdayMusic]", "onYouTubeIframeAPIReady fired");
        }
        window.__birthdayYtApiPrevReady?.();
        if (window.YT?.Player) resolve(window.YT);
        else reject(new Error("YouTube API loaded without Player"));
      };

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      tag.onerror = () => reject(new Error("Failed to load YouTube IFrame API"));
      document.head.appendChild(tag);
    });
  }

  return window.__birthdayYtApiPromise;
}