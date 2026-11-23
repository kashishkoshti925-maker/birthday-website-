/**
 * Final Surprise — closing birthday message
 */

import { photoFromMemory } from "./storyPhotos";

const finaleImg = photoFromMemory("favorite-05", "hero", {
  alt: "Our favourite photograph together",
});

export const finalSurpriseConfig = {
  sectionLabel: "One last surprise",
  heading: "A Little Something Just For You",
  supportingText: "Because someone as special as you deserves one more surprise.",
  openButtonLabel: "Open Your Final Surprise 🎁",
  messageHeading: "You Are a Gift in My Life ❤️",
  messageBody:
    "If I could give you one thing in life, it would be the ability to see yourself through my eyes. Maybe then you would understand how special you truly are to me.",
  messageBodyParagraphs: [
    "If I could give you one thing in life, it would be the ability to see yourself through my eyes. Maybe then you would understand how special you truly are to me.",
    "You are my favourite person, my happiness, and the one who can always make me smile. I'm so lucky that our paths crossed, and even luckier that I get to call you mine.",
    "Never change the beautiful person you are. I love you more than words can explain.",
  ],
  messageClosing: "Never forget how special you are. Happy Birthday, J...! ❤️",
  signature: "With Love",
  finaleWish:
    "May every new beginning bring you happiness, love, and endless reasons to smile.",
  birthdayLine: "Happy Birthday, Jayu! ❤️",
  birthdayDate: "06 December 2026",
  finalPhoto: finaleImg
    ? { src: finaleImg.src, alt: finaleImg.alt, caption: finaleImg.caption ?? "" }
    : null,
};