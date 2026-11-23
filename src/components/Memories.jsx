import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import MemoryCollection from "./MemoryCollection";
import MemoryLightbox from "./MemoryLightbox";
import { SectionFloatingDecor } from "./RomanticDecor";
import {
  getActivePhotos,
  getPhotosByCategory,
  memoryCollections,
  memoriesConfig,
} from "../data/memories";

const decorItems = [
  { Icon: Heart, className: "left-[4%] top-[12%] text-romantic-rose/25", size: 20, fill: true, duration: 5 },
  { Icon: Star, className: "right-[6%] top-[18%] text-romantic-gold/35", size: 24, fill: true, duration: 6 },
  { Icon: Sparkles, className: "left-[10%] bottom-[22%] text-pink-200/20", size: 18, fill: false, duration: 4.5 },
  { Icon: Heart, className: "right-[12%] bottom-[28%] text-romantic-pink/20", size: 16, fill: true, duration: 5.5 },
];

export default function Memories() {
  const reduceMotion = useReducedMotion();
  const activePhotos = useMemo(() => getActivePhotos(), []);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openPhoto = useCallback(
    (id) => {
      const idx = activePhotos.findIndex((p) => p.id === id);
      if (idx < 0) return;
      setLightboxIndex(idx);
      setLightboxOpen(true);
    },
    [activePhotos],
  );

  const collectionPhotoGroups = useMemo(
    () =>
      memoryCollections.map((collection) => ({
        collection,
        photos: getPhotosByCategory(collection.id),
      })),
    [],
  );

  const hasAnyPhotos = activePhotos.length > 0;

  return (
    <section
      id="memories"
      className="relative overflow-x-hidden bg-gradient-to-b from-[#120a14] via-[#2a1524] to-romantic-dark px-3 py-20 pb-44 sm:px-5 sm:py-24 sm:pb-48 md:px-8 md:py-28 md:pb-32 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-[20%] h-64 w-64 rounded-full bg-romantic-rose/12 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-[15%] h-72 w-72 rounded-full bg-romantic-red/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] h-40 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-romantic-gold/6 blur-[70px]"
        aria-hidden
      />

      <SectionFloatingDecor variant="memories" reduceMotion={reduceMotion} />

      {decorItems.map(({ Icon, className, size, fill, duration }, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute ${className}`}
          animate={{
            y: [0, i % 2 === 0 ? -10 : 8, 0],
            opacity: [0.45, 0.9, 0.45],
          }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Icon size={size} fill={fill ? "currentColor" : "none"} />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center sm:mb-16 md:mb-20"
        >
          <p className="mb-4 font-display text-sm uppercase tracking-[0.32em] text-romantic-gold sm:tracking-[0.4em]">
            Chapter one
          </p>
          <h2 className="mb-5 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-medium leading-[1.1] text-pink-50">
            {memoriesConfig.heading}
          </h2>
          <motion.div className="mx-auto mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-romantic-rose/55 sm:w-16" />
            <Heart size={18} className="text-romantic-rose" fill="currentColor" aria-hidden />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-romantic-rose/55 sm:w-16" />
          </motion.div>
          <p className="mx-auto max-w-xl font-display text-[clamp(1.125rem,2.8vw,1.5rem)] italic leading-relaxed text-romantic-cream/80">
            {memoriesConfig.subtitle}
          </p>
        </motion.header>

        {!hasAnyPhotos ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-pink-200/10 bg-pink-100/5 px-6 py-12 text-center backdrop-blur-sm sm:px-8 sm:py-14"
          >
            <p className="font-display text-lg text-pink-100/75 sm:text-xl">
              Your gallery is waiting — add entries in{" "}
              <code className="text-romantic-gold/90">src/data/memories.js</code>
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6 sm:space-y-10">
            {collectionPhotoGroups.map(({ collection, photos }) => (
              <MemoryCollection
                key={collection.id}
                collection={collection}
                photos={photos}
                onPhotoSelect={openPhoto}
              />
            ))}
          </div>
        )}

        <motion.footer
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="mt-16 text-center sm:mt-20 md:mt-24"
        >
          <div className="mx-auto mb-6 h-px max-w-sm bg-gradient-to-r from-transparent via-romantic-gold/45 to-transparent sm:mb-8" />
          <p className="mx-auto max-w-2xl px-2 font-display text-[clamp(1.125rem,2.5vw,1.625rem)] leading-relaxed text-romantic-cream/85">
            {memoriesConfig.closingMessage}
          </p>
          <motion.div
            className="mt-5 flex justify-center gap-2 text-romantic-rose/55"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <Heart size={16} fill="currentColor" />
            <Heart size={12} fill="currentColor" className="mt-1 opacity-70" />
            <Heart size={16} fill="currentColor" />
          </motion.div>
        </motion.footer>
      </div>

      <MemoryLightbox
        photos={activePhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onGoTo={setLightboxIndex}
      />
    </section>
  );
}