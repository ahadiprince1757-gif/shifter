/**
 * Working parser for multi-step student reasoning.
 * Distinguishes between:
 * 1. EQUATION steps (algebraic transformations containing variables, e.g. 2x + 3 = 7)
 * 2. EXPRESSION steps (arithmetic reductions, e.g. 6 + 2 * 3, 6 + 6)
 * 3. RESULT steps (evaluated final or intermediate values, e.g. 13, = 13, Ans = 13)
 * 4. TEXT steps (unparsed textual comments or explanations)
 */

import { stripStepPrefix, normalizeMathText } from "./textNormalizer.js";
import { parseEquation } from "./equationParser.js";
import { parseExpression } from "./expressionParser.js";

function isPureNumber(str) {
  if (!str) return false;
  return /^-?\d+(\.\d+)?$/.test(str.trim());
}

function hasAlgebraicVariable(str) {
  if (!str) return false;
  // Match any letters that are not keywords like 'ans', 'answer', 'step'
  const cleaned = str.replace(/\b(ans|answer|step)\b/gi, "").trim();
  return /[a-zA-Z]/.test(cleaned);
}

export function parseWorkingSteps(userWork) {
  if (!userWork || typeof userWork !== "string") return [];

  // Split by newline, semicolon
  const rawLines = userWork
    .split(/\r?\n|;/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const steps = [];

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const stripped = stripStepPrefix(raw);
    const normalized = normalizeMathText(stripped);

    if (!normalized) continue;

    // Subcase A: Line begins with '=' (e.g. '=13', '= 6 + 6')
    if (normalized.startsWith("=")) {
      const remainder = normalized.replace(/^=+\s*/, "").trim();
      if (!remainder) continue;

      if (isPureNumber(remainder)) {
        steps.push({
          index: steps.length + 1,
          raw,
          clean: remainder,
          type: "RESULT",
          value: parseFloat(remainder),
          expression: remainder,
        });
        continue;
      }

      try {
        const ast = parseExpression(remainder);
        if (ast) {
          steps.push({
            index: steps.length + 1,
            raw,
            clean: remainder,
            type: "EXPRESSION",
            expression: remainder,
            ast,
          });
          continue;
        }
      } catch {
        // Fall through
      }

      steps.push({
        index: steps.length + 1,
        raw,
        clean: remainder,
        type: "TEXT",
      });
      continue;
    }

    // Subcase B: Line contains '=' in the middle
    if (normalized.includes("=")) {
      // If it contains algebraic variables, treat as an algebraic EQUATION (e.g. 2x + 3 = 7)
      if (hasAlgebraicVariable(normalized)) {
        const eq = parseEquation(normalized);
        if (eq) {
          steps.push({
            index: steps.length + 1,
            raw,
            clean: normalized,
            type: "EQUATION",
            parsed: eq,
          });
          continue;
        }
      }

      // Otherwise, it is an arithmetic reduction chain (e.g. '6+2*3 = 6+6 = 12' or '6+6 = 12' or 'Ans = 13')
      const parts = normalized.split("=").map((p) => p.trim()).filter(Boolean);
      for (const part of parts) {
        if (/^(ans|answer)$/i.test(part)) continue;

        if (isPureNumber(part)) {
          steps.push({
            index: steps.length + 1,
            raw: part,
            clean: part,
            type: "RESULT",
            value: parseFloat(part),
            expression: part,
          });
        } else {
          try {
            const ast = parseExpression(part);
            if (ast) {
              steps.push({
                index: steps.length + 1,
                raw: part,
                clean: part,
                type: "EXPRESSION",
                expression: part,
                ast,
              });
              continue;
            }
          } catch {
            // Fall through
          }
          steps.push({
            index: steps.length + 1,
            raw: part,
            clean: part,
            type: "TEXT",
          });
        }
      }
      continue;
    }

    // Subcase C: Line without '='
    if (isPureNumber(normalized)) {
      steps.push({
        index: steps.length + 1,
        raw,
        clean: normalized,
        type: "RESULT",
        value: parseFloat(normalized),
        expression: normalized,
      });
      continue;
    }

    // Try parsing as mathematical expression
    try {
      const ast = parseExpression(normalized);
      if (ast) {
        steps.push({
          index: steps.length + 1,
          raw,
          clean: normalized,
          type: "EXPRESSION",
          expression: normalized,
          ast,
        });
        continue;
      }
    } catch {
      // Fall through to text
    }

    steps.push({
      index: steps.length + 1,
      raw,
      clean: normalized,
      type: "TEXT",
    });
  }

  return steps;
}
