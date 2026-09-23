/**
 * Canonical Curriculum Loader, Normalizer, and Semantic Validator for Shifter/Tixar.
 * 
 * Pipeline:
 *   curriculum.json + 6 subject JS data files ->
 *   Canonical Loader ->
 *   Normalize + Validate ->
 *   Relational Entities (Curriculum & Learner Fixtures)
 */

const fs = require("fs");
const path = require("path");

const CANONICAL_SUBJECT_IDS = ["math", "physics", "chemistry", "biology", "english", "computer"];

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Normalizes any raw curriculum question into the strict canonical question contract.
 *
 * Contract:
 * {
 *   q: string,
 *   ans: string,
 *   type: "text" | "mcq",
 *   options: Array<{ text: string, is_correct: boolean }>,
 *   steps: Array<string>,
 *   why: string,
 *   sol: string,
 *   hint: string,
 *   subject: string,
 *   chapter: string,
 *   topic: string,
 *   conceptId: string,
 *   skillId: string,
 *   subskillId: string
 * }
 */
function normalizeQuestion(q, { sid, cid, topic, qIdx }) {
  if (!q) return null;

  const qStr = q.q || q.Question || q.question || q.Q1 || q.Q || "Explain the core concept of this topic.";
  
  // Resolve answer from various naming variants
  const rawAns = q.ans !== undefined ? q.ans 
    : (q.Answer !== undefined ? q.Answer 
    : (q.answer !== undefined ? q.answer 
    : (q.A1 !== undefined ? q.A1 
    : (q.A !== undefined ? q.A 
    : q.a))));

  const ansStr = Array.isArray(rawAns)
    ? rawAns.map(a => String(a).trim()).filter(Boolean).join(", ")
    : (rawAns !== undefined && rawAns !== null ? String(rawAns).trim() : "");

  const hintStr = q.hint || q.Hint || q.HINT || `Focus on the core principle of ${topic}.`;
  const baseWhy = q.why || q.Reason || q.reason || q.mark || q.Explanation || q.explain || q.explanation || "";

  // 1. Steps normalization — NEVER empty, ALWAYS an array of meaningful step strings
  let steps = [];
  if (Array.isArray(q.steps) && q.steps.length > 0) {
    steps = q.steps.map(s => String(s).trim()).filter(Boolean);
  }

  if (steps.length === 0) {
    // Synthesize structured, pedagogical 3-step guidance
    steps = [
      `Step 1: Identify key concept: Define the required principles for ${topic}.`,
      `Step 2: Apply governing rule: ${baseWhy ? baseWhy.replace(/\s+/g, " ").trim() : "Analyze the relationship and given criteria."}`,
      `Step 3: State the final conclusion: ${ansStr}`
    ];
  } else {
    // Ensure clean "Step N: ..." prefix formatting
    steps = steps.map((s, idx) => {
      const stripped = s.replace(/^step\s*\d+\s*:\s*/i, "").trim();
      return `Step ${idx + 1}: ${stripped}`;
    });
  }

  const whyStr = baseWhy ? String(baseWhy).trim() : "Demonstrate clear step-by-step reasoning.";
  const solStr = q.sol || q.solution || steps.join("\n") || whyStr;

  // 2. Options and Type normalization
  let rawOptions = q.options || q.choices || null;
  let options = [];
  let type = q.type === "mcq" || (Array.isArray(rawOptions) && rawOptions.length > 0) ? "mcq" : "text";

  if (type === "mcq" && Array.isArray(rawOptions) && rawOptions.length > 0) {
    options = rawOptions.map(opt => {
      if (typeof opt === "object" && opt !== null) {
        return {
          text: String(opt.text || opt.choice || opt.option || "").trim(),
          is_correct: Boolean(opt.is_correct || opt.correct)
        };
      }
      const optText = String(opt).trim();
      return {
        text: optText,
        is_correct: optText.toLowerCase() === ansStr.toLowerCase()
      };
    });

    // Ensure exactly 1 correct option matching ansStr
    const correctCount = options.filter(o => o.is_correct).length;
    if (correctCount === 0 && ansStr) {
      options.push({ text: ansStr, is_correct: true });
    }
  } else {
    type = "text";
    options = [];
  }

  // 3. Tixar Skill Invariant: Diagnosed Skill ≡ Repair Skill ≡ Retest Skill
  const conceptId = `${sid}_${cid}_${slugify(topic)}`;
  const skillId = `${sid}_${cid}`;
  const subskillId = `${skillId}_q${qIdx + 1}`;

  return {
    q: String(qStr).trim(),
    ans: ansStr,
    type,
    options,
    steps,
    why: whyStr,
    sol: solStr,
    hint: hintStr,
    subject: sid,
    chapter: cid,
    topic,
    conceptId,
    skillId,
    subskillId
  };
}

/**
 * Validates semantic integrity of a normalized question.
 * Throws an Error with descriptive detail if invalid.
 */
