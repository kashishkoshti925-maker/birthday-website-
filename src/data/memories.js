/**
 * Memories gallery — four collections, data-driven.
 *
 * Folder structure:
 *   public/images/memories/favorite-moments/
 *   public/images/memories/navratri/
 *   public/images/memories/adventures/
 *   public/images/memories/random-moments/
 *
 * How to add a photo:
 * 1. Copy the image into the matching folder above.
 * 2. Add an object to `memoryPhotos` with a unique `id`.
 * 3. Set `image` to the public path (encode spaces/special chars in the filename).
 * 4. Set `category` to one of: favorite-moments | navratri | adventures | random-moments
 * 5. Fill `caption`, `date`, and `alt` as you like (caption/date may be "").
 * 6. Set `rotation` between about -6 and 6 for a scrapbook feel.
 * 7. Keep `active: true`. Use `active: false` to hide an entry until the file exists.
 */

export const CATEGORY_IDS = {
  FAVORITE: "favorite-moments",
  NAVRATRI: "navratri",
  ADVENTURES: "adventures",
  RANDOM: "random-moments",
};

export const memoriesConfig = {
  heading: "Our Favourite Moments",
  subtitle:
    "A little collection of memories, laughter and moments worth celebrating — with you, Jayu.",
  closingMessage:
    "Every frame is a heartbeat frozen in time — and my favourite story is still being written with you, J...",
};

/** Section labels shown in the gallery (order = display order). */
export const memoryCollections = [
  {
    id: CATEGORY_IDS.FAVORITE,
    title: "Our Favorite Moments",
    description: "Best couple photographs, selfies and the pictures we treasure most.",
    featured: true,
  },
  {
    id: CATEGORY_IDS.NAVRATRI,
    title: "Navratri Memories",
    description: "Garba nights, traditional outfits and festive celebrations.",
    featured: false,
  },
  {
    id: CATEGORY_IDS.ADVENTURES,
    title: "Little Adventures",
    description: "Outdoors, travel, nature, temple visits and little outings.",
    featured: false,
  },
  {
    id: CATEGORY_IDS.RANDOM,
    title: "Random But Special",
    description: "Funny selfies, candid moments and unexpected favourites.",
    featured: false,
  },
];

/**
 * @typedef {Object} MemoryPhoto
 * @property {string} id
 * @property {string} image - Path under public/, e.g. `/images/memories/favorite-moments/photo.jpg`
 * @property {string} caption
 * @property {string} date
 * @property {keyof typeof CATEGORY_IDS | string} category
 * @property {number} rotation
 * @property {string} alt
 * @property {boolean} [active] - false hides until the file exists
 */

/** Build a public URL for a file inside `public/images/memories/{category}/`. */
export function memoryImagePath(category, fileName) {
  return `/images/memories/${category}/${encodeURIComponent(fileName)}`;
}

