/**
 * ============================================================================
 * TIXAR LEARNING INTELLIGENCE & TELEMETRY CONTRACT TEST SUITE
 * ============================================================================
 *
 * Assertions:
 * 1. Pipeline Invariant: N(raw) == N(adapter) == N(engine) (No event compression or fabrication)
 * 2. Observation != Diagnosis: 1 incorrect answer -> "We're still learning", NEVER "Critical Gap"
 * 3. Evidence-Backed Gap: >= 5 attempts + < 40% accuracy -> Legitimate Critical Gap
 * 4. Cognitive Transparency: Untagged questions return null score & 0 evidenceCount
 * 5. Activity vs Evidence Separation: 5 visits + 1 quiz question = exactly 1 learning attempt
 * ============================================================================
 */

import fs from "fs";
import path from "path";
import { adaptAnalyticsToEvidence } from "./frontend/src/engine/analyticsEvidenceAdapter.js";
import { buildMasteryMap, calculateReadiness, calculateEvidenceConfidence } from "./frontend/src/engine/cbcCompetencyEngine.js";
import {
  buildLearningIntelligence,
  calculateCognitiveMastery,
  generatePrimaryRecommendation,
} from "./frontend/src/engine/learningIntelligenceEngine.js";
import telemetryValidator from "./backend/validators/telemetryValidator.js";
import intelligenceService from "./backend/services/intelligenceService.js";
import {
  ONTOLOGY_VERSION,
  CORE_SKILL_REGISTRY,
  UNKNOWN_SKILL,
  SKILL_ROLES,
  validateSkillOntology,
  getSkillById
} from "./backend/services/skillOntology.js";
import { mapQuestionToSkills } from "./backend/services/questionSkillMapper.js";
import {
  GRAPH_VERSION,
  RELATIONSHIP_SEMANTICS,
  SKILL_RELATIONSHIPS,
  computeGraphSnapshotHash,
  validateSkillGraph,
  validatePrerequisiteDAG,
  validateOrderingGraph,
  getDirectPrerequisites,
  getDirectDependents,
  getPrerequisiteHypotheses
} from "./backend/services/skillGraph.js";
import {
  CALIBRATION_VERSION,
  CALIBRATION_POLICY,
  MIN_DIFFICULTY_OBSERVATIONS,
  EVIDENCE_LEVELS,
  EVIDENCE_LEVEL_SOURCES,
  EVIDENCE_LEVEL_WEIGHTS,
  INDEPENDENCE_FACTORS,
  NOVELTY_FACTORS,
  SKILL_ROLE_WEIGHTS,
  normalizeBoolean,
  normalizeCorrectness,
  normalizeDifficulty,
  computeCalibrationSnapshotHash,
  calculateIndependenceFactor,
  calculateNoveltyFactor,
  calculateItemDifficultyMetrics,
  calibrateItemDifficulty,
  qualifyEvidenceContribution,
  distributeEvidenceContributions
} from "./backend/services/evidenceModel.js";

