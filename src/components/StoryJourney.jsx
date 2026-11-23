import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import ChapterCoverCard from "./ChapterCoverCard";
import StoryChapter from "./StoryChapter";
import { SectionFloatingDecor } from "./RomanticDecor";
import { ourStoryConfig, storyChapters } from "../data/ourStoryData";

const REVEAL = {
  "chapter-special-person": {
    initial: { opacity: 0, scale: 0.92, rotateX: 12 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    decor: "💗",
  },
  "chapter-moments": {
    initial: { opacity: 0, y: 40, rotate: -2 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    decor: "📷",
  },
  "chapter-adore": {
    initial: { opacity: 0, scale: 0.96, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
    decor: "✨",
  },
  "chapter-birthday": {
    initial: { opacity: 0, y: 32, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
    decor: "🎉",
  },
};

export default function StoryJourney() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(null);
  const [opened, setOpened] = useState(() => new Set());

  const activeChapter = useMemo(
    () => storyChapters.find((c) => c.id === activeId) ?? null,
    [activeId],
  );

  const openChapter = useCallback((id) => {
    setActiveId(id);
    setOpened((prev) => new Set(prev).add(id));
  }, []);

  const closeChapter = useCallback(() => setActiveId(null), []);

  const scrollToFinale = useCallback(() => {
    closeChapter();
    document.getElementById("final-surprise")?.scrollIntoView({ behavior: "smooth" });
  }, [closeChapter]);

  const reveal = activeChapter ? REVEAL[activeChapter.id] ?? REVEAL["chapter-special-person"] : null;

  useEffect(() => {
    if (!activeChapter) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeChapter]);

  return (
    <section
      id="our-story"
      className="relative overflow-x-hidden bg-gradient-to-b from-romantic-dark via-[#1e1019] to-[#120a14] px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -right-28 top-[30%] h-72 w-72 rounded-full bg-romantic-rose/10 blur-[100px]"
        aria-hidden
      />
      <SectionFloatingDecor variant="story" reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85 }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="mb-4 font-display text-sm uppercase tracking-[0.32em] text-romantic-gold">
            {ourStoryConfig.sectionLabel}
          </p>
          <h2 className="mb-5 font-display text-[clamp(2.5rem,6.5vw,4.25rem)] font-medium leading-[1.1] text-pink-50">
            {ourStoryConfig.heading}
          </h2>
          <p className="mx-auto max-w-2xl font-display text-[clamp(1.125rem,2.8vw,1.5rem)] italic text-romantic-cream/80">
            {ourStoryConfig.subtitle}
          </p>
          <p className="mx-auto mt-4 max-w-xl font-display text-sm text-pink-200/55">
            Tap a chapter cover to open your surprise — each one is a little memory written for you.
          </p>
        </motion.header>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {storyChapters.map((chapter) => (
            <li key={chapter.id}>
              <ChapterCoverCard
                chapter={chapter}
                opened={opened.has(chapter.id)}
                onOpen={() => openChapter(chapter.id)}
              />
            </li>
          ))}
        </ul>

        <motion.div
          className="mt-10 text-center sm:mt-12"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            type="button"
            onClick={scrollToFinale}
            className="inline-flex items-center gap-2 rounded-full border border-romantic-gold/35 bg-pink-100/10 px-8 py-3 font-display text-sm font-medium tracking-wide text-pink-50 transition hover:border-romantic-gold/55"
          >
            One Last Surprise 🎁
          </button>
        </motion.div>

        <motion.footer className="mt-16 text-center sm:mt-20">
          <div className="mx-auto mb-5 h-px max-w-sm bg-gradient-to-r from-transparent via-romantic-gold/45 to-transparent" />
          <p className="font-display text-[clamp(1.05rem,2.4vw,1.35rem)] italic text-romantic-cream/75">
            {ourStoryConfig.footerLine}
          </p>
        </motion.footer>
      </div>

      <AnimatePresence>
        {activeChapter && reveal && (
          <motion.div
            className="chapter-modal-overlay fixed inset-0 z-[150] overflow-y-auto overscroll-contain bg-[#1a0f18]/97 backdrop-blur-md sm:bg-[#120a14]/88"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chapter-reveal-title"
            onClick={closeChapter}
          >
            <motion.button
              type="button"
              onClick={closeChapter}
              className="fixed right-3 top-3 z-[160] flex h-10 w-10 items-center justify-center rounded-full border border-pink-200/20 bg-romantic-dark/95 text-pink-100 sm:right-6 sm:top-6"
              style={{ top: "max(0.75rem, env(safe-area-inset-top, 0px))" }}
              aria-label="Close chapter"
            >
              <X size={20} />
            </motion.button>

            <motion.span
              className="pointer-events-none fixed left-1/2 top-[10%] hidden -translate-x-1/2 text-2xl opacity-40 sm:block"
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              aria-hidden
            >
              {reveal.decor}
            </motion.span>

            <motion.div
              className="chapter-modal-panel relative z-[155] mx-auto flex w-full min-h-[100dvh] max-w-2xl flex-col justify-start px-3 pb-32 pt-16 sm:min-h-0 sm:justify-center sm:px-6 sm:pb-12 sm:pt-20"
              initial={reduceMotion ? false : reveal.initial}
              animate={reveal.animate}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              transition={reveal.transition}
              style={{ perspective: 900 }}
              onClick={(e) => e.stopPropagation()}
            >
              {activeChapter.id === "chapter-birthday" && !reduceMotion && (
                <motion.div
                  className="pointer-events-none absolute -inset-4 rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{ duration: 1.2 }}
                  aria-hidden
                >
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute h-1.5 w-1.5 rounded-full bg-romantic-gold"
                      style={{
                        left: `${10 + (i * 11) % 80}%`,
                        top: `${(i * 17) % 40}%`,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              <StoryChapter chapter={activeChapter} index={0} align="left" revealed />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}