import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import { birthdayCelebrationData } from "../data/birthdayCelebrationData";
import { SectionFloatingDecor } from "./RomanticDecor";

const CONFETTI_COLORS = ["#F7B6CC", "#E88BAA", "#D6B477", "#9F234B", "#FFF5EE"];

function CakeVisual({ candlesLit }) {
  return (
    <div className="relative mx-auto w-[min(100%,11rem)] sm:w-48" aria-hidden>
      {/* Candle flames */}
      <div className="mb-1 flex justify-center gap-3 sm:gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="flex flex-col items-center">
            <motion.div
              className="h-5 w-2 rounded-full bg-gradient-to-t from-romantic-gold via-yellow-200 to-white sm:h-6"
              animate={
                candlesLit
                  ? {
                      opacity: [0.75, 1, 0.8],
                      scaleY: [1, 1.12, 0.95, 1],
                      scaleX: [1, 0.92, 1.05, 1],
                    }
                  : { opacity: 0.15, scaleY: 0.6 }
              }
              transition={{ duration: 0.55, repeat: candlesLit ? Infinity : 0, ease: "easeInOut" }}
              style={{
                filter: candlesLit ? "drop-shadow(0 0 8px rgba(214,180,119,0.9))" : "none",
              }}
            />
            <motion.div
              className="mt-0.5 h-14 w-1 rounded-sm bg-gradient-to-b from-romantic-cream to-romantic-gold/70 sm:h-16"
              initial={false}
              animate={{ opacity: candlesLit ? 1 : 0.45 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Frosting */}
      <div className="relative rounded-lg rounded-b-xl border border-pink-100/15 bg-gradient-to-b from-[#F8E8DE] via-[#FFF5ED] to-[#F5E6DC] px-2 pt-3 pb-4 shadow-inner sm:px-3 sm:pt-4 sm:pb-5">
        <div className="absolute -top-2 left-2 right-2 flex justify-between gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-gradient-to-b from-romantic-pink/80 to-romantic-rose/70 sm:h-3.5 sm:w-3.5"
            />
          ))}
        </div>
        <motion.div
          className="relative z-[1] mx-auto h-3 rounded-md bg-gradient-to-r from-romantic-rose/30 via-romantic-pink/40 to-romantic-rose/30"
          animate={candlesLit ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.35 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Cake base */}
      <div className="mx-auto -mt-1 h-16 w-full rounded-b-2xl border border-[#3a1a2e]/40 bg-gradient-to-b from-[#9F234B]/85 via-[#7a2848] to-[#3a1a2e] shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:h-20" />
    </div>
  );
}

function ConfettiBurst({ active, reduceMotion }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${10 + ((i * 37) % 80)}%`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: (i % 7) * 25 - 60,
        delay: (i % 6) * 0.03,
        xDrift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 12),
      })),
    []
  );

  if (reduceMotion || !active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-1/3 h-2 w-1 rounded-sm sm:h-2.5 sm:w-1.5"
          style={{ left: p.left, backgroundColor: p.color, rotate: p.rotate }}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], y: [-10, 120, 220], x: p.xDrift, scale: 1 }}
          transition={{ duration: 2.4, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function BirthdayCelebration() {
  const reduceMotion = useReducedMotion();
  const [wished, setWished] = useState(false);

  const handleWish = () => {
    if (!wished) setWished(true);
  };

  return (
    <section
      id="birthday-celebration"
      className="relative overflow-x-hidden bg-gradient-to-b from-[#120a14] via-[#2a1524] to-romantic-dark px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28"
    >
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-romantic-rose/12 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/3 h-72 w-72 rounded-full bg-romantic-gold/10 blur-[100px]"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute right-[8%] top-[15%] text-romantic-gold/25"
        animate={reduceMotion ? undefined : { rotate: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        aria-hidden
      >
        <Star size={20} fill="currentColor" />
      </motion.div>
      <SectionFloatingDecor variant="birthday" reduceMotion={reduceMotion} />

      <motion.div
        className="pointer-events-none absolute left-[10%] bottom-[20%] text-romantic-rose/25"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        aria-hidden
      >
        <Heart size={18} fill="currentColor" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ConfettiBurst active={wished} reduceMotion={reduceMotion} />

        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-12"
        >
          <p className="mb-4 font-display text-sm uppercase tracking-[0.32em] text-romantic-gold">
            {birthdayCelebrationData.sectionLabel}
          </p>
          <h2 className="mb-4 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-medium leading-tight text-pink-50">
            {birthdayCelebrationData.heading}
          </h2>
          <div className="mx-auto mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-romantic-rose/55" />
            <Sparkles size={16} className="text-romantic-gold" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-romantic-rose/55" />
          </div>
          <p className="mx-auto max-w-xl font-display text-[clamp(1.05rem,2.5vw,1.35rem)] leading-relaxed text-romantic-cream/80">
            {birthdayCelebrationData.subtitle}
          </p>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="relative mb-10"
        >
          <CakeVisual candlesLit={!wished} />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <motion.button
            type="button"
            onClick={handleWish}
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(214, 180, 119, 0.25)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-full border border-romantic-gold/40 bg-gradient-to-r from-pink-200/10 via-romantic-rose/15 to-pink-200/10 px-10 py-4 text-sm font-medium tracking-wide text-pink-50 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-romantic-gold/60 sm:px-12 sm:text-base"
          >
            <span className="relative z-10">{birthdayCelebrationData.wishButtonLabel}</span>
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {wished && (
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 font-display text-[clamp(1.1rem,2.6vw,1.4rem)] italic text-romantic-gold/95"
            >
              {birthdayCelebrationData.wishConfirmed}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}