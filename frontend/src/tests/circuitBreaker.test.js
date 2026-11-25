/**
 * Classified Circuit Breaker Unit Test Suite
 *
 * Verifies:
 * 1. Trips only on 5xx or network errors.
 * 2. 401/403/422 do NOT increment failure count or trip breaker.
 * 3. Enforces single-probe concurrency lock in HALF_OPEN.
 */

import { ClassifiedCircuitBreaker, CIRCUIT_STATE } from "../infrastructure/network/CircuitBreaker.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log("=== RUNNING CIRCUIT BREAKER TEST SUITE ===");

const cb = new ClassifiedCircuitBreaker({ failureThreshold: 2, resetTimeoutMs: 50 });

// Test 1: 4xx Client Errors Do NOT Trip Breaker
console.log("\n[Test 1: Non-tripping 4xx Errors]");
cb.recordFailure({ status: 401, message: "Unauthorized" });
cb.recordFailure({ status: 403, message: "Forbidden" });
cb.recordFailure({ status: 422, message: "Unprocessable Entity" });

assert(cb.state === CIRCUIT_STATE.CLOSED, "Breaker remains CLOSED after 4xx errors");
assert(cb.consecutiveFailures === 0, "4xx errors do not increment failure count");
assert(cb.canAttempt() === true, "Requests allowed through when breaker is CLOSED");

// Test 2: 5xx and Network Errors DO Trip Breaker
console.log("\n[Test 2: Tripping 5xx and Network Errors]");
cb.recordFailure({ status: 503, message: "Service Unavailable" });
assert(cb.consecutiveFailures === 1, "503 increments failure count to 1");
assert(cb.state === CIRCUIT_STATE.CLOSED, "Breaker still CLOSED before threshold");

cb.recordFailure(new Error("Failed to fetch"));
assert(cb.consecutiveFailures === 2, "Network failure increments count to 2");
assert(cb.state === CIRCUIT_STATE.OPEN, "Breaker trips to OPEN at failureThreshold");
assert(cb.canAttempt() === false, "canAttempt returns false while OPEN");

// Test 3: HALF-OPEN Transition and Single-Probe Concurrency Lock
console.log("\n[Test 3: HALF-OPEN Single-Probe Lock]");
setTimeout(() => {
  // Wait for resetTimeoutMs (50ms) to elapse
  assert(cb.canAttempt() === true, "Transitioned to HALF-OPEN after timeout; first probe allowed");
  assert(cb.state === CIRCUIT_STATE.HALF_OPEN, "State is HALF_OPEN");

  // Second concurrent attempt must be blocked by concurrency lock
  assert(cb.canAttempt() === false, "Second concurrent probe rejected while first probe in-flight");

  // Record success on probe
  cb.recordSuccess();
  assert(cb.state === CIRCUIT_STATE.CLOSED, "Successful probe resets breaker to CLOSED");
  assert(cb.consecutiveFailures === 0, "Failures reset to 0");

  console.log(`\nCircuit Breaker Tests Complete: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}, 60);
