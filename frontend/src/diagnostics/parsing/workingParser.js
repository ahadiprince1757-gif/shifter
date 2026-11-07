/**
 * Working parser for multi-step student reasoning.
 */

import { stripStepPrefix, normalizeMathText } from "./textNormalizer.js";
import { parseEquation } from "./equationParser.js";
import { parseExpression } from "./expressionParser.js";

export function parseWorkingSteps(userWork) {
  if (!userWork || typeof userWork !== "string") return [];

  // Split by newline, semicolon, or period followed by newline
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

    // Detect if line contains an equation
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

    // Try parsing as mathematical expression
    try {
      const ast = parseExpression(normalized);
      if (ast) {
        steps.push({
          index: steps.length + 1,
          raw,
          clean: normalized,
          type: "EXPRESSION",
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