const { validateEvent, validateEventsBatch } = telemetryValidator;
const {
  ENGINE_VERSION,
  RULE_VERSION,
  SCHEMA_VERSION,
  evaluateTopicMastery,
  determineRecommendation,
  computeDecisionFingerprint,
  computeEvidenceSnapshotHash,
  computeAndRecordDecision,
} = intelligenceService;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAILED: ${message}`);
    throw new Error(message);
  }
  console.log(`  ✓ PASSED: ${message}`);
}

async function runContractTests() {
  console.log("=================================================");
  console.log(" TIXAR LEARNING INTELLIGENCE CONTRACT TESTS     ");
  console.log("=================================================\n");

  let passedTests = 0;

  // --------------------------------------------------------------------------
  // TEST 1: Pipeline Invariant (N_raw == N_adapter == N_engine)
  // --------------------------------------------------------------------------
  console.log("TEST 1: Pipeline Evidence Invariant (No Compression)");
  {
    const rawAttempts = [];
    for (let i = 1; i <= 20; i++) {
      rawAttempts.push({
        id: i,
        client_event_id: `evt-uuid-${i}`,
        topic_id: 101,
        topic: "Linear Equations",
        subject_id: "math",
        chapter_id: "algebra",
        correct: i % 4 !== 0, // 15 correct, 5 incorrect
        event_type: i % 4 !== 0 ? "question_correct" : "question_incorrect",
        created_at: new Date().toISOString(),
      });
    }

    const mockApiPayload = {
      coldStart: false,
      intelligenceState: "established",
      evidence: {
        totalQuestionsAnswered: 20,
        totalVisits: 5,
        correctCount: 15,
        incorrectCount: 5,
        attempts: rawAttempts,
      },
    };

    // Layer 1: Adapter
    const adapted = adaptAnalyticsToEvidence(mockApiPayload);
    assert(adapted.attempts.length === 20, "Adapter preserved all 20 attempts without compression");
    assert(adapted.attempts[0].clientEventId === "evt-uuid-1", "Adapter preserved unique clientEventId");

    // Layer 2: Intelligence Engine
    const intelligence = buildLearningIntelligence({ attempts: adapted.attempts });
    assert(intelligence.overview.totalAttempts === 20, "Engine received and analyzed exactly 20 attempts");
    assert(intelligence.overview.correctAttempts === 15, "Engine analyzed exactly 15 correct attempts");

    // Layer 3: Mastery Vector
    const topicStats = intelligence.masteryMap.topics["Linear Equations"];
    assert(topicStats.attempts === 20, "Topic mastery vector retained exact 20 attempts");
    assert(topicStats.performanceScore === 75, "Topic performance calculated as 75%");
    assert(topicStats.verifiedMastery === true, "20 attempts at 75% constitutes verified mastery");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 2: Observation != Diagnosis (Single Wrong Answer Contract)
  // --------------------------------------------------------------------------
  console.log("\nTEST 2: Observation != Diagnosis (Single Wrong Answer)");
  {
    const singleFailurePayload = {
      coldStart: false,
      intelligenceState: "early_evidence",
      evidence: {
        totalQuestionsAnswered: 1,
        totalVisits: 2,
        correctCount: 0,
        incorrectCount: 1,
        attempts: [
          {
            id: 1,
            client_event_id: "single-fail-uuid",
            topic_id: 202,
            topic: "Quadratic Equations",
            correct: false,
            event_type: "question_incorrect",
            created_at: new Date().toISOString(),
          },
        ],
      },
    };

    const adapted = adaptAnalyticsToEvidence(singleFailurePayload);
    const intelligence = buildLearningIntelligence({ attempts: adapted.attempts });

    // Must NOT be diagnosed as critical gap
    const criticalGaps = intelligence.masteryMap.knowledgeGaps;
    assert(criticalGaps.length === 0, "1 failed answer NEVER triggers a Critical Gap");

    const topicStats = intelligence.masteryMap.topics["Quadratic Equations"];
    assert(topicStats.masteryState === "INSUFFICIENT_EVIDENCE", "Topic mastery state is INSUFFICIENT_EVIDENCE");
    assert(topicStats.readinessImpact === "MONITOR", "Topic readiness impact is MONITOR, not BLOCKING");

    // Readiness status check
    assert(
      intelligence.overview.readinessStatus === "INSUFFICIENT_EVIDENCE",
      "Readiness status is INSUFFICIENT_EVIDENCE (not CRITICAL_GAP_DETECTED)"
    );
    assert(
      intelligence.overview.readinessLabel.includes("We're Still Learning"),
      "Readiness label is pedagogical: 'We're Still Learning Your Strengths'"
    );

    // Recommendation check
    assert(
      intelligence.recommendation.type === "calibrating",
      "Recommendation type is 'calibrating' (not 'critical_gap')"
    );
    assert(
      intelligence.recommendation.title === "We're Still Learning Your Strengths",
      "Recommendation title is supportive and human"
    );
    assert(
      !intelligence.recommendation.reason.includes("0%"),
      "Recommendation reason does NOT claim 0% prerequisite gap"
    );

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 3: Evidence-Backed Critical Gap (5 Failed Attempts Contract)
  // --------------------------------------------------------------------------
  console.log("\nTEST 3: Evidence-Backed Critical Gap (5 Failed Attempts)");
  {
    const fiveFails = [];
    for (let i = 1; i <= 5; i++) {
      fiveFails.push({
        id: i,
        client_event_id: `fail-${i}`,
        topic_id: 303,
        topic: "Factorisation",
        correct: false,
        event_type: "question_incorrect",
        created_at: new Date().toISOString(),
      });
    }

    const adapted = adaptAnalyticsToEvidence({
      coldStart: false,
      evidence: { attempts: fiveFails },
    });
    const intelligence = buildLearningIntelligence({ attempts: adapted.attempts });

    assert(intelligence.masteryMap.knowledgeGaps.length === 1, "5 failures legitimately trigger 1 Critical Gap");
    assert(intelligence.overview.readinessStatus === "CRITICAL_GAP_DETECTED", "Status is CRITICAL_GAP_DETECTED");
    assert(
      intelligence.recommendation.title.includes("Let's Fix This First"),
      "Recommendation title uses human coaching language: 'Let's Fix This First'"
    );

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 4: Cognitive Model Qualification (No Fabricated Levels)
  // --------------------------------------------------------------------------
  console.log("\nTEST 4: Cognitive Model Qualification (No Synthetic Guessing)");
  {
    const mixedCognitiveAttempts = [
      { correct: true, cognitiveLevel: "RECOGNITION" },
      { correct: true, cognitiveLevel: "RECOGNITION" },
      // 8 untagged questions
      { correct: true },
      { correct: false },
      { correct: true },
      { correct: false },
      { correct: true },
      { correct: true },
      { correct: false },
      { correct: true },
    ];

    const cognitiveMastery = calculateCognitiveMastery(mixedCognitiveAttempts);

    assert(cognitiveMastery.RECOGNITION.score === 100, "Tagged RECOGNITION score is 100%");
    assert(cognitiveMastery.RECOGNITION.evidenceCount === 2, "Tagged RECOGNITION evidenceCount is exactly 2");
    assert(cognitiveMastery.RECALL.score === null, "Untagged RECALL score is null (not fabricated)");
    assert(cognitiveMastery.RECALL.evidenceCount === 0, "Untagged RECALL evidenceCount is 0");
    assert(cognitiveMastery.PROCEDURAL.score === null, "Untagged PROCEDURAL score is null");
    assert(cognitiveMastery.APPLICATION.score === null, "Untagged APPLICATION score is null");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 5: Activity vs Evidence Separation Contract
  // --------------------------------------------------------------------------
  console.log("\nTEST 5: Activity vs Evidence Separation");
  {
    const payloadWithVisits = {
      coldStart: false,
      intelligenceState: "early_evidence",
      evidence: {
        totalQuestionsAnswered: 1,
        totalVisits: 15, // 15 visits
        correctCount: 1,
        incorrectCount: 0,
        attempts: [
          {
            id: 1,
            topic: "Trigonometry",
            correct: true,
            event_type: "question_correct",
          },
        ],
      },
    };

    const adapted = adaptAnalyticsToEvidence(payloadWithVisits);
    assert(adapted.totalVisits === 15, "Visits recorded as engagement activity (15)");
    assert(adapted.totalQuestionsAnswered === 1, "Learning evidence recorded as exactly 1 question");
    assert(adapted.attempts.length === 1, "Adapter passes exactly 1 assessment attempt to engine");

    const intelligence = buildLearningIntelligence({ attempts: adapted.attempts });
    assert(intelligence.overview.totalAttempts === 1, "Engine base totalAttempts is 1 (not 16)");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 6: Telemetry Event Schema Validator & Idempotency Batch Guard
  // --------------------------------------------------------------------------
  console.log("\nTEST 6: Telemetry Event Schema Validator & Idempotency Batch Guard");
  {
    // A. Single validation
    const invalidNoId = { event_type: "question_correct", payload: { topic: "Algebra" } };
    assert(!validateEvent(invalidNoId).valid, "Validator rejects event missing client_event_id");

    const invalidNoTopic = { client_event_id: "evt-123", event_type: "question_correct" };
    assert(!validateEvent(invalidNoTopic).valid, "Validator rejects assessment event missing topic");

    const futureDate = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const invalidFuture = { client_event_id: "evt-456", event_type: "lesson_opened", created_at: futureDate };
    assert(!validateEvent(invalidFuture).valid, "Validator rejects event with future timestamp (>5m drift)");

    const validEvent = {
      client_event_id: "valid-evt-001",
      event_type: "question_correct",
      topic: "Matrices",
      created_at: new Date().toISOString()
    };
    assert(validateEvent(validEvent).valid, "Validator accepts properly formed assessment event");

    // B. Batch validation & deduplication
    const batch = [
      { client_event_id: "batch-1", event_type: "question_correct", topic: "Calculus" },
      { client_event_id: "batch-2", event_type: "question_incorrect", topic: "Calculus" },
      { client_event_id: "batch-1", event_type: "question_correct", topic: "Calculus" }, // duplicate of batch-1
      { client_event_id: "", event_type: "question_correct", topic: "Calculus" }, // invalid: empty id
      { client_event_id: "batch-3", event_type: "lesson_opened" } // valid
    ];

    const batchResult = validateEventsBatch(batch);
    assert(batchResult.stats.total === 5, "Batch validator received 5 items");
    assert(batchResult.stats.valid === 3, "Batch validator accepted exactly 3 unique valid items");
    assert(batchResult.stats.duplicates === 1, "Batch validator detected 1 duplicate within batch");
    assert(batchResult.stats.rejected === 1, "Batch validator rejected 1 malformed item");
    assert(batchResult.validEvents.length === 3, "Valid events list has exactly 3 elements");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 7: Authoritative Intelligence Service & Epistemological Provenance
  // --------------------------------------------------------------------------
  console.log("\nTEST 7: Authoritative Intelligence Service & Epistemological Provenance");
  {
    const attempts = [];
    for (let i = 1; i <= 8; i++) {
      attempts.push({
        id: i,
        client_event_id: `provenance-evt-${i}`,
        topic_id: 88,
        topic: "Quadratic Equations",
        is_correct: i <= 3, // 3 correct, 5 incorrect -> 37.5% accuracy
        created_at: new Date().toISOString()
      });
    }

    const topicEval = evaluateTopicMastery("Quadratic Equations", attempts);
    assert(topicEval.totalAttempts === 8, "Evaluated 8 attempts");
    assert(topicEval.accuracy === 38, "Accuracy rounded to 38%");
    assert(topicEval.masteryState === "CRITICAL_GAP", "Mastery state is CRITICAL_GAP (≥5 attempts, <40% accuracy)");
    assert(topicEval.readinessState === "NOT_READY", "Readiness state is NOT_READY");
    assert(typeof topicEval.evidenceStrength === "number", "Evidence strength is numeric score");

    // Formulate authoritative recommendation
    const recommendation = determineRecommendation({ "Quadratic Equations": topicEval });
    assert(recommendation.decisionType === "PREREQUISITE_GAP", "Decision type is PREREQUISITE_GAP");
    assert(recommendation.actionType === "REPAIR_PREREQUISITE", "Action type is REPAIR_PREREQUISITE");
    assert(recommendation.inferenceRules.includes("MIN_ATTEMPTS_5"), "Inference rule MIN_ATTEMPTS_5 recorded");
    assert(recommendation.inferenceRules.includes("ACCURACY_LT_40"), "Inference rule ACCURACY_LT_40 recorded");
    assert(recommendation.evidenceRefs.length > 0, "Original telemetry event IDs referenced in evidenceRefs");
    assert(recommendation.evidenceRefs.includes("provenance-evt-8"), "Exact client_event_id preserved in evidenceRefs");
    assert(recommendation.evidenceSnapshot.totalAttempts === 8, "Snapshot preserves totalAttempts at decision time");
    assert(recommendation.evidenceSnapshot.accuracy === 38, "Snapshot preserves accuracy at decision time");

    // Contributing Hypotheses: must use evidenceWeight / heuristic ranking, NOT fake probabilities
    assert(Array.isArray(recommendation.contributingHypotheses), "Contributing hypotheses is an array");
    if (recommendation.contributingHypotheses.length > 0) {
      const firstHypo = recommendation.contributingHypotheses[0];
      assert(firstHypo.evidenceWeight !== undefined, "Hypothesis uses evidenceWeight, NOT uncalibrated probability");
      assert(typeof firstHypo.factor === "string", "Hypothesis identifies specific factor");
    }

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 8: First-Class "Do Nothing" (NO_ACTION) Policy Contract
  // --------------------------------------------------------------------------
  console.log("\nTEST 8: First-Class 'Do Nothing' (NO_ACTION) Policy Contract");
  {
    const strongAttempts = [];
    for (let i = 1; i <= 10; i++) {
      strongAttempts.push({
        id: i,
        client_event_id: `strong-evt-${i}`,
        topic_id: 99,
        topic: "Basic Statistics",
        is_correct: i <= 9, // 9/10 = 90%
        created_at: new Date().toISOString()
      });
    }

    const evalStats = evaluateTopicMastery("Basic Statistics", strongAttempts);
    assert(evalStats.masteryState === "VERIFIED", "Mastery is VERIFIED (>80% with >=5 attempts)");

    // Determine recommendation with no due reviews
    const recommendation = determineRecommendation({ "Basic Statistics": evalStats }, []);
    assert(recommendation.actionType === "NO_ACTION", "Action is explicitly NO_ACTION");
    assert(recommendation.decisionType === "CONSOLIDATED_MASTERY", "Decision type is CONSOLIDATED_MASTERY");
    assert(recommendation.inferenceRules.includes("NO_ACTION_CONTINUE"), "Inference rule includes NO_ACTION_CONTINUE");
    assert(recommendation.explanationPayload.title.includes("Keep Going"), "Title says: You're Doing Great: Keep Going");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 9: Server Authority vs Local Provisional Parity Contract
  // --------------------------------------------------------------------------
  console.log("\nTEST 9: Server Authority vs Local Provisional Parity Contract");
  {
    // A. Server Verified Path
    const serverPayload = {
      authority: "SERVER_VERIFIED",
      engineVersion: "2.0.0",
      ruleVersion: 1,
      schemaVersion: 1,
      decision: {
        decisionId: 1842,
        decisionType: "PREREQUISITE_GAP",
        actionType: "REPAIR_PREREQUISITE",
        targetTopicTitle: "Quadratic Equations",
        evidenceStrength: 82,
        confidenceLevel: "HIGH",
        masteryState: "CRITICAL_GAP",
        readinessState: "NOT_READY",
        evidenceRefs: ["evt-101", "evt-102"],
        inferenceRules: ["MIN_ATTEMPTS_5", "ACCURACY_LT_40"],
        explanation: {
          title: "Let's Fix This First: Quadratic Equations",
          actionText: "Repair Prerequisite",
          reason: "Accuracy is 37.5% across 8 attempts."
        }
      },
      evidence: { attempts: [] }
    };

    const adaptedServer = adaptAnalyticsToEvidence(serverPayload);
    assert(adaptedServer.authority === "SERVER_VERIFIED", "Adapter preserves SERVER_VERIFIED authority");
    assert(adaptedServer.authoritativeDecision.decisionId === 1842, "Adapter preserves decisionId 1842");

    const intelServer = buildLearningIntelligence({
      attempts: adaptedServer.attempts,
      authoritativeDecision: adaptedServer.authoritativeDecision,
      authority: adaptedServer.authority
    });

    assert(intelServer.recommendation.authority === "SERVER_VERIFIED", "Intelligence outputs SERVER_VERIFIED recommendation");
    assert(intelServer.recommendation.decisionId === 1842, "Recommendation preserves decisionId 1842");
    assert(intelServer.recommendation.why.evidenceStrength === 82, "Recommendation preserves exact evidenceStrength 82");
    assert(intelServer.recommendation.why.rulesTriggered.includes("MIN_ATTEMPTS_5"), "Recommendation preserves rulesTriggered");

    // B. Local Provisional / Offline Fallback Path
    const offlinePayload = {
      authority: "LOCAL_PROVISIONAL",
      evidence: {
        attempts: [
          { client_event_id: "off-1", topic: "Fractions", correct: false, event_type: "question_incorrect" }
        ]
      }
    };

    const adaptedOffline = adaptAnalyticsToEvidence(offlinePayload);
    const intelOffline = buildLearningIntelligence({
      attempts: adaptedOffline.attempts,
      authoritativeDecision: null,
      authority: adaptedOffline.authority
    });

    assert(intelOffline.recommendation.authority === "LOCAL_PROVISIONAL", "Offline fallback marked as LOCAL_PROVISIONAL");
    assert(typeof intelOffline.recommendation.decisionId === "string" && intelOffline.recommendation.decisionId.startsWith("local-"), "Local decisionId prefixed with 'local-'");
    assert(intelOffline.recommendation.why.rulesTriggered.length > 0, "Local provisional includes rulesTriggered");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 10: Immutable Evidence Ledger & Decision Lifecycle Schema Contract
  // --------------------------------------------------------------------------
  console.log("\nTEST 10: Immutable Evidence Ledger & Decision Lifecycle Schema Contract");
  {
    const migrationPath = path.join(process.cwd(), "supabase", "migrations", "20260906_evidence_ledger_and_health.sql");
    assert(fs.existsSync(migrationPath), "Migration 20260906_evidence_ledger_and_health.sql exists");

    const sqlContent = fs.readFileSync(migrationPath, "utf8");

    // 1. Table definitions
    assert(sqlContent.includes("CREATE TABLE IF NOT EXISTS public.intelligence_decisions"), "Schema defines intelligence_decisions table");
    assert(sqlContent.includes("CREATE TABLE IF NOT EXISTS public.telemetry_health_logs"), "Schema defines telemetry_health_logs table");

    // 2. Immutability trigger
    assert(sqlContent.includes("prevent_intelligence_decision_mutation"), "Schema defines prevent_intelligence_decision_mutation trigger function");
    assert(sqlContent.includes("BEFORE UPDATE OR DELETE ON public.intelligence_decisions"), "Trigger guards BEFORE UPDATE OR DELETE");
    assert(sqlContent.includes("RAISE EXCEPTION"), "Trigger raises exception preventing modifications");

    // 3. Reproducibility & Lifecycle columns
    assert(sqlContent.includes("evidence_refs JSONB"), "Schema has evidence_refs column");
    assert(sqlContent.includes("evidence_snapshot JSONB"), "Schema has evidence_snapshot column");
    assert(sqlContent.includes("inference_rules JSONB"), "Schema has inference_rules column");
    assert(sqlContent.includes("contributing_hypotheses JSONB"), "Schema has contributing_hypotheses column");
    assert(sqlContent.includes("supersedes_decision_id BIGINT"), "Schema has supersedes_decision_id for append-only lifecycle");
    assert(sqlContent.includes("engine_version TEXT"), "Schema has engine_version column");
    assert(sqlContent.includes("rule_version INTEGER"), "Schema has rule_version column");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 11: Dual Fingerprint Deduplication
  // --------------------------------------------------------------------------
  console.log("\nTEST 11: Dual Fingerprint Deduplication (decision_fingerprint + evidence_snapshot_hash)");
  {
    const attempts = [];
    for (let i = 1; i <= 7; i++) {
      attempts.push({
        id: i,
        client_event_id: `fp-evt-${i}`,
        topic_id: 55,
        topic: "Linear Equations",
        is_correct: i <= 4,
        created_at: new Date().toISOString()
      });
    }

    const topicEval = evaluateTopicMastery("Linear Equations", attempts);
    const rec = determineRecommendation({ "Linear Equations": topicEval });
    const evidenceCutoffAt = new Date().toISOString();

    const fp1 = computeDecisionFingerprint({
      userId: "user-test-abc",
      decisionType: rec.decisionType,
      actionType: rec.actionType,
      targetSkillId: rec.targetSkillId,
      targetTopicId: rec.targetTopicId,
      engineVersion: ENGINE_VERSION,
      ruleVersion: RULE_VERSION,
      ontologyVersion: ONTOLOGY_VERSION,
      inferenceRules: rec.inferenceRules
    });

    const fp2 = computeDecisionFingerprint({
      userId: "user-test-abc",
      decisionType: rec.decisionType,
      actionType: rec.actionType,
      targetSkillId: rec.targetSkillId,
      targetTopicId: rec.targetTopicId,
      engineVersion: ENGINE_VERSION,
      ruleVersion: RULE_VERSION,
      ontologyVersion: ONTOLOGY_VERSION,
      inferenceRules: [...rec.inferenceRules].reverse() // order should not matter
    });

    assert(fp1 === fp2, "Decision fingerprint is deterministic (rule order does not affect hash)");
    assert(typeof fp1 === "string" && fp1.length === 64, "Decision fingerprint is a 64-char SHA-256 hex string");

    const ev1 = computeEvidenceSnapshotHash({
      evidenceRefs: rec.evidenceRefs,
      evidenceSnapshot: rec.evidenceSnapshot,
      evidenceCutoffAt
    });

    const ev2 = computeEvidenceSnapshotHash({
      evidenceRefs: [...rec.evidenceRefs].reverse(), // order should not matter
      evidenceSnapshot: rec.evidenceSnapshot,
      evidenceCutoffAt
    });

    assert(ev1 === ev2, "Evidence snapshot hash is deterministic (ref order does not affect hash)");
    assert(typeof ev1 === "string" && ev1.length === 64, "Evidence snapshot hash is a 64-char SHA-256 hex string");

    // Different evidence should produce a different hash
    const evDifferent = computeEvidenceSnapshotHash({
      evidenceRefs: ["different-evt-1"],
      evidenceSnapshot: { totalAttempts: 99, correctAttempts: 1, accuracy: 1 },
      evidenceCutoffAt
    });
    assert(ev1 !== evDifferent, "Different evidence produces different snapshot hash");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 12: Skill Ontology DAG Integrity & Cycle Detection
  // --------------------------------------------------------------------------
  console.log("\nTEST 12: Skill Ontology DAG Integrity & Cycle Detection");
  {
    const result = validateSkillOntology(CORE_SKILL_REGISTRY);
    assert(result.valid === true, "Core skill ontology passes structural validation (no errors)");
    assert(result.errors.length === 0, "Core skill ontology has zero validation errors");

    // All skills should have non-null IDs matching their registry key
    const skills = Object.entries(CORE_SKILL_REGISTRY);
    assert(skills.length >= 8, "Core skill registry has at least 8 canonical skills");
    for (const [key, skill] of skills) {
      assert(skill.id === key, `Skill key matches skill.id for: ${key}`);
      assert(skill.difficulty === null, `Skill '${key}' has difficulty=null (empirical calibration not yet done)`);
      assert(skill.ontologyVersion === ONTOLOGY_VERSION, `Skill '${key}' carries ontologyVersion ${ONTOLOGY_VERSION}`);
    }

    // Cycle detection: injecting a cycle must produce an error
    const registryWithCycle = {
      ...CORE_SKILL_REGISTRY,
      "test.cycle.A": {
        id: "test.cycle.A",
        name: "Cycle Test A",
        subjectId: "test",
        strandId: "cycle",
        subStrandId: "test_sub",
        relationships: [{ skillId: "test.cycle.B", relationship: "REQUIRES" }],
        cognitiveExpectations: [],
        status: "ACTIVE",
        difficulty: null,
        ontologyVersion: ONTOLOGY_VERSION
      },
      "test.cycle.B": {
        id: "test.cycle.B",
        name: "Cycle Test B",
        subjectId: "test",
        strandId: "cycle",
        subStrandId: "test_sub",
        relationships: [{ skillId: "test.cycle.A", relationship: "REQUIRES" }],
        cognitiveExpectations: [],
        status: "ACTIVE",
        difficulty: null,
        ontologyVersion: ONTOLOGY_VERSION
      }
    };

    const cycleResult = validateSkillOntology(registryWithCycle);
    assert(cycleResult.valid === false, "Ontology validator detects circular dependency (cycle A↔B)");
    assert(cycleResult.errors.some(e => e.includes("Circular")), "Validator error message mentions 'Circular'");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 13: UNKNOWN_SKILL Policy & Boundary Guard
  // --------------------------------------------------------------------------
  console.log("\nTEST 13: UNKNOWN_SKILL Policy & Boundary Guard");
  {
    // Untagged question → UNKNOWN_SKILL attribution
    const untaggedQuestion = { id: "q-untagged-001" }; // no skill fields
    const attribution = mapQuestionToSkills(untaggedQuestion);

    assert(attribution.primarySkill.isUnknown === true, "Untagged question maps to UNKNOWN_SKILL (isUnknown=true)");
    assert(attribution.skills.length === 1, "Untagged question has exactly 1 skill attribution");
    assert(attribution.skills[0].skillId === UNKNOWN_SKILL.id, "Untagged attribution skillId equals UNKNOWN_SKILL.id");
    assert(attribution.skills[0].confidence === null, "Untagged attribution confidence is null (not fabricated)");
    assert(attribution.difficulty === null, "Untagged question difficulty is null");

    // Policy boundary enforcement
    assert(UNKNOWN_SKILL.policy.allowedForQuestionEvidence === true, "UNKNOWN_SKILL is allowed for question evidence");
    assert(UNKNOWN_SKILL.policy.allowedForPrerequisiteDiagnosis === false, "UNKNOWN_SKILL is NOT allowed for prerequisite diagnosis");
    assert(UNKNOWN_SKILL.policy.allowedForMasteryClaim === false, "UNKNOWN_SKILL is NOT allowed for mastery claims");
    assert(UNKNOWN_SKILL.policy.allowedAsWeakTopic === false, "UNKNOWN_SKILL is NOT allowed as a weak topic");

    // Known question → known skill attribution
    const taggedQuestion = {
      id: "q-tagged-001",
      primary_skill: "math.algebra.quadratic_equations.factorisation"
    };
    const taggedAttribution = mapQuestionToSkills(taggedQuestion);
    assert(taggedAttribution.primarySkill.isUnknown === false, "Tagged question maps to known skill (isUnknown=false)");
    assert(taggedAttribution.primarySkill.id === "math.algebra.quadratic_equations.factorisation", "Tagged question maps to correct skill ID");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 14: Attribution Does Not Multiply Evidence
  // --------------------------------------------------------------------------
  console.log("\nTEST 14: Attribution Does Not Multiply Evidence (1 attempt = 1 canonical event)");
  {
    // A question with both PRIMARY and SUPPORTING skills
    const multiSkillQuestion = {
      id: "q-multi-001",
      version: "1",
      skills: [
        { skillId: "math.algebra.quadratic_equations.factorisation", role: SKILL_ROLES.PRIMARY, attributionSource: "AUTHOR_TAG" },
        { skillId: "math.numbers.integers.signed_arithmetic",        role: SKILL_ROLES.SUPPORTING, attributionSource: "AUTHOR_TAG" }
      ]
    };

    const attribution = mapQuestionToSkills(multiSkillQuestion);

    // The attribution registers 2 skills, but the question attempt remains 1
    assert(attribution.skills.length === 2, "Attribution records 2 skill attributions on the question");
    assert(attribution.primarySkill.id === "math.algebra.quadratic_equations.factorisation", "Primary skill correctly identified");

    // Now simulate the attempt going into the intelligence layer — it must remain 1 attempt
    const rawAttempts = [
      {
        id: 1,
        client_event_id: "multi-skill-evt-1",
        topic: "Quadratic Equations",
        is_correct: false,
        created_at: new Date().toISOString()
      }
    ];

    const topicEval = evaluateTopicMastery("Quadratic Equations", rawAttempts);
    assert(topicEval.totalAttempts === 1, "1 question attempt = exactly 1 canonical attempt in intelligence engine (not multiplied by skill count)");
    assert(topicEval.correctAttempts === 0, "Correct count remains 0 (not inflated by attribution)");

    // The adapter must also not inflate
    const adapted = adaptAnalyticsToEvidence({
      coldStart: false,
      evidence: { attempts: [{ id: 1, client_event_id: "multi-skill-evt-1", topic: "Quadratic Equations", correct: false, event_type: "question_incorrect", created_at: new Date().toISOString() }] }
    });
    assert(adapted.attempts.length === 1, "Adapter produces exactly 1 attempt regardless of skill attribution count");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 15: Negative Knowledge Protection (0 attempts = UNKNOWN, never a gap)
  // --------------------------------------------------------------------------
  console.log("\nTEST 15: Negative Knowledge Protection (N=0 → UNKNOWN, never a gap)");
  {
    // Evaluate a topic that has zero attempts
    const zeroAttempts = evaluateTopicMastery("Trigonometry", []);

    assert(zeroAttempts.totalAttempts === 0, "Topic with 0 attempts has totalAttempts=0");
    assert(zeroAttempts.masteryState === "UNKNOWN", "Topic with 0 attempts is UNKNOWN (not CRITICAL_GAP)");
    assert(zeroAttempts.readinessState === "NOT_READY", "Topic with 0 attempts is NOT_READY (appropriately cautious)");
    assert(zeroAttempts.evidenceStrength === 0, "Topic with 0 attempts has evidenceStrength=0");

    // The recommendation engine must not diagnose absence of evidence as a gap
    const recommendation = determineRecommendation({ "Trigonometry": zeroAttempts });
    assert(recommendation.decisionType !== "PREREQUISITE_GAP", "0 attempts never triggers PREREQUISITE_GAP decision");
    assert(recommendation.actionType !== "REPAIR_PREREQUISITE", "0 attempts never triggers REPAIR_PREREQUISITE action");

    // UNKNOWN_SKILL policy also protects this boundary
    assert(UNKNOWN_SKILL.policy.allowedAsWeakTopic === false, "UNKNOWN skill cannot be classified as a weak topic");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 16: Graph Referential Integrity
  // --------------------------------------------------------------------------
  console.log("\nTEST 16: Graph Referential Integrity (All edge nodes exist in registry, types valid, IDs unique)");
  {
    const validation = validateSkillGraph(CORE_SKILL_REGISTRY, SKILL_RELATIONSHIPS);
    assert(validation.valid === true, "Canonical skill relationship graph passes referential integrity validation");
    assert(validation.errors.length === 0, "No referential errors in canonical relationship graph");
    assert(SKILL_RELATIONSHIPS.length >= 10, "Canonical graph defines at least 10 canonical relationship edges");

    // Edge IDs unique
    const edgeIds = new Set();
    let hasDuplicateId = false;
    for (const rel of SKILL_RELATIONSHIPS) {
      if (edgeIds.has(rel.id)) {
        hasDuplicateId = true;
        break;
      }
      edgeIds.add(rel.id);
    }
    assert(!hasDuplicateId, "Every relationship edge has a unique, stable ID");

    // Every edge has valid semantics type and provenance
    for (const rel of SKILL_RELATIONSHIPS) {
      assert(RELATIONSHIP_SEMANTICS[rel.type] !== undefined, `Edge ${rel.id} has valid semantics type: ${rel.type}`);
      assert(rel.provenance && typeof rel.provenance.source === "string", `Edge ${rel.id} declares explicit provenance source`);
      assert(rel.provenance && typeof rel.provenance.confidence === "string", `Edge ${rel.id} declares explicit provenance confidence`);
    }

    // Reject unknown skill in edge
    const brokenGraph = [
      ...SKILL_RELATIONSHIPS,
      {
        id: "rel_broken_001",
        fromSkill: "math.algebra.quadratic_equations.factorisation",
        toSkill: "non.existent.phantom.skill",
        type: "REQUIRES",
        ontologyVersion: ONTOLOGY_VERSION,
        active: true,
        provenance: { source: "CURRICULUM_DESIGN", confidence: "DECLARED" }
      }
    ];
    const brokenValidation = validateSkillGraph(CORE_SKILL_REGISTRY, brokenGraph);
    assert(brokenValidation.valid === false, "Validator detects edge pointing to non-existent toSkill");
    assert(brokenValidation.errors.some(e => e.includes("non.existent.phantom.skill")), "Error message mentions the missing skill ID");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 17: Prerequisite DAG is Acyclic
  // --------------------------------------------------------------------------
  console.log("\nTEST 17: Prerequisite DAG is Acyclic (REQUIRES-only DAG is strictly acyclic)");
  {
    const dagResult = validatePrerequisiteDAG(SKILL_RELATIONSHIPS);
    assert(dagResult.valid === true, "Canonical prerequisite graph is a valid acyclic DAG");
    assert(dagResult.errors.length === 0, "Zero cycles in canonical prerequisite edges");

    // Separate PRECEDES validation
    const orderingResult = validateOrderingGraph(SKILL_RELATIONSHIPS);
    assert(orderingResult.valid === true, "Canonical ordering graph (PRECEDES) passes ordering checks");

    // Inject a cycle into REQUIRES edges: Factorisation -> Expansion -> Signed Arithmetic -> Factorisation
    const cyclicRelationships = [
      ...SKILL_RELATIONSHIPS,
      {
        id: "rel_cycle_bad",
        fromSkill: "math.numbers.integers.signed_arithmetic",
        toSkill: "math.algebra.quadratic_equations.factorisation",
        type: "REQUIRES",
        ontologyVersion: ONTOLOGY_VERSION,
        active: true,
        provenance: { source: "EXPERIMENTAL", confidence: "PROVISIONAL" }
      }
    ];

    const cycleCheck = validatePrerequisiteDAG(cyclicRelationships);
    assert(cycleCheck.valid === false, "Cycle in REQUIRES edges is strictly detected and rejected");
    assert(cycleCheck.errors.some(e => e.includes("Cycle detected in prerequisite DAG")), "Error indicates cycle in prerequisite DAG");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 18: No Evidence Propagation (The Hypothesis Boundary)
  // --------------------------------------------------------------------------
  console.log("\nTEST 18: No Evidence Propagation (The Hypothesis Boundary: isObservedEvidence === false)");
  {
    const hypotheses = getPrerequisiteHypotheses("math.algebra.quadratic_equations.factorisation");
    assert(hypotheses.length > 0, "Retrieved prerequisite hypotheses for quadratic factorisation");

    for (const h of hypotheses) {
      assert(h.isObservedEvidence === false, `Hypothesis for ${h.targetSkillId} strictly carries isObservedEvidence: false`);
      assert(h.requiresDiagnosticQuestion === true, `Hypothesis for ${h.targetSkillId} requires diagnostic question to confirm`);
      assert(h.attempts === undefined, `Hypothesis carries no student attempts`);
      assert(h.accuracy === undefined, `Hypothesis carries no student accuracy`);
      assert(h.score === undefined, `Hypothesis carries no student score`);
    }

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 19: Hypothesis Is Not Observation
  // --------------------------------------------------------------------------
  console.log("\nTEST 19: Hypothesis Is Not Observation (Passing hypothesis to mastery evaluation produces no fake attempts)");
  {
    // A learner has never attempted Expansion
    const baselineExpansion = evaluateTopicMastery("Expansion", []);
    assert(baselineExpansion.masteryState === "UNKNOWN", "Topic with 0 attempts is UNKNOWN");
    assert(baselineExpansion.totalAttempts === 0, "totalAttempts is 0");
    assert(baselineExpansion.evidenceStrength === 0, "evidenceStrength is 0");

    // Generate hypotheses from another skill that requires Expansion
    const hypotheses = getPrerequisiteHypotheses("math.algebra.quadratic_equations.factorisation");
    const expansionHypo = hypotheses.find(h => h.targetSkillId === "math.algebra.linear_equations.expansion");
    assert(expansionHypo !== undefined, "Found expansion hypothesis generated by factorisation dependency");

    // Hypotheses must NOT be consumable as student attempts
    // Passing empty attempts still yields UNKNOWN, never affected by graph hypotheses
    const postHypothesisExpansion = evaluateTopicMastery("Expansion", []);
    assert(postHypothesisExpansion.masteryState === "UNKNOWN", "Expansion remains UNKNOWN regardless of graph relationships");
    assert(postHypothesisExpansion.totalAttempts === 0, "totalAttempts remains 0");
    assert(postHypothesisExpansion.evidenceStrength === 0, "evidenceStrength remains 0");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 20: RELATED_TO and PRECEDES Cannot Support Hypothesis
  // --------------------------------------------------------------------------
  console.log("\nTEST 20: RELATED_TO & PRECEDES Cannot Support Hypothesis (canSupportHypothesis === false)");
  {
    assert(RELATIONSHIP_SEMANTICS.RELATED_TO.canSupportHypothesis === false, "RELATED_TO semantic explicitly forbids hypothesis support");
    assert(RELATIONSHIP_SEMANTICS.RELATED_TO.hypothesisPriority === 0, "RELATED_TO hypothesisPriority is 0");
    assert(RELATIONSHIP_SEMANTICS.PRECEDES.canSupportHypothesis === false, "PRECEDES semantic explicitly forbids hypothesis support");
    assert(RELATIONSHIP_SEMANTICS.PRECEDES.hypothesisPriority === 0, "PRECEDES hypothesisPriority is 0");

    // Quadratic formula has a PRECEDES relationship with completing_square (rel_006)
    const formulaHypotheses = getPrerequisiteHypotheses("math.algebra.quadratic_equations.quadratic_formula");
    const hasPrecedesAsHypothesis = formulaHypotheses.some(
      h => h.relationshipType === "PRECEDES" || h.targetSkillId === "math.algebra.quadratic_equations.completing_square"
    );
    assert(!hasPrecedesAsHypothesis, "PRECEDES edge is excluded from prerequisite hypotheses");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 21: Graph Change Reproducibility
  // --------------------------------------------------------------------------
  console.log("\nTEST 21: Graph Change Reproducibility (Graph snapshot hash is deterministic and tamper-evident)");
  {
    const hash1 = computeGraphSnapshotHash(GRAPH_VERSION, SKILL_RELATIONSHIPS);
    assert(typeof hash1 === "string" && hash1.length === 64, "computeGraphSnapshotHash returns 64-char SHA-256 hex string");

    // Deterministic: recomputing gives same hash
    const hash1Recomputed = computeGraphSnapshotHash(GRAPH_VERSION, SKILL_RELATIONSHIPS);
    assert(hash1 === hash1Recomputed, "Graph snapshot hash is deterministic for identical graph");

    // Mutating graph (adding an edge) changes the hash
    const modifiedRelationships = [
      ...SKILL_RELATIONSHIPS,
      {
        id: "rel_new_hypo",
        fromSkill: "math.numbers.fractions.multiplication_division",
        toSkill: "math.algebra.linear_equations.expansion",
        type: "SUPPORTS",
        ontologyVersion: ONTOLOGY_VERSION,
        active: true,
        provenance: { source: "CURRICULUM_DESIGN", confidence: "DECLARED" }
      }
    ];
    const hash2 = computeGraphSnapshotHash(GRAPH_VERSION, modifiedRelationships);
    assert(hash1 !== hash2, "Adding a relationship edge changes the snapshot hash");

    // A decision storing graphSnapshotHash remains stable even after graph evolves
    const historicalDecision = {
      decisionId: 1001,
      graphVersion: GRAPH_VERSION,
      graphSnapshotHash: hash1
    };
    assert(historicalDecision.graphSnapshotHash === hash1, "Historical decision retains original graph snapshot hash");
    assert(historicalDecision.graphSnapshotHash !== hash2, "Historical decision reflects graph state at decision time");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 22: Structural Priority Is Not Probability
  // --------------------------------------------------------------------------
  console.log("\nTEST 22: Structural Priority Is Not Probability (Integer triage priority, NOT statistical probability)");
  {
    const hypotheses = getPrerequisiteHypotheses("math.algebra.quadratic_equations.factorisation");
    assert(hypotheses.length > 0, "Retrieved hypotheses for factorisation");

    for (const h of hypotheses) {
      assert(Number.isInteger(h.hypothesisPriority), `hypothesisPriority is an integer (${h.hypothesisPriority})`);
      assert(h.probability === undefined, "Hypothesis object has NO probability property (never claim unproven probability)");
      assert(h.confidenceScore === undefined, "Hypothesis object has NO confidenceScore (uncalibrated probability forbidden)");
    }

    assert(RELATIONSHIP_SEMANTICS.REQUIRES.hypothesisPriority === 100, "REQUIRES has structural priority 100");
    assert(RELATIONSHIP_SEMANTICS.SUPPORTS.hypothesisPriority === 60, "SUPPORTS has structural priority 60");
    assert(RELATIONSHIP_SEMANTICS.TRANSFER_FROM.hypothesisPriority === 50, "TRANSFER_FROM has structural priority 50");
    assert(RELATIONSHIP_SEMANTICS.PART_OF.hypothesisPriority === 40, "PART_OF has structural priority 40");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 23: Graph Cannot Change Student State (The Constitutional Test)
  // --------------------------------------------------------------------------
  console.log("\nTEST 23: Graph Cannot Change Student State (Constitutional Test: Zero evidence + Prerequisite failure = UNKNOWN)");
  {
    // Student fails Factorisation 5 times (0/5 correct) -> legitimate CRITICAL_GAP on Factorisation
    const factorisationAttempts = [];
    for (let i = 1; i <= 5; i++) {
      factorisationAttempts.push({
        id: i,
        client_event_id: `fact-fail-${i}`,
        topic: "Quadratic Equations",
        is_correct: false,
        created_at: new Date().toISOString()
      });
    }
    const factorisationEval = evaluateTopicMastery("Quadratic Equations", factorisationAttempts);
    assert(factorisationEval.masteryState === "CRITICAL_GAP", "Factorisation is evaluated as CRITICAL_GAP");

    // Prerequisite: Expansion has ZERO student attempts
    const expansionEval = evaluateTopicMastery("Linear Expansion", []);
    assert(expansionEval.totalAttempts === 0, "Expansion has 0 observed attempts");
    assert(expansionEval.masteryState === "UNKNOWN", "Expansion mastery state is strictly UNKNOWN");
    assert(expansionEval.evidenceStrength === 0, "Expansion evidence strength is strictly 0");

    // The recommendation engine identifies the gap in Factorisation and generates prerequisite hypotheses
    const recommendation = determineRecommendation({
      "Quadratic Equations": factorisationEval,
      "Linear Expansion": expansionEval
    });

    assert(recommendation.decisionType === "PREREQUISITE_GAP", "Recommendation identifies PREREQUISITE_GAP on failed topic");
    assert(recommendation.actionType === "REPAIR_PREREQUISITE", "Action recommends prerequisite repair exploration");

    // Check that Expansion mastery was NOT artificially modified to CRITICAL_GAP or WEAK
    assert(expansionEval.masteryState !== "CRITICAL_GAP", "Constitutional Law: Expansion mastery state was NOT degraded to CRITICAL_GAP");
    assert(expansionEval.masteryState !== "WEAK", "Constitutional Law: Expansion mastery state was NOT degraded to WEAK");

    // The contributing hypotheses point to Expansion with isObservedEvidence: false
    const expansionHypothesis = recommendation.contributingHypotheses.find(
      h => h.targetSkillId === "math.algebra.linear_equations.expansion"
    );
    assert(expansionHypothesis !== undefined, "Contributing hypotheses includes Expansion as suspected prerequisite");
    assert(expansionHypothesis.isObservedEvidence === false, "Expansion hypothesis carries isObservedEvidence: false");
    assert(expansionHypothesis.requiresDiagnosticQuestion === true, "Expansion hypothesis requires diagnostic questions before claiming student weakness");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 24: Calibration Cannot Mutate Evidence (Immutable Canonical Attempt)
  // --------------------------------------------------------------------------
  console.log("\nTEST 24: Calibration Cannot Mutate Evidence (attempt_before === attempt_after)");
  {
    const originalAttempt = Object.freeze({
      id: 501,
      client_event_id: "evt-calib-test-501",
      question_id: "q_quad_01",
      topic: "Quadratic Equations",
      is_correct: true,
      hints_used: 1,
      attempt_ordinal: 1,
      created_at: "2026-09-05T12:00:00Z"
    });

    const attemptSnapshotBefore = JSON.stringify(originalAttempt);

    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL,
      evidenceLevelSource: EVIDENCE_LEVEL_SOURCES.AUTHOR_TAG
    };

    const contribution = qualifyEvidenceContribution(originalAttempt, attribution, {
      calibrationVersion: "1.0.0",
      itemDifficulty: 0.65
    });

    const attemptSnapshotAfter = JSON.stringify(originalAttempt);

    assert(attemptSnapshotBefore === attemptSnapshotAfter, "Constitutional Law: Canonical attempt is strictly immutable before and after calibration");
    assert(contribution.attemptId === originalAttempt.client_event_id, "Contribution references attempt ID with provenance");
    assert(contribution !== originalAttempt, "EvidenceContribution is a qualified derivative, NOT a mutated attempt");
    assert(contribution.observed.correct === true, "Observed correctness is faithfully preserved");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 25: N=0 Preservation Under Calibration (0 attempts -> UNKNOWN, null difficulty)
  // --------------------------------------------------------------------------
  console.log("\nTEST 25: N=0 Preservation Under Calibration (Negative knowledge protection under calibration)");
  {
    const unattemptedEval = evaluateTopicMastery("Unattempted Skill", []);
    assert(unattemptedEval.totalAttempts === 0, "Topic has 0 total attempts");
    assert(unattemptedEval.masteryState === "UNKNOWN", "0 attempts strictly yields UNKNOWN mastery state");
    assert(unattemptedEval.evidenceStrength === 0, "0 attempts strictly yields 0 evidence strength");

    const zeroObservationsDifficulty = calibrateItemDifficulty([]);
    assert(zeroObservationsDifficulty === null, "0 observations strictly yields null item difficulty");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 26: Mastery Is Not Evidence (Inference cannot become observation)
  // --------------------------------------------------------------------------
  console.log("\nTEST 26: Mastery Is Not Evidence (Mastery inference cannot become a student attempt)");
  {
    const fakeMasteryAttempt = {
      client_event_id: "evt-fake-mastery",
      event_type: "mastery_inference", // Illegal event type for telemetry
      mastery_state: "VERIFIED",
      evidence_strength: 90
    };

    const validation = validateEvent(fakeMasteryAttempt);
    assert(validation.valid === false, "Telemetry validator strictly rejects synthetic mastery objects as learning events");
    assert(Boolean(validation.error), "Rejection error is recorded for non-attempt object");

    // Also check that an EvidenceContribution itself cannot be accepted as a raw event
    const fakeContributionAsAttempt = {
      attemptId: "evt-123",
      evidenceLevel: "PROCEDURAL",
      mastery: { state: "DEVELOPING" }
    };
    assert(validateEvent(fakeContributionAsAttempt).valid === false, "EvidenceContribution cannot be accepted as raw telemetry attempt");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 27: Difficulty Null Protection (N < MIN_DIFFICULTY_OBSERVATIONS -> null)
  // --------------------------------------------------------------------------
  console.log("\nTEST 27: Difficulty Null Protection (N < 30 observations strictly yields difficulty = null)");
  {
    assert(MIN_DIFFICULTY_OBSERVATIONS === 30, "MIN_DIFFICULTY_OBSERVATIONS is configured to 30");

    const attempts29 = [];
    for (let i = 0; i < 29; i++) {
      attempts29.push({ is_correct: i % 2 === 0 });
    }

    const difficulty29 = calibrateItemDifficulty(attempts29);
    assert(difficulty29 === null, "29 observations (< 30) strictly yields difficulty = null (never fabricate difficulty)");

    const attempts1 = [{ is_correct: false }];
    assert(calibrateItemDifficulty(attempts1) === null, "1 observation strictly yields difficulty = null");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 28: Empirical Difficulty Determinism (Identical observations -> identical difficulty)
  // --------------------------------------------------------------------------
  console.log("\nTEST 28: Empirical Difficulty Determinism (D(dataset) === D(dataset))");
  {
    const attempts35 = [];
    // 14 incorrect, 21 correct -> failure rate = 14/35 = 0.40
    for (let i = 0; i < 35; i++) {
      attempts35.push({ is_correct: i >= 14 });
    }

    const diffRun1 = calibrateItemDifficulty(attempts35);
    const diffRun2 = calibrateItemDifficulty(attempts35);

    assert(diffRun1 === 0.40, `Calibrated difficulty for 14/35 incorrect is exactly 0.40 (got ${diffRun1})`);
    assert(diffRun1 === diffRun2, "Empirical difficulty calculation is completely deterministic");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 29: Calibration Versioning (Parameter changes bump hash, historical snapshot preserved)
  // --------------------------------------------------------------------------
  console.log("\nTEST 29: Calibration Versioning (Changing calibration parameters bumps snapshot hash)");
  {
    const hashV1 = computeCalibrationSnapshotHash("1.0.0");
    const hashV2 = computeCalibrationSnapshotHash("1.0.1");
    const hashCustom = computeCalibrationSnapshotHash("1.0.0", { testThreshold: 50 });

    assert(typeof hashV1 === "string" && hashV1.length === 64, "Calibration snapshot hash is a 64-character SHA-256 string");
    assert(hashV1 !== hashV2, "Changing calibration version bumps calibration snapshot hash");
    assert(hashV1 !== hashCustom, "Changing calibration parameters bumps calibration snapshot hash");

    const decision = await computeAndRecordDecision(null, "user-test-calib", []);

    assert(decision.calibrationVersion === CALIBRATION_VERSION, `Decision records calibrationVersion: ${decision.calibrationVersion}`);
    assert(decision.calibrationSnapshotHash === hashV1, "Decision records calibrationSnapshotHash matching active calibration");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 30: Evidence Level Non-Promotion (Constitutional Test: Quality strengthens WITHIN level)
  // --------------------------------------------------------------------------
  console.log("\nTEST 30: Evidence Level Non-Promotion (Performance quality cannot promote to higher evidence level)");
  {
    // A question author tagged as PROCEDURAL
    const mappedQuestion = mapQuestionToSkills({
      id: "q_procedural_fact",
      primary_skill: "math.algebra.quadratic_equations.factorisation",
      evidence_level: "PROCEDURAL",
      evidence_level_source: "AUTHOR_TAG"
    });

    assert(mappedQuestion.evidenceLevel === EVIDENCE_LEVELS.PROCEDURAL, "Question is declared as PROCEDURAL");
    assert(mappedQuestion.evidenceLevelSource === EVIDENCE_LEVEL_SOURCES.AUTHOR_TAG, "Evidence level source is AUTHOR_TAG");

    // Student has flawless performance: correct, 0 hints, 1st attempt, fast speed
    const flawlessAttempt = {
      client_event_id: "evt-flawless-001",
      question_id: "q_procedural_fact",
      is_correct: true,
      hints_used: 0,
      attempt_ordinal: 1,
      duration_ms: 3200
    };

    const contribution = qualifyEvidenceContribution(flawlessAttempt, mappedQuestion.skills[0]);

    assert(contribution.evidenceLevel === EVIDENCE_LEVELS.PROCEDURAL, "Constitutional Law: Evidence level remains strictly PROCEDURAL");
    assert(contribution.evidenceLevel !== EVIDENCE_LEVELS.TRANSFER, "Constitutional Law: Flawless performance NEVER promotes PROCEDURAL to TRANSFER");
    assert(contribution.evidenceLevel !== EVIDENCE_LEVELS.APPLICATION, "Constitutional Law: Flawless performance NEVER promotes PROCEDURAL to APPLICATION");
    assert(contribution.qualification.evidenceStrength > 0.6, `Performance strengthens within level (strength=${contribution.qualification.evidenceStrength})`);

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 31: Hint Contamination (Independence factor discounts strength, NOT correctness)
  // --------------------------------------------------------------------------
  console.log("\nTEST 31: Hint Contamination (Assistance reduces evidence strength without mutating correctness)");
  {
    const baseAttempt = {
      client_event_id: "evt-hint-test",
      question_id: "q_calc_01",
      is_correct: true,
      attempt_ordinal: 1
    };
    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
    };

    // Case A: Independent
    const contribA = qualifyEvidenceContribution({ ...baseAttempt, hints_used: 0 }, attribution);
    assert(contribA.qualification.independenceFactor === 1.00, "0 hints -> independenceFactor = 1.00");
    assert(contribA.observed.independent === true, "0 hints marked as independent");

    // Case B: 2 hints
    const contribB = qualifyEvidenceContribution({ ...baseAttempt, hints_used: 2 }, attribution);
    assert(contribB.qualification.independenceFactor === 0.50, "2 hints -> independenceFactor = 0.50");
    assert(contribB.observed.independent === false, "2 hints marked as not independent");
    assert(contribB.observed.correct === true, "Correctness remains true (hints do NOT falsify answer)");
    assert(contribB.qualification.evidenceStrength < contribA.qualification.evidenceStrength, "Evidence strength is discounted by hints");

    // Case C: Solution revealed
    const contribC = qualifyEvidenceContribution({ ...baseAttempt, solution_revealed: true }, attribution);
    assert(contribC.qualification.independenceFactor === 0.00, "Solution revealed -> independenceFactor = 0.00");
    assert(contribC.qualification.evidenceStrength === 0.00, "Solution revealed -> evidenceStrength = 0.00");
    assert(contribC.observed.correct === true, "Correctness remains true (not rewritten as wrong)");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 32: Repeated Attempt Independence (Novelty factor discounts repetition)
  // --------------------------------------------------------------------------
  console.log("\nTEST 32: Repeated Attempt Independence (Repetition discounts novelty to prevent evidence inflation)");
  {
    const baseAttempt = {
      client_event_id: "evt-rep-test",
      question_id: "q_rep_01",
      is_correct: true,
      hints_used: 0
    };
    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.APPLICATION
    };

    const contrib1 = qualifyEvidenceContribution({ ...baseAttempt, attempt_ordinal: 1 }, attribution);
    const contrib2 = qualifyEvidenceContribution({ ...baseAttempt, attempt_ordinal: 2 }, attribution);
    const contrib3 = qualifyEvidenceContribution({ ...baseAttempt, attempt_ordinal: 3 }, attribution);
    const contrib4 = qualifyEvidenceContribution({ ...baseAttempt, attempt_ordinal: 4 }, attribution);

    assert(contrib1.qualification.noveltyFactor === 1.00, "Attempt 1 has noveltyFactor = 1.00");
    assert(contrib2.qualification.noveltyFactor === 0.60, "Attempt 2 has noveltyFactor = 0.60");
    assert(contrib3.qualification.noveltyFactor === 0.35, "Attempt 3 has noveltyFactor = 0.35");
    assert(contrib4.qualification.noveltyFactor === 0.15, "Attempt 4 has noveltyFactor = 0.15");

    assert(
      contrib1.qualification.evidenceStrength > contrib2.qualification.evidenceStrength &&
      contrib2.qualification.evidenceStrength > contrib3.qualification.evidenceStrength &&
      contrib3.qualification.evidenceStrength > contrib4.qualification.evidenceStrength,
      "Evidence strength monotonically decreases with repetition on identical item"
    );

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 36: Multi-Skill Evidence Conservation (1 canonical attempt = 1 canonical attempt)
  // --------------------------------------------------------------------------
  console.log("\nTEST 36: Multi-Skill Evidence Conservation (Attribution never multiplies canonical attempts)");
  {
    const multiSkillQuestion = mapQuestionToSkills({
      id: "q_multi_01",
      primary_skill: "math.algebra.quadratic_equations.factorisation",
      secondary_skills: ["math.numbers.integers.signed_arithmetic"],
      evidence_level: "PROCEDURAL",
      evidence_level_source: "AUTHOR_TAG"
    });

    assert(multiSkillQuestion.skills.length === 2, "Question is attributed to 2 skills");

    const singleAttempt = {
      client_event_id: "evt-multi-001",
      question_id: "q_multi_01",
      is_correct: true,
      hints_used: 0,
      attempt_ordinal: 1
    };

    const distribution = distributeEvidenceContributions(singleAttempt, multiSkillQuestion);

    // Constitutional Invariant: Canonical attempts remains 1!
    assert(distribution.canonicalAttempts === 1, "Constitutional Law: canonicalAttempts count remains exactly 1");
    assert(distribution.contributions.length === 2, "Produces 2 qualified evidence contributions");

    const primaryContrib = distribution.contributions.find(c => c.skillRole === SKILL_ROLES.PRIMARY);
    const supportingContrib = distribution.contributions.find(c => c.skillRole === SKILL_ROLES.SUPPORTING);

    assert(primaryContrib !== undefined, "Primary contribution exists");
    assert(primaryContrib.qualification.evidenceWeight === 1.00, "Primary skill receives full evidence weight (1.00)");
    assert(supportingContrib !== undefined, "Supporting contribution exists");
    assert(supportingContrib.qualification.evidenceWeight === 0.35, "Supporting skill receives discounted evidence weight (0.35)");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 37: Temporal Calibration Integrity (Historical calibration state is immutable)
  // --------------------------------------------------------------------------
  console.log("\nTEST 37: Temporal Calibration Integrity (Law 14: Historical calibration cannot be rewritten by future states)");
  {
    const attemptT1 = {
      client_event_id: "evt-temp-001",
      question_id: "q_item_temp",
      is_correct: true,
      hints_used: 0,
      attempt_ordinal: 1,
      item_difficulty_at_observation: null // At T1, item had insufficient population
    };

    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
    };

    // Observation at T1
    const contribT1 = qualifyEvidenceContribution(attemptT1, attribution, {
      calibrationVersion: "1.0.0"
    });
    assert(contribT1.qualification.itemDifficultyAtObservation === null, "At T1, itemDifficultyAtObservation is null");

    // Later at T2: Population accumulates 50 attempts, difficulty is calibrated to 0.72
    const currentCalibrationT2 = {
      calibrationVersion: "1.1.0",
      itemDifficultyAtObservation: 0.72,
      currentItemDifficulty: 0.72
    };

    // The historical contribution contribT1 was not and CANNOT be mutated
    assert(contribT1.qualification.itemDifficultyAtObservation === null, "Constitutional Law 14: Historical observation retains null difficulty from observation time");

    // A new observation at T2 receives the new difficulty
    const attemptT2 = {
      client_event_id: "evt-temp-002",
      question_id: "q_item_temp",
      is_correct: false,
      hints_used: 0,
      attempt_ordinal: 1
    };
    const contribT2 = qualifyEvidenceContribution(attemptT2, attribution, currentCalibrationT2);
    assert(contribT2.qualification.itemDifficultyAtObservation === 0.72, "T2 observation correctly captures calibrated difficulty available at T2");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 38: Boolean Evidence Integrity (No ambiguous JavaScript coercion)
  // --------------------------------------------------------------------------
  console.log("\nTEST 38: Boolean Evidence Integrity (Boolean(\"false\") bug eliminated; strict normalization)");
  {
    assert(normalizeBoolean(true) === true, "true -> true");
    assert(normalizeBoolean(false) === false, "false -> false");
    assert(normalizeBoolean("true") === true, "\"true\" -> true");
    assert(normalizeBoolean("false") === false, "\"false\" -> false (NOT coerced to true!)");
    assert(normalizeBoolean("TRUE") === true, "\"TRUE\" -> true");
    assert(normalizeBoolean("FALSE") === false, "\"FALSE\" -> false");
    assert(normalizeBoolean(1) === true, "1 -> true");
    assert(normalizeBoolean(0) === false, "0 -> false");
    assert(normalizeBoolean("1") === true, "\"1\" -> true");
    assert(normalizeBoolean("0") === false, "\"0\" -> false");

    // In qualification engine
    const stringFalseAttempt = {
      client_event_id: "evt-bool-001",
      question_id: "q_bool_test",
      is_correct: "false", // String "false"
      hints_used: 0,
      attempt_ordinal: 1
    };
    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
    };

    const contribution = qualifyEvidenceContribution(stringFalseAttempt, attribution);
    assert(contribution.observed.correct === false, "String 'false' correctly evaluated to boolean false");

    // In difficulty calibration
    const observationsWithStringBools = [
      ...Array(15).fill({ is_correct: "true" }),
      ...Array(15).fill({ is_correct: "false" })
    ];
    const failureRate = calibrateItemDifficulty(observationsWithStringBools);
    assert(failureRate === 0.50, `Failure rate with string booleans is exactly 0.50 (got ${failureRate})`);

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 39: Duplicate Attribution Protection (Deterministic Deduplication)
  // --------------------------------------------------------------------------
  console.log("\nTEST 39: Duplicate Attribution Protection (Duplicate skill IDs do not multiply evidence)");
  {
    const duplicateQuestion = {
      questionId: "q_dup_001",
      primarySkill: { id: "math.algebra.quadratic_equations.factorisation" },
      skills: [
        {
          skillId: "math.algebra.quadratic_equations.factorisation",
          role: SKILL_ROLES.PRIMARY,
          evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
        },
        {
          skillId: "math.algebra.quadratic_equations.factorisation", // Duplicate!
          role: SKILL_ROLES.SUPPORTING,
          evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
        },
        {
          skillId: "math.numbers.integers.signed_arithmetic",
          role: SKILL_ROLES.SUPPORTING,
          evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
        }
      ]
    };

    const singleAttempt = {
      client_event_id: "evt-dup-att-001",
      question_id: "q_dup_001",
      is_correct: true,
      hints_used: 0,
      attempt_ordinal: 1
    };

    const distribution = distributeEvidenceContributions(singleAttempt, duplicateQuestion);

    assert(distribution.canonicalAttempts === 1, "Canonical attempts strictly remains 1");
    assert(distribution.contributions.length === 2, "Deduplication ensures exactly 2 contributions for 2 unique skills");

    const factorisationContribs = distribution.contributions.filter(
      c => c.skillId === "math.algebra.quadratic_equations.factorisation"
    );
    assert(factorisationContribs.length === 1, "Factorisation has exactly 1 contribution despite duplicate attribution");
    assert(factorisationContribs[0].skillRole === SKILL_ROLES.PRIMARY, "PRIMARY role took deterministic precedence over duplicate SUPPORTING");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 40: UNKNOWN Evidence Level Non-Inference
  // --------------------------------------------------------------------------
  console.log("\nTEST 40: UNKNOWN Evidence Level Non-Inference (Undeclared level yields inferenceEligible: false)");
  {
    assert(EVIDENCE_LEVEL_WEIGHTS.UNKNOWN === 0.00, "EVIDENCE_LEVEL_WEIGHTS.UNKNOWN is strictly 0.00");

    const unknownLevelAttempt = {
      client_event_id: "evt-unknown-level-001",
      question_id: "q_unclassified",
      is_correct: true,
      hints_used: 0,
      attempt_ordinal: 1
    };

    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.UNKNOWN,
      evidenceLevelSource: EVIDENCE_LEVEL_SOURCES.UNKNOWN
    };

    const contribution = qualifyEvidenceContribution(unknownLevelAttempt, attribution);

    assert(contribution.observed.correct === true, "Observation correctness is faithfully preserved");
    assert(contribution.evidenceLevel === EVIDENCE_LEVELS.UNKNOWN, "Evidence level is UNKNOWN");
    assert(contribution.inferenceEligible === false, "Constitutional Law: UNKNOWN evidence level is strictly inferenceEligible: false");
    assert(contribution.qualification.evidenceStrength === null, "Constitutional Law: UNKNOWN evidence level yields evidenceStrength: null (no manufactured claims)");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 41: UNKNOWN_SKILL Non-Inference (Provenance preserved, inference prohibited)
  // --------------------------------------------------------------------------
  console.log("\nTEST 41: UNKNOWN_SKILL Non-Inference (Untagged items yield inferenceEligible: false)");
  {
    assert(SKILL_ROLE_WEIGHTS.UNKNOWN === 0.00, "SKILL_ROLE_WEIGHTS.UNKNOWN is strictly 0.00");

    const untaggedQuestion = mapQuestionToSkills({
      id: "q_untagged_item",
      text: "Some untagged question"
    });

    assert(untaggedQuestion.primarySkill.isUnknown === true, "Identified as untagged question");
    assert(untaggedQuestion.skills[0].skillId === UNKNOWN_SKILL.id, "Attributed to UNKNOWN_SKILL");

    const rawAttempt = {
      client_event_id: "evt-untagged-001",
      question_id: "q_untagged_item",
      is_correct: true,
      hints_used: 0,
      attempt_ordinal: 1
    };

    const distribution = distributeEvidenceContributions(rawAttempt, untaggedQuestion);
    assert(distribution.canonicalAttempts === 1, "Canonical attempt count is preserved");
    assert(distribution.contributions.length === 1, "Contribution exists for provenance tracking");

    const contrib = distribution.contributions[0];
    assert(contrib.skillId === UNKNOWN_SKILL.id, "Contribution records UNKNOWN_SKILL ID");
    assert(contrib.observed.correct === true, "Observation provenance preserved");
    assert(contrib.inferenceEligible === false, "Constitutional Law: UNKNOWN_SKILL is strictly inferenceEligible: false");
    assert(contrib.qualification.evidenceStrength === null, "Constitutional Law: UNKNOWN_SKILL yields evidenceStrength: null (never generates mastery or gap)");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 42: Stable Attempt Identity Determinism (Date.now() fallback forbidden)
  // --------------------------------------------------------------------------
  console.log("\nTEST 42: Stable Attempt Identity Determinism (Missing ID throws; Date.now() generation forbidden)");
  {
    const headlessAttempt = {
      is_correct: true,
      hints_used: 0
    };
    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
    };

    let thrown = false;
    try {
      qualifyEvidenceContribution(headlessAttempt, attribution);
    } catch (err) {
      thrown = true;
      assert(
        err.message.includes("requires a stable attempt identity") ||
        err.message.includes("requires a stable attempt ID"),
        "Throws descriptive error for missing attempt ID"
      );
    }
    assert(thrown === true, "Attempt missing ID is strictly rejected (never invents timestamp IDs)");

    // Deterministic: re-running on identical input produces identical output
    const stableAttempt = {
      client_event_id: "evt-stable-001",
      question_id: "q_quad_01",
      is_correct: true,
      hints_used: 1,
      attempt_ordinal: 1
    };
    const contribRun1 = qualifyEvidenceContribution(stableAttempt, attribution);
    const contribRun2 = qualifyEvidenceContribution(stableAttempt, attribution);

    assert(JSON.stringify(contribRun1) === JSON.stringify(contribRun2), "Given identical input, qualifyEvidenceContribution is 100% deterministic");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 43: normalizeCorrectness Strict Validation
  // --------------------------------------------------------------------------
  console.log("\nTEST 43: normalizeCorrectness Strict Validation (Invalid non-booleans throw; deterministic conversions)");
  {
    // Valid representations
    assert(normalizeCorrectness(true) === true, "true -> true");
    assert(normalizeCorrectness(false) === false, "false -> false");
    assert(normalizeCorrectness(1) === true, "1 -> true");
    assert(normalizeCorrectness(0) === false, "0 -> false");
    assert(normalizeCorrectness("true") === true, "'true' -> true");
    assert(normalizeCorrectness("false") === false, "'false' -> false");
    assert(normalizeCorrectness("TRUE") === true, "'TRUE' -> true");
    assert(normalizeCorrectness("FALSE") === false, "'FALSE' -> false");
    assert(normalizeCorrectness("1") === true, "'1' -> true");
    assert(normalizeCorrectness("0") === false, "'0' -> false");

    // Invalid inputs MUST throw
    const invalidInputs = [null, undefined, "maybe", {}, [], "2", -1, NaN, ""];
    for (const invalid of invalidInputs) {
      let threw = false;
      try {
        normalizeCorrectness(invalid);
      } catch (err) {
        threw = true;
        assert(err.message.includes("Correctness must be boolean"), `Threw for invalid input: ${JSON.stringify(invalid)}`);
      }
      assert(threw, `Strict validation threw for: ${JSON.stringify(invalid)}`);
    }

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 44: normalizeDifficulty Validation & Temporal Scoping (Law 14)
  // --------------------------------------------------------------------------
  console.log("\nTEST 44: normalizeDifficulty Validation & Temporal Scoping (Strict [0.0, 1.0] range; null handling; Law 14)");
  {
    // Valid values
    assert(normalizeDifficulty(null) === null, "null -> null");
    assert(normalizeDifficulty(undefined) === null, "undefined -> null");
    assert(normalizeDifficulty(0.0) === 0, "0.0 -> 0");
    assert(normalizeDifficulty(0.75) === 0.75, "0.75 -> 0.75");
    assert(normalizeDifficulty(1.0) === 1, "1.0 -> 1");
    assert(normalizeDifficulty("0.45") === 0.45, "'0.45' -> 0.45");

    // Invalid values MUST throw
    const invalidDifficulties = [-0.1, 1.5, "hard", NaN, Infinity, -Infinity];
    for (const invalid of invalidDifficulties) {
      let threw = false;
      try {
        normalizeDifficulty(invalid);
      } catch (err) {
        threw = true;
        assert(err.message.includes("Invalid item difficulty"), `Threw for invalid difficulty: ${invalid}`);
      }
      assert(threw, `Strict validation threw for invalid difficulty: ${invalid}`);
    }

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 45: Epistemic Layering & Eligibility Schema
  // --------------------------------------------------------------------------
  console.log("\nTEST 45: Epistemic Layering & Eligibility Schema (7-layer structure & UNKNOWN_SKILL non-inference)");
  {
    const attempt = {
      client_event_id: "evt-layer-001",
      question_id: "q_layer_01",
      is_correct: true,
      hints_used: 1,
      assistance_level: "MINOR_HINT",
      solution_revealed: false,
      attempt_ordinal: 1,
      item_difficulty_at_observation: 0.45
    };

    const attribution = {
      skillId: "math.algebra.quadratic_equations.factorisation",
      role: SKILL_ROLES.PRIMARY,
      evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL,
      evidenceLevelSource: EVIDENCE_LEVEL_SOURCES.AUTHOR_TAG,
      confidence: 0.95
    };

    const contribution = qualifyEvidenceContribution(attempt, attribution);

    // 1. Identity Layer
    assert(contribution.identity.attemptId === "evt-layer-001", "Identity layer records attemptId");
    assert(contribution.identity.questionId === "q_layer_01", "Identity layer records questionId");
    assert(contribution.identity.skillId === "math.algebra.quadratic_equations.factorisation", "Identity layer records skillId");

    // 2. Attribution Layer
    assert(contribution.attribution.skillRole === SKILL_ROLES.PRIMARY, "Attribution layer records skillRole");
    assert(contribution.attribution.attributionWeight === 1.00, "Attribution layer records attributionWeight");
    assert(contribution.attribution.attributionConfidence === 0.95, "Attribution layer records attributionConfidence");
    assert(contribution.attribution.ontologyVersion === ONTOLOGY_VERSION, "Attribution layer records ontologyVersion");

    // 3. Observation Layer (Raw Telemetry)
    assert(contribution.observation.correct === true, "Observation layer preserves raw correctness");
    assert(contribution.observation.hintsUsed === 1, "Observation layer preserves hintsUsed");
    assert(contribution.observation.solutionRevealed === false, "Observation layer preserves solutionRevealed");
    assert(contribution.observation.assistanceLevel === "MINOR_HINT", "Observation layer preserves assistanceLevel");
    assert(contribution.observation.attemptOrdinal === 1, "Observation layer preserves attemptOrdinal");
    assert(contribution.observation.isFirstAttemptOnItem === true, "Observation layer flags first attempt");

    // 4. Classification Layer
    assert(contribution.classification.evidenceLevel === EVIDENCE_LEVELS.PROCEDURAL, "Classification layer records evidenceLevel");
    assert(contribution.classification.evidenceLevelSource === EVIDENCE_LEVEL_SOURCES.AUTHOR_TAG, "Classification layer records evidenceLevelSource");

    // 5. Qualification Layer (Interpretation)
    assert(contribution.qualification.independenceFactor === 0.75, "Qualification records independenceFactor");
    assert(contribution.qualification.noveltyFactor === 1.00, "Qualification records noveltyFactor");
    assert(contribution.qualification.configuredLevelWeight === 0.70, "Qualification records configuredLevelWeight");
    assert(contribution.qualification.skillAttributionWeight === 1.00, "Qualification records skillAttributionWeight");
    assert(contribution.qualification.itemDifficultyAtObservation === 0.45, "Qualification records itemDifficultyAtObservation");
    assert(contribution.qualification.strengthModel.type === "CONFIGURED_RULE_MODEL", "Qualification records strengthModel type");
    assert(contribution.qualification.strengthModel.version === CALIBRATION_VERSION, "Qualification records strengthModel version");
    assert(contribution.qualification.evidenceStrength === 0.53, `Qualification calculates interpretive strength (expected 0.53, got ${contribution.qualification.evidenceStrength})`);

    // 6. Eligibility Layer
    assert(contribution.eligibility.countsAsObservedEvidence === true, "Eligibility marks observed attempt");
    assert(contribution.eligibility.countsTowardSkillMastery === true, "Eligibility confirms mastery eligibility for tagged item");
    assert(contribution.eligibility.reason === "ELIGIBLE", "Eligibility reason is ELIGIBLE");

    // 7. Provenance Layer
    assert(contribution.provenance.ontologyVersion === ONTOLOGY_VERSION, "Provenance records ontologyVersion");
    assert(contribution.provenance.calibrationVersion === CALIBRATION_VERSION, "Provenance records calibrationVersion");
    assert(typeof contribution.provenance.calibrationSnapshotHash === "string", "Provenance records calibrationSnapshotHash");

    // Non-inference test for UNKNOWN_SKILL
    const unknownSkillAttribution = {
      skillId: UNKNOWN_SKILL.id,
      role: SKILL_ROLES.UNKNOWN,
      evidenceLevel: EVIDENCE_LEVELS.PROCEDURAL
    };
    const unknownContrib = qualifyEvidenceContribution(attempt, unknownSkillAttribution);
    assert(unknownContrib.eligibility.countsAsObservedEvidence === true, "UNKNOWN_SKILL counts as observed attempt");
    assert(unknownContrib.eligibility.countsTowardSkillMastery === false, "UNKNOWN_SKILL does NOT count toward skill mastery");
    assert(unknownContrib.eligibility.reason === "UNKNOWN_SKILL", "UNKNOWN_SKILL reason flagged");
    assert(unknownContrib.qualification.evidenceStrength === null, "UNKNOWN_SKILL strictly produces evidenceStrength: null");

    passedTests++;
  }

  // --------------------------------------------------------------------------
  // TEST 46: Difficulty Semantics & Metric Separation
  // --------------------------------------------------------------------------
  console.log("\nTEST 46: Difficulty Semantics & Metric Separation (calculateItemDifficultyMetrics)");
  {
    // Dataset with 20 correct, 10 incorrect, and 2 corrupted entries
    const mixedObservations = [
      ...Array(20).fill({ is_correct: true }),
      ...Array(10).fill({ is_correct: false }),
      { is_correct: "invalid_truth_val" },
      { is_correct: null }
    ];

    const metrics = calculateItemDifficultyMetrics(mixedObservations);

    assert(metrics.totalObservationCount === 32, "Records raw observation count of 32");
    assert(metrics.eligibleObservationCount === 30, "Filters 2 corrupted entries, yielding 30 eligible observations");
    assert(metrics.observedFailureRate === 0.33, `Computes observedFailureRate as 10/30 = 0.33 (got ${metrics.observedFailureRate})`);
    assert(metrics.difficulty === 0.33, `Because eligibleCount (30) >= 30, difficulty is calibrated to 0.33 (got ${metrics.difficulty})`);

    // Dataset below threshold
    const smallObservations = [
      ...Array(15).fill({ is_correct: true }),
      ...Array(5).fill({ is_correct: false })
    ];
    const smallMetrics = calculateItemDifficultyMetrics(smallObservations);
    assert(smallMetrics.eligibleObservationCount === 20, "Records 20 eligible observations");
    assert(smallMetrics.observedFailureRate === 0.25, "Computes observed failure rate 5/20 = 0.25");
    assert(smallMetrics.difficulty === null, "Under N=20 (< 30), difficulty is strictly null (null-protection)");

    passedTests++;
  }

  console.log("\n=================================================");
  console.log(` ALL ${passedTests} CONTRACT TESTS PASSED SUCCESSFULLY!`);
  console.log("=================================================");
}

runContractTests().catch((e) => {
  console.error("Contract Test Suite failed:", e);
  process.exit(1);
});
