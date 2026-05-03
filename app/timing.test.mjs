import assert from "node:assert/strict";
import {
  REPLAY_PHASES,
  REPLAY_TOTAL_MS,
  buildReplaySnapshotAt,
  buildReplaySchedule,
  createInitialReplayState,
  phaseCheckpointMs,
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

const promptCheckpoint = phaseCheckpointMs("prompt");
assert.equal(promptCheckpoint, 14999);

const pairingSnapshot = buildReplaySnapshotAt({
  elapsedMs: phaseCheckpointMs("pairings"),
  phaseId: "pairings",
  promptText: "one two three four five six",
  pairings,
  comparisonDetails,
});

assert.equal(pairingSnapshot.status, "paused");
assert.equal(pairingSnapshot.phaseId, "pairings");
assert.equal(pairingSnapshot.visiblePairingCount, 11);
assert.ok(pairingSnapshot.promptText.includes("six"));
assert.equal(Object.keys(pairingSnapshot.checkedStatuses).length, 0);

const longPrompt = Array.from({ length: 220 }, (_, index) => `word-${index + 1}`).join(" ");
const promptSnapshot = buildReplaySnapshotAt({
  elapsedMs: phaseCheckpointMs("prompt"),
  phaseId: "prompt",
  promptText: longPrompt,
  pairings,
  comparisonDetails,
});

assert.ok(promptSnapshot.promptText.includes("word-220"));

const pidSnapshot = buildReplaySnapshotAt({
  elapsedMs: phaseCheckpointMs("pid"),
  phaseId: "pid",
  promptText: "one two three four five six",
  pairings,
  comparisonDetails,
});

assert.equal(pidSnapshot.phaseId, "pid");
assert.equal(pidSnapshot.pidsVisible, true);
assert.equal(pidSnapshot.roadmapVisible, true);
assert.equal(pidSnapshot.completed, false);

console.log("Sprint 2.4 timing contract test passed");
