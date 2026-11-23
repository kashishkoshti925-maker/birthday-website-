import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon, Heart } from "lucide-react";
import { ChapterAmbientDecor } from "./RomanticDecor";
import { renderStoryParagraph } from "../utils/highlightPhrases";

function toParagraphs(description) {
  if (Array.isArray(description)) return description.filter(Boolean);
  if (description?.trim()) return [description];
  return [];
}

const LAYOUT_CLASS = {
  hero: "w-full max-w-[14rem] sm:max-w-[18rem] md:max-w-[20rem]",
  small: "w-full max-w-[9rem] sm:max-w-[10rem]",
  polaroid: "w-full max-w-[11rem] sm:max-w-[13rem]",
  "editorial-l": "w-full max-w-[15rem] sm:max-w-[17rem]",
  "editorial-m": "w-full max-w-[12rem] sm:max-w-[14rem]",
  "editorial-s": "w-full max-w-[9.5rem] sm:max-w-[11rem]",
  birthday:
    "w-full max-w-[16rem] sm:max-w-[18rem] ring-2 ring-romantic-gold/40 ring-offset-2 ring-offset-[#1a0f18]",
};

function StoryImage({
  src,
  alt,
  caption,
  layout = "polaroid",
  rotation = 0,
  showHearts,
  className = "",
}) {
  const [error, setError] = useState(false);
  const showCaption = Boolean(caption?.trim());
  const sizeClass = LAYOUT_CLASS[layout] ?? LAYOUT_CLASS.polaroid;
  const isBirthday = layout === "birthday";

  return (
    <motion.figure
      style={{ rotate: rotation }}
      className={`scrapbook-polaroid relative ${sizeClass} ${className} ${
        isBirthday ? "birthday-photo-frame rounded-md" : ""
      }`}
    >
      {showHearts && (
        <Heart
          className="absolute -right-1 -top-2 z-10 text-romantic-rose/80"
          size={14}
          fill="currentColor"
          aria-hidden
        />
      )}
      <div
        className={`story-image-well rounded-md border bg-[#2a1524] shadow-[0_6px_20px_rgba(0,0,0,0.28)] ${
          isBirthday ? "border-romantic-gold/35" : "border-[#fff3]/10"
        }`}
      >
        {!error && src ? (
          <img
            src={src}
            alt={alt || "Story photograph"}
            loading="lazy"
            decoding="async"
            onError={() => setError(true)}
            className="transition duration-500 ease-out group-hover/story:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#3a1a2e] via-[#7a2848] to-[#24121F] px-3 text-center">
            <ImageIcon className="text-romantic-pink/40" size={24} strokeWidth={1.25} />
            <p className="font-display text-[0.65rem] text-pink-100/50">Photo unavailable</p>
          </div>
        )}
      </div>
      <figcaption className="mt-2 min-h-[1.25rem] text-center">
        {showCaption ? (
          <p className="font-handwritten text-base text-romantic-cream/75">{caption}</p>
        ) : (
          <div className="mx-auto h-px w-6 bg-pink-100/15" aria-hidden />
        )}
      </figcaption>
    </motion.figure>
  );
}

