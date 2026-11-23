import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import { MiniTeddy } from "./RomanticDecor";

export default function BirthdayIntro({ open, onOpen }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-gradient-to-br from-romantic-dark via-[#3a1a2e] to-[#120a14] px-6 py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Birthday surprise introduction"
        >
          <motion.span
            className="pointer-events-none absolute left-[12%] top-[18%] text-xl opacity-60"
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            💗
          </motion.span>
          <motion.span
            className="pointer-events-none absolute right-[14%] top-[22%] text-lg opacity-50"
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            aria-hidden
          >
            ✨
          </motion.span>
          <motion.div
            className="pointer-events-none absolute bottom-[20%] left-[10%] text-romantic-gold/40"
            animate={reduceMotion ? undefined : { rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            aria-hidden
          >
            <Star size={22} fill="currentColor" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute bottom-[24%] right-[12%]"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity }}
            aria-hidden
          >
            <MiniTeddy />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg text-center"
          >
            <p className="mb-4 font-display text-sm uppercase tracking-[0.35em] text-romantic-gold">
              For Jayu
            </p>
            <h1 className="font-display text-[clamp(2.5rem,10vw,3.75rem)] font-medium leading-tight text-pink-50">
              Hey Jayu! <span aria-hidden>❤️</span>
            </h1>
            <div className="my-6 flex justify-center gap-2 text-romantic-rose/70" aria-hidden>
              <Heart size={16} fill="currentColor" />
              <Sparkles size={16} />
              <Heart size={16} fill="currentColor" />
            </div>
            <p className="mx-auto mb-10 max-w-md font-display text-lg leading-relaxed text-romantic-cream/85 sm:text-xl">
              Someone has created a little world full of memories, love, and surprises just for you.
            </p>
            <motion.button
              type="button"
              onClick={onOpen}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="group relative overflow-hidden rounded-full border border-romantic-gold/45 bg-gradient-to-r from-pink-200/15 via-romantic-rose/20 to-pink-200/15 px-10 py-4 font-display text-base font-medium tracking-wide text-pink-50 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-romantic-gold/65"
            >
              Open Your Surprise ✨
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}