/** @type {MemoryPhoto[]} — synced with files in public/images/memories/ */
export const memoryPhotos = [
  // —— Our Favorite Moments (7) ——
  {
    id: "favorite-01",
    image: memoryImagePath(CATEGORY_IDS.FAVORITE, "WhatsApp Image 2026-11-21 at 3.33.23 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.FAVORITE,
    rotation: -4,
    alt: "Photograph in Our Favorite Moments collection",
    active: true,
  },
  {
    id: "favorite-02",
    image: memoryImagePath(CATEGORY_IDS.FAVORITE, "WhatsApp Image 2026-11-21 at 3.33.23 PM (2).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.FAVORITE,
    rotation: 3,
    alt: "Photograph in Our Favorite Moments collection",
    active: true,
  },
  {
    id: "favorite-03",
    image: memoryImagePath(CATEGORY_IDS.FAVORITE, "WhatsApp Image 2026-11-21 at 3.33.23 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.FAVORITE,
    rotation: -2,
    alt: "Photograph in Our Favorite Moments collection",
    active: true,
  },
  {
    id: "favorite-04",
    image: memoryImagePath(CATEGORY_IDS.FAVORITE, "WhatsApp Image 2026-11-21 at 3.35.35 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.FAVORITE,
    rotation: 5,
    alt: "Photograph in Our Favorite Moments collection",
    active: true,
  },
  {
    id: "favorite-05",
    image: memoryImagePath(CATEGORY_IDS.FAVORITE, "WhatsApp Image 2026-11-21 at 3.35.35 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.FAVORITE,
    rotation: -3,
    alt: "Photograph in Our Favorite Moments collection",
    active: true,
  },
  {
    id: "favorite-06",
    image: memoryImagePath(CATEGORY_IDS.FAVORITE, "WhatsApp Image 2026-11-21 at 3.35.36 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.FAVORITE,
    rotation: 2,
    alt: "Photograph in Our Favorite Moments collection",
    active: true,
  },
  {
    id: "favorite-07",
    image: memoryImagePath(CATEGORY_IDS.FAVORITE, "WhatsApp Image 2026-11-21 at 3.36.24 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.FAVORITE,
    rotation: -1,
    alt: "Photograph in Our Favorite Moments collection",
    active: true,
  },

  // —— Navratri Memories (6) ——
  {
    id: "navratri-01",
    image: memoryImagePath(CATEGORY_IDS.NAVRATRI, "WhatsApp Image 2026-11-21 at 3.35.35 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.NAVRATRI,
    rotation: 4,
    alt: "Navratri memories photograph",
    active: true,
  },
  {
    id: "navratri-02",
    image: memoryImagePath(CATEGORY_IDS.NAVRATRI, "WhatsApp Image 2026-11-21 at 3.35.36 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.NAVRATRI,
    rotation: -4,
    alt: "Navratri memories photograph",
    active: true,
  },
  {
    id: "navratri-03",
    image: memoryImagePath(CATEGORY_IDS.NAVRATRI, "WhatsApp Image 2026-11-21 at 3.35.36 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.NAVRATRI,
    rotation: 3,
    alt: "Navratri memories photograph",
    active: true,
  },
  {
    id: "navratri-04",
    image: memoryImagePath(CATEGORY_IDS.NAVRATRI, "WhatsApp Image 2026-11-21 at 3.36.21 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.NAVRATRI,
    rotation: -2,
    alt: "Navratri memories photograph",
    active: true,
  },
  {
    id: "navratri-05",
    image: memoryImagePath(CATEGORY_IDS.NAVRATRI, "WhatsApp Image 2026-11-21 at 3.36.21 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.NAVRATRI,
    rotation: 5,
    alt: "Navratri memories photograph",
    active: true,
  },
  {
    id: "navratri-06",
    image: memoryImagePath(CATEGORY_IDS.NAVRATRI, "WhatsApp Image 2026-11-21 at 3.36.23 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.NAVRATRI,
    rotation: -3,
    alt: "Navratri memories photograph",
    active: true,
  },

  // —— Little Adventures (6) ——
  {
    id: "adventure-01",
    image: memoryImagePath(CATEGORY_IDS.ADVENTURES, "WhatsApp Image 2026-11-21 at 3.33.20 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.ADVENTURES,
    rotation: 2,
    alt: "Little adventures outing photograph",
    active: true,
  },
  {
    id: "adventure-02",
    image: memoryImagePath(CATEGORY_IDS.ADVENTURES, "WhatsApp Image 2026-11-21 at 3.33.20 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.ADVENTURES,
    rotation: -1,
    alt: "Little adventures outing photograph",
    active: true,
  },
  {
    id: "adventure-03",
    image: memoryImagePath(CATEGORY_IDS.ADVENTURES, "WhatsApp Image 2026-11-21 at 3.33.22 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.ADVENTURES,
    rotation: 4,
    alt: "Little adventures outing photograph",
    active: true,
  },
  {
    id: "adventure-04",
    image: memoryImagePath(CATEGORY_IDS.ADVENTURES, "WhatsApp Image 2026-11-21 at 3.33.22 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.ADVENTURES,
    rotation: -4,
    alt: "Little adventures outing photograph",
    active: true,
  },
  {
    id: "adventure-05",
    image: memoryImagePath(CATEGORY_IDS.ADVENTURES, "WhatsApp Image 2026-11-21 at 3.36.24 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.ADVENTURES,
    rotation: 3,
    alt: "Little adventures outing photograph",
    active: true,
  },
  {
    id: "adventure-06",
    image: memoryImagePath(CATEGORY_IDS.ADVENTURES, "WhatsApp Image 2026-11-21 at 3.36.24 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.ADVENTURES,
    rotation: -2,
    alt: "Little adventures outing photograph",
    active: true,
  },

  // —— Random But Special (3) ——
  {
    id: "random-01",
    image: memoryImagePath(CATEGORY_IDS.RANDOM, "WhatsApp Image 2026-11-21 at 3.33.20 PM (2).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.RANDOM,
    rotation: 5,
    alt: "Random but special candid photograph",
    active: true,
  },
  {
    id: "random-02",
    image: memoryImagePath(CATEGORY_IDS.RANDOM, "WhatsApp Image 2026-11-21 at 3.33.20 PM.jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.RANDOM,
    rotation: -3,
    alt: "Random but special candid photograph",
    active: true,
  },
  {
    id: "random-03",
    image: memoryImagePath(CATEGORY_IDS.RANDOM, "WhatsApp Image 2026-11-21 at 3.35.35 PM (1).jpeg"),
    caption: "",
    date: "",
    category: CATEGORY_IDS.RANDOM,
    rotation: 2,
    alt: "Random but special candid photograph",
    active: true,
  },
];

/** @deprecated Use memoryPhotos — kept for any older imports */
export const memories = memoryPhotos;

/** Photos that should appear in the collage gallery and lightbox. */
export function getActivePhotos(photos = memoryPhotos) {
  return photos.filter((p) => p.active !== false);
}

export function getPhotosByCategory(category, photos = memoryPhotos) {
  return getActivePhotos(photos).filter((p) => p.category === category);
}

export function getPhotoById(id, photos = memoryPhotos) {
  return getActivePhotos(photos).find((p) => p.id === id) ?? null;
}