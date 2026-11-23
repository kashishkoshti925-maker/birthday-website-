import { Heart, Sparkles } from "lucide-react";
import CollagePhoto from "./CollagePhoto";
import { COLLAGE_BOARD_MIN_HEIGHT } from "../data/collageSlots";

const BOARD_VARIANTS = {
  "favorite-moments": "collage-board-warm",
  navratri: "collage-board-festive",
  adventures: "collage-board-adventure",
  "random-moments": "collage-board-playful",
};

export default function ScrapbookCollage({ categoryId, photos, onPhotoSelect }) {
  const boardClass = BOARD_VARIANTS[categoryId] ?? "collage-board-warm";
  const minH = COLLAGE_BOARD_MIN_HEIGHT[categoryId] ?? "min-h-[24rem]";

  return (
    <div
      className={`collage-board collage-board-mobile ${boardClass} relative mx-auto w-full max-w-4xl rounded-sm px-2 py-5 sm:px-4 sm:py-7 md:px-6 md:py-10 ${minH} grid grid-cols-2 gap-3 sm:gap-4 md:block md:gap-0`}
    >
      <Sparkles
        className="pointer-events-none absolute right-6 top-5 text-romantic-gold/35"
        size={18}
        strokeWidth={1.5}
        aria-hidden
      />
      <Heart
        className="pointer-events-none absolute bottom-8 left-5 text-romantic-rose/30"
        size={16}
        fill="currentColor"
        aria-hidden
      />

      {photos.map((photo, index) => (
        <CollagePhoto
          key={photo.id}
          photo={photo}
          categoryId={categoryId}
          index={index}
          onSelect={onPhotoSelect}
          isSoloLastMobile={photos.length % 2 === 1 && index === photos.length - 1}
        />
      ))}
    </div>
  );
}