function StoryPhotoGallery({ chapter, images, align }) {
  const isRight = align === "right";
  const isMoments = chapter.id === "chapter-moments";
  const isAdore = chapter.id === "chapter-adore";
  const isCh1 = chapter.id === "chapter-special-person";

  if (!images.length) return null;

  if (isCh1) {
    const [hero, small] = images;
    return (
      <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-start">
        {hero && (
          <StoryImage
            {...hero}
            layout={hero.layout || "hero"}
            rotation={hero.rotation}
            className="max-md:max-w-[min(100%,17rem)]"
          />
        )}
        {small && (
          <StoryImage
            {...small}
            layout={small.layout || "small"}
            rotation={small.rotation}
            className="max-md:max-w-[min(100%,14rem)]"
          />
        )}
      </div>
    );
  }

  if (isMoments) {
    return (
      <div
        className={`my-6 grid grid-cols-2 gap-4 sm:gap-5 ${
          isRight ? "lg:justify-items-end" : ""
        }`}
      >
        {images.map((img, i) => (
          <StoryImage
            key={`${chapter.id}-img-${i}`}
            src={img.src}
            alt={img.alt}
            caption={img.caption}
            layout={img.layout || "polaroid"}
            rotation={img.rotation ?? (i % 2 ? -3 : 3)}
          />
        ))}
      </div>
    );
  }

  if (isAdore) {
    return (
      <div className="my-6 flex flex-wrap items-start justify-center gap-3 sm:gap-4">
        {images.map((img, i) => (
          <StoryImage
            key={`${chapter.id}-img-${i}`}
            src={img.src}
            alt={img.alt}
            caption={img.caption}
            layout={img.layout || "polaroid"}
            rotation={img.rotation ?? 0}
            showHearts
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`mt-5 flex flex-wrap gap-3 ${
        isRight ? "lg:justify-end" : "lg:justify-start"
      } justify-center`}
    >
      {images.map((img, i) => (
        <StoryImage
          key={`${chapter.id}-img-${i}`}
          src={img.src}
          alt={img.alt}
          caption={img.caption}
          layout={img.layout || "polaroid"}
          rotation={img.rotation}
          showHearts={chapter.id === "chapter-birthday"}
        />
      ))}
    </div>
  );
}

export default function StoryChapter({ chapter, index, align = "left", revealed = false }) {
  const reduceMotion = useReducedMotion();
  const paragraphs = toParagraphs(chapter.description);
  const images = chapter.images?.filter((img) => img?.src) ?? [];
  const showDate = Boolean(chapter.date?.trim());
  const personalNote = chapter.personalDescription?.trim();
  const isRight = align === "right";
  const placement = chapter.imagePlacement ?? "bottom";

  const motionProps =
    revealed || reduceMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.75, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
        };

  const chapterEmoji = {
    "chapter-special-person": "🫶🏻",
    "chapter-moments": "🥹",
    "chapter-adore": "🌷",
    "chapter-birthday": "🎂",
  };

  const photoBlock = <StoryPhotoGallery chapter={chapter} images={images} align={align} />;

  return (
    <motion.article
      {...motionProps}
      className={`group/story relative w-full min-w-0 ${isRight ? "lg:text-left" : "lg:text-right"}`}
    >
      <ChapterAmbientDecor chapterId={chapter.id} reduceMotion={reduceMotion} />
      <div
        className={`relative z-10 rounded-2xl border bg-gradient-to-br from-[#2f1828]/90 via-[#261222]/95 to-[#1a0f18]/90 p-5 shadow-[0_10px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-6 md:p-7 ${
          chapter.isFinale
            ? "border-romantic-gold/25 shadow-[0_10px_36px_rgba(214,180,119,0.08)]"
            : "border-pink-100/10"
        } ${revealed ? "max-w-none min-h-0 flex-1" : `${isRight ? "lg:ml-auto" : "lg:mr-auto"} max-w-lg`}`}
      >
        <ChapterHeader
          chapter={chapter}
          chapterEmoji={chapterEmoji}
          showDate={showDate}
          isRight={isRight}
          titleId={revealed ? "chapter-reveal-title" : undefined}
        />

        {placement === "top" && photoBlock}

        <div
          className={`space-y-3 font-display text-[clamp(1rem,2.1vw,1.125rem)] leading-relaxed text-romantic-cream/80 ${
            isRight ? "lg:text-left" : "lg:text-right"
          } text-left`}
        >
          {paragraphs.map((text, i) => (
            <p key={i}>{renderStoryParagraph(chapter.id, text)}</p>
          ))}
        </div>

        {placement === "middle" && photoBlock}

        {personalNote && (
          <p className="mt-4 border-l-2 border-romantic-gold/35 pl-4 text-left font-display text-[clamp(1rem,2.1vw,1.125rem)] leading-relaxed italic text-romantic-cream/90">
            <Heart className="mb-1 inline opacity-60" size={14} fill="currentColor" aria-hidden />{" "}
            {personalNote}
          </p>
        )}

        {chapter.closingLine && (
          <p
            className={`mt-4 border-t pt-4 text-left font-display text-[clamp(1.05rem,2.3vw,1.25rem)] italic leading-relaxed ${
              chapter.isFinale
                ? "border-romantic-gold/25 text-romantic-gold/95"
                : "border-pink-100/10 text-romantic-rose/90"
            }`}
          >
            {chapter.closingLine}
          </p>
        )}

        {(placement === "bottom" || !placement) && photoBlock}
      </div>
    </motion.article>
  );
}

function ChapterHeader({ chapter, chapterEmoji, showDate, isRight, titleId }) {
  return (
    <>
      <div
        className={`mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 justify-start ${
          isRight ? "lg:justify-start" : "lg:justify-end"
        }`}
      >
        <span className="font-display text-sm font-semibold tracking-[0.25em] text-romantic-gold">
          CHAPTER {chapter.chapterNumber}
          <span className="ml-1.5 inline-block opacity-80" aria-hidden>
            {chapterEmoji[chapter.id] ?? "💗"}
          </span>
        </span>
        {showDate && (
          <span className="font-display text-xs uppercase tracking-[0.2em] text-pink-200/60">
            {chapter.date}
          </span>
        )}
      </div>

      <h3
        id={titleId}
        className="mb-1 text-left font-display text-[clamp(1.5rem,3.5vw,2rem)] font-medium text-pink-50"
      >
        {chapter.title}
      </h3>
      <p className="mb-4 text-left font-display text-[clamp(1rem,2.2vw,1.2rem)] italic text-romantic-pink/80">
        {chapter.subtitle}
      </p>
    </>
  );
}