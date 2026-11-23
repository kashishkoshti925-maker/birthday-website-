import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const PARTY_COLORS = [
  "#F7B6CC",
  "#E88BAA",
  "#D6B477",
  "#9F234B",
  "#FFF5EE",
  "#7EB8FF",
  "#B89CFF",
  "#FFD166",
];

const FIREWORK_BURSTS = [
  { x: "18%", y: "22%", delay: 0, color: "#F7B6CC", size: 1 },
  { x: "78%", y: "18%", delay: 0.35, color: "#D6B477", size: 1.1 },
  { x: "42%", y: "28%", delay: 0.7, color: "#E88BAA", size: 0.9 },
  { x: "88%", y: "32%", delay: 1.05, color: "#7EB8FF", size: 1 },
  { x: "12%", y: "38%", delay: 1.4, color: "#FFD166", size: 0.85 },
  { x: "62%", y: "20%", delay: 1.8, color: "#B89CFF", size: 1.05 },
];

const BALLOON_SPECS = [
  { left: "8%", color: "from-rose-400 to-rose-600", delay: 0.15, duration: 9, size: 1 },
  { left: "22%", color: "from-amber-300 to-amber-500", delay: 0.5, duration: 10.5, size: 0.85 },
  { left: "35%", color: "from-pink-300 to-romantic-rose", delay: 0.2, duration: 8.5, size: 1.1 },
  { left: "52%", color: "from-sky-400 to-blue-600", delay: 0.65, duration: 11, size: 0.9 },
  { left: "68%", color: "from-violet-400 to-purple-600", delay: 0.35, duration: 9.5, size: 1 },
  { left: "82%", color: "from-romantic-gold to-amber-600", delay: 0.8, duration: 10, size: 0.95 },
  { left: "92%", color: "from-fuchsia-400 to-pink-600", delay: 1.1, duration: 11.5, size: 0.8 },
  { left: "48%", color: "from-teal-400 to-emerald-600", delay: 1.25, duration: 9.2, size: 0.75 },
];

function FireworkBurst({ x, y, delay, color, size, intensity, reduceMotion }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const dist = (48 + (i % 4) * 12) * size;
        return {
          id: i,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          delay: delay + (i % 3) * 0.02,
        };
      }),
    [delay, size],
  );

  const ring = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + 0.4;
        const dist = 28 * size;
        return {
          id: i,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
        };
      }),
    [size],
  );

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute" style={{ left: x, top: y }} aria-hidden>
      <motion.div
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 0.2] }}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
      />
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute left-0 top-0 h-1 w-1 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            x: s.tx,
            y: s.ty,
            scale: [0.4, 1, 0.6],
          }}
          transition={{
            duration: intensity > 0.5 ? 1.1 : 0.7,
            delay: s.delay,
            ease: "easeOut",
          }}
        />
      ))}
      {ring.map((s) => (
        <motion.span
          key={`ring-${s.id}`}
          className="absolute left-0 top-0 h-0.5 w-2 rounded-full"
          style={{ backgroundColor: color, opacity: 0.7 }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            x: s.tx,
            y: s.ty,
          }}
          transition={{ duration: 0.85, delay: delay + 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function PartyCracker({ side, intensity, reduceMotion }) {
  if (reduceMotion) return null;

  const isLeft = side === "left";

  return (
    <motion.div
      className={`pointer-events-none absolute bottom-[12%] ${isLeft ? "left-[6%]" : "right-[6%]"}`}
      aria-hidden
    >
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (isLeft ? -20 : 200) + (i - 5) * 14;
        const rad = (angle * Math.PI) / 180;
        const dist = 36 + (i % 3) * 14;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              backgroundColor: PARTY_COLORS[i % PARTY_COLORS.length],
              boxShadow: `0 0 4px ${PARTY_COLORS[i % PARTY_COLORS.length]}`,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos(rad) * dist,
              y: Math.sin(rad) * dist - 20,
            }}
            transition={{
              duration: 0.9,
              delay: 0.25 + i * 0.03,
              ease: "easeOut",
              repeat: intensity > 0.5 ? 2 : 0,
              repeatDelay: 2.2,
            }}
          />
        );
      })}
    </motion.div>
  );
}

