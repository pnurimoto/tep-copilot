import assert from "node:assert/strict";
import {
  REPLAY_PHASES,
  REPLAY_TOTAL_MS,
  buildReplaySchedule,
  createInitialReplayState,
  replayReducer,
} from "./timing.js";

const pairings = Array.from({ length: 11 }, (_, index) => ({
  mv: `XMV(${index + 1})`,
  cv: `XMEAS(${index + 1})`,
  reasoning: `Reasoning sentence ${index + 1}.`,
}));

const comparisonDetails = pairings.map((pairing, index) => ({
  agent_mv: pairing.mv,
  agent_cv: pairing.cv,
  status: index < 7 ? "matched" : index < 10 ? "diverged" : "novel",
  control_objective: `Objective ${index + 1}`,
}));

const schedule = buildReplaySchedule({
  promptText: "one two three four five six",
  pairings,
  comparisonDetails,
});

assert.equal(REPLAY_TOTAL_MS, 60000);
assert.ok(REPLAY_TOTAL_MS >= 35000 && REPLAY_TOTAL_MS <= 60000);
assert.deepEqual(
  REPLAY_PHASES.map((phase) => phase.id),
  ["boot", "prompt", "pairings", "verifier", "summary", "pid"]
);

assert.equal(schedule.filter((event) => event.type === "revealPairing").length, 11);
assert.equal(schedule.filter((event) => event.type === "verifierMark").length, 11);
assert.equal(schedule.at(-1).type, "complete");
assert.equal(schedule.at(-1).at, REPLAY_TOTAL_MS);

let state = createInitialReplayState();
for (const event of schedule.filter((item) => item.at <= 36000)) {
  state = replayReducer(state, event);
}

assert.equal(state.visiblePairingCount, 11);
assert.ok(Object.keys(state.pairingReasoning).length > 0);
assert.ok(Object.keys(state.checkedStatuses).length >= 1);

console.log("Sprint 2.4 timing contract test passed");
