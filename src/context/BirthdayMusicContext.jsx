import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  BIRTHDAY_MUSIC_SUBTITLE,
  BIRTHDAY_MUSIC_TITLE,
  BIRTHDAY_YOUTUBE_DEBUG_LOG,
  BIRTHDAY_YOUTUBE_DEBUG_VISIBLE,
  BIRTHDAY_YOUTUBE_VIDEO_ID,
} from "../data/birthdayMusicConfig";
import { loadYouTubeIframeApi } from "../utils/youtubeIframeApi";
import { parseYouTubeVideoId, describeYouTubeConfigInput } from "../utils/parseYouTubeVideoId";
import { youtubeErrorMessage, YT_STATE_LABELS } from "../utils/youtubePlayerErrors";

export { BIRTHDAY_MUSIC_TITLE, BIRTHDAY_MUSIC_SUBTITLE };

const BirthdayMusicContext = createContext(null);
const PLAYER_HOST_ID = "birthday-youtube-host";
const LOG_PREFIX = "[BirthdayMusic]";

function debugLog(...args) {
  if (BIRTHDAY_YOUTUBE_DEBUG_LOG) {
    console.log(LOG_PREFIX, ...args);
  }
}

export function BirthdayMusicProvider({ children }) {
  const playerRef = useRef(null);
  const wantPlayRef = useRef(false);
  const initGenRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [youtubeErrorCode, setYoutubeErrorCode] = useState(null);
  const [youtubeErrorDetail, setYoutubeErrorDetail] = useState("");
  const [configDebug, setConfigDebug] = useState(() =>
    describeYouTubeConfigInput(BIRTHDAY_YOUTUBE_VIDEO_ID),
  );

  const videoId = useMemo(
    () => parseYouTubeVideoId(BIRTHDAY_YOUTUBE_VIDEO_ID),
    [],
  );

  const setYtError = useCallback((code, extra = "") => {
    const message = youtubeErrorMessage(code);
    setYoutubeErrorCode(code);
    setYoutubeErrorDetail(extra ? `${message} ${extra}` : message);
    setLoadError(true);
    setPlaybackBlocked(true);
    setIsPlaying(false);
    debugLog("onError", { code, message, extra });
  }, []);

  const syncPlayingState = useCallback(() => {
    const player = playerRef.current;
    if (!player?.getPlayerState) return;
    try {
      const state = player.getPlayerState();
      const playing = state === window.YT?.PlayerState?.PLAYING;
      setIsPlaying(playing);
      debugLog("syncPlayingState", YT_STATE_LABELS[state] ?? state);
    } catch (err) {
      debugLog("syncPlayingState failed", err);
    }
  }, []);

  const tryPlay = useCallback(
    (reason = "manual") => {
      const player = playerRef.current;
      if (!player?.playVideo) {
        debugLog("tryPlay: no player yet", { reason });
        setPlaybackBlocked(true);
        return;
      }
      try {
        debugLog("tryPlay: calling playVideo()", { reason, origin: window.location.origin });
        player.playVideo();
        setPlaybackBlocked(false);
        window.setTimeout(() => {
          try {
            const state = player.getPlayerState?.();
            if (wantPlayRef.current && state === window.YT?.PlayerState?.PAUSED) {
              debugLog("onAutoplayBlocked (heuristic): still paused after playVideo");
              setPlaybackBlocked(true);
            }
          } catch {
            /* ignore */
          }
        }, 800);
      } catch (err) {
        debugLog("tryPlay: exception", err);
        setPlaybackBlocked(true);
        setIsPlaying(false);
      }
    },
    [],
  );

  useEffect(() => {
    const described = describeYouTubeConfigInput(BIRTHDAY_YOUTUBE_VIDEO_ID);
    setConfigDebug(described);
    debugLog("config", {
      raw: described.raw,
      parsedVideoId: described.parsed,
      valid: described.valid,
      origin: window.location.origin,
      href: window.location.href,
      debugVisible: BIRTHDAY_YOUTUBE_DEBUG_VISIBLE,
    });

    if (!described.valid) {
      setLoadError(true);
      setYoutubeErrorCode(2);
      setYoutubeErrorDetail(
        youtubeErrorMessage(2) +
          (described.raw
            ? ` Config had "${described.raw.slice(0, 48)}…" — use ID 4jO8EWJutfE or a valid URL.`
            : " Empty BIRTHDAY_YOUTUBE_VIDEO_ID in birthdayMusicConfig.js."),
      );
      return undefined;
    }

    const generation = ++initGenRef.current;
    let playerInstance = null;
    let cancelled = false;

    const init = async () => {
      try {
        debugLog("loading YouTube IFrame API…");
        const YT = await loadYouTubeIframeApi();
        if (cancelled || generation !== initGenRef.current) return;

        const host = document.getElementById(PLAYER_HOST_ID);
        if (!host) {
          setYtError(2, "Missing #birthday-youtube-host element.");
          return;
        }

        const playerVars = {
          autoplay: 0,
          controls: BIRTHDAY_YOUTUBE_DEBUG_VISIBLE ? 1 : 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 1,
          playlist: videoId,
          origin: window.location.origin,
          widget_referrer: window.location.href,
        };

        debugLog("creating YT.Player", { videoId, playerVars });

        playerInstance = new YT.Player(PLAYER_HOST_ID, {
          height: "200",
          width: "200",
          videoId,
          playerVars,
          events: {
            onReady: (event) => {
              if (cancelled || generation !== initGenRef.current) return;
              playerRef.current = event.target;
              try {
                event.target.setVolume(85);
              } catch (err) {
                debugLog("setVolume failed", err);
              }
              setPlayerReady(true);
              setLoadError(false);
              setYoutubeErrorCode(null);
              setYoutubeErrorDetail("");
              debugLog("onReady", {
                videoId,
                origin: window.location.origin,
                wantPlay: wantPlayRef.current,
              });
              if (wantPlayRef.current) {
                tryPlay("onReady+wantPlay");
              }
            },
            onStateChange: (event) => {
              if (cancelled) return;
              const label = YT_STATE_LABELS[event.data] ?? event.data;
              debugLog("onStateChange", { state: event.data, label });
              const { PAUSED, PLAYING, ENDED, BUFFERING, UNSTARTED, CUED } = YT.PlayerState;
              if (event.data === PLAYING) {
                setIsPlaying(true);
                setPlaybackBlocked(false);
              } else if (event.data === PAUSED) {
                setIsPlaying(false);
              } else if (event.data === ENDED) {
                setIsPlaying(false);
                try {
                  event.target.playVideo();
                } catch (err) {
                  debugLog("loop playVideo failed", err);
                  setPlaybackBlocked(true);
                }
              } else if (event.data === BUFFERING && wantPlayRef.current) {
                setIsPlaying(true);
                setPlaybackBlocked(false);
              } else if (event.data === UNSTARTED || event.data === CUED) {
                debugLog("onStateChange: unstarted/cued");
              }
            },
            onError: (event) => {
              if (cancelled) return;
              setYtError(event?.data ?? 0);
            },
          },
        });

        playerRef.current = playerInstance;
        debugLog("YT.Player instance assigned (awaiting onReady)");
      } catch (err) {
        if (!cancelled) {
          debugLog("init failed", err);
          setYoutubeErrorCode(null);
          setYoutubeErrorDetail(`Failed to load YouTube API: ${err?.message ?? err}`);
          setLoadError(true);
          setPlaybackBlocked(true);
        }
      }
    };

    void init();

    return () => {
      cancelled = true;
      debugLog("cleanup: destroying player", { generation });
      try {
        playerInstance?.destroy?.();
      } catch (err) {
        debugLog("destroy error", err);
      }
      if (generation === initGenRef.current) {
        playerRef.current = null;
        setPlayerReady(false);
      }
    };
  }, [videoId, setYtError, tryPlay]);

  const startFromUserGesture = useCallback(() => {
    debugLog("startFromUserGesture (Open Your Surprise)");
    setMusicEnabled(true);
    wantPlayRef.current = true;

    if (!videoId) {
      setPlaybackBlocked(true);
      return;
    }

    if (loadError && youtubeErrorCode) {
      debugLog("startFromUserGesture: existing error", youtubeErrorCode);
      setPlaybackBlocked(true);
      return;
    }

    if (playerReady && playerRef.current?.playVideo) {
      debugLog("startFromUserGesture: player already ready — playVideo in click gesture");
      tryPlay("openSurprise");
      return;
    }

    debugLog(
      "startFromUserGesture: waiting for onReady (if YouTube loads slowly, tap Play on the music card)",
    );
    setPlaybackBlocked(true);
  }, [videoId, loadError, youtubeErrorCode, playerReady, tryPlay]);

  const togglePlay = useCallback(() => {
    setMusicEnabled(true);
    wantPlayRef.current = true;

    if (!videoId || !playerRef.current) {
      setPlaybackBlocked(true);
      return;
    }

    if (loadError && youtubeErrorCode) {
      setPlaybackBlocked(true);
      return;
    }

    try {
      const state = playerRef.current.getPlayerState?.();
      const YT = window.YT;
      const isActive =
        state === YT?.PlayerState?.PLAYING || state === YT?.PlayerState?.BUFFERING;

      if (isActive) {
        playerRef.current.pauseVideo();
        wantPlayRef.current = false;
        setIsPlaying(false);
        debugLog("togglePlay: paused");
      } else {
        tryPlay("togglePlay");
      }
    } catch (err) {
      debugLog("togglePlay error", err);
      setPlaybackBlocked(true);
      syncPlayingState();
    }
  }, [videoId, loadError, youtubeErrorCode, tryPlay, syncPlayingState]);

  const hostClassName = BIRTHDAY_YOUTUBE_DEBUG_VISIBLE
    ? "birthday-youtube-debug-visible"
    : "birthday-youtube-hidden";

  const value = useMemo(
    () => ({
      isPlaying,
      playbackBlocked,
      musicEnabled,
      playerReady,
      loadError,
      youtubeErrorCode,
      youtubeErrorDetail,
      configDebug,
      togglePlay,
      startFromUserGesture,
      title: BIRTHDAY_MUSIC_TITLE,
      subtitle: BIRTHDAY_MUSIC_SUBTITLE,
    }),
    [
      isPlaying,
      playbackBlocked,
      musicEnabled,
      playerReady,
      loadError,
      youtubeErrorCode,
      youtubeErrorDetail,
      configDebug,
      togglePlay,
      startFromUserGesture,
    ],
  );

  return (
    <BirthdayMusicContext.Provider value={value}>
      <div id={PLAYER_HOST_ID} className={hostClassName} title="YouTube debug embed (temporary)" />
      {BIRTHDAY_YOUTUBE_DEBUG_VISIBLE && (
        <p
          className="pointer-events-none fixed bottom-[230px] left-4 z-[300] max-w-[220px] rounded-md border border-romantic-gold/40 bg-black/80 px-2 py-1 font-mono text-[10px] leading-snug text-romantic-gold"
          aria-live="polite"
        >
          YT debug · ID: {videoId || "invalid"} · ready: {playerReady ? "yes" : "no"}
          {youtubeErrorCode != null ? ` · err ${youtubeErrorCode}` : ""}
        </p>
      )}
      {children}
    </BirthdayMusicContext.Provider>
  );
}

export function useBirthdayMusic() {
  const ctx = useContext(BirthdayMusicContext);
  if (!ctx) {
    throw new Error("useBirthdayMusic must be used within BirthdayMusicProvider");
  }
  return ctx;
}