/**
 * Claim & Negation Parser
 *
 * Extracts structured propositional claims with polarity (AFFIRMED | NEGATED)
 * so that "Plants do not respire" is NOT treated as conceptual support for respiration.
 * Also provides multi-format multi-part extraction ("Distance is 20m and displacement is zero").
 */

import { normalizeQuantity } from "./quantityUnitNormalizer.js";

const NEGATION_PATTERN = /\b(not|never|no|none|neither|nor|cannot|can't|won't|wouldn't|shouldn't|couldn't|isn't|aren't|wasn't|weren't|doesn't|don't|didn't|without|except|false|unlike|lack|lacks|lacking)\b/i;

/**
 * Splits a text into clauses and annotates each clause's polarity (AFFIRMED | NEGATED).
 */
export function extractClauseClaims(text) {
  const raw = String(text || "").trim();
  if (!raw) return [];

  const clauses = raw
    .split(/[.;,\n]+|\b(?:but|while|however|whereas|although|and)\b/i)
    .map((c) => c.trim())
    .filter((c) => c.length >= 2);

  return clauses.map((clause) => {
    const negMatch = clause.match(NEGATION_PATTERN);
    return {
      text: clause,
      polarity: negMatch ? "NEGATED" : "AFFIRMED",
      negationCue: negMatch ? negMatch[1].toLowerCase() : null,
    };
  });
}

/**
 * Checks whether a reference concept/proposition appears in a clause with matching polarity.
 * Prevents "Plants do not respire" from matching an AFFIRMED "plants respire" concept.
 */
export function evaluateConceptPolarity(studentText, conceptTerms, expectedPolarity = "AFFIRMED") {
  const clauses = extractClauseClaims(studentText);
  const lowerTerms = conceptTerms.map((t) => t.toLowerCase());

  for (const clause of clauses) {
    const lowerClause = clause.text.toLowerCase();
    const hits = lowerTerms.filter((term) => lowerClause.includes(term));
    if (hits.length > 0) {
      const polarityMatches = clause.polarity === expectedPolarity;
      return {
        matched: true,
        clause: clause.text,
        polarity: clause.polarity,
        negationCue: clause.negationCue,
        polarityMatches,
        hits,
      };
    }
  }
  return { matched: false };
}

/**
 * Parses expected multi-part targets like "Distance = 20 m; displacement = 0 m."
 */
export function parseExpectedMultiPartTargets(expectedAnswer) {
  const raw = String(expectedAnswer || "").trim();
  if (!raw) return [];

  const segments = raw
    .split(/[;\n]+/)
    .map((s) => s.replace(/\.+$/, "").trim())
    .filter(Boolean);

  if (segments.length <= 1) return [];

  const parts = [];
  for (const seg of segments) {
    const m = seg.match(/^([a-zA-Z\s]{2,30}?)\s*(?:=|:|is|was)\s*(.+)$/i);
    if (m) {
      const label = m[1].trim();
      const rawVal = m[2].trim();
      const qty = normalizeQuantity(rawVal);
      parts.push({
        label,
        partKey: label.toLowerCase().replace(/\s+/g, "_"),
        rawExpected: rawVal,
        normalizedExpected: qty,
      });
    }
  }
  return parts;
}

/**
 * Extracts labeled values for multi-part targets from natural student prose or equations.
 * Handles:
 * - "Distance = 20m", "Distance: 20 m", "Distance is 20 m", "D = 20m"
 * - "20 m distance", "zero displacement", "no displacement", "displacement is zero"
 */
export function extractMultiPartClaimsFromSource(sourceText, expectedParts) {
  const raw = String(sourceText || "").trim();
  if (!raw || !expectedParts || expectedParts.length === 0) return [];

  const results = [];
  const clauses = extractClauseClaims(raw);

  for (const part of expectedParts) {
    const labelEscaped = part.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const firstLetter = part.label.charAt(0);

    // 1. Explicit label followed by value: "Distance = 20 m", "Distance is 20m", "Distance: 20 m"
    const labelValueRegex = new RegExp(
      `\\b(?:${labelEscaped}|${firstLetter})\\b\\s*(?:=|:|is|was|equals)?\\s*(zero|nil|-?\\d+(?:\\.\\d+)?(?:\\s*[a-zA-Z/%°^2]+)?)`,
      "i"
    );

    // 2. Value followed by label: "20 m distance", "zero displacement"
    const valueLabelRegex = new RegExp(
      `\\b(zero|nil|-?\\d+(?:\\.\\d+)?(?:\\s*[a-zA-Z/%°^2]+)?)\\s+(?:of\\s+)?\\b${labelEscaped}\\b`,
      "i"
    );

    let matchedText = null;
    let extractedValStr = null;

    const m1 = raw.match(labelValueRegex);
    const m2 = raw.match(valueLabelRegex);

    if (m1) {
      matchedText = m1[0].trim();
      extractedValStr = m1[1].trim();
    } else if (m2) {
      matchedText = m2[0].trim();
      extractedValStr = m2[1].trim();
    }

    if (extractedValStr) {
      results.push({
        part,
        matchedText,
        extractedValStr,
        normalizedObserved: normalizeQuantity(extractedValStr),
      });
      continue;
    }

    // 3. Qualitative zero/origin recognition for displacement-like zero targets
    if (part.normalizedExpected && part.normalizedExpected.value === 0) {
      const originClause = clauses.find((c) => {
        const lc = c.text.toLowerCase();
        return (
          lc.includes(part.label.toLowerCase()) &&
          (/\b(zero|nil|origin|starting point|back to start|returns? to start)\b/i.test(lc) ||
            c.polarity === "NEGATED")
        );
      });

      if (originClause) {
        results.push({
          part,
          matchedText: originClause.text,
          extractedValStr: "0",
          normalizedObserved: normalizeQuantity("0"),
          qualitativeZero: true,
        });
      }
    }
  }

  return results;
}
