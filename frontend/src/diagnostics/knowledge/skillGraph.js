/**
 * Skill Graph, Diagnostic Probes, and Targeted Repair Generator.
 *
 * Implements the precision hierarchy:
 * SUBJECT -> CHAPTER -> TOPIC -> SKILL -> MICRO-SKILL -> ERROR
 *
 * Provides diagnostic probes to distinguish:
 * - Knowledge gap (does the student know the formula?)
 * - Procedure error (are they choosing the right operation?)
 * - Calculation error (did they make an arithmetic slip?)
 */

export const SKILL_GRAPH = {
  // Speed, Distance, Time
  average_speed: {
    subject: "Physics",
    chapter: "Motion",
    topic: "Speed, Distance & Time",
    skill: "Calculate average speed",
    microSkills: {
      formula_selection: {
        id: "average_speed_formula",
        name: "Formula selection (speed = distance / time)",
        probe: {
          question: "Which formula gives average speed?",
          options: [
            { text: "speed = distance ÷ time", confirms: "CALCULATION_OR_ARITHMETIC" },
            { text: "speed = distance × time", confirms: "OPERATION_ERROR" },
            { text: "speed = time ÷ distance", confirms: "INVERTED_RATIO_ERROR" },
          ],
          purpose: "Distinguish formula selection misconception from arithmetic calculation slip",
        },
        repair: {
          type: "guided_practice",
          instruction: "Speed measures rate of travel: divide total distance covered by total elapsed time (speed = distance ÷ time).",
          mnemonic: "Distance is on top: Speed = Distance / Time.",
        },
        retest: {
          question: "A train travels 150 km in 3 hours. What is its average speed?",
          expectedAnswer: "50 km/h",
          steps: [
            "Total distance = 150 km",
            "Total time = 3 h",
            "Average speed = 150 ÷ 3 = 50 km/h",
          ],
        },
      },
    },
  },

  // Linear Equations
  linear_equations: {
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    skill: "Solve one-variable linear equations",
    microSkills: {
      inverse_operations: {
        id: "linear_equation_isolation",
        name: "Apply inverse operations to isolate variable terms",
        probe: {
          question: "To isolate 3x in 3x + 5 = 20, what operation must be applied to both sides?",
          options: [
            { text: "Subtract 5 from both sides", confirms: "CONCEPT_UNDERSTOOD" },
            { text: "Add 5 to both sides", confirms: "SIGN_REVERSAL_CONFUSION" },
            { text: "Divide both sides by 5", confirms: "COEFFICIENT_OPERATION_CONFUSION" },
          ],
          purpose: "Verify whether the student understands inverse operation cancellation",
        },
        repair: {
          type: "targeted_remedial",
          instruction: "To cancel +5, apply the opposite operation: subtract 5 from BOTH sides to keep the equation balanced.",
          mnemonic: "Whatever you do to one side of the equal sign, you must do identically to the other side.",
        },
        retest: {
          question: "Solve 4x + 6 = 26",
          expectedAnswer: "5",
          steps: [
            "4x + 6 = 26",
            "4x = 26 - 6",
            "4x = 20",
            "x = 5",
          ],
        },
      },
      coefficient_division: {
        id: "linear_equation_coefficient",
        name: "Divide by coefficient to isolate x",
        probe: {
          question: "In 3x = 15, how do you find x?",
          options: [
            { text: "Divide both sides by 3", confirms: "CONCEPT_UNDERSTOOD" },
            { text: "Subtract 3 from 15", confirms: "COEFFICIENT_SUBTRACTION_ERROR" },
          ],
          purpose: "Confirm student divides rather than subtracts the coefficient",
        },
        repair: {
          type: "targeted_remedial",
          instruction: "3x means 3 multiplied by x. The inverse of multiplication is division, so divide both sides by 3.",
          mnemonic: "ax = b -> x = b / a",
        },
        retest: {
          question: "Solve 5x = 35",
          expectedAnswer: "7",
          steps: ["5x = 35", "x = 35 ÷ 5", "x = 7"],
        },
      },
    },
  },

  // Fractions
  fraction_addition: {
    subject: "Mathematics",
    chapter: "Number Systems",
    topic: "Fractions",
    skill: "Add fractions with unlike denominators",
    microSkills: {
      common_denominator: {
        id: "fraction_common_denominator",
        name: "Find common denominator before adding",
        probe: {
          question: "Before adding 1/2 and 1/3, what must you do first?",
          options: [
            { text: "Convert both fractions to have a common denominator (6)", confirms: "CONCEPT_UNDERSTOOD" },
            { text: "Add numerators (1+1) and denominators (2+3) directly", confirms: "ADD_DENOMINATOR_MISCONCEPTION" },
          ],
          purpose: "Diagnose whether student knows denominators cannot be added across",
        },
        repair: {
          type: "visual_guided",
          instruction: "The denominator denotes part size. You cannot combine halves and thirds directly without converting to equivalent sixths first.",
          mnemonic: "Never add denominators! Find the LCM of denominators first.",
        },
        retest: {
          question: "Calculate 1/3 + 1/4",
          expectedAnswer: "7/12",
          steps: [
            "Common denominator of 3 and 4 is 12",
            "1/3 = 4/12 and 1/4 = 3/12",
            "4/12 + 3/12 = 7/12",
          ],
        },
      },
    },
  },

  // Number Classification
  number_classification: {
    subject: "Mathematics",
    chapter: "Number Systems",
    topic: "Real Number Subsets",
    skill: "Classify numbers into natural, whole, integer, and rational sets",
    microSkills: {
      natural_number_definition: {
        id: "natural_number_definition",
        name: "Distinguish natural counting numbers from negative integers and fractions",
        probe: {
          question: "Which of the following numbers is a natural number?",
          options: [
            { text: "7 (positive whole counting number)", confirms: "CONCEPT_UNDERSTOOD" },
            { text: "-5 (negative integer)", confirms: "NEGATIVE_NUMBER_CONFUSION" },
            { text: "3/4 (fraction/rational number)", confirms: "FRACTION_CONFUSION" },
          ],
          purpose: "Verify distinction between natural numbers and other real subsets",
        },
        repair: {
          type: "conceptual_reference",
          instruction: "Natural numbers are discrete positive counting numbers {1, 2, 3, ...}. Fractions belong to rational numbers, and negative numbers belong to integers.",
          mnemonic: "Natural numbers are what you can count on your fingers: 1, 2, 3, ...",
        },
        retest: {
          question: "Which of the following is a natural number: -8, 2/3, 9, or 0.4?",
          expectedAnswer: "9",
          steps: ["Natural numbers are positive counting numbers: {1, 2, 3, ...}. Therefore, 9 is the natural number."],
        },
      },
    },
  },
};

export function getDiagnosticProbe(skillKey, microSkillKey) {
  const tree = SKILL_GRAPH[skillKey];
  if (!tree) return null;
  const micro = tree.microSkills?.[microSkillKey];
  if (!micro) return null;

  return {
    skillId: micro.id,
    skillName: micro.name,
    probe: micro.probe,
    repair: micro.repair,
    retest: micro.retest,
  };
}
