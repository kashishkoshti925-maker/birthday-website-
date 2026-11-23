import { motion } from "framer-motion";
import { Camera, Gift, Heart, Mail, Sparkles, Star } from "lucide-react";

const floatTransition = (duration, delay = 0) => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut",
  delay,
});

function FloatWrap({ reduceMotion, className, children, duration = 5, delay = 0, y = 10 }) {
  if (reduceMotion) {
    return (
      <span className={`pointer-events-none absolute select-none ${className}`} aria-hidden>
        {children}
      </span>
    );
  }
  return (
    <motion.span
      className={`pointer-events-none absolute select-none ${className}`}
      aria-hidden
      animate={{ y: [0, -y, 0], opacity: [0.45, 0.9, 0.45] }}
      transition={floatTransition(duration, delay)}
    >
      {children}
    </motion.span>
  );
}

/** Soft plush teddy — small ambient SVG, not hero-sized */
export function MiniTeddy({ className = "" }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={`h-9 w-9 opacity-40 drop-shadow-sm sm:h-10 sm:w-10 ${className}`}
      aria-hidden
    >
      <circle cx="24" cy="20" r="14" fill="#b8896a" />
      <circle cx="16" cy="14" r="6" fill="#a67c5b" />
      <circle cx="32" cy="14" r="6" fill="#a67c5b" />
      <ellipse cx="24" cy="38" rx="16" ry="14" fill="#9a7358" />
      <circle cx="19" cy="19" r="1.5" fill="#3d3556" />
      <circle cx="29" cy="19" r="1.5" fill="#3d3556" />
    </svg>
  );
}

export function FloatingEmoji({ emoji, className, reduceMotion, duration = 5.2, delay = 0 }) {
  return (
    <FloatWrap reduceMotion={reduceMotion} className={className} duration={duration} delay={delay}>
      <span className="text-lg opacity-70 sm:text-xl">{emoji}</span>
    </FloatWrap>
  );
}

export function SectionFloatingDecor({ variant, reduceMotion }) {
  const presets = {
    welcome: [
      { type: "emoji", emoji: "✨", className: "right-[12%] top-[14%]" },
      { type: "emoji", emoji: "🎀", className: "left-[10%] top-[20%]", delay: 0.4 },
      { type: "teddy", className: "right-[8%] bottom-[22%]", delay: 0.8 },
      { type: "emoji", emoji: "💗", className: "left-[14%] bottom-[28%]", delay: 0.2 },
    ],
    memories: [
      { type: "icon", Icon: Camera, className: "left-[6%] top-[16%]", size: 18 },
      { type: "emoji", emoji: "💕", className: "right-[7%] top-[12%]" },
      { type: "emoji", emoji: "🦋", className: "left-[8%] bottom-[20%]", delay: 0.5 },
    ],
    story: [
      { type: "emoji", emoji: "🌷", className: "left-[4%] top-[18%]" },
      { type: "emoji", emoji: "💕", className: "right-[5%] top-[8%]", delay: 0.3 },
    ],
    birthday: [
      { type: "emoji", emoji: "🎂", className: "left-[8%] top-[10%]" },
      { type: "emoji", emoji: "🎈", className: "right-[10%] top-[14%]", delay: 0.35 },
      { type: "icon", Icon: Gift, className: "right-[6%] bottom-[18%]", size: 20 },
      { type: "emoji", emoji: "✨", className: "left-[6%] bottom-[22%]", delay: 0.6 },
    ],
    letter: [
      { type: "icon", Icon: Mail, className: "left-[7%] top-[12%]", size: 22 },
      { type: "emoji", emoji: "💌", className: "right-[8%] top-[16%]", delay: 0.3 },
      { type: "emoji", emoji: "🫶🏻", className: "left-[5%] bottom-[24%]", delay: 0.5 },
    ],
    finale: [
      { type: "emoji", emoji: "🎁", className: "left-[6%] top-[10%]" },
      { type: "emoji", emoji: "💖", className: "right-[7%] top-[14%]", delay: 0.25 },
      { type: "emoji", emoji: "✨", className: "right-[5%] bottom-[20%]", delay: 0.5 },
      { type: "emoji", emoji: "🥰", className: "left-[8%] bottom-[16%]", delay: 0.7 },
    ],
  };

  const items = presets[variant] ?? [];

  return (
    <>
      {items.map((item, i) => {
        if (item.type === "emoji") {
          return (
            <FloatingEmoji
              key={i}
              emoji={item.emoji}
              className={item.className}
              reduceMotion={reduceMotion}
              delay={item.delay ?? 0}
            />
          );
        }
        if (item.type === "teddy") {
          return (
            <FloatWrap
              key={i}
              reduceMotion={reduceMotion}
              className={item.className}
              delay={item.delay ?? 0}
            >
              <MiniTeddy />
            </FloatWrap>
          );
        }
        const Icon = item.Icon;
        return (
          <FloatWrap
            key={i}
            reduceMotion={reduceMotion}
            className={`text-romantic-rose/35 ${item.className}`}
            delay={item.delay ?? 0}
          >
            <Icon size={item.size ?? 18} strokeWidth={1.35} />
          </FloatWrap>
        );
      })}
    </>
  );
}

/** Per-chapter accents beside story cards */
export function ChapterAmbientDecor({ chapterId, reduceMotion }) {
  const map = {
    "chapter-special-person": [
      { emoji: "💕", className: "-right-1 top-2 lg:-right-6", },
      { emoji: "✨", className: "-left-2 bottom-4 lg:-left-8", delay: 0.4 },
    ],
    "chapter-moments": [
      { kind: "icon", Icon: Camera, className: "-right-2 top-0 lg:-right-7 text-romantic-gold/40" },
      { emoji: "💗", className: "-left-1 bottom-2 lg:-left-6", delay: 0.3 },
    ],
    "chapter-adore": [
      { emoji: "🌸", className: "-right-2 top-1 lg:-right-7" },
      { emoji: "🦋", className: "-left-2 bottom-3 lg:-left-7", delay: 0.5 },
    ],
    "chapter-birthday": [
      { emoji: "🎂", className: "-right-1 top-0 lg:-right-6" },
      { emoji: "🎉", className: "-left-2 bottom-2 lg:-left-7", delay: 0.35 },
    ],
  };

  const items = map[chapterId] ?? [{ emoji: "💗", className: "-right-2 top-2" }];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-visible" aria-hidden>
      {items.map((item, i) =>
        item.kind === "icon" ? (
          <FloatWrap
            key={i}
            reduceMotion={reduceMotion}
            className={item.className}
            delay={item.delay ?? 0}
          >
            <item.Icon size={20} strokeWidth={1.25} />
          </FloatWrap>
        ) : (
          <FloatingEmoji
            key={i}
            emoji={item.emoji}
            className={item.className}
            reduceMotion={reduceMotion}
            delay={item.delay ?? 0}
          />
        ),
      )}
    </div>
  );
}

export function SparkleCluster({ className = "", reduceMotion }) {
  return (
    <FloatWrap
      reduceMotion={reduceMotion}
      className={`flex gap-1 text-romantic-gold/50 ${className}`}
      duration={4}
      y={6}
    >
      <Sparkles size={14} />
      <Star size={10} fill="currentColor" />
    </FloatWrap>
  );
}