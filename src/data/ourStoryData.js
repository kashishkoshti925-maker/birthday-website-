/**
 * Our Story — interactive chapters + photos (real paths from memories folders).
 */

import { photoFromMemory } from "./storyPhotos";

export const ourStoryConfig = {
  sectionLabel: "For J...",
  heading: "Our Story",
  subtitle:
    "A little tribute — for Jayu, the person who makes ordinary days feel a little more beautiful.",
  footerLine:
    "Thank you for being such a beautiful part of my life, J.... I'll always be cheering for you.",
};

export const storyChapters = [
  {
    id: "chapter-special-person",
    chapterNumber: "01",
    title: "The Person Who Became Special",
    subtitle: "Some people make life a little more beautiful just by being in it.",
    date: "",
    imagePlacement: "top",
    description: [
      "Who knew that the boy I didn't even like in school would become my favourite person? You had loved me since 6th standard, while I barely wanted to talk to you. But towards the end of 9th, one little message from me changed everything. And today, I can't imagine my life without you.",
    ],
    personalDescription:
      "Your presence makes me feel comfortable and happy. You are kind, caring, funny, loving, and sometimes a little short-tempered. You are the only person who can make me laugh even on my worst days. ❤️",
    images: [
      photoFromMemory("favorite-03", "hero", {
        alt: "Portrait of Jayesh",
        caption: "",
      }),
      photoFromMemory("favorite-06", "small", {
        alt: "A moment with J...",
        rotation: 4,
      }),
    ].filter(Boolean),
  },
  {
    id: "chapter-moments",
    chapterNumber: "02",
    title: "Moments I Will Always Keep",
    subtitle: "Some moments deserve to stay forever.",
    date: "",
    imagePlacement: "middle",
    description: [
      "From being schoolmates since childhood to becoming each other's favourite person, our journey has been beautiful. I love our silly conversations, endless laughs, little fights, and all the moments we share.",
      "My favourite thing is that even the simplest moments become special when I'm with you. And I hope we create thousands of beautiful memories together. ❤️",
    ],
    images: [
      photoFromMemory("favorite-01", "polaroid", {
        alt: "Our memory together",
        caption: "us, always",
      }),
      photoFromMemory("favorite-02", "polaroid", {
        alt: "Another favourite moment",
        rotation: -3,
        caption: "this one",
      }),
      photoFromMemory("navratri-03", "polaroid", {
        alt: "Celebration memory",
        rotation: 2,
        caption: "celebrate",
      }),
      photoFromMemory("adventure-04", "polaroid", {
        alt: "Little adventure",
        rotation: -4,
        caption: "together",
      }),
    ].filter(Boolean),
  },
  {
    id: "chapter-adore",
    chapterNumber: "03",
    title: "Things I Adore About You",
    subtitle: "It's the little things that make you, YOU.",
    date: "",
    imagePlacement: "middle",
    description: [
      "I love your smile, your funny nature, your caring heart, and the way you make everything feel better. I adore how friendly you are and how nicely you treat everyone.",
      "Most of all, I love the way you love me, understand me, and forgive my mistakes. You don't have to be perfect to be my favourite person. Just being YOU is enough. ❤️",
    ],
    images: [
      photoFromMemory("random-01", "editorial-l", { alt: "Candid photograph of Jayesh" }),
      photoFromMemory("adventure-02", "editorial-m", { alt: "Jayesh outdoors", rotation: 3 }),
      photoFromMemory("random-02", "editorial-s", { alt: "Candid close-up", rotation: -2 }),
    ].filter(Boolean),
  },
  {
    id: "chapter-birthday",
    chapterNumber: "04",
    title: "You Deserve All The Happiness",
    subtitle: "Today is all about celebrating YOU.",
    date: "06 December",
    imagePlacement: "top",
    description: [
      "Happy Birthday to my favourite person! I wish you endless happiness, good health, peace, and success. May all your dreams come true, and may you always have reasons to smile.",
      "Never stop believing in yourself. I'll always be cheering for you and supporting you. Thank you for being such a beautiful part of my life.",
    ],
    images: [
      photoFromMemory("favorite-07", "birthday", {
        alt: "My favourite photograph of Jayesh on his birthday",
      }),
    ].filter(Boolean),
    closingLine:
      "I hope life gives you everything your heart wishes for. And I hope I get to celebrate many more birthdays by your side. Happy Birthday, Jayesh! ❤️",
    isFinale: true,
  },
];