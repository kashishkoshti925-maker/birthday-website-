/**
 * Deterministic scrapbook positions per category (index cycles through slots).
 * Desktop/tablet: absolute collage. Mobile: grid overrides in CollagePhoto.
 */

const slot = (overrides) => ({
  zIndex: 5,
  tape: null,
  sticker: null,
  ...overrides,
});

/** @type {Record<string, ReturnType<typeof slot>[]>} */
export const COLLAGE_SLOTS = {
  "favorite-moments": [
    slot({
      sizeClass: "w-[46%] max-w-[12.5rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:left-[4%] md:top-2",
      zIndex: 22,
      tape: "top-left",
      extraRotate: -4,
    }),
    slot({
      sizeClass: "w-[40%] max-w-[11rem]",
      aspectClass: "aspect-square",
      mdClass: "md:absolute md:right-[6%] md:top-0",
      zIndex: 18,
      tape: "top-right",
      extraRotate: 3,
    }),
    slot({
      sizeClass: "w-[52%] max-w-[14rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:left-[28%] md:top-[38%]",
      zIndex: 24,
      tape: "bottom",
      extraRotate: -1.5,
    }),
    slot({
      sizeClass: "w-[36%] max-w-[9.5rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:right-[4%] md:top-[42%]",
      zIndex: 16,
      tape: "top-left",
      extraRotate: 5,
    }),
    slot({
      sizeClass: "w-[42%] max-w-[11rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:left-[2%] md:bottom-4",
      zIndex: 14,
      extraRotate: -2,
    }),
    slot({
      sizeClass: "w-[38%] max-w-[10rem]",
      aspectClass: "aspect-square",
      mdClass: "md:absolute md:left-[38%] md:bottom-0",
      zIndex: 20,
      tape: "top-right",
      extraRotate: 2.5,
    }),
    slot({
      sizeClass: "w-[44%] max-w-[11.5rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:right-[18%] md:bottom-6",
      zIndex: 12,
      tape: "top-left",
      extraRotate: -3,
    }),
  ],
  navratri: [
    slot({
      sizeClass: "w-[48%] max-w-[13rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:left-[3%] md:top-4",
      zIndex: 20,
      tape: "top-right",
      extraRotate: -3,
      sticker: "star",
    }),
    slot({
      sizeClass: "w-[38%] max-w-[10rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:right-[5%] md:top-0",
      zIndex: 18,
      tape: "top-left",
      extraRotate: 4,
    }),
    slot({
      sizeClass: "w-[42%] max-w-[11rem]",
      aspectClass: "aspect-square",
      mdClass: "md:absolute md:left-[32%] md:top-[35%]",
      zIndex: 22,
      extraRotate: -2,
    }),
    slot({
      sizeClass: "w-[40%] max-w-[10.5rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:right-[2%] md:top-[40%]",
      zIndex: 16,
      tape: "bottom",
      extraRotate: 3,
    }),
    slot({
      sizeClass: "w-[50%] max-w-[13.5rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:left-[8%] md:bottom-2",
      zIndex: 14,
      tape: "top-right",
      extraRotate: -1,
    }),
    slot({
      sizeClass: "w-[36%] max-w-[9.5rem]",
      aspectClass: "aspect-square",
      mdClass: "md:absolute md:right-[22%] md:bottom-4",
      zIndex: 21,
      extraRotate: 2,
    }),
  ],
  adventures: [
    slot({
      sizeClass: "w-[44%] max-w-[12rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:right-[4%] md:top-2",
      zIndex: 21,
      tape: "top-left",
      extraRotate: 3,
      sticker: "camera",
    }),
    slot({
      sizeClass: "w-[40%] max-w-[10.5rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:left-[5%] md:top-6",
      zIndex: 19,
      extraRotate: -4,
    }),
    slot({
      sizeClass: "w-[46%] max-w-[12.5rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:left-[30%] md:top-[36%]",
      zIndex: 23,
      tape: "top-right",
      extraRotate: 1,
    }),
    slot({
      sizeClass: "w-[34%] max-w-[9rem]",
      aspectClass: "aspect-square",
      mdClass: "md:absolute md:left-[2%] md:bottom-6",
      zIndex: 15,
      extraRotate: -2,
    }),
    slot({
      sizeClass: "w-[42%] max-w-[11rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:right-[8%] md:top-[44%]",
      zIndex: 17,
      tape: "top-left",
      extraRotate: 5,
    }),
    slot({
      sizeClass: "w-[48%] max-w-[13rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:left-[20%] md:bottom-0",
      zIndex: 20,
      tape: "bottom",
      extraRotate: -3,
    }),
  ],
  "random-moments": [
    slot({
      sizeClass: "w-[48%] max-w-[12.5rem]",
      aspectClass: "aspect-square",
      mdClass: "md:absolute md:left-[8%] md:top-4",
      zIndex: 20,
      tape: "top-right",
      extraRotate: -5,
      sticker: "heart",
    }),
    slot({
      sizeClass: "w-[44%] max-w-[11.5rem]",
      aspectClass: "aspect-[3/4]",
      mdClass: "md:absolute md:right-[6%] md:top-8",
      zIndex: 18,
      tape: "top-left",
      extraRotate: 4,
    }),
    slot({
      sizeClass: "w-[52%] max-w-[14rem]",
      aspectClass: "aspect-[4/3]",
      mdClass: "md:absolute md:left-[28%] md:bottom-6",
      zIndex: 22,
      extraRotate: -2,
    }),
  ],
};

export const COLLAGE_BOARD_MIN_HEIGHT = {
  "favorite-moments": "max-md:min-h-0 md:min-h-[26rem] lg:min-h-[34rem]",
  navratri: "max-md:min-h-0 md:min-h-[24rem] lg:min-h-[32rem]",
  adventures: "max-md:min-h-0 md:min-h-[24rem] lg:min-h-[32rem]",
  "random-moments": "max-md:min-h-0 md:min-h-[18rem] lg:min-h-[26rem]",
};

export function getCollageSlot(categoryId, index) {
  const slots = COLLAGE_SLOTS[categoryId] ?? COLLAGE_SLOTS["favorite-moments"];
  return slots[index % slots.length];
}