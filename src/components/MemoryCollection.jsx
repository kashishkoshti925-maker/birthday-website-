import { motion } from "framer-motion";
import { ImageIcon, Sparkles } from "lucide-react";
import ScrapbookCollage from "./ScrapbookCollage";

const FOLDER_HINTS = {
  "favorite-moments": "public/images/memories/favorite-moments/",
  navratri: "public/images/memories/navratri/",
  adventures: "public/images/memories/adventures/",
  "random-moments": "public/images/memories/random-moments/",
};

export default function MemoryCollection({ collection, photos, onPhotoSelect }) {
  const { id, title, description, featured } = collection;
  const isEmpty = photos.length === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={
        featured
          ? "relative rounded-2xl border border-romantic-gold/25 bg-gradient-to-b from-pink-100/[0.07] to-transparent px-0 py-6 sm:px-3 sm:py-8 md:px-4 md:py-10"
          : "relative border-t border-pink-200/10 px-0 pt-8 sm:px-2 sm:pt-12"
      }
      aria-labelledby={`collection-heading-${id}`}
    >
      {featured && (
        <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-1 font-display text-[0.65rem] uppercase tracking-[0.22em] text-romantic-gold/90 sm:right-6">
          <Sparkles size={14} aria-hidden />
          Highlighted
        </span>
      )}

      <header className="mb-8 text-center sm:mb-10">
        <h3
          id={`collection-heading-${id}`}
          className="font-display text-[clamp(1.65rem,4vw,2.35rem)] font-medium text-pink-50"
        >
          {title}
        </h3>
        <p className="mx-auto mt-2 max-w-lg font-display text-base italic text-romantic-cream/70 sm:text-lg">
          {description}
        </p>
      </header>

      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md rounded-xl border border-dashed border-pink-200/15 bg-pink-100/[0.04] px-6 py-10 text-center"
        >
          <ImageIcon className="mx-auto mb-3 text-romantic-rose/50" size={32} strokeWidth={1.25} aria-hidden />
          <p className="font-display text-base text-pink-100/75">
            No photos here yet — add your pictures to
          </p>
          <p className="mt-2 font-display text-sm text-romantic-gold/90">
            <code className="text-romantic-gold">{FOLDER_HINTS[id] ?? "public/images/memories/"}</code>
          </p>
          <p className="mt-3 font-display text-sm text-pink-200/50">
            Then register them in <code className="text-romantic-gold/80">src/data/memories.js</code>
          </p>
        </motion.div>
      ) : (
        <ScrapbookCollage categoryId={id} photos={photos} onPhotoSelect={onPhotoSelect} />
      )}
    </motion.article>
  );
}