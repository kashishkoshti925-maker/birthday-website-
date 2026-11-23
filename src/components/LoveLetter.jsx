import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { loveLetterConfig, loveLetterContent } from "../data/loveLetterData";
import { SectionFloatingDecor } from "./RomanticDecor";

const OPEN_DURATION_MS = 900;

function WaxSeal() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-romantic-gold via-[#c9a25c] to-[#9a7a3d] shadow-[0_0_24px_rgba(214,180,119,0.45),inset_0_2px_4px_rgba(255,255,255,0.25)]"
        animate={{ boxShadow: ["0 0 20px rgba(214,180,119,0.35)", "0 0 28px rgba(214,180,119,0.55)", "0 0 20px rgba(214,180,119,0.35)"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <Heart size={22} className="relative z-[1] text-[#5c3d2a]/80" fill="currentColor" aria-hidden />
    </div>
  );
}

function LetterPaper({ reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="letter-paper mx-auto w-full max-w-xl rounded-sm border border-romantic-gold/25 px-5 py-7 shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:px-8 sm:py-9"
      aria-label="Birthday letter for Jayesh"
    >
      <div className="mb-5 flex justify-center">
        <Heart size={14} className="text-romantic-rose/50" fill="currentColor" aria-hidden />
      </div>

      <p className="mb-4 font-display text-xl text-[#5a3544] sm:text-2xl">{loveLetterContent.salutation}</p>

      <div className="space-y-4 font-display text-[clamp(1.05rem,2.4vw,1.2rem)] leading-relaxed text-[#4a3a42]">
        {loveLetterContent.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 0.35 }}
        className="mt-8 border-t border-romantic-gold/20 pt-6"
      >
        <p className="font-display text-base italic text-[#6b4a55] sm:text-lg">{loveLetterContent.signOff}</p>
        <p className="mt-2 font-handwritten text-2xl text-[#9F234B] sm:text-3xl">{loveLetterContent.signature}</p>
      </motion.div>
    </motion.article>
  );
}

export default function LoveLetter() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("closed");

  const openLetter = useCallback(() => {
    if (phase !== "closed") return;

    if (reduceMotion) {
      setPhase("open");
      return;
    }

    setPhase("opening");
    window.setTimeout(() => setPhase("open"), OPEN_DURATION_MS);
  }, [phase, reduceMotion]);

  const isOpen = phase === "open";
  const isOpening = phase === "opening";

  return (
    <section
      id="love-letter"
      className="relative overflow-x-hidden bg-gradient-to-b from-romantic-dark via-[#1e1019] to-[#120a14] px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-romantic-rose/10 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-romantic-gold/8 blur-[100px]"
        aria-hidden
      />

      <SectionFloatingDecor variant="letter" reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center sm:mb-14"
        >
          <p className="mb-4 font-display text-[0.65rem] uppercase tracking-[0.32em] text-romantic-gold sm:text-sm sm:tracking-[0.38em]">
            {loveLetterConfig.sectionLabel}
          </p>
          <h2 className="mb-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-medium leading-tight text-pink-50">
            {loveLetterConfig.heading}
          </h2>
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-romantic-rose/55" />
            <Sparkles size={16} className="text-romantic-gold" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-romantic-rose/55" />
          </div>
          <p className="mx-auto max-w-xl font-display text-[clamp(1.05rem,2.6vw,1.4rem)] italic text-romantic-cream/80">
            {loveLetterConfig.subtitle}
          </p>
        </motion.header>

        <div className="relative mx-auto flex min-h-[16rem] w-full max-w-md flex-col items-center justify-center sm:min-h-[18rem]">
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.div
                key="envelope"
                initial={false}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.95, y: -12, transition: { duration: 0.45 } }
                }
                className="flex w-full flex-col items-center"
              >
                <div className="relative w-full max-w-[17rem] [perspective:900px] sm:max-w-[19rem]">
                  {/* Envelope back */}
                  <div
                    className="relative rounded-lg bg-gradient-to-b from-[#6b2844] via-[#4a1a32] to-[#3a1528] px-6 pb-10 pt-14 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-romantic-gold/20" />
                    <motion.div
                      className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2"
                      animate={
                        isOpening
                          ? { scale: 0.8, opacity: 0, y: -8 }
                          : { scale: 1, opacity: 1, y: 0 }
                      }
                      transition={{ duration: 0.4 }}
                    >
                      <WaxSeal />
                    </motion.div>
                  </div>

                  {/* Envelope flap */}
                  <motion.div
                    className="absolute left-0 right-0 top-0 z-10 h-[5.5rem] origin-top sm:h-24"
                    style={{
                      clipPath: "polygon(0 0, 50% 85%, 100% 0)",
                      background: "linear-gradient(180deg, #7a3150 0%, #5a2440 100%)",
                      transformStyle: "preserve-3d",
                    }}
                    animate={
                      isOpening
                        ? { rotateX: -160, opacity: 0.3 }
                        : { rotateX: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Inner letter peek while opening */}
                  <motion.div
                    className="absolute bottom-8 left-1/2 z-[5] h-16 w-[85%] -translate-x-1/2 rounded-t-sm bg-gradient-to-b from-romantic-cream to-[#f5e8de] shadow-md"
                    animate={
                      isOpening
                        ? { y: -72, opacity: 1 }
                        : { y: 0, opacity: isOpening ? 0.6 : 0 }
                    }
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={openLetter}
                  disabled={isOpening}
                  aria-expanded={isOpen}
                  aria-controls="letter-content"
                  whileHover={isOpening ? undefined : { scale: 1.06, boxShadow: "0 0 40px rgba(214, 180, 119, 0.25)" }}
                  whileTap={isOpening ? undefined : { scale: 0.97 }}
                  className="group relative mt-10 overflow-hidden rounded-full border border-romantic-gold/40 bg-gradient-to-r from-pink-200/10 via-romantic-rose/15 to-pink-200/10 px-10 py-4 text-sm font-medium tracking-wide text-pink-50 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-romantic-gold/60 disabled:cursor-wait disabled:opacity-70 sm:px-12 sm:text-base"
                >
                  <span className="relative z-10">{loveLetterConfig.openButtonLabel}</span>
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden
                  />
                </motion.button>
              </motion.div>
            )}

            {isOpen && (
              <motion.div
                key="letter"
                id="letter-content"
                initial={false}
                className="w-full"
              >
                <LetterPaper reduceMotion={reduceMotion} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.footer
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.25 }}
              className="mt-12 text-center sm:mt-14"
            >
              <motion.div
                className="mb-4 flex justify-center text-romantic-rose/70"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.12, 1],
                        filter: [
                          "drop-shadow(0 0 0px rgba(232,139,170,0))",
                          "drop-shadow(0 0 12px rgba(232,139,170,0.6))",
                          "drop-shadow(0 0 0px rgba(232,139,170,0))",
                        ],
                      }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              >
                <Heart size={22} fill="currentColor" />
              </motion.div>
              <p className="font-display text-[clamp(1rem,2.4vw,1.25rem)] italic text-romantic-cream/75">
                {loveLetterConfig.closingMessage}
              </p>
            </motion.footer>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}