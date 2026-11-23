import { Fragment } from "react";

/**
 * Soft emphasis for chapter 03 — does not alter stored copy.
 */
const CHAPTER_HIGHLIGHTS = {
  "chapter-adore": ["favourite person", "Just being YOU"],
};

export function renderStoryParagraph(chapterId, text) {
  const phrases = CHAPTER_HIGHLIGHTS[chapterId];
  if (!phrases?.length) return text;

  let segments = [{ text, highlight: false }];

  for (const phrase of phrases) {
    const next = [];
    for (const seg of segments) {
      if (seg.highlight || !seg.text.includes(phrase)) {
        next.push(seg);
        continue;
      }
      const parts = seg.text.split(phrase);
      parts.forEach((part, i) => {
        if (part) next.push({ text: part, highlight: false });
        if (i < parts.length - 1) next.push({ text: phrase, highlight: true });
      });
    }
    segments = next;
  }

  return segments.map((seg, i) =>
    seg.highlight ? (
      <span key={i} className="romantic-highlight">
        {seg.text}
      </span>
    ) : (
      <Fragment key={i}>{seg.text}</Fragment>
    ),
  );
}