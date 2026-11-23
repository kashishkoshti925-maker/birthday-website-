import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import StoryChapter from "./StoryChapter";
import { SectionFloatingDecor, SparkleCluster } from "./RomanticDecor";
import { ourStoryConfig, storyChapters } from "../data/ourStoryData";

const decorItems = [
  { Icon: Heart, className: "right-[6%] top-[10%] text-romantic-rose/20", size: 18, fill: true, duration: 5.5 },
  { Icon: Star, className: "left-[5%] top-[25%] text-romantic-gold/30", size: 22, fill: true, duration: 6.2 },
  { Icon: Sparkles, className: "right-[10%] bottom-[18%] text-pink-200/15", size: 20, fill: false, duration: 4.8 },
];

function TimelineMarker({ chapterNumber, reduceMotion }) {
  return (
    <div
      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-romantic-gold/45 bg-[#2a1524] shadow-[0_0_20px_rgba(214,180,119,0.15)] sm:h-11 sm:w-11"
      aria-hidden
    >
      <motion.span
        initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-xs font-semibold text-romantic-gold"
      >
        {chapterNumber}
      </motion.span>
      <Heart
        size={10}
        className="absolute -right-0.5 -top-0.5 text-romantic-rose/80"
        fill="currentColor"
      />
    </div>
  );
}

export default function OurStory() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.25"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="relative overflow-x-hidden bg-gradient-to-b from-romantic-dark via-[#1e1019] to-[#120a14] px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -right-28 top-[30%] h-72 w-72 rounded-full bg-romantic-rose/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-[20%] h-64 w-64 rounded-full bg-romantic-gold/8 blur-[90px]"
        aria-hidden
      />

      <SectionFloatingDecor variant="story" reduceMotion={reduceMotion} />

      {decorItems.map(({ Icon, className, size, fill, duration }, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute ${className}`}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, i % 2 ? 8 : -8, 0],
                  opacity: [0.4, 0.85, 0.4],
                }
          }
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Icon size={size} fill={fill ? "currentColor" : "none"} />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center sm:mb-16 lg:mb-20"
        >
          <p className="mb-4 font-display text-sm uppercase tracking-[0.32em] text-romantic-gold sm:tracking-[0.38em]">
            {ourStoryConfig.sectionLabel ?? "For Jayesh"}
          </p>
          <h2 className="relative mb-5 font-display text-[clamp(2.5rem,6.5vw,4.25rem)] font-medium leading-[1.1] text-pink-50">
            {ourStoryConfig.heading}
            <SparkleCluster
              reduceMotion={reduceMotion}
              className="absolute -right-2 -top-1 sm:-right-4 sm:-top-2"
            />
          </h2>
          <div className="mx-auto mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-romantic-rose/55 sm:w-16" />
            <Heart size={18} className="text-romantic-rose" fill="currentColor" aria-hidden />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-romantic-rose/55 sm:w-16" />
          </div>
          <p className="mx-auto max-w-2xl font-display text-[clamp(1.125rem,2.8vw,1.5rem)] italic leading-relaxed text-romantic-cream/80">
            {ourStoryConfig.subtitle}
          </p>
        </motion.header>

        <div className="relative">
          {/* Timeline spine — mobile: left; desktop: center */}
          <div
            className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-romantic-gold/15 via-romantic-rose/25 to-romantic-gold/15 lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden
          >
            {reduceMotion ? (
              <div className="h-full w-full bg-gradient-to-b from-romantic-gold/50 via-romantic-rose/60 to-romantic-gold/40" />
            ) : (
              <motion.div
                className="h-full w-full origin-top bg-gradient-to-b from-romantic-gold/50 via-romantic-rose/60 to-romantic-gold/40"
                style={{ scaleY: lineScaleY }}
              />
            )}
          </div>

          <ul className="relative space-y-10 sm:space-y-12 lg:space-y-16">
            {storyChapters.map((chapter, index) => {
              const isEven = index % 2 === 0;
              const align = isEven ? "left" : "right";

              return (
                <li
                  key={chapter.id}
                  className="relative grid min-w-0 grid-cols-1 gap-4 pl-14 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-6 lg:gap-y-0 lg:pl-0"
                >
                  <div
                    className={`min-w-0 lg:row-start-1 ${
                      isEven
                        ? "lg:col-start-1 lg:justify-self-end lg:pr-4"
                        : "lg:col-start-3 lg:justify-self-start lg:pl-4"
                    }`}
                  >
                    <StoryChapter chapter={chapter} index={index} align={align} />
                  </div>

                  <div className="absolute left-5 top-6 flex -translate-x-1/2 lg:relative lg:left-auto lg:top-auto lg:col-start-2 lg:row-start-1 lg:translate-x-0">
                    <TimelineMarker
                      chapterNumber={chapter.chapterNumber}
                      reduceMotion={reduceMotion}
                    />
                  </div>

                  {isEven ? (
                    <div className="hidden min-h-[1px] lg:col-start-3 lg:block" aria-hidden />
                  ) : (
                    <div className="hidden min-h-[1px] lg:col-start-1 lg:block" aria-hidden />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <motion.footer
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center sm:mt-20"
        >
          <div className="mx-auto mb-5 h-px max-w-sm bg-gradient-to-r from-transparent via-romantic-gold/45 to-transparent" />
          <p className="font-display text-[clamp(1.05rem,2.4vw,1.35rem)] italic text-romantic-cream/75">
            {ourStoryConfig.footerLine}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}