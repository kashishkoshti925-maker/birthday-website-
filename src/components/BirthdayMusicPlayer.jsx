import { motion, useReducedMotion } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";
import { useBirthdayMusic } from "../context/BirthdayMusicContext";

export default function BirthdayMusicPlayer({ embedded = false }) {
  const reduceMotion = useReducedMotion();
  const {
    isPlaying,
    playbackBlocked,
    musicEnabled,
    loadError,
    playerReady,
    youtubeErrorCode,
    youtubeErrorDetail,
    configDebug,
    togglePlay,
    title,
    subtitle,
  } = useBirthdayMusic();

  if (!musicEnabled) return null;

  const wrapClass = embedded
    ? "relative w-full"
    : "fixed bottom-4 right-4 z-[165] w-[min(100%,17.5rem)] sm:bottom-6 sm:right-6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={wrapClass}
      style={embedded ? undefined : { paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="flex items-center gap-3 rounded-2xl border border-pink-100/15 bg-gradient-to-br from-[#2f1828]/95 via-[#261222]/98 to-[#1a0f18]/95 px-3 py-2.5 shadow-[0_10px_32px_rgba(0,0,0,0.4)] backdrop-blur-md sm:gap-3.5 sm:px-4 sm:py-3"
        role="region"
        aria-label="Birthday music player"
      >
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12">
          <motion.div
            className="absolute inset-0 rounded-full border border-romantic-gold/35 bg-[radial-gradient(circle_at_30%_30%,#5a2840,#1a0f18)] shadow-inner"
            animate={
              reduceMotion || !isPlaying
                ? { rotate: 0 }
                : { rotate: 360 }
            }
            transition={
              isPlaying && !reduceMotion
                ? { duration: 4, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
            aria-hidden
          />
          <div
            className="relative z-[1] flex h-4 w-4 items-center justify-center rounded-full bg-romantic-dark ring-1 ring-romantic-gold/40 sm:h-[18px] sm:w-[18px]"
            aria-hidden
          >
            <span className="h-1 w-1 rounded-full bg-romantic-gold/80" />
          </div>
          <span className="pointer-events-none absolute -right-0.5 -top-0.5 text-[10px]" aria-hidden>
            🎵
          </span>
        </div>

        <div className="min-w-0 flex-1 text-left">
          <p className="truncate font-display text-sm font-medium text-pink-50">{title}</p>
          <p className="truncate font-display text-[0.65rem] uppercase tracking-[0.18em] text-pink-200/55 sm:text-xs">
            {subtitle}
          </p>
          {loadError && (
            <p className="mt-0.5 font-display text-[0.65rem] leading-snug text-romantic-gold/90 sm:text-xs">
              {youtubeErrorCode != null
                ? `YouTube ${youtubeErrorCode}: ${youtubeErrorDetail}`
                : youtubeErrorDetail || "Could not load music."}
            </p>
          )}
          {!loadError && !configDebug?.valid && (
            <p className="mt-0.5 font-display text-[0.65rem] leading-snug text-romantic-gold/90 sm:text-xs">
              Invalid video ID in config (parsed: {configDebug?.parsed || "—"})
            </p>
          )}
          {!loadError && playbackBlocked && (
            <p className="mt-0.5 font-display text-[0.65rem] leading-snug text-romantic-gold/90 sm:text-xs">
              {playerReady ? "Tap play to start the music" : "Loading YouTube player…"}
            </p>
          )}
        </div>

        <motion.button
          type="button"
          onClick={togglePlay}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-romantic-gold/40 bg-pink-100/10 text-pink-50 transition-colors hover:border-romantic-gold/60"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying}
        >
          <motion.span
            key={isPlaying ? "pause" : "play"}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" aria-hidden />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" aria-hidden />
            )}
          </motion.span>
        </motion.button>

        <Music2 className="hidden text-romantic-rose/50 sm:block" size={16} aria-hidden />
      </div>
    </motion.div>
  );
}