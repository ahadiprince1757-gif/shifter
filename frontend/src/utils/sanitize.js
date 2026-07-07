import DOMPurify from "dompurify";

export const sanitizeHTML = (dirtyHTML) => {
  return DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },

    // Extra strict options:
    FORBID_TAGS: ["script", "iframe", "object", "embed"],
    FORBID_ATTR: ["onerror", "onload", "onclick"]
  });
};