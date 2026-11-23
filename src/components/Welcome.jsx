import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import { welcomeData } from "../data/welcomeData";
import { SectionFloatingDecor } from "./RomanticDecor";
import IntroCelebrationEffects from "./IntroCelebrationEffects";

const floatingItems = [
  { Icon: Heart, className: "left-[8%] top-[18%] text-romantic-rose/80", size: 28, fill: true, duration: 4.2, delay: 0 },
  { Icon: Star, className: "right-[10%] top-[22%] text-romantic-gold/90", size: 32, fill: true, duration: 5.1, delay: 0.3 },
  { Icon: Sparkles, className: "left-[22%] bottom-[28%] text-pink-200/70", size: 22, fill: false, duration: 3.5, delay: 0.6 },
  { Icon: Heart, className: "right-[18%] bottom-[32%] text-pink-300/60", size: 20, fill: true, duration: 4.8, delay: 0.2 },
  { Icon: Star, className: "left-[42%] top-[12%] text-romantic-gold/50", size: 18, fill: true, duration: 6, delay: 0.5 },
  { Icon: Heart, className: "right-[38%] top-[8%] text-romantic-rose/40", size: 16, fill: true, duration: 5.5, delay: 0.8 },
];

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  size: 2 + (i % 3),
  delay: (i % 8) * 0.4,
  duration: 2.5 + (i % 5) * 0.6,
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.45 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Welcome({ celebrate = false }) {
  const reduceMotion = useReducedMotion();
  const [partyIntensity, setPartyIntensity] = useState(0);

  useEffect(() => {
    if (!celebrate) {
      setPartyIntensity(0);
      return undefined;
    }
    if (reduceMotion) {
      setPartyIntensity(0.35);
      return undefined;
    }
    setPartyIntensity(1);
    const calm = window.setTimeout(() => setPartyIntensity(0.35), 5500);
    return () => window.clearTimeout(calm);
  }, [celebrate, reduceMotion]);

  const handleOpenSurprise = () => {
    document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
  };

  const contentAnimate = celebrate ? "visible" : "hidden";

  return (
    <section
      id="welcome"
      className="relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br from-romantic-dark via-[#3a1a2e] to-[#120a14] px-5 py-16 sm:px-8"
    >
      {celebrate && (
        <IntroCelebrationEffects reduceMotion={reduceMotion} intensity={partyIntensity} />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_42%,rgba(159,35,75,0.15),transparent_70%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-romantic-rose/25 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-romantic-red/20 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-romantic-gold/10 blur-[80px]"
        aria-hidden
      />

      {celebrate &&
        !reduceMotion &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute z-[2] rounded-full bg-white/80"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.15 + partyIntensity * 0.5,
            }}
            animate={{ opacity: [0.15, 0.85, 0.15], scale: [1, 1.4, 1] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            aria-hidden
          />
        ))}

      <SectionFloatingDecor variant="welcome" reduceMotion={reduceMotion} />

      {celebrate &&
        floatingItems.map(({ Icon, className, size, fill, duration, delay }, index) => (
          <motion.div
            key={index}
            className={`pointer-events-none absolute z-[2] ${className}`}
            animate={{
              y: [0, index % 2 === 0 ? -18 : 14, 0],
              rotate: [0, index % 2 === 0 ? 8 : -10, 0],
            }}
            transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
            aria-hidden
          >
            <Icon size={size} fill={fill ? "currentColor" : "none"} />
          </motion.div>
        ))}

      <motion.div
        key={celebrate ? "welcome-celebrate" : "welcome-wait"}
        variants={containerVariants}
        initial="hidden"
        animate={contentAnimate}
        className="relative z-20 w-full max-w-3xl text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-5 font-display text-[0.65rem] uppercase tracking-[0.28em] text-romantic-pink/90 xs:text-xs sm:text-sm sm:tracking-[0.4em]"
        >
          {welcomeData.eyebrow}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="intro-birthday-glow mb-3 font-display text-4xl font-light uppercase leading-tight tracking-[0.12em] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-pink-100 via-romantic-pink to-romantic-gold bg-clip-text text-transparent">
            Happy Birthday <span aria-hidden>🎂</span>
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="my-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-romantic-gold/60 sm:w-16" />
          <Heart className="text-romantic-rose" size={22} fill="currentColor" aria-hidden />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-romantic-gold/60 sm:w-16" />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="intro-birthday-glow mb-4 font-display text-5xl font-semibold tracking-[0.2em] text-romantic-gold sm:text-6xl md:text-7xl"
        >
          JAYESH
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mb-8 font-display text-sm tracking-[0.35em] text-pink-200/85 sm:text-base"
        >
          06 DECEMBER · 2026
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-lg text-base italic leading-relaxed text-pink-100/75 sm:text-lg"
        >
          {welcomeData.tagline}
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button
            type="button"
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(214, 180, 119, 0.25)" }}
            whileTap={{ scale: 0.97 }}
            className="relative z-30 overflow-hidden rounded-full border border-romantic-gold/40 bg-gradient-to-r from-pink-200/10 via-romantic-rose/15 to-pink-200/10 px-10 py-4 text-sm font-medium tracking-wide text-pink-50 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-romantic-gold/60 sm:px-12 sm:py-4 sm:text-base"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {welcomeData.ctaLabel}
              <Heart size={18} className="text-romantic-rose transition-transform group-hover:scale-110" fill="currentColor" />
            </span>
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
          </motion.button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-14 text-xs uppercase tracking-[0.3em] text-pink-200/40"
        >
          {welcomeData.scrollHint}
        </motion.p>
      </motion.div>

      {celebrate && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <div className="h-10 w-6 rounded-full border border-pink-200/30 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-romantic-gold/70" />
          </div>
        </motion.div>
      )}
    </section>
  );
}