export const REPLAY_PHASES = [
  { id: "boot", label: "Paper ingest", durationMs: 5000 },
  { id: "prompt", label: "Prompt stream", durationMs: 10000 },
  { id: "pairings", label: "Pairing reveal", durationMs: 20000 },
  { id: "verifier", label: "Verifier sweep", durationMs: 10000 },
  { id: "summary", label: "Summary", durationMs: 5000 },
  { id: "pid", label: "P&ID render", durationMs: 10000 },
];

export const REPLAY_TOTAL_MS = REPLAY_PHASES.reduce((total, phase) => total + phase.durationMs, 0);

const BOOT_LINES = [
  "Loading paper metadata: Downs and Vogel 1993",
  "Parsing variables: 41 XMEAS, 12 XMV",
  "Loading recorded LLM run: data/agent_run.json",
  "Indexing Ricker 1996 baseline for comparison",
];

const SUMMARY_KEYS = ["matched", "diverged", "novel", "agreement_pct"];

export function createInitialReplayState() {
  return {
    status: "idle",
    phaseId: "idle",
    consoleLines: [],
    promptText: "",
    visiblePairingCount: 0,
    pairingReasoning: {},
    verifierCursor: -1,
    checkedStatuses: {},
    summaryVisible: false,
    visibleSummaryKeys: [],
    pidsVisible: false,
    roadmapVisible: false,
    completed: false,
  };
}

export function replayReducer(state, action) {
  switch (action.type) {
    case "reset":
      return createInitialReplayState();
    case "phase":
      return {
        ...state,
        status: "running",
        phaseId: action.phaseId,
      };
    case "consoleLine":
      return {
        ...state,
        consoleLines: [...state.consoleLines, action.line],
      };
    case "promptToken":
      return {
        ...state,
        promptText: `${state.promptText}${action.token}`,
      };
    case "revealPairing":
      return {
        ...state,
        visiblePairingCount: Math.max(state.visiblePairingCount, action.index + 1),
      };
    case "reasoningChar":
      return {
        ...state,
        pairingReasoning: {
          ...state.pairingReasoning,
          [action.index]: `${state.pairingReasoning[action.index] || ""}${action.char}`,
        },
      };
    case "verifierMark":
      return {
        ...state,
        verifierCursor: action.index,
        checkedStatuses: {
          ...state.checkedStatuses,
          [action.index]: action.result,
        },
      };
    case "summary":
      return {
        ...state,
        summaryVisible: true,
      };
    case "summaryStat":
      return {
        ...state,
        visibleSummaryKeys: Array.from(new Set([...state.visibleSummaryKeys, action.key])),
      };
    case "pids":
      return {
        ...state,
        pidsVisible: true,
      };
    case "roadmap":
      return {
        ...state,
        roadmapVisible: true,
      };
    case "complete":
      return {
        ...state,
        status: "complete",
        phaseId: "complete",
        completed: true,
        roadmapVisible: true,
      };
    default:
      return state;
  }
}

export function phaseStarts(phases = REPLAY_PHASES) {
  let cursor = 0;
  return phases.reduce((starts, phase) => {
    starts[phase.id] = cursor;
    cursor += phase.durationMs;
    return starts;
  }, {});
}

export function phaseCheckpointMs(phaseId, phases = REPLAY_PHASES) {
  const starts = phaseStarts(phases);
  const phase = phases.find((item) => item.id === phaseId);

  if (!phase || starts[phaseId] === undefined) {
    return 0;
  }

  return Math.max(0, starts[phaseId] + phase.durationMs - 1);
}

export function buildReplaySnapshotAt({
  elapsedMs = 0,
  promptText = "",
  pairings = [],
  comparisonDetails = [],
  phaseId = null,
  phases = REPLAY_PHASES,
} = {}) {
  const schedule = buildReplaySchedule({
    promptText,
    pairings,
    comparisonDetails,
    phases,
  });

  let state = createInitialReplayState();
  for (const event of schedule) {
    if (event.at > elapsedMs) {
      break;
    }
    state = replayReducer(state, event);
  }

  return {
    ...state,
    status: "paused",
    phaseId: phaseId || state.phaseId,
    completed: false,
  };
}

