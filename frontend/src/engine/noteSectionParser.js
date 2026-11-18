/**
 * TIXAR NOTE SECTION PARSER
 *
 * Deterministic parser that turns raw HTML curriculum notes into a structured,
 * versioned index of reusable instructional sections.
 *
 * Invariants:
 * 1. Original HTML notes remain the authoritative authored source; sections are derived.
 * 2. Handles notes with h2, h3, h4 headings, and captures pre-heading intro text.
 * 3. Classifies each section by instructional role:
 *    FOUNDATION | PROCEDURE | WORKED_EXAMPLE | MISCONCEPTION | APPLICATION
 * 4. Generates persistent IDs and content hashes to detect changes without breaking keys.
 */

export const SECTION_TYPES = Object.freeze({
  FOUNDATION: "FOUNDATION",
  PROCEDURE: "PROCEDURE",
  WORKED_EXAMPLE: "WORKED_EXAMPLE",
  MISCONCEPTION: "MISCONCEPTION",
  APPLICATION: "APPLICATION",
});

/**
 * Deterministic fast 32-bit djb2 hash.
 */
export function computeContentHash(text = "") {
  let hash = 5381;
  const str = String(text || "").trim();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

/**
 * Normalizes text to a clean alphanumeric slug.
 */
function toSectionSlug(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 50);
}

/**
 * Classifies the educational role of a note section based on heading text.
 */
export function classifySectionType(headingText = "") {
  const lower = headingText.toLowerCase();

  if (
    lower.includes("worked example") ||
    lower.includes("example") ||
    lower.includes("sample problem")
  ) {
    return SECTION_TYPES.WORKED_EXAMPLE;
  }

  if (
    lower.includes("misconception") ||
    lower.includes("common mistake") ||
    lower.includes("mistakes to avoid") ||
    lower.includes("pitfall") ||
    lower.includes("errors to avoid")
  ) {
    return SECTION_TYPES.MISCONCEPTION;
  }

  if (
    lower.includes("formula") ||
    lower.includes("rearrang") ||
    lower.includes("how to") ||
    lower.includes("procedure") ||
    lower.includes("steps") ||
    lower.includes("rule") ||
    lower.includes("method") ||
    lower.includes("sign rule") ||
    lower.includes("operations")
  ) {
    return SECTION_TYPES.PROCEDURE;
  }

  if (
    lower.includes("application") ||
    lower.includes("everyday life") ||
    lower.includes("in practice") ||
    lower.includes("uses of") ||
    lower.includes("industrial")
  ) {
    return SECTION_TYPES.APPLICATION;
  }

  return SECTION_TYPES.FOUNDATION;
}

/**
 * Slices a raw HTML note string into structured section objects.
 *
 * @param {string} notesHtml - Raw HTML notes from curriculum topic
 * @param {string} topicId - Canonical topic ID (e.g. "chemistry|moles|Meaning of Mole")
 * @returns {Array<object>} Array of NoteSection records
 */
export function parseNoteSections(notesHtml = "", topicId = "unknown_topic") {
  if (!notesHtml || typeof notesHtml !== "string") {
    return [];
  }

  const cleanTopicSlug = toSectionSlug(topicId);

  // Match all major headings (h2, h3, h4) with tag name, attributes, and inner text
  const headingRegex = /<h([234])(?:\s+[^>]*)?>([\s\S]*?)<\/h\1>/gi;
  const matches = [];
  let match;

  while ((match = headingRegex.exec(notesHtml)) !== null) {
    matches.push({
      fullTag: match[0],
      level: Number(match[1]),
      innerText: match[2].replace(/<[^>]+>/g, "").trim(),
      index: match.index,
      endIndex: headingRegex.lastIndex,
    });
  }

  const sections = [];

  // 1. Content prior to the first heading (if any)
  if (matches.length > 0 && matches[0].index > 0) {
    const introHtml = notesHtml.slice(0, matches[0].index).trim();
    if (introHtml.replace(/<[^>]+>/g, "").trim().length > 15) {
      sections.push({
        id: `sec_${cleanTopicSlug}_intro_0`,
        topicId,
        sectionKey: "intro",
        headingText: "Overview",
        headingLevel: 2,
        sectionType: SECTION_TYPES.FOUNDATION,
        contentHtml: introHtml,
        contentHash: computeContentHash(introHtml),
        contentVersion: "1.0.0",
        sectionIndex: 0,
      });
    }
  }

  // If no headings found, return the whole note as a single foundation section
  if (matches.length === 0) {
    const trimmed = notesHtml.trim();
    return [
      {
        id: `sec_${cleanTopicSlug}_full_0`,
        topicId,
        sectionKey: "full_note",
        headingText: "Overview",
        headingLevel: 2,
        sectionType: SECTION_TYPES.FOUNDATION,
        contentHtml: trimmed,
        contentHash: computeContentHash(trimmed),
        contentVersion: "1.0.0",
        sectionIndex: 0,
      },
    ];
  }

  // 2. Extract each heading and its governed body text
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const nextStart = i + 1 < matches.length ? matches[i + 1].index : notesHtml.length;
    const sectionBody = notesHtml.slice(current.endIndex, nextStart).trim();

    // Include the heading inside contentHtml so it renders with clear context
    const fullSectionHtml = `${current.fullTag}\n${sectionBody}`.trim();
    const sectionKey = toSectionSlug(current.innerText) || `section_${i + 1}`;
    const sectionType = classifySectionType(current.innerText);

    sections.push({
      id: `sec_${cleanTopicSlug}_${sectionKey}_${i + 1}`,
      topicId,
      sectionKey,
      headingText: current.innerText,
      headingLevel: current.level,
      sectionType,
      contentHtml: fullSectionHtml,
      contentHash: computeContentHash(fullSectionHtml),
      contentVersion: "1.0.0",
      sectionIndex: i + 1,
    });
  }

  return sections;
}
