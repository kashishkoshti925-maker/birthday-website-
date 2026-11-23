import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, Heart, Star } from "lucide-react";
import { getCollageSlot } from "../data/collageSlots";

const STICKER_ICONS = {
  star: Star,
  heart: Heart,
  camera: Camera,
};

function WashiTape({ position }) {
  if (!position) return null;
  const base = "pointer-events-none absolute z-20 h-5 w-14 opacity-85 shadow-sm";
  const styles = {
    "top-left":
      "collage-tape top-0 left-3 -translate-y-1/2 -rotate-[8deg]",
    "top-right":
      "collage-tape collage-tape-alt top-1 right-2 -translate-y-1/2 rotate-[6deg]",
    bottom:
      "collage-tape collage-tape-alt bottom-0 left-1/2 w-16 -translate-x-1/2 translate-y-1/2 rotate-[-2deg]",
  };
  return <span className={`${base} ${styles[position] ?? ""}`} aria-hidden />;
}

function useIsMobileCollage() {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export default function CollagePhoto({ photo, categoryId, index = 0, onSelect, isSoloLastMobile = false }) {
  const [imgError, setImgError] = useState(false);
  const reduceMotion = useReducedMotion();
  const isMobileCollage = useIsMobileCollage();
  const layout = getCollageSlot(categoryId, index);

  const imageAlt =
    photo.alt?.trim() ||
    (photo.caption?.trim() ? photo.caption : "Memory photograph");

  const rotationDesktop = (photo.rotation ?? 0) + (layout.extraRotate ?? 0);
  const rotation = isMobileCollage
    ? (index % 2 === 0 ? -1.25 : 1.25)
    : rotationDesktop;
  const Sticker = layout.sticker ? STICKER_ICONS[layout.sticker] : null;
  const interactive = typeof onSelect === "function" && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: rotation * 0.35 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`collage-piece relative w-full max-md:max-w-none justify-self-stretch md:mx-auto md:w-auto md:justify-self-center ${layout.sizeClass} ${layout.mdClass} max-md:static max-md:!translate-x-0 max-md:!translate-y-0 ${
        isSoloLastMobile ? "max-md:col-span-2 max-md:mx-auto max-md:max-w-[13.5rem]" : ""
      }`}
      style={{ zIndex: layout.zIndex }}
    >
      {Sticker && (
        <Sticker
          className="pointer-events-none absolute -right-1 -top-3 z-30 text-romantic-gold/75 drop-shadow md:-right-2"
          size={18}
          fill={layout.sticker === "heart" ? "currentColor" : "none"}
          aria-hidden
        />
      )}
      {interactive ? (
        <motion.button
          type="button"
          onClick={() => onSelect(photo.id)}
          whileHover={reduceMotion ? undefined : { scale: 1.03, y: -4 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="collage-polaroid group block w-full border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-romantic-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e8dcc8]"
          aria-label={`View larger: ${imageAlt}`}
        >
          <CollageFrame
            photo={photo}
            layout={layout}
            imgError={imgError}
            onImgError={() => setImgError(true)}
          />
        </motion.button>
      ) : (
        <div className="collage-polaroid w-full">
          <CollageFrame
            photo={photo}
            layout={layout}
            imgError={imgError}
            onImgError={() => setImgError(true)}
          />
        </div>
      )}
    </motion.div>
  );
}

function CollageFrame({ photo, layout, imgError, onImgError }) {
  const showCaption = Boolean(photo.caption?.trim());
  const showDate = Boolean(photo.date?.trim());

  return (
    <div className="collage-polaroid-inner relative w-full pb-7 pt-2.5 px-2.5 sm:pb-8 sm:pt-3 sm:px-3">
      <WashiTape position={layout.tape} />
      <div
        className={`collage-well relative w-full overflow-hidden bg-[#2a1524] ${layout.aspectClass}`}
      >
        {!imgError ? (
          <img
            src={photo.image}
            alt={photo.alt?.trim() || "Memory photograph"}
            loading="lazy"
            decoding="async"
            onError={onImgError}
            className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[#2a1524] px-2 text-center">
            <Camera className="text-romantic-pink/45" size={24} strokeWidth={1.25} aria-hidden />
            <p className="font-display text-[0.65rem] text-pink-100/55">Unavailable</p>
          </div>
        )}
      </div>
      <div className="mt-2 min-h-[1.25rem] text-center">
        {showCaption ? (
          <p className="font-handwritten text-base leading-snug text-[#5a3544] sm:text-lg">
            {photo.caption}
          </p>
        ) : (
          <div className="mx-auto mt-1 h-px w-6 bg-[#9F234B]/12" aria-hidden />
        )}
        {showDate && (
          <p className="mt-0.5 font-display text-[0.6rem] uppercase tracking-[0.16em] text-[#9F234B]/60">
            {photo.date}
          </p>
        )}
      </div>
    </div>
  );
}