function FloatingBalloon({ left, color, delay, duration, size, intensity, reduceMotion }) {
  if (reduceMotion) return null;

  const w = 2.25 * size;
  const h = 3 * size;

  return (
    <motion.div
      className="pointer-events-none absolute bottom-0 flex flex-col items-center"
      style={{ left, width: `${w}rem` }}
      initial={{ y: "105vh", x: 0, opacity: 0.9 }}
      animate={{
        y: "-25vh",
        x: [0, 18, -12, 8, -6, 0],
        opacity: [0.9, 0.95, 0.85, 0.5, 0],
      }}
      transition={{
        y: { duration, delay, ease: "linear" },
        x: { duration, delay, ease: "easeInOut" },
        opacity: { duration, delay: delay + duration * 0.65, ease: "easeOut" },
      }}
      aria-hidden
    >
      <div
        className={`w-full rounded-[50%] bg-gradient-to-b ${color} shadow-[inset_-4px_-6px_12px_rgba(0,0,0,0.15)]`}
        style={{ height: `${h}rem`, opacity: 0.45 + intensity * 0.55 }}
      />
      <div
        className="h-0 w-0 border-x-[3px] border-t-[5px] border-x-transparent border-t-white/25"
        aria-hidden
      />
      <div className="h-12 w-px bg-gradient-to-b from-white/25 to-transparent sm:h-16" />
    </motion.div>
  );
}

function FallingConfetti({ intensity, reduceMotion }) {
  const count = intensity > 0.5 ? 32 : 14;

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 23 + 7) % 100}%`,
        color: PARTY_COLORS[i % PARTY_COLORS.length],
        delay: (i % 8) * 0.12 + (i % 3) * 0.05,
        duration: 3.2 + (i % 5) * 0.4,
        rotate: (i % 6) * 30 - 45,
        w: i % 3 === 0 ? "w-1.5 h-1" : "w-1 h-2",
      })),
    [count],
  );

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute top-0 rounded-sm ${p.w}`}
          style={{
            left: p.left,
            backgroundColor: p.color,
            rotate: p.rotate,
            opacity: 0.35 + intensity * 0.65,
          }}
          initial={{ y: "-5vh", x: 0, opacity: 0 }}
          animate={{
            y: "105vh",
            x: (p.id % 2 === 0 ? 1 : -1) * (12 + (p.id % 5) * 8),
            opacity: [0, 1, 1, 0.6, 0],
            rotate: p.rotate + 180,
          }}
          transition={{
            duration: p.duration,
            delay: 0.35 + p.delay,
            ease: "linear",
            repeat: intensity > 0.4 ? Infinity : 0,
            repeatDelay: intensity > 0.5 ? 0.8 : 4,
          }}
        />
      ))}
    </div>
  );
}

function GlowParticles({ intensity, reduceMotion }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 11) % 94}%`,
        top: `${(i * 27 + 9) % 88}%`,
        size: 2 + (i % 3),
        delay: (i % 6) * 0.25,
      })),
    [],
  );

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-romantic-gold"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: 0.2 + intensity * 0.5,
            boxShadow: "0 0 8px rgba(214,180,119,0.8)",
          }}
          animate={{
            opacity: [0.2, 0.9, 0.3],
            scale: [0.8, 1.4, 0.9],
          }}
          transition={{
            duration: 2 + (d.id % 4) * 0.5,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function IntroCelebrationEffects({ reduceMotion, intensity = 1 }) {
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    if (reduceMotion || intensity <= 0.5) return undefined;
    const id = window.setInterval(() => setLoopKey((k) => k + 1), 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion, intensity]);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <GlowParticles intensity={intensity} reduceMotion={reduceMotion} />
      <FallingConfetti intensity={intensity} reduceMotion={reduceMotion} />
      <PartyCracker side="left" intensity={intensity} reduceMotion={reduceMotion} />
      <PartyCracker side="right" intensity={intensity} reduceMotion={reduceMotion} />

      {FIREWORK_BURSTS.map((fw, i) => (
        <FireworkBurst
          key={`${loopKey}-${i}`}
          {...fw}
          intensity={intensity}
          reduceMotion={reduceMotion}
          delay={fw.delay + (intensity > 0.5 ? 0 : 0)}
        />
      ))}

      {intensity > 0.4 &&
        FIREWORK_BURSTS.slice(0, 4).map((fw, i) => (
          <FireworkBurst
            key={`repeat-${loopKey}-${i}`}
            x={fw.x}
            y={fw.y}
            delay={fw.delay + 2.8}
            color={PARTY_COLORS[(i + 3) % PARTY_COLORS.length]}
            size={fw.size * 0.85}
            intensity={intensity}
            reduceMotion={reduceMotion}
          />
        ))}

      {BALLOON_SPECS.map((b, i) => (
        <FloatingBalloon key={i} {...b} intensity={intensity} reduceMotion={reduceMotion} />
      ))}

      <motion.span
        className="absolute left-[5%] top-[14%] text-2xl opacity-40"
        animate={{ rotate: [0, 12, 0], y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🎂
      </motion.span>
      <motion.span
        className="absolute right-[6%] top-[12%] text-xl opacity-35"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🎉
      </motion.span>
    </div>
  );
}