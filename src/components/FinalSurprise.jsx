import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import { finalSurpriseConfig } from "../data/finalSurpriseData";
import { SectionFloatingDecor, FloatingEmoji } from "./RomanticDecor";

const SPARKLE_COLORS = ["#D6B477", "#F7B6CC", "#E88BAA", "#FFF5EE"];
const OPEN_MS = 950;

function GoldenParticles({ active, reduceMotion }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i / 12) * Math.PI * 2,
        dist: 72 + (i % 4) * 14,
        delay: (i % 5) * 0.12,
      })),
    []
  );

  if (reduceMotion || !active) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-romantic-gold"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
            scale: [0, 1.2, 0.6],
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
          style={{ boxShadow: "0 0 8px rgba(214,180,119,0.8)" }}
        />
      ))}
    </div>
  );
}

function ConfettiBurst({ active, reduceMotion }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 41) % 84)}%`,
        color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
        delay: (i % 5) * 0.04,
        xDrift: (i % 2 === 0 ? 1 : -1) * (16 + (i % 4) * 10),
      })),
    []
  );

  if (reduceMotion || !active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[38%] h-1.5 w-1 rounded-sm"
          style={{ left: p.left, backgroundColor: p.color }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 100, 180], x: p.xDrift }}
          transition={{ duration: 2.2, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function GiftBox({ phase }) {
  const isOpening = phase === "opening";
  const isOpen = phase === "open";
  const lidOpen = isOpening || isOpen;

  return (
    <div className="relative mx-auto h-44 w-[min(100%,11rem)] sm:h-48 sm:w-48">
      {/* Glow from inside */}
      <motion.div
        className="absolute inset-x-4 bottom-6 top-16 rounded-md bg-romantic-gold/30 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: lidOpen ? 0.85 : 0 }}
        transition={{ duration: 0.55, delay: lidOpen ? 0.15 : 0 }}
        aria-hidden
      />

      {/* Box base */}
      <div className="absolute bottom-0 left-0 right-0 h-28 rounded-lg rounded-t-sm border border-[#5a2440]/60 bg-gradient-to-b from-[#7a3150] via-[#5a2440] to-[#3a1528] shadow-[0_16px_40px_rgba(0,0,0,0.4)] sm:h-32">
        <div className="absolute bottom-0 left-1/2 top-0 w-3 -translate-x-1/2 bg-gradient-to-b from-romantic-gold/90 to-romantic-gold/50" />
        <div className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 bg-gradient-to-r from-transparent via-romantic-gold/80 to-transparent" />
      </div>

      {/* Lid */}
      <motion.div
        className="absolute left-0 right-0 top-8 z-10 h-14 origin-bottom sm:top-10 sm:h-16"
        animate={
          lidOpen
            ? { rotateX: -118, y: -28, opacity: 0.85 }
            : { rotateX: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
      >
        <div className="h-full w-full rounded-md border border-[#6b3550]/50 bg-gradient-to-b from-[#8a3a58] to-[#6b2844] shadow-lg">
          <div className="absolute bottom-0 left-1/2 top-0 w-3 -translate-x-1/2 bg-romantic-gold/80" />
        </div>
        {/* Bow */}
        <div className="absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 gap-1" aria-hidden>
          <div className="h-5 w-7 rounded-full border-2 border-romantic-gold/70 bg-romantic-gold/20" />
          <div className="h-5 w-7 rounded-full border-2 border-romantic-gold/70 bg-romantic-gold/20" />
          <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-romantic-gold/90" />
        </div>
      </motion.div>
    </div>
  );
}

function FinalePhotograph({ reduceMotion }) {
  const photo = finalSurpriseConfig.finalPhoto;
  if (!photo?.src) return null;

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="scrapbook-polaroid relative mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-[20rem]"
    >
      <div className="pointer-events-none absolute -left-3 -top-3 text-lg opacity-70" aria-hidden>
        🎂
      </div>
      <div className="pointer-events-none absolute -right-2 top-1 text-sm opacity-60" aria-hidden>
        ✨
      </div>
      <div className="story-image-well rounded-md border border-romantic-gold/30 bg-[#2a1524] shadow-[0_10px_28px_rgba(0,0,0,0.32)]">
        <img
          src={photo.src}
          alt={photo.alt || "Our favourite photograph together"}
          loading="lazy"
          decoding="async"
          className="transition duration-500"
        />
      </div>
      {photo.caption?.trim() ? (
        <figcaption className="mt-2 text-center font-handwritten text-lg text-romantic-cream/75">
          {photo.caption}
        </figcaption>
      ) : (
        <figcaption className="mx-auto mt-2 h-px w-8 bg-pink-100/20" aria-hidden />
      )}
    </motion.figure>
  );
}

function MessageCard({ reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-xl rounded-2xl border border-romantic-gold/30 bg-gradient-to-br from-[#2f1828]/95 via-[#261222]/98 to-[#1a0f18]/95 p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8"
      aria-live="polite"
    >
      <h3 className="mb-4 font-display text-[clamp(1.35rem,3.2vw,1.75rem)] font-medium uppercase tracking-wide text-romantic-gold">
        {finalSurpriseConfig.messageHeading}
      </h3>
      <div className="mb-5 space-y-4 font-display text-[clamp(1.05rem,2.5vw,1.2rem)] leading-relaxed text-romantic-cream/85">
        {(finalSurpriseConfig.messageBodyParagraphs?.length
          ? finalSurpriseConfig.messageBodyParagraphs
          : [finalSurpriseConfig.messageBody]
        ).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <p className="font-display text-[clamp(1.05rem,2.4vw,1.25rem)] italic leading-relaxed text-romantic-pink/90">
        {finalSurpriseConfig.messageClosing}
      </p>
      <p className="mt-6 font-handwritten text-2xl text-romantic-gold sm:text-3xl">
        {finalSurpriseConfig.signature}
      </p>
      <motion.div
        className="mt-5 flex justify-center text-romantic-gold/80"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <Heart size={24} fill="currentColor" />
      </motion.div>
    </motion.article>
  );
}

export default function FinalSurprise() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("closed");

  const openGift = useCallback(() => {
    if (phase !== "closed") return;

    if (reduceMotion) {
      setPhase("open");
      return;
    }

    setPhase("opening");
    window.setTimeout(() => setPhase("open"), OPEN_MS);
  }, [phase, reduceMotion]);

  const isOpen = phase === "open";
  const isOpening = phase === "opening";
  const showEffects = isOpening || isOpen;

  return (
    <section
      id="final-surprise"
      className="relative overflow-x-hidden bg-gradient-to-b from-[#120a14] via-[#2a1524] to-romantic-dark px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:pb-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-[15%] h-64 w-64 rounded-full bg-romantic-rose/12 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-[10%] h-72 w-72 rounded-full bg-romantic-gold/10 blur-[100px]"
        aria-hidden
      />

      <SectionFloatingDecor variant="finale" reduceMotion={reduceMotion} />

      {!isOpen && (
        <FloatingEmoji
          emoji="💌"
          className="left-1/2 top-[42%] -translate-x-1/2 opacity-30 sm:top-[40%]"
          reduceMotion={reduceMotion}
          duration={6}
        />
      )}

      <motion.div
        className="pointer-events-none absolute left-[8%] top-[12%] text-romantic-gold/20"
        animate={reduceMotion ? undefined : { y: [0, -6, 0], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        aria-hidden
      >
        <Star size={18} fill="currentColor" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ConfettiBurst active={showEffects} reduceMotion={reduceMotion} />
        <GoldenParticles active={showEffects} reduceMotion={reduceMotion} />

        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-12"
        >
          <p className="mb-4 font-display text-sm uppercase tracking-[0.32em] text-romantic-gold">
            {finalSurpriseConfig.sectionLabel}
          </p>
          <h2 className="mb-4 font-display text-[clamp(2rem,5.5vw,3.25rem)] font-medium leading-tight text-pink-50">
            {finalSurpriseConfig.heading}
          </h2>
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-romantic-rose/55" />
            <Sparkles size={16} className="text-romantic-gold" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-romantic-rose/55" />
          </div>
          <p className="mx-auto max-w-lg font-display text-[clamp(1rem,2.4vw,1.25rem)] leading-relaxed text-romantic-cream/80">
            {finalSurpriseConfig.supportingText}
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="gift"
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
              className="relative mb-10"
            >
              <motion.div
                animate={
                  reduceMotion || isOpening
                    ? undefined
                    : { y: [0, -8, 0] }
                }
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="[perspective:900px]"
              >
                <GiftBox phase={phase} />
              </motion.div>

              <motion.button
                type="button"
                onClick={openGift}
                disabled={isOpening}
                aria-expanded={isOpen}
                aria-controls="final-surprise-message"
                whileHover={isOpening ? undefined : { scale: 1.06, boxShadow: "0 0 40px rgba(214, 180, 119, 0.25)" }}
                whileTap={isOpening ? undefined : { scale: 0.97 }}
                className="group relative mt-12 overflow-hidden rounded-full border border-romantic-gold/40 bg-gradient-to-r from-pink-200/10 via-romantic-rose/15 to-pink-200/10 px-8 py-4 text-sm font-medium tracking-wide text-pink-50 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-romantic-gold/60 disabled:cursor-wait disabled:opacity-70 sm:px-12 sm:text-base"
              >
                <span className="relative z-10">{finalSurpriseConfig.openButtonLabel}</span>
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden
                />
              </motion.button>
            </motion.div>
          )}

          {isOpen && (
            <motion.div key="reveal" id="final-surprise-message" className="space-y-10 sm:space-y-12">
              <FinalePhotograph reduceMotion={reduceMotion} />
              <MessageCard reduceMotion={reduceMotion} />

              <motion.footer
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.2 }}
              >
                <p className="mx-auto mb-6 max-w-xl font-display text-[clamp(1.05rem,2.5vw,1.3rem)] italic leading-relaxed text-romantic-cream/80">
                  {finalSurpriseConfig.finaleWish}
                </p>
                <div className="mx-auto mb-3 h-px max-w-xs bg-gradient-to-r from-transparent via-romantic-gold/50 to-transparent" />
                <p className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-medium uppercase tracking-[0.14em] text-pink-50">
                  {finalSurpriseConfig.birthdayLine}
                </p>
                <p className="mt-3 font-display text-sm uppercase tracking-[0.35em] text-romantic-gold/90 sm:text-base">
                  {finalSurpriseConfig.birthdayDate}
                </p>
                <motion.div
                  className="mt-6 flex justify-center gap-2 text-romantic-rose/60"
                  animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                >
                  <Heart size={18} fill="currentColor" />
                  <Heart size={14} className="mt-1 opacity-70" fill="currentColor" />
                  <Heart size={18} fill="currentColor" />
                </motion.div>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}