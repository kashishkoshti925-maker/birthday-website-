import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const FALLBACK_GRADIENT =
  "linear-gradient(145deg, #3a1a2e 0%, #7a2848 45%, #24121F 100%)";

export default function PolaroidCard({
  image,
  caption = "",
  date = "",
  alt = "",
  rotation = 0,
  index = 0,
  onSelect,
}) {
  const [imgError, setImgError] = useState(false);
  const showCaption = Boolean(caption?.trim());
  const showDate = Boolean(date?.trim());
  const imageAlt = alt?.trim() || (showCaption ? caption : "Gallery photograph");
  const isInteractive = typeof onSelect === "function" && !imgError;

  const handleActivate = () => {
    if (isInteractive) onSelect();
  };

  const handleKeyDown = (e) => {
    if (!isInteractive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  const cardBody = (
    <>
      <div className="rounded-[2px] bg-gradient-to-b from-[#FFFBF7] via-[#FFF5ED] to-[#F8E8DE] p-2 pb-5 shadow-[0_8px_28px_rgba(0,0,0,0.32),0_1px_4px_rgba(159,35,75,0.12)] transition-shadow duration-300 group-hover:shadow-[0_14px_36px_rgba(0,0,0,0.38),0_2px_10px_rgba(232,139,170,0.22)] sm:p-2.5 sm:pb-6">
        <div className="polaroid-well bg-[#2a1524]">
          {!imgError ? (
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="transition duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-3 text-center"
              style={{ background: FALLBACK_GRADIENT }}
            >
              <Camera className="text-romantic-pink/45" size={28} strokeWidth={1.25} />
              <p className="font-display text-[0.7rem] leading-tight text-pink-100/55">
                Add photo in{" "}
                <span className="text-romantic-gold/75">public/images/memories</span>
              </p>
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#24121f]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          {isInteractive && (
            <span className="pointer-events-none absolute bottom-1.5 right-1.5 rounded bg-[#24121f]/55 px-1.5 py-0.5 font-display text-[0.6rem] uppercase tracking-wider text-pink-100/80 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              View
            </span>
          )}
        </div>

        <div className="mt-2.5 min-h-[2.25rem] px-0.5 text-center sm:mt-3 sm:min-h-[2.5rem]">
          {showCaption ? (
            <p className="font-display text-[0.95rem] leading-snug text-[#5a3544] sm:text-base">
              {caption}
            </p>
          ) : (
            <div className="mx-auto mt-1 h-px w-8 bg-[#9F234B]/15" aria-hidden />
          )}
          {showDate && (
            <p className="mt-0.5 font-display text-[0.65rem] uppercase tracking-[0.18em] text-[#9F234B]/65 sm:text-[0.7rem]">
              {date}
            </p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, rotate: rotation * 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        isInteractive
          ? {
              y: -8,
              rotate: rotation + (rotation >= 0 ? 1.25 : -1.25),
              transition: { duration: 0.3 },
            }
          : undefined
      }
      className={`group w-[min(100%,10.75rem)] xs:w-[min(100%,11.5rem)] sm:w-[min(100%,13rem)] md:w-[min(100%,14rem)] lg:w-[min(100%,15rem)] ${
        isInteractive ? "cursor-pointer" : ""
      }`}
    >
      {isInteractive ? (
        <button
          type="button"
          onClick={handleActivate}
          onKeyDown={handleKeyDown}
          className="w-full border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-romantic-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a1524] rounded-sm"
          aria-label={`View larger: ${imageAlt}`}
        >
          {cardBody}
        </button>
      ) : (
        cardBody
      )}
    </motion.article>
  );
}