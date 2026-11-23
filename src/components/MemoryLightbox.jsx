import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function MemoryLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onGoTo,
}) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef(null);

  const photo = photos[currentIndex] ?? null;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onGoTo(currentIndex - 1);
  }, [currentIndex, hasPrev, onGoTo]);

  const goNext = useCallback(() => {
    if (hasNext) onGoTo(currentIndex + 1);
  }, [currentIndex, hasNext, onGoTo]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (!photos.length) return null;

  const alt =
    photo?.alt?.trim() ||
    (photo?.caption?.trim() ? photo.caption : "Enlarged memory photograph");

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#120a14]/85 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close photo viewer"
          />

          <motion.div
            key={photo.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-full max-w-3xl flex-col items-center"
          >
            <div className="relative w-full overflow-hidden rounded-lg border border-romantic-gold/25 bg-[#2a1524] shadow-2xl">
              <img
                src={photo.image}
                alt={alt}
                className="max-h-[min(70vh,42rem)] w-full object-contain"
                decoding="async"
              />
            </div>

            {(photo.caption?.trim() || photo.date?.trim()) && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 max-w-xl px-2 text-center"
              >
                {photo.caption?.trim() && (
                  <p className="font-display text-lg text-pink-50 sm:text-xl">{photo.caption}</p>
                )}
                {photo.date?.trim() && (
                  <p className="mt-1 font-display text-xs uppercase tracking-[0.2em] text-romantic-gold/90">
                    {photo.date}
                  </p>
                )}
              </motion.div>
            )}

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute -right-1 -top-10 flex h-10 w-10 items-center justify-center rounded-full border border-pink-200/20 bg-romantic-dark/90 text-pink-100 shadow-lg transition hover:border-romantic-gold/40 sm:-right-2 sm:-top-12"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </motion.div>

          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200/25 bg-romantic-dark/80 text-pink-50 shadow-lg transition hover:border-romantic-gold/40 sm:left-4 sm:h-12 sm:w-12"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200/25 bg-romantic-dark/80 text-pink-50 shadow-lg transition hover:border-romantic-gold/40 sm:right-4 sm:h-12 sm:w-12"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <p className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-xs text-pink-200/50">
            {currentIndex + 1} / {photos.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}