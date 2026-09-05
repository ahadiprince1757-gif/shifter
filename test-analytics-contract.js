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

  console.log("\n=================================================");
  console.log(` ALL ${passedTests} CONTRACT TESTS PASSED SUCCESSFULLY!`);
  console.log("=================================================");
}

runContractTests().catch((e) => {
  console.error("Contract Test Suite failed:", e);
  process.exit(1);
});
