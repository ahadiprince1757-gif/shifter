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

import { adaptAnalyticsToEvidence } from "./frontend/src/engine/analyticsEvidenceAdapter.js";
import { buildMasteryMap, calculateReadiness, calculateEvidenceConfidence } from "./frontend/src/engine/cbcCompetencyEngine.js";
import {
  buildLearningIntelligence,
  calculateCognitiveMastery,
  generatePrimaryRecommendation,
} from "./frontend/src/engine/learningIntelligenceEngine.js";

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

  console.log("\n=================================================");
  console.log(` ALL ${passedTests} CONTRACT TESTS PASSED SUCCESSFULLY!`);
  console.log("=================================================");
}

runContractTests().catch((e) => {
  console.error("Contract Test Suite failed:", e);
  process.exit(1);
});
