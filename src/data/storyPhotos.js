/**
 * Chapter & finale photos — uses your real files under public/images/memories/.
 * To swap a chapter photo: change the `memoryId` or set a custom `src` in ourStoryData.js.
 */

import { memoryPhotos } from "./memories";

export function photoFromMemory(memoryId, layout, extras = {}) {
  const found = memoryPhotos.find((p) => p.id === memoryId);
  if (!found) return null;
  return {
    src: found.image,
    alt: found.alt,
    caption: found.caption ?? "",
    layout,
    rotation: found.rotation ?? 0,
    ...extras,
  };
}