export function buildReplaySchedule({
  promptText = "",
  pairings = [],
  comparisonDetails = [],
  phases = REPLAY_PHASES,
} = {}) {
  const starts = phaseStarts(phases);
  const phaseById = Object.fromEntries(phases.map((phase) => [phase.id, phase]));
  const schedule = [];

  for (const phase of phases) {
    schedule.push({ at: starts[phase.id], type: "phase", phaseId: phase.id });
  }

  BOOT_LINES.forEach((line, index) => {
    schedule.push({
      at: starts.boot + 550 + index * 1050,
      type: "consoleLine",
      line,
    });
  });

  const promptTokens = preparePromptTokens(promptText);
  promptTokens.forEach((token, index) => {
    schedule.push({
      at: spread(starts.prompt + 200, phaseById.prompt.durationMs - 600, index, promptTokens.length),
      type: "promptToken",
      token: index === 0 ? token : ` ${token}`,
    });
  });

  const comparisonByPair = new Map();
  for (const detail of comparisonDetails) {
    if (detail.agent_mv && detail.agent_cv) {
      comparisonByPair.set(`${detail.agent_mv}->${detail.agent_cv}`, detail);
    }
  }

  const pairingSlot = phaseById.pairings.durationMs / Math.max(pairings.length, 1);
  pairings.forEach((pairing, index) => {
    const slotStart = starts.pairings + index * pairingSlot;
    const reasoning = String(pairing.reasoning || "");
    schedule.push({
      at: Math.round(slotStart),
      type: "revealPairing",
      index,
    });

    Array.from(reasoning).forEach((char, charIndex, chars) => {
      schedule.push({
        at: spread(slotStart + 180, pairingSlot - 320, charIndex, chars.length),
        type: "reasoningChar",
        index,
        char,
      });
    });
  });

  const verifierSlot = phaseById.verifier.durationMs / Math.max(pairings.length, 1);
  pairings.forEach((pairing, index) => {
    const detail = comparisonByPair.get(`${pairing.mv}->${pairing.cv}`);
    schedule.push({
      at: Math.round(starts.verifier + 420 + index * verifierSlot),
      type: "verifierMark",
      index,
      result: {
        status: detail?.status || pairing.status || "matched",
        objective: detail?.control_objective || pairing.loop_name || `Loop ${index + 1}`,
        note: detail?.note || "",
      },
    });
  });

  schedule.push({ at: starts.summary + 120, type: "summary" });
  SUMMARY_KEYS.forEach((key, index) => {
    schedule.push({
      at: starts.summary + 500 + index * 780,
      type: "summaryStat",
      key,
    });
  });

  schedule.push({ at: starts.pid + 900, type: "pids" });
  schedule.push({ at: starts.pid + 6200, type: "roadmap" });
  schedule.push({ at: REPLAY_TOTAL_MS, type: "complete" });

  return schedule.sort((a, b) => a.at - b.at);
}

export function runReplay({ onAction, onTick, ...scheduleInput }) {
  const schedule = buildReplaySchedule(scheduleInput);
  const timers = [];
  const startedAt = Date.now();

  onAction?.({ type: "reset" });
  onTick?.(0);

  for (const event of schedule) {
    timers.push(
      setTimeout(() => {
        onAction?.(event);
      }, event.at)
    );
  }

  const tickTimer = setInterval(() => {
    onTick?.(Math.min(Date.now() - startedAt, REPLAY_TOTAL_MS));
  }, 250);

  timers.push(
    setTimeout(() => {
      clearInterval(tickTimer);
      onTick?.(REPLAY_TOTAL_MS);
    }, REPLAY_TOTAL_MS + 50)
  );

  return {
    cancel() {
      for (const timer of timers) {
        clearTimeout(timer);
      }
      clearInterval(tickTimer);
    },
  };
}

function preparePromptTokens(promptText) {
  const fallback = "Design a complete 11-loop decentralized control structure for the Tennessee Eastman Process.";
  const normalized = String(promptText || fallback)
    .replace(/\s+/g, " ")
    .trim();
  return normalized.split(" ");
}

function spread(startAt, durationMs, index, count) {
  if (count <= 1) {
    return Math.round(startAt);
  }
  return Math.round(startAt + (durationMs * index) / (count - 1));
}