function validateQuestion(norm, context = "") {
  if (!norm) {
    throw new Error(`[${context}] Question is null or undefined`);
  }
  if (!norm.q || typeof norm.q !== "string" || norm.q.trim().length === 0) {
    throw new Error(`[${context}] Question text 'q' is missing or empty`);
  }
  if (!norm.ans || typeof norm.ans !== "string" || norm.ans.trim().length === 0) {
    throw new Error(`[${context}] Question '${norm.q}' has no valid answer 'ans'`);
  }
  if (!Array.isArray(norm.steps) || norm.steps.length === 0) {
    throw new Error(`[${context}] Question '${norm.q}' has empty steps array`);
  }
  for (let i = 0; i < norm.steps.length; i++) {
    if (!norm.steps[i] || typeof norm.steps[i] !== "string" || norm.steps[i].trim().length === 0) {
      throw new Error(`[${context}] Question '${norm.q}' has invalid empty step at index ${i}`);
    }
  }
  if (norm.type === "mcq") {
    if (norm.options.length < 2) {
      throw new Error(`[${context}] MCQ Question '${norm.q}' has fewer than 2 options (${norm.options.length})`);
    }
    const correctOpts = norm.options.filter(o => o.is_correct);
    if (correctOpts.length !== 1) {
      throw new Error(`[${context}] MCQ Question '${norm.q}' must have exactly 1 correct option, found ${correctOpts.length}`);
    }
    if (correctOpts[0].text.toLowerCase() !== norm.ans.toLowerCase()) {
      throw new Error(`[${context}] MCQ Question '${norm.q}' correct option '${correctOpts[0].text}' does not match canonical ans '${norm.ans}'`);
    }
  } else {
    if (norm.options.length !== 0) {
      throw new Error(`[${context}] Non-MCQ Question '${norm.q}' must have empty options array`);
    }
  }
  if (!CANONICAL_SUBJECT_IDS.includes(norm.subject)) {
    throw new Error(`[${context}] Subject '${norm.subject}' is not in canonical whitelist [${CANONICAL_SUBJECT_IDS.join(", ")}]`);
  }
  return true;
}

/**
 * Loads the canonical curriculum.json and the 6 subject JS data files.
 * Enforces 100% curriculum match audit (no missing topics, no orphan topics).
 */
function loadCanonicalCurriculum() {
  const dataDir = path.resolve(__dirname, "..", "data");
  const curriculumPath = path.join(dataDir, "curriculum.json");

  if (!fs.existsSync(curriculumPath)) {
    throw new Error(`Curriculum file not found at ${curriculumPath}`);
  }

  const rawCurriculum = JSON.parse(fs.readFileSync(curriculumPath, "utf8"));
  const activeSubjects = rawCurriculum.filter(s => CANONICAL_SUBJECT_IDS.includes(s.id));

  if (activeSubjects.length !== 6) {
    throw new Error(`Expected 6 canonical subjects in curriculum.json, found ${activeSubjects.length}`);
  }

  const contentMap = new Map(); // key: `${sid}/${cid}/${topic}` -> { sid, cid, topic, notes, qs: [normalized...] }

  global.add = (sid, cid, topic, notes = "", qs = []) => {
    const notesStr = typeof notes === "string" ? notes : (Array.isArray(notes) ? notes.join("\n") : String(notes));
    const qsArray = Array.isArray(qs) ? qs : (qs ? [qs] : []);
    const key = `${sid}/${cid}/${String(topic).trim()}`;

    if (contentMap.has(key)) {
      const existing = contentMap.get(key);
      existing.notes = existing.notes + "\n<hr>\n" + notesStr;
      existing.rawQs = existing.rawQs.concat(qsArray);
    } else {
      contentMap.set(key, { sid, cid, topic: String(topic).trim(), notes: notesStr, rawQs: qsArray });
    }
  };

  const subjectFiles = ["math.js", "physics.js", "chemistry.js", "biology.js", "english.js", "computer.js"];
  subjectFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Subject data file not found: ${filePath}`);
    }
    require(filePath);
  });

  // Strict Canonical Audit Gate
  let totalChapters = 0;
  let totalTopics = 0;
  const auditErrors = [];

  activeSubjects.forEach(subj => {
    (subj.chapters || []).forEach(chap => {
      totalChapters++;
      (chap.topics || []).forEach(top => {
        totalTopics++;
        const key = `${subj.id}/${chap.id}/${String(top).trim()}`;
        if (!contentMap.has(key)) {
          auditErrors.push(`MISSING CONTENT: Canonical topic [${key}] has no content defined in subject JS files.`);
        }
      });
    });
  });

  for (const [key] of contentMap.entries()) {
    const [sid, cid, top] = key.split("/");
    const subj = activeSubjects.find(s => s.id === sid);
    const chap = subj ? (subj.chapters || []).find(c => c.id === cid) : null;
    const exists = chap ? (chap.topics || []).some(t => String(t).trim().toLowerCase() === top.toLowerCase()) : false;
    if (!exists) {
      auditErrors.push(`ORPHAN CONTENT: [${key}] is present in subject JS files but not declared in canonical curriculum.json.`);
    }
  }

  if (auditErrors.length > 0) {
    throw new Error(`Curriculum Canonical Audit Failed with ${auditErrors.length} errors:\n${auditErrors.join("\n")}`);
  }

  // Normalize and validate all questions
  let totalQuestions = 0;
  for (const [key, content] of contentMap.entries()) {
    const normalizedQs = [];
    content.rawQs.forEach((rawQ, qIdx) => {
      const norm = normalizeQuestion(rawQ, {
        sid: content.sid,
        cid: content.cid,
        topic: content.topic,
        qIdx
      });
      validateQuestion(norm, `${key}#${qIdx}`);
      normalizedQs.push(norm);
      totalQuestions++;
    });
    content.qs = normalizedQs;
    delete content.rawQs;
  }

  return {
    curriculum: activeSubjects,
    contentMap,
    stats: {
      subjectsCount: activeSubjects.length,
      chaptersCount: totalChapters,
      topicsCount: totalTopics,
      questionsCount: totalQuestions
    }
  };
}

module.exports = {
  CANONICAL_SUBJECT_IDS,
  slugify,
  normalizeQuestion,
  validateQuestion,
  loadCanonicalCurriculum
};
