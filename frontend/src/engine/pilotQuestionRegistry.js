/**
 * TIXAR PILOT QUESTION REGISTRY (20 BENCHMARK QUESTIONS)
 *
 * Provides the canonical multi-skill attributions, diagnostic evidence specifications,
 * foundational retest items, and contextual transfer probes for the 10 Mathematics
 * and 10 Chemistry pilot benchmark problems.
 */

import { SKILL_ROLES } from "../data/skillOntology.js";

export const PILOT_QUESTIONS = Object.freeze({
  // ==========================================================================
  // MATHEMATICS PILOT QUESTIONS (M01 - M10)
  // ==========================================================================

  pilot_m01: {
    questionId: "pilot_m01",
    subjectId: "math",
    topicId: "math|numbers|Integers",
    q: "Evaluate: -7 - (-12)",
    ans: "5",
    type: "text",
    skills: [
      { skillId: "math.numbers.integers.subtract_negative", role: SKILL_ROLES.PRIMARY },
      { skillId: "math.numbers.integers.signed_arithmetic", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "DOUBLE_NEGATIVE_CONFUSION",
        targetSkillId: "math.numbers.integers.subtract_negative",
        plausibleAnswers: ["-19"],
        requiredEvidence: {
          description: "Student evaluated -7 - 12 instead of -7 + 12",
          workingPattern: "shows subtraction of 12 or write '-7 - 12 = -19'",
        },
      },
      {
        errorType: "SIGN_NEGLECT",
        targetSkillId: "math.numbers.integers.signed_arithmetic",
        plausibleAnswers: ["19", "-5"],
        requiredEvidence: {
          description: "Student discarded the negative sign on -7 or inverted operation magnitude",
          workingPattern: "shows 7 + 12 or 7 - 12",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m01",
      q: "Evaluate: -4 - (-9)",
      ans: "5",
      skillId: "math.numbers.integers.subtract_negative",
    },
    contextualTransfer: {
      questionId: "transfer_m01",
      subjectId: "physics",
      q: "An object moving at -5 m/s accelerates to +15 m/s. What is its change in velocity: 15 - (-5)?",
      ans: "20",
      unit: "m/s",
      skillId: "math.numbers.integers.subtract_negative",
    },
  },

  pilot_m02: {
    questionId: "pilot_m02",
    subjectId: "math",
    topicId: "math|numbers|Fractions",
    q: "Calculate: 2/5 + 1/3",
    ans: "11/15",
    type: "text",
    skills: [
      { skillId: "math.numbers.fractions.addition_subtraction", role: SKILL_ROLES.PRIMARY },
      { skillId: "math.numbers.integers.signed_arithmetic", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "ACROSS_THE_BOARD_ADDITION",
        targetSkillId: "math.numbers.fractions.addition_subtraction",
        plausibleAnswers: ["3/8"],
        requiredEvidence: {
          description: "Student directly added numerators and denominators without common denominator",
          workingPattern: "(2+1)/(5+3)",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m02",
      q: "Calculate: 1/4 + 2/3",
      ans: "11/12",
      skillId: "math.numbers.fractions.addition_subtraction",
    },
    contextualTransfer: {
      questionId: "transfer_m02",
      subjectId: "chemistry",
      q: "A solution contains 1/4 mol of solute A and 1/3 mol of solute B. What is the total moles of solute?",
      ans: "7/12",
      skillId: "math.numbers.fractions.addition_subtraction",
    },
  },

  pilot_m03: {
    questionId: "pilot_m03",
    subjectId: "math",
    topicId: "math|numbers|Fractions",
    q: "Calculate: (3/4) × (2/5)",
    ans: "3/10",
    type: "text",
    skills: [
      { skillId: "math.numbers.fractions.multiplication_division", role: SKILL_ROLES.PRIMARY },
      { skillId: "math.numbers.integers.signed_arithmetic", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "CROSS_MULTIPLICATION_MISAPPLICATION",
        targetSkillId: "math.numbers.fractions.multiplication_division",
        plausibleAnswers: ["15/8", "8/15"],
        requiredEvidence: {
          description: "Student cross-multiplied numerators and denominators instead of multiplying across",
          workingPattern: "3*5 / 4*2 or 15/8",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m03",
      q: "Calculate: (5/6) × (3/7)",
      ans: "5/14",
      skillId: "math.numbers.fractions.multiplication_division",
    },
    contextualTransfer: {
      questionId: "transfer_m03",
      subjectId: "chemistry",
      q: "In a stoichiometric conversion, calculate: (3/4) × (2/3)",
      ans: "1/2",
      skillId: "math.numbers.fractions.multiplication_division",
    },
  },

  pilot_m04: {
    questionId: "pilot_m04",
    subjectId: "math",
    topicId: "math|numbers|Fractions",
    q: "Calculate: (5/8) ÷ (3/4)",
    ans: "5/6",
    type: "text",
    skills: [
      { skillId: "math.numbers.fractions.multiplication_division", role: SKILL_ROLES.PRIMARY },
    ],
    diagnosticSpecs: [
      {
        errorType: "FAILED_RECIPROCAL",
        targetSkillId: "math.numbers.fractions.multiplication_division",
        plausibleAnswers: ["15/32"],
        requiredEvidence: {
          description: "Student multiplied directly without inverting the divisor (5*3 / 8*4)",
          workingPattern: "5/8 * 3/4 = 15/32",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m04",
      q: "Calculate: (2/3) ÷ (5/6)",
      ans: "4/5",
      skillId: "math.numbers.fractions.multiplication_division",
    },
    contextualTransfer: {
      questionId: "transfer_m04",
      subjectId: "physics",
      q: "Frequency is f = 1 / T. If the period T is 3/4 s, calculate f = 1 ÷ (3/4).",
      ans: "4/3",
      unit: "Hz",
      skillId: "math.numbers.fractions.multiplication_division",
    },
  },

  pilot_m05: {
    questionId: "pilot_m05",
    subjectId: "math",
    topicId: "math|numbers|Ratios",
    q: "A mixture contains 12 g of copper and 18 g of zinc. Simplify the ratio of copper to zinc.",
    ans: "2:3",
    type: "text",
    skills: [
      { skillId: "math.numbers.ratios.simplification", role: SKILL_ROLES.PRIMARY },
    ],
    diagnosticSpecs: [
      {
        errorType: "PARTIAL_SIMPLIFICATION",
        targetSkillId: "math.numbers.ratios.simplification",
        plausibleAnswers: ["6:9"],
        requiredEvidence: {
          description: "Student divided by common factor 2 but stopped before lowest terms",
          workingPattern: "12:18 -> 6:9",
        },
      },
      {
        errorType: "INVERTED_ORDER",
        targetSkillId: "math.numbers.ratios.simplification",
        plausibleAnswers: ["3:2"],
        requiredEvidence: {
          description: "Student reversed the order of terms specified in question (zinc:copper instead of copper:zinc)",
          workingPattern: "18:12 -> 3:2",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m05",
      q: "Simplify the ratio 15 : 25.",
      ans: "3:5",
      skillId: "math.numbers.ratios.simplification",
    },
    contextualTransfer: {
      questionId: "transfer_m05",
      subjectId: "chemistry",
      q: "A compound contains 0.4 mol Carbon and 0.8 mol Hydrogen. Simplify the mole ratio C : H to lowest integers.",
      ans: "1:2",
      skillId: "math.numbers.ratios.simplification",
    },
  },

  pilot_m06: {
    questionId: "pilot_m06",
    subjectId: "math",
    topicId: "math|numbers|Ratios",
    q: "If 4 kg of fertiliser covers 60 m², how many square metres will 7 kg cover?",
    ans: "105",
    type: "text",
    skills: [
      { skillId: "math.numbers.ratios.direct_proportion", role: SKILL_ROLES.PRIMARY },
    ],
    diagnosticSpecs: [
      {
        errorType: "ADDITIVE_ERROR",
        targetSkillId: "math.numbers.ratios.direct_proportion",
        plausibleAnswers: ["63"],
        requiredEvidence: {
          description: "Student applied additive difference (7 - 4 = 3 -> 60 + 3) instead of multiplicative proportion",
          workingPattern: "60 + 3 = 63",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m06",
      q: "If 3 litres of liquid cost £4.50, how much do 5 litres cost?",
      ans: "7.50",
      skillId: "math.numbers.ratios.direct_proportion",
    },
    contextualTransfer: {
      questionId: "transfer_m06",
      subjectId: "chemistry",
      q: "If 2 moles of reactant produce 88 g of gas, how many grams will 5 moles produce?",
      ans: "220",
      unit: "g",
      skillId: "math.numbers.ratios.direct_proportion",
    },
  },

  pilot_m07: {
    questionId: "pilot_m07",
    subjectId: "math",
    topicId: "math|algebra|Linear Equations",
    q: "Solve for x: 5x = 85",
    ans: "17",
    type: "text",
    skills: [
      { skillId: "math.algebra.linear_equations.single_variable", role: SKILL_ROLES.PRIMARY },
    ],
    diagnosticSpecs: [
      {
        errorType: "WRONG_INVERSE_OPERATION",
        targetSkillId: "math.algebra.linear_equations.single_variable",
        plausibleAnswers: ["80", "425"],
        requiredEvidence: {
          description: "Student subtracted 5 or multiplied by 5 instead of dividing by 5",
          workingPattern: "85 - 5 or 85 * 5",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m07",
      q: "Solve for y: 4y = 68",
      ans: "17",
      skillId: "math.algebra.linear_equations.single_variable",
    },
    contextualTransfer: {
      questionId: "transfer_m07",
      subjectId: "physics",
      q: "In V = IR, if V = 120 V and R = 30 Ω, solve for I: 30I = 120.",
      ans: "4",
      unit: "A",
      skillId: "math.algebra.linear_equations.single_variable",
    },
  },

  pilot_m08: {
    questionId: "pilot_m08",
    subjectId: "math",
    topicId: "math|algebra|Linear Equations",
    q: "Solve for x: 3x + 7 = 22",
    ans: "5",
    type: "text",
    skills: [
      { skillId: "math.algebra.linear_equations.two_step", role: SKILL_ROLES.PRIMARY },
      { skillId: "math.algebra.linear_equations.single_variable", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "SIGN_ERROR_ON_TRANSPOSITION",
        targetSkillId: "math.algebra.linear_equations.two_step",
        plausibleAnswers: ["29/3", "9.67"],
        requiredEvidence: {
          description: "Student added 7 to 22 instead of subtracting 7 (3x = 29)",
          workingPattern: "3x = 22 + 7",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m08",
      q: "Solve for p: 4p + 5 = 29",
      ans: "6",
      skillId: "math.algebra.linear_equations.two_step",
    },
    contextualTransfer: {
      questionId: "transfer_m08",
      subjectId: "physics",
      q: "In v = u + at, if v = 20, u = 4, a = 2, solve for t: 2t + 4 = 20.",
      ans: "8",
      unit: "s",
      skillId: "math.algebra.linear_equations.two_step",
    },
  },

  pilot_m09: {
    questionId: "pilot_m09",
    subjectId: "math",
    topicId: "math|measurement|Units",
    q: "Convert 450 milligrams (mg) to grams (g).",
    ans: "0.45",
    type: "text",
    skills: [
      { skillId: "math.measurement.units.metric_conversion", role: SKILL_ROLES.PRIMARY },
    ],
    diagnosticSpecs: [
      {
        errorType: "DIRECTION_INVERSION",
        targetSkillId: "math.measurement.units.metric_conversion",
        plausibleAnswers: ["450000"],
        requiredEvidence: {
          description: "Student multiplied by 1000 instead of dividing by 1000",
          workingPattern: "450 * 1000",
        },
      },
      {
        errorType: "WRONG_PREFIX_FACTOR",
        targetSkillId: "math.measurement.units.metric_conversion",
        plausibleAnswers: ["4.5"],
        requiredEvidence: {
          description: "Student divided by 100 (centi factor) instead of 1000 (milli factor)",
          workingPattern: "450 / 100",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m09",
      q: "Convert 720 milligrams (mg) to grams (g).",
      ans: "0.72",
      skillId: "math.measurement.units.metric_conversion",
    },
    contextualTransfer: {
      questionId: "transfer_m09",
      subjectId: "chemistry",
      q: "Before computing moles, convert 250 mg of NaCl into grams.",
      ans: "0.25",
      unit: "g",
      skillId: "math.measurement.units.metric_conversion",
    },
  },

  pilot_m10: {
    questionId: "pilot_m10",
    subjectId: "math",
    topicId: "math|algebra|Formulae",
    q: "Make t the subject of the formula: d = s × t",
    ans: "d/s",
    type: "text",
    skills: [
      { skillId: "math.algebra.formulae.change_subject", role: SKILL_ROLES.PRIMARY },
    ],
    diagnosticSpecs: [
      {
        errorType: "INVERTED_QUOTIENT",
        targetSkillId: "math.algebra.formulae.change_subject",
        plausibleAnswers: ["s/d"],
        requiredEvidence: {
          description: "Student divided s by d instead of d by s",
          workingPattern: "divided d by s",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_m10",
      q: "Make w the subject of the formula: Area = l × w",
      ans: "Area/l",
      skillId: "math.algebra.formulae.change_subject",
    },
    contextualTransfer: {
      questionId: "transfer_m10",
      subjectId: "physics",
      q: "Rearrange average speed v = d / t to solve for time t.",
      ans: "d/v",
      skillId: "math.algebra.formulae.change_subject",
    },
  },

  // ==========================================================================
  // CHEMISTRY PILOT QUESTIONS (C01 - C10)
  // ==========================================================================

  pilot_c01: {
    questionId: "pilot_c01",
    subjectId: "chemistry",
    topicId: "chemistry|equations|Balancing Equations",
    q: "Balance the equation: _Mg + _O₂ → _MgO",
    ans: "2, 1, 2",
    type: "text",
    skills: [
      { skillId: "chemistry.equations.balance_stoichiometry", role: SKILL_ROLES.PRIMARY },
    ],
    diagnosticSpecs: [
      {
        errorType: "SUBSCRIPT_TAMPERING",
        targetSkillId: "chemistry.equations.balance_stoichiometry",
        plausibleAnswers: ["Mg + O2 -> MgO2", "1, 1, 1 with MgO2"],
        requiredEvidence: {
          description: "Student altered chemical subscripts rather than adjusting stoichiometric coefficients",
          workingPattern: "changed MgO to MgO2",
        },
      },
      {
        errorType: "PARTIAL_BALANCE_FORGOT_REACTANT",
        targetSkillId: "chemistry.equations.balance_stoichiometry",
        plausibleAnswers: ["1, 1, 2", "Mg + O2 -> 2MgO"],
        requiredEvidence: {
          description: "Student doubled MgO to balance Oxygen but failed to balance Magnesium reactant",
          workingPattern: "2MgO with 1Mg",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c01",
      q: "Balance the equation: _Ca + _O₂ → _CaO",
      ans: "2, 1, 2",
      skillId: "chemistry.equations.balance_stoichiometry",
    },
    contextualTransfer: {
      questionId: "transfer_c01",
      subjectId: "chemistry",
      q: "Balance: _Na + _Cl₂ → _NaCl",
      ans: "2, 1, 2",
      skillId: "chemistry.equations.balance_stoichiometry",
    },
  },

  pilot_c02: {
    questionId: "pilot_c02",
    subjectId: "chemistry",
    topicId: "chemistry|moles|Molar Mass",
    q: "Calculate the relative formula mass (Mr) of CaCO₃. (Ar: Ca = 40, C = 12, O = 16)",
    ans: "100",
    type: "text",
    skills: [
      { skillId: "chemistry.moles.calculate_molar_mass", role: SKILL_ROLES.PRIMARY },
      { skillId: "math.numbers.integers.signed_arithmetic", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "SUBSCRIPT_MULTIPLIER_NEGLECT",
        targetSkillId: "chemistry.moles.calculate_molar_mass",
        plausibleAnswers: ["68"],
        requiredEvidence: {
          description: "Student added Ca + C + O without multiplying Oxygen by 3 (40 + 12 + 16 = 68)",
          workingPattern: "40 + 12 + 16",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c02",
      q: "Calculate the relative formula mass (Mr) of MgCO₃. (Ar: Mg = 24, C = 12, O = 16)",
      ans: "84",
      skillId: "chemistry.moles.calculate_molar_mass",
    },
    contextualTransfer: {
      questionId: "transfer_c02",
      subjectId: "chemistry",
      q: "Calculate the formula mass of aluminium oxide Al₂O₃. (Ar: Al = 27, O = 16)",
      ans: "102",
      skillId: "chemistry.moles.calculate_molar_mass",
    },
  },

  pilot_c03: {
    questionId: "pilot_c03",
    subjectId: "chemistry",
    topicId: "chemistry|moles|Mole Calculations",
    q: "How many moles are in 44 g of CO₂? (Mr of CO₂ = 44 g/mol)",
    ans: "1",
    type: "text",
    skills: [
      { skillId: "chemistry.moles.mass_to_moles", role: SKILL_ROLES.PRIMARY },
      { skillId: "chemistry.moles.calculate_molar_mass", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "FORMULA_INVERSION_MULTIPLIED",
        targetSkillId: "chemistry.moles.mass_to_moles",
        plausibleAnswers: ["1936"],
        requiredEvidence: {
          description: "Student multiplied mass by molar mass (44 * 44) instead of dividing",
          workingPattern: "44 * 44 = 1936",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c03",
      q: "How many moles are in 36 g of H₂O? (Mr of H₂O = 18 g/mol)",
      ans: "2",
      skillId: "chemistry.moles.mass_to_moles",
    },
    contextualTransfer: {
      questionId: "transfer_c03",
      subjectId: "chemistry",
      q: "Calculate moles in 100 g of CaCO₃ (Mr = 100 g/mol).",
      ans: "1",
      skillId: "chemistry.moles.mass_to_moles",
    },
  },

  pilot_c04: {
    questionId: "pilot_c04",
    subjectId: "chemistry",
    topicId: "chemistry|moles|Mole Calculations",
    q: "Calculate the mass of 0.5 moles of NaCl. (Mr of NaCl = 58.5 g/mol)",
    ans: "29.25",
    type: "text",
    skills: [
      { skillId: "chemistry.moles.moles_to_mass", role: SKILL_ROLES.PRIMARY },
      { skillId: "math.numbers.fractions.multiplication_division", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "DIVISION_INSTEAD_OF_MULTIPLICATION",
        targetSkillId: "chemistry.moles.moles_to_mass",
        plausibleAnswers: ["117"],
        requiredEvidence: {
          description: "Student divided Mr by moles (58.5 / 0.5 = 117) instead of multiplying",
          workingPattern: "58.5 / 0.5",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c04",
      q: "Calculate the mass of 0.25 moles of NaOH. (Mr of NaOH = 40 g/mol)",
      ans: "10",
      skillId: "chemistry.moles.moles_to_mass",
    },
    contextualTransfer: {
      questionId: "transfer_c04",
      subjectId: "chemistry",
      q: "Calculate the mass of 2.5 moles of H₂O (Mr = 18 g/mol).",
      ans: "45",
      skillId: "chemistry.moles.moles_to_mass",
    },
  },

  pilot_c05: {
    questionId: "pilot_c05",
    subjectId: "chemistry",
    topicId: "chemistry|stoichiometry|Mole Ratios",
    q: "In 2H₂ + O₂ → 2H₂O, what is the mole ratio of O₂ reacted to H₂O produced?",
    ans: "1:2",
    type: "text",
    skills: [
      { skillId: "chemistry.stoichiometry.extract_mole_ratio", role: SKILL_ROLES.PRIMARY },
      { skillId: "chemistry.equations.balance_stoichiometry", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "INVERTED_RATIO_ORDER",
        targetSkillId: "chemistry.stoichiometry.extract_mole_ratio",
        plausibleAnswers: ["2:1"],
        requiredEvidence: {
          description: "Student extracted H2O to O2 ratio (2:1) instead of O2 to H2O (1:2)",
          workingPattern: "wrote 2:1",
        },
      },
      {
        errorType: "SUBSCRIPT_CONFUSED_WITH_COEFFICIENT",
        targetSkillId: "chemistry.stoichiometry.extract_mole_ratio",
        plausibleAnswers: ["2:2"],
        requiredEvidence: {
          description: "Student used subscript 2 from O2 as the stoichiometric quantity",
          workingPattern: "used subscript 2 on O2",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c05",
      q: "In N₂ + 3H₂ → 2NH₃, what is the mole ratio of N₂ to NH₃?",
      ans: "1:2",
      skillId: "chemistry.stoichiometry.extract_mole_ratio",
    },
    contextualTransfer: {
      questionId: "transfer_c05",
      subjectId: "chemistry",
      q: "In 4Fe + 3O₂ → 2Fe₂O₃, what is the mole ratio of O₂ to Fe₂O₃?",
      ans: "3:2",
      skillId: "chemistry.stoichiometry.extract_mole_ratio",
    },
  },

  pilot_c06: {
    questionId: "pilot_c06",
    subjectId: "chemistry",
    topicId: "chemistry|stoichiometry|Stoichiometric Calculations",
    q: "CaCO₃ → CaO + CO₂. If 0.4 moles of CaCO₃ decompose completely, how many moles of CO₂ are formed?",
    ans: "0.4",
    type: "text",
    skills: [
      { skillId: "chemistry.stoichiometry.mole_to_mole_direct", role: SKILL_ROLES.PRIMARY },
      { skillId: "chemistry.stoichiometry.extract_mole_ratio", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "DOUBLE_SPLITTING_MISCONCEPTION",
        targetSkillId: "chemistry.stoichiometry.mole_to_mole_direct",
        plausibleAnswers: ["0.2"],
        requiredEvidence: {
          description: "Student divided 0.4 moles equally between CaO and CO2 assuming conservation of mole count",
          workingPattern: "0.4 / 2 = 0.2",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c06",
      q: "Mg + S → MgS. If 0.6 moles of Mg react completely, how many moles of MgS are produced?",
      ans: "0.6",
      skillId: "chemistry.stoichiometry.mole_to_mole_direct",
    },
    contextualTransfer: {
      questionId: "transfer_c06",
      subjectId: "chemistry",
      q: "CH₄ + 2O₂ → CO₂ + 2H₂O. If 1.5 moles of CH₄ burn completely, how many moles of CO₂ form?",
      ans: "1.5",
      skillId: "chemistry.stoichiometry.mole_to_mole_direct",
    },
  },

  // BENCHMARK CROSS-SUBJECT QUESTION (C07):
  pilot_c07: {
    questionId: "pilot_c07",
    subjectId: "chemistry",
    topicId: "chemistry|stoichiometry|Stoichiometric Calculations",
    q: "2Al + 3Cl₂ → 2AlCl₃. How many moles of AlCl₃ are formed from 6.0 moles of Cl₂?",
    ans: "4.0",
    type: "text",
    skills: [
      { skillId: "chemistry.stoichiometry.mole_to_mole_ratio_application", role: SKILL_ROLES.PRIMARY },
      { skillId: "chemistry.stoichiometry.extract_mole_ratio", role: SKILL_ROLES.PREREQUISITE },
      { skillId: "math.numbers.fractions.multiplication_division", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "INVERTED_STOICHIOMETRIC_MULTIPLIER",
        certainty: "CONFIRMED_MISCONCEPTION",
        targetSkillId: "chemistry.stoichiometry.mole_to_mole_ratio_application",
        plausibleAnswers: ["9.0", "9"],
        requiredEvidence: {
          description: "Student inverted the mole ratio fraction, writing 6.0 * (3/2) = 9.0 instead of 6.0 * (2/3) = 4.0",
          workingPattern: "6 * 3/2 = 9",
        },
      },
      {
        errorType: "FRACTION_ARITHMETIC_INCOMPLETE_DIVISION",
        certainty: "OBSERVED_CALCULATION_ERROR",
        targetSkillId: "math.numbers.fractions.multiplication_division",
        plausibleAnswers: ["12"],
        requiredEvidence: {
          description: "Student set up ratio 2/3 correctly (6.0 * 2/3) but executed 6 * 2 = 12 without dividing by 3",
          workingPattern: "wrote 6.0 * (2/3) = 12 or 6 * 2 = 12",
        },
      },
      {
        errorType: "AMBIGUOUS_WITHOUT_WORKING",
        certainty: "INCONCLUSIVE",
        targetSkillId: null,
        plausibleAnswers: ["*"],
        requiredEvidence: {
          description: "Bare answer submitted with no lines of working. Cannot distinguish arithmetic slip from ratio error or guess.",
          workingPattern: "no working lines",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c07",
      q: "Calculate: 6.0 × (2/3)",
      ans: "4.0",
      skillId: "math.numbers.fractions.multiplication_division",
    },
    // Genuine contextual transfer with non-integer fraction multiplication (Issue 1):
    // 4Fe + 3O2 -> 2Fe2O3. Moles Fe2O3 from 9.0 moles O2 = 9.0 * (2/3) = 6.0
    contextualTransfer: {
      questionId: "transfer_c07",
      subjectId: "chemistry",
      q: "4Fe + 3O₂ → 2Fe₂O₃. How many moles of Fe₂O₃ are produced when 9.0 moles of O₂ react completely?",
      ans: "6.0",
      skillId: "chemistry.stoichiometry.mole_to_mole_ratio_application",
    },
  },

  // BENCHMARK MULTI-STEP STOICHIOMETRY (C08):
  pilot_c08: {
    questionId: "pilot_c08",
    subjectId: "chemistry",
    topicId: "chemistry|stoichiometry|Mass Calculations",
    q: "2Mg + O₂ → 2MgO. Calculate the mass of MgO produced from 48 g of Mg. (Ar: Mg = 24, O = 16)",
    ans: "80",
    type: "text",
    skills: [
      { skillId: "chemistry.stoichiometry.mass_to_mass", role: SKILL_ROLES.PRIMARY },
      { skillId: "chemistry.equations.balance_stoichiometry", role: SKILL_ROLES.PREREQUISITE },
      { skillId: "chemistry.moles.mass_to_moles", role: SKILL_ROLES.PREREQUISITE },
      { skillId: "chemistry.stoichiometry.extract_mole_ratio", role: SKILL_ROLES.PREREQUISITE },
      { skillId: "chemistry.moles.moles_to_mass", role: SKILL_ROLES.PREREQUISITE },
      { skillId: "math.numbers.integers.signed_arithmetic", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "ARITHMETIC_MULTIPLICATION_SLIP",
        targetSkillId: "math.numbers.integers.signed_arithmetic",
        plausibleAnswers: ["70"],
        requiredEvidence: {
          description: "Student correctly found 2 moles of Mg, 2 moles of MgO, and Mr(MgO) = 40, but miscalculated 2 * 40 as 70",
          workingPattern: "shows 48/24 = 2, Mr=40, and 2 * 40 = 70",
        },
      },
      {
        errorType: "MASS_CONSERVATION_NAIVE_ASSUMPTION",
        targetSkillId: "chemistry.stoichiometry.mass_to_mass",
        plausibleAnswers: ["48"],
        requiredEvidence: {
          description: "Student assumed product mass equals reactant metal mass directly without accounting for oxygen",
          workingPattern: "wrote mass of MgO = 48g",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c08",
      q: "Calculate: 2 × 40",
      ans: "80",
      skillId: "math.numbers.integers.signed_arithmetic",
    },
    contextualTransfer: {
      questionId: "transfer_c08",
      subjectId: "chemistry",
      q: "2Ca + O₂ → 2CaO. Calculate the mass of CaO produced from 40 g of Ca. (Ar: Ca = 40, O = 16)",
      ans: "56",
      skillId: "chemistry.stoichiometry.mass_to_mass",
    },
  },

  pilot_c09: {
    questionId: "pilot_c09",
    subjectId: "chemistry",
    topicId: "chemistry|stoichiometry|Limiting Reactants",
    q: "2H₂ + O₂ → 2H₂O. 4.0 moles of H₂ react with 3.0 moles of O₂. Which reactant is limiting?",
    ans: "H2",
    type: "text",
    skills: [
      { skillId: "chemistry.stoichiometry.identify_limiting_reactant", role: SKILL_ROLES.PRIMARY },
      { skillId: "chemistry.stoichiometry.extract_mole_ratio", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "ABSOLUTE_MAGNITUDE_COMPARISON",
        targetSkillId: "chemistry.stoichiometry.identify_limiting_reactant",
        plausibleAnswers: ["O2"],
        requiredEvidence: {
          description: "Student chose O2 because 3.0 < 4.0 without dividing moles by stoichiometric coefficient (4/2 = 2 vs 3/1 = 3)",
          workingPattern: "selected O2 because 3 is smaller than 4",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c09",
      q: "N₂ + 3H₂ → 2NH₃ with 2.0 mol N₂ and 3.0 mol H₂. Which is limiting?",
      ans: "H2",
      skillId: "chemistry.stoichiometry.identify_limiting_reactant",
    },
    contextualTransfer: {
      questionId: "transfer_c09",
      subjectId: "chemistry",
      q: "2Al + 3Cl₂ → 2AlCl₃ with 4 mol Al and 4.5 mol Cl₂. Which reactant is limiting?",
      ans: "Cl2",
      skillId: "chemistry.stoichiometry.identify_limiting_reactant",
    },
  },

  pilot_c10: {
    questionId: "pilot_c10",
    subjectId: "chemistry",
    topicId: "chemistry|stoichiometry|Percentage Yield",
    q: "Theoretical yield is 50 g. Actual yield obtained is 40 g. Calculate percentage yield.",
    ans: "80",
    unit: "%",
    type: "text",
    skills: [
      { skillId: "chemistry.stoichiometry.percentage_yield", role: SKILL_ROLES.PRIMARY },
      { skillId: "math.numbers.fractions.multiplication_division", role: SKILL_ROLES.PREREQUISITE },
    ],
    diagnosticSpecs: [
      {
        errorType: "INVERTED_YIELD_FRACTION",
        targetSkillId: "chemistry.stoichiometry.percentage_yield",
        plausibleAnswers: ["125"],
        requiredEvidence: {
          description: "Student divided theoretical yield by actual yield (50 / 40 * 100 = 125%)",
          workingPattern: "50/40 * 100",
        },
      },
    ],
    foundationalRetest: {
      questionId: "retest_c10",
      q: "Theoretical yield is 80 g. Actual yield obtained is 60 g. Calculate percentage yield.",
      ans: "75",
      skillId: "chemistry.stoichiometry.percentage_yield",
    },
    contextualTransfer: {
      questionId: "transfer_c10",
      subjectId: "chemistry",
      q: "A reaction has theoretical yield of 25 g and produces 20 g. What is the percentage yield?",
      ans: "80",
      skillId: "chemistry.stoichiometry.percentage_yield",
    },
  },
});

/**
 * Retrieves a pilot question specification by ID.
 */
export function getPilotQuestionById(questionId) {
  return PILOT_QUESTIONS[questionId] || null;
}

export const PILOT_QUESTION_REGISTRY = PILOT_QUESTIONS;
