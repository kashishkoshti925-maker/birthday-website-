import { motion, useReducedMotion } from "framer-motion";
import { Heart, Lock } from "lucide-react";

const COVERS = {
  "chapter-special-person": {
    emoji: "💕",
    accent: "from-romantic-rose/25 via-[#2f1828] to-[#1a0f18]",
    label: "Open with love",
  },
  "chapter-moments": {
    emoji: "📸",
    accent: "from-romantic-gold/20 via-[#2a1524] to-[#1a1018]",
    label: "Memory scrapbook",
  },
  "chapter-adore": {
    emoji: "🌷",
    accent: "from-pink-300/15 via-[#261222] to-[#140a12]",
    label: "Little things",
  },
  "chapter-birthday": {
    emoji: "🎂",
    accent: "from-romantic-gold/30 via-[#2f1828] to-romantic-dark",
    label: "Birthday wish",
  },
};

export default function ChapterCoverCard({ chapter, opened, onOpen }) {
  const reduceMotion = useReducedMotion();
  const cover = COVERS[chapter.id] ?? COVERS["chapter-special-person"];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={`group relative flex min-h-[11.5rem] w-full flex-col items-start justify-between overflow-hidden rounded-2xl border p-5 text-left shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-colors sm:min-h-[12.5rem] sm:p-6 ${
        opened ? "border-romantic-gold/40" : "border-pink-100/15 hover:border-romantic-rose/35"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cover.accent}`}
        aria-hidden
      />
      <motion.span
        className="pointer-events-none absolute -right-4 -top-4 text-4xl opacity-20"
        animate={reduceMotion ? undefined : { rotate: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        aria-hidden
      >
        {cover.emoji}
      </motion.span>

      <motion.span
        className="relative z-10 font-display text-xs font-semibold tracking-[0.3em] text-romantic-gold"
        initial={false}
      >
        CHAPTER {chapter.chapterNumber}
      </motion.span>

      <motion.div className="relative z-10 mt-3">
        <h3 className="font-display text-xl font-medium leading-snug text-pink-50 sm:text-2xl">
          {chapter.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-display text-sm italic text-romantic-pink/75">
          {chapter.subtitle}
        </p>
      </motion.div>

      <motion.span className="relative z-10 mt-4 flex items-center gap-2 font-display text-xs uppercase tracking-[0.22em] text-pink-200/70">
        {opened ? (
          <>
            <Heart size={12} className="text-romantic-rose" fill="currentColor" /> Read again
          </>
        ) : (
          <>
            <Lock size={12} className="opacity-70" />
            {cover.label}
          </>
        )}
      </motion.span>
    </motion.button>
  );
}