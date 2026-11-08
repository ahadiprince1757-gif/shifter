/**
 * CROSS-DISCIPLINARY MISCONCEPTION KNOWLEDGE REGISTRY
 * Deterministic diagnostic rules for Physics, Chemistry, Biology, English, and Computer Studies.
 *
 * Invariant:
 * Zero External AI Inference APIs.
 * Pure deterministic pedagogical reasoning, misconception taxonomy, and targeted cognitive repairs.
 */

import { DiagnosticErrorType, EvidenceSource } from "../engine/diagnosticTypes.js";

export const SUBJECT_MISCONCEPTIONS = [
  // =========================================================================
  // 1. PHYSICS
  // =========================================================================
  {
    id: "phys_mass_vs_weight",
    subject: "physics",
    topic: "force_and_gravity",
    errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
    category: "DISTINCTION_CONFUSION",
    code: "MASS_VS_WEIGHT_CONFUSION",
    name: "Mass vs Weight Distinction",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      const isMassWeightQ = (q.includes("mass") && q.includes("weight")) || q.includes("measured in newton") || q.includes("kilogram");
      if (!isMassWeightQ) return false;

      // Student says mass changes with gravity or weight is measured in kilograms
      if (a.includes("mass changes") || a.includes("mass depends on gravity") || a.includes("weight is in kg") || a.includes("weight is in kilograms")) {
        return true;
      }
      return false;
    },
    diagnose: ({ studentInput, questionText, expectedAnswer }) => ({
      errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
      category: "DISTINCTION_CONFUSION",
      misconceptionCode: "MASS_VS_WEIGHT_CONFUSION",
      whatYouDid: "You treated mass and weight as interchangeable, or assumed mass changes under different gravity.",
      whyThisIsWrong: [
        "Mass is the fundamental quantity of matter in an object and is constant everywhere (measured in kilograms, kg).",
        "Weight is the gravitational force acting on that mass (W = mg), which varies depending on gravitational field strength (measured in Newtons, N).",
      ],
      theRightWay: [
        "Mass (kg) = amount of substance; remains identical on Earth, Moon, or in deep space.",
        "Weight (N) = mass (kg) × gravitational acceleration (g).",
      ],
      remember: "Mass stays constant everywhere; Weight is a force that changes with gravity.",
      probe: {
        question: "An astronaut has a mass of 70 kg on Earth. What is their mass on the Moon where gravity is 1/6th of Earth's?",
        options: ["70 kg", "11.6 kg", "420 kg", "0 kg"],
        correctAnswer: "70 kg",
        purpose: "Verifies whether the learner understands that mass is invariant.",
      },
      repair: {
        principle: "Mass is intrinsic matter; Weight is the downward force of gravity acting upon it.",
        counterExample: "A 1 kg bag of sugar has 1 kg of sugar atoms anywhere in the universe, but weighs 9.8 N on Earth and only 1.6 N on the Moon.",
      },
      retest: {
        question: "Calculate the weight on Earth (g = 9.8 N/kg) of an object with a mass of 5 kg.",
        expectedAnswer: "49 N",
      },
    }),
  },

  {
    id: "phys_speed_vs_velocity",
    subject: "physics",
    topic: "kinematics",
    errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
    category: "DISTINCTION_CONFUSION",
    code: "SCALAR_VECTOR_SPEED_VELOCITY",
    name: "Speed vs Velocity (Scalar vs Vector)",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("speed") || !q.includes("velocity")) return false;
      if (a.includes("same thing") || a.includes("no difference") || a.includes("speed has direction")) {
        return true;
      }
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
      category: "DISTINCTION_CONFUSION",
      misconceptionCode: "SCALAR_VECTOR_SPEED_VELOCITY",
      whatYouDid: "You treated speed and velocity as identical without accounting for direction.",
      whyThisIsWrong: [
        "Speed is a scalar quantity: it measures how fast an object moves, with magnitude only (e.g., 20 m/s).",
        "Velocity is a vector quantity: it specifies both magnitude and direction (e.g., 20 m/s East).",
        "A car driving in a circle at a steady 50 km/h has constant speed, but continuously changing velocity because its direction changes.",
      ],
      theRightWay: [
        "Speed = Distance / Time (Scalar).",
        "Velocity = Displacement / Time with specified direction (Vector).",
      ],
      remember: "Speed tells you how fast; Velocity tells you how fast in which direction.",
      probe: {
        question: "If a race car drives around a circular track at a constant 100 km/h, is its velocity constant?",
        options: ["No, because its direction is constantly changing", "Yes, because the speed is 100 km/h", "Yes, because distance equals displacement"],
        correctAnswer: "No, because its direction is constantly changing",
      },
    }),
  },

  {
    id: "phys_ohms_law_transposition",
    subject: "physics",
    topic: "current_electricity",
    errorType: DiagnosticErrorType.FORMULA_SELECTION_ERROR,
    category: "FORMULA_ERROR",
    code: "OHMS_LAW_TRANSPOSITION",
    name: "Ohm's Law Algebraic Transposition",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.trim().toLowerCase();
      if (!q.includes("ohm's law") && !q.includes("current") && !q.includes("resistance")) return false;
      // If student writes I = VR or R = VI
      if (a === "i = vr" || a === "i = v * r" || a === "r = vi" || a === "r = v * i") return true;
      return false;
    },
    diagnose: ({ studentInput }) => ({
      errorType: DiagnosticErrorType.FORMULA_SELECTION_ERROR,
      category: "FORMULA_ERROR",
      misconceptionCode: "OHMS_LAW_TRANSPOSITION",
      whatYouDid: `You multiplied voltage and resistance (${studentInput}) instead of dividing.`,
      whyThisIsWrong: [
        "Ohm's Law states: V = I × R.",
        "To solve for current (I), divide both sides by R: I = V / R.",
        "Multiplying V by R implies higher resistance produces higher current, which violates electrical physics.",
      ],
      theRightWay: [
        "V = I × R (Voltage)",
        "I = V / R (Current)",
        "R = V / I (Resistance)",
      ],
      remember: "As resistance increases, current decreases: I = V ÷ R.",
      probe: {
        question: "A 12V battery is connected to a 4Ω resistor. What is the current flowing?",
        options: ["3 A", "48 A", "0.33 A", "16 A"],
        correctAnswer: "3 A",
      },
    }),
  },

  // =========================================================================
  // 2. CHEMISTRY
  // =========================================================================
  {
    id: "chem_ph_scale_inversion",
    subject: "chemistry",
    topic: "acids_and_bases",
    errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
    category: "DISTINCTION_CONFUSION",
    code: "PH_SCALE_INVERSION",
    name: "pH Scale Acidity Inversion",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("ph") || (!q.includes("acid") && !q.includes("base") && !q.includes("alkali"))) return false;
      if (a.includes("higher ph is more acidic") || a.includes("ph 14 is acidic") || (q.includes("which is more acidic") && (a.includes("ph 9") || a.includes("ph 12")))) {
        return true;
      }
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
      category: "DISTINCTION_CONFUSION",
      misconceptionCode: "PH_SCALE_INVERSION",
      whatYouDid: "You inverted the pH scale, associating higher pH numbers with stronger acidity.",
      whyThisIsWrong: [
        "The pH scale is inversely related to hydrogen ion [H+] concentration: pH = -log[H+].",
        "Values BELOW 7 are acidic. The lower the number, the stronger the acid (pH 1 is very acidic).",
        "Values ABOVE 7 are basic/alkaline. The higher the number, the stronger the alkali (pH 14 is strongly alkaline).",
        "pH 7 is neutral (pure water).",
      ],
      theRightWay: [
        "Strong Acid: pH 0 - 2",
        "Weak Acid: pH 3 - 6",
        "Neutral: pH 7",
        "Weak Alkali: pH 8 - 11",
        "Strong Alkali: pH 12 - 14",
      ],
      remember: "Lower pH = Higher acidity; Higher pH = Higher alkalinity.",
      probe: {
        question: "Which solution has the highest concentration of hydrogen ions [H+]?",
        options: ["Solution with pH 2", "Solution with pH 7", "Solution with pH 12"],
        correctAnswer: "Solution with pH 2",
      },
    }),
  },

  {
    id: "chem_ionic_vs_covalent",
    subject: "chemistry",
    topic: "chemical_bonding",
    errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
    category: "DISTINCTION_CONFUSION",
    code: "IONIC_VS_COVALENT_BONDING",
    name: "Ionic vs Covalent Bonding Mechanism",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("covalent") && !q.includes("ionic")) return false;
      if (a.includes("covalent transfers electrons") || a.includes("ionic shares electrons")) return true;
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
      category: "DISTINCTION_CONFUSION",
      misconceptionCode: "IONIC_VS_COVALENT_BONDING",
      whatYouDid: "You confused electron sharing in covalent bonds with electron transfer in ionic bonds.",
      whyThisIsWrong: [
        "Covalent bonding occurs when two non-metal atoms SHARE pairs of electrons to achieve stable octets.",
        "Ionic bonding occurs when a metal TRANSFERS electrons to a non-metal, forming oppositely charged ions held by electrostatic attraction.",
      ],
      theRightWay: [
        "Covalent = Sharing of electrons (e.g. H2O, CH4, O2).",
        "Ionic = Transfer of electrons forming ions (e.g. NaCl, MgO).",
      ],
      remember: "Co-valent shares electrons; Ionic creates oppositely charged ions by transfer.",
    }),
  },

  // =========================================================================
  // 3. BIOLOGY
  // =========================================================================
  {
    id: "bio_photosynthesis_vs_respiration",
    subject: "biology",
    topic: "cellular_energetics",
    errorType: DiagnosticErrorType.PROCESS_INVERSION,
    category: "PROCESS_INVERSION",
    code: "PHOTOSYNTHESIS_RESPIRATION_INVERSION",
    name: "Photosynthesis vs Cellular Respiration Inversion",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("respiration") && !q.includes("photosynthesis")) return false;
      if (a.includes("plants only respire at night") || a.includes("photosynthesis releases carbon dioxide") || a.includes("respiration produces glucose")) {
        return true;
      }
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.PROCESS_INVERSION,
      category: "PROCESS_INVERSION",
      misconceptionCode: "PHOTOSYNTHESIS_RESPIRATION_INVERSION",
      whatYouDid: "You reversed the biochemical inputs/outputs or assumed plants do not perform cellular respiration continuously.",
      whyThisIsWrong: [
        "Living plant cells require ATP energy and therefore respire 24 hours a day, day and night.",
        "Photosynthesis uses light energy to synthesize glucose and release oxygen (CO2 + H2O -> Glucose + O2).",
        "Cellular respiration breaks down glucose to release energy for cellular work (Glucose + O2 -> CO2 + H2O + ATP).",
      ],
      theRightWay: [
        "Photosynthesis: Consumes CO2 + H2O; Produces Glucose + O2 (requires light).",
        "Respiration: Consumes Glucose + O2; Produces CO2 + H2O + ATP (continuous 24/7 in all living cells).",
      ],
      remember: "Plants respire all the time; they only photosynthesize in the presence of light.",
      probe: {
        question: "Do living plant cells carry out cellular respiration during the daytime?",
        options: ["Yes, all living plant cells respire continuously day and night", "No, they only photosynthesize during the day", "No, plants never respire"],
        correctAnswer: "Yes, all living plant cells respire continuously day and night",
      },
    }),
  },

  {
    id: "bio_mitosis_vs_meiosis",
    subject: "biology",
    topic: "cell_division",
    errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
    category: "DISTINCTION_CONFUSION",
    code: "MITOSIS_VS_MEIOSIS",
    name: "Mitosis vs Meiosis Cell Division",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("mitosis") && !q.includes("meiosis")) return false;
      if (a.includes("mitosis makes gametes") || a.includes("meiosis makes body cells") || a.includes("mitosis produces 4 cells") || a.includes("meiosis produces identical cells")) {
        return true;
      }
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
      category: "DISTINCTION_CONFUSION",
      misconceptionCode: "MITOSIS_VS_MEIOSIS",
      whatYouDid: "You confused the products, ploidy, or purpose of mitosis and meiosis.",
      whyThisIsWrong: [
        "Mitosis is for growth, tissue repair, and asexual reproduction. It results in TWO genetically identical diploid (2n) daughter cells.",
        "Meiosis is for sexual reproduction (gamete formation). It undergoes two divisions, producing FOUR genetically varied haploid (n) cells.",
      ],
      theRightWay: [
        "Mitosis: 1 division -> 2 identical diploid cells (skin, muscle, somatic cells).",
        "Meiosis: 2 divisions -> 4 varied haploid gametes (sperm, egg).",
      ],
      remember: "Mitosis creates 'two of the same'; Meiosis creates reproductive sex cells.",
    }),
  },

  {
    id: "bio_artery_vs_vein",
    subject: "biology",
    topic: "circulatory_system",
    errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
    category: "DISTINCTION_CONFUSION",
    code: "ARTERY_VS_VEIN_CONFUSION",
    name: "Arteries vs Veins Structural Distinction",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("artery") && !q.includes("arteries") && !q.includes("vein") && !q.includes("veins")) return false;
      if (a.includes("arteries carry blood to the heart") || a.includes("veins have high pressure") || a.includes("arteries have valves")) {
        return true;
      }
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.DISTINCTION_CONFUSION,
      category: "DISTINCTION_CONFUSION",
      misconceptionCode: "ARTERY_VS_VEIN_CONFUSION",
      whatYouDid: "You confused the direction of blood flow or structural adaptations between arteries and veins.",
      whyThisIsWrong: [
        "Arteries carry blood AWAY from the heart under high pulsing pressure (thick elastic muscular walls, no valves except at heart exits).",
        "Veins carry blood TOWARD the heart under low pressure (thinner walls, large lumen, valves to prevent backflow).",
      ],
      theRightWay: [
        "Artery = Away from heart (High pressure, thick walls).",
        "Vein = Visits heart (Low pressure, valves present).",
      ],
      remember: "'A' for Artery = Away from the heart.",
    }),
  },

  // =========================================================================
  // 4. ENGLISH & LANGUAGE ARTS
  // =========================================================================
  {
    id: "eng_subject_verb_agreement_intervening",
    subject: "english",
    topic: "grammar_syntax",
    errorType: DiagnosticErrorType.SUBJECT_VERB_AGREEMENT,
    category: "GRAMMAR_ERROR",
    code: "SUBJECT_VERB_INTERVENING_PHRASE",
    name: "Subject-Verb Agreement with Intervening Phrase",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase().trim();
      // Questions like "The list of items (is/are) on the table."
      if (q.includes("list of items") || q.includes("box of chocolates") || q.includes("bouquet of flowers")) {
        if (a === "are" || a === "were") return true;
      }
      return false;
    },
    diagnose: ({ studentInput }) => ({
      errorType: DiagnosticErrorType.SUBJECT_VERB_AGREEMENT,
      category: "GRAMMAR_ERROR",
      misconceptionCode: "SUBJECT_VERB_INTERVENING_PHRASE",
      whatYouDid: `You selected the plural verb '${studentInput}', matching it to the nearest plural noun inside the prepositional phrase.`,
      whyThisIsWrong: [
        "The grammatical subject is 'The list' (singular), not 'items' (which is the object of the preposition 'of').",
        "Intervening prepositional phrases do not alter the number of the head subject noun.",
      ],
      theRightWay: [
        "Isolate the true subject: 'The list [of items] is on the table.'",
        "Singular subject requires singular verb: list -> is.",
      ],
      remember: "Cross out the prepositional phrase to verify the true head subject.",
      probe: {
        question: "Choose the correct verb: 'A bouquet of yellow roses (was/were) delivered.'",
        options: ["was", "were"],
        correctAnswer: "was",
      },
    }),
  },

  {
    id: "eng_their_there_theyre",
    subject: "english",
    topic: "homophones_spelling",
    errorType: DiagnosticErrorType.HOMOPHONE_SLIP,
    category: "HOMOPHONE_SLIP",
    code: "HOMOPHONE_THEIR_THERE_THEYRE",
    name: "Their / There / They're Homophone Confusion",
    matches: ({ studentInput, questionText, expectedAnswer }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase().trim();
      const exp = String(expectedAnswer).toLowerCase().trim();
      const set = new Set(["their", "there", "they're"]);
      if (set.has(exp) && set.has(a) && a !== exp) {
        return true;
      }
      return false;
    },
    diagnose: ({ studentInput, expectedAnswer }) => ({
      errorType: DiagnosticErrorType.HOMOPHONE_SLIP,
      category: "HOMOPHONE_SLIP",
      misconceptionCode: "HOMOPHONE_THEIR_THERE_THEYRE",
      whatYouDid: `You wrote '${studentInput}' instead of '${expectedAnswer}'.`,
      whyThisIsWrong: [
        "These three words sound identical but have distinct grammatical functions:",
        "- 'Their' = possessive pronoun showing ownership (e.g., 'their books').",
        "- 'There' = refers to a location or introductory pronoun (e.g., 'over there', 'there is a problem').",
        "- 'They're' = contraction for 'they are' (e.g., 'they're ready').",
      ],
      theRightWay: [
        "Test substitution: If you can replace it with 'they are', use 'they're'.",
        "If it shows ownership, use 'their'.",
        "If it points to a place, notice 'here' inside 't-here'.",
      ],
      remember: "T-HERE has 'here' (place); THEY'RE has an apostrophe for 'they are'; THEIR shows ownership.",
    }),
  },

  // =========================================================================
  // 5. COMPUTER STUDIES / ICT
  // =========================================================================
  {
    id: "comp_ram_vs_rom_volatility",
    subject: "computer",
    topic: "computer_memory",
    errorType: DiagnosticErrorType.VOLATILITY_CONFUSION,
    category: "VOLATILITY_CONFUSION",
    code: "RAM_VS_ROM_VOLATILITY",
    name: "RAM vs ROM Volatility Distinction",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("ram") && !q.includes("rom")) return false;
      if (a.includes("ram is permanent") || a.includes("rom is lost when power is off") || a.includes("ram is non-volatile") || a.includes("rom is volatile")) {
        return true;
      }
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.VOLATILITY_CONFUSION,
      category: "VOLATILITY_CONFUSION",
      misconceptionCode: "RAM_VS_ROM_VOLATILITY",
      whatYouDid: "You reversed the volatility characteristics of RAM and ROM.",
      whyThisIsWrong: [
        "RAM (Random Access Memory) is VOLATILE: all stored data is immediately lost when power is turned off. It serves as temporary working memory for active programs.",
        "ROM (Read Only Memory) is NON-VOLATILE: data is permanently retained without power. It contains essential startup instructions (BIOS/firmware).",
      ],
      theRightWay: [
        "RAM = Volatile, temporary working memory, read & write.",
        "ROM = Non-volatile, permanent boot memory, read-only.",
      ],
      remember: "RAM forgets when power cuts off; ROM remembers forever.",
      probe: {
        question: "Where are the startup instructions (BIOS/bootloader) stored so the computer can boot after being unplugged?",
        options: ["ROM", "RAM", "Cache memory"],
        correctAnswer: "ROM",
      },
    }),
  },

  {
    id: "comp_input_vs_output",
    subject: "computer",
    topic: "hardware_peripherals",
    errorType: DiagnosticErrorType.HARDWARE_SOFTWARE_CONFUSION,
    category: "CLASSIFICATION_ERROR",
    code: "INPUT_VS_OUTPUT_DEVICE",
    name: "Input vs Output Device Classification",
    matches: ({ studentInput, questionText }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.toLowerCase();
      if (!q.includes("input") && !q.includes("output")) return false;
      if ((q.includes("input device") && (a.includes("monitor") || a.includes("printer") || a.includes("speaker"))) ||
          (q.includes("output device") && (a.includes("keyboard") || a.includes("mouse") || a.includes("microphone") || a.includes("scanner")))) {
        return true;
      }
      return false;
    },
    diagnose: ({ studentInput, questionText }) => ({
      errorType: DiagnosticErrorType.HARDWARE_SOFTWARE_CONFUSION,
      category: "CLASSIFICATION_ERROR",
      misconceptionCode: "INPUT_VS_OUTPUT_DEVICE",
      whatYouDid: `You classified '${studentInput}' into the wrong device category.`,
      whyThisIsWrong: [
        "Input devices enter data FROM the outside world INTO the computer processor (e.g., keyboard, mouse, scanner, microphone).",
        "Output devices present processed information FROM the computer TO the user (e.g., monitor, printer, speaker, projector).",
      ],
      theRightWay: [
        "Input = Data entering computer.",
        "Output = Information leaving computer.",
      ],
      remember: "Ask: Is information going INTO the computer (Input) or coming OUT to the user (Output)?",
    }),
  },

  {
    id: "comp_bits_vs_bytes",
    subject: "computer",
    topic: "data_representation",
    errorType: DiagnosticErrorType.UNIT_BIT_BYTE_CONFUSION,
    category: "CALCULATION_ERROR",
    code: "BITS_VS_BYTES_CONVERSION",
    name: "Bits vs Bytes Conversion Factor",
    matches: ({ studentInput, questionText, expectedAnswer }) => {
      const q = questionText.toLowerCase();
      const a = studentInput.trim();
      const exp = String(expectedAnswer).trim();
      // If question asks for bytes from bits (e.g. 32 bits = 4 bytes) and student answers 320 or 256
      if (q.includes("bits") && q.includes("byte")) {
        const numA = parseFloat(a);
        const numExp = parseFloat(exp);
        if (!isNaN(numA) && !isNaN(numExp)) {
          // Student multiplied by 8 instead of dividing by 8 or vice versa
          if (Math.abs(numA - numExp * 64) < 0.1 || Math.abs(numA - numExp * 8) < 0.1) {
            return true;
          }
        }
      }
      return false;
    },
    diagnose: () => ({
      errorType: DiagnosticErrorType.UNIT_BIT_BYTE_CONFUSION,
      category: "CALCULATION_ERROR",
      misconceptionCode: "BITS_VS_BYTES_CONVERSION",
      whatYouDid: "You applied the conversion factor in the wrong direction (multiplying instead of dividing, or confusing bits with bytes).",
      whyThisIsWrong: [
        "1 Byte = 8 Bits.",
        "To convert bits to bytes, DIVIDE by 8 (e.g. 32 bits ÷ 8 = 4 bytes).",
        "To convert bytes to bits, MULTIPLY by 8 (e.g. 4 bytes × 8 = 32 bits).",
      ],
      theRightWay: [
        "Bits -> Bytes : Divide by 8",
        "Bytes -> Bits : Multiply by 8",
      ],
      remember: "A byte is larger than a bit: 8 bits make up 1 byte.",
    }),
  },
];

/**
 * Finds a cross-subject misconception rule matching the submission.
 */
export function findCrossSubjectMisconception({
  studentAnswer,
  questionText = "",
  expectedAnswer = "",
  subject = "",
  questionObj = {},
}) {
  const normInput = String(studentAnswer ?? "").trim();
  const qText = String(questionText || questionObj?.q || "").trim();
  const expAns = String(expectedAnswer || questionObj?.ans || "").trim();
  const detectedSubject = String(subject || questionObj?.subject || "").toLowerCase().trim();

  for (const rule of SUBJECT_MISCONCEPTIONS) {
    // If subject is known, match against subject; otherwise consider all rules
    if (detectedSubject && rule.subject !== detectedSubject) {
      continue;
    }

    if (typeof rule.matches === "function") {
      const isMatch = rule.matches({
        studentInput: normInput,
        questionText: qText,
        expectedAnswer: expAns,
        questionObj,
      });

      if (isMatch) {
        return rule.diagnose({
          studentInput: normInput,
          questionText: qText,
          expectedAnswer: expAns,
          questionObj,
        });
      }
    }
  }

  return null;
}
