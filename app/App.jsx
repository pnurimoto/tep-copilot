import React, { useEffect, useMemo, useRef, useState } from "react";
import agentRun from "../data/agent_run.json";
import comparison from "../data/comparison.json";
import rickerBaseline from "../data/ricker_baseline.json";
import verifierReport from "../data/verifier_report.json";
import promptText from "../data/proposer_prompt_v1.txt?raw";
import references from "../references/sources.json";
import { renderPID } from "../renderer/render.jsx";
import {
  REPLAY_PHASES,
  REPLAY_TOTAL_MS,
  buildReplaySnapshotAt,
  createInitialReplayState,
  phaseCheckpointMs,
  replayReducer,
  runReplay,
} from "./timing.js";

const SUMMARY_LABELS = {
  matched: "Matched",
  diverged: "Diverged",
  novel: "Novel",
  agreement_pct: "Agreement",
};

export default function App() {
  const pairings = useMemo(() => enrichPairings(agentRun.pairings, comparison.details), []);
  const [replay, setReplay] = useState(createInitialReplayState());
  const [elapsedMs, setElapsedMs] = useState(0);
  const runnerRef = useRef(null);

  useEffect(() => {
    return () => runnerRef.current?.cancel();
  }, []);

  function handleRun() {
    runnerRef.current?.cancel();
    runnerRef.current = runReplay({
      promptText,
      pairings,
      comparisonDetails: comparison.details,
      onAction: (action) => setReplay((current) => replayReducer(current, action)),
      onTick: setElapsedMs,
    });
  }

  function handleJumpToPhase(phaseId) {
    runnerRef.current?.cancel();
    const checkpointMs = phaseCheckpointMs(phaseId);
    setReplay(
      buildReplaySnapshotAt({
        elapsedMs: checkpointMs,
        phaseId,
        promptText,
        pairings,
        comparisonDetails: comparison.details,
      })
    );
    setElapsedMs(Math.min(checkpointMs + 1, REPLAY_TOTAL_MS));
  }

  const isRunning = replay.status === "running";
  const progressPct = Math.min(100, (elapsedMs / REPLAY_TOTAL_MS) * 100);

  return (
    <div className="app-shell min-h-screen text-ink">
      <header className="topbar">
        <div>
          <div className="eyebrow">Tennessee Eastman Process</div>
          <h1>TEP Copilot</h1>
        </div>
        <div className="topbar-actions">
          <span className="recorded-label">Recorded Run</span>
          <button className="run-button" type="button" onClick={handleRun} disabled={isRunning}>
            <span className="play-mark" aria-hidden="true" />
            {isRunning ? "Running" : replay.completed || elapsedMs > 0 ? "Replay Again" : "Run Agent"}
          </button>
        </div>
      </header>

      <main className="workspace">
        <section className="control-strip" aria-label="Replay status">
          <div className="elapsed">
            <span>{formatElapsed(elapsedMs)}</span>
            <small>/ 1:00</small>
          </div>
          <div className="phase-track">
            {REPLAY_PHASES.map((phase, index) => (
              <PhaseStep
                key={phase.id}
                phase={phase}
                index={index}
                status={phaseStatus(REPLAY_PHASES, replay, phase.id)}
                onJump={handleJumpToPhase}
              />
            ))}
          </div>
          <div className="progress-meter" aria-label="Replay progress">
            <span style={{ width: `${progressPct}%` }} />
          </div>
        </section>

        <section className="replay-grid">
          <section className="primary-plane" aria-label="Agent and Ricker comparison workspace">
            <div className="plane-heading">
              <div>
                <div className="section-kicker">Agent proposal</div>
                <h2>Verifier-guided control structure replay</h2>
              </div>
              <SummaryStrip replay={replay} summary={comparison.summary} />
            </div>

            {replay.pidsVisible ? (
              <PIDStage pairings={pairings} />
            ) : (
              <PairingWorkspace replay={replay} pairings={pairings} />
            )}
          </section>

          <aside className="side-console" aria-label="Recorded agent stream">
            <ConsolePanel replay={replay} />
            <PromptPanel prompt={replay.promptText} isActive={replay.phaseId === "prompt"} />
            <VerifierPanel replay={replay} report={verifierReport.agent} />
          </aside>
        </section>

        <RoadmapPanel visible={replay.roadmapVisible} />
      </main>

      <ReferencesFooter />
    </div>
  );
}

function PairingWorkspace({ replay, pairings }) {
  return (
    <div className="pairing-workspace">
      <div className="process-spine" aria-hidden="true">
        <span>Feeds</span>
        <i />
        <span>Reactor</span>
        <i />
        <span>Separator</span>
        <i />
        <span>Stripper</span>
        <i />
        <span>Product</span>
      </div>

      <div className="pairing-table" role="table" aria-label="Agent proposed MV to CV pairings">
        <div className="pairing-head" role="row">
          <span>Loop</span>
          <span>MV</span>
          <span>CV</span>
          <span>Reasoning</span>
          <span>Status</span>
        </div>
        {pairings.map((pairing, index) => (
          <PairingRow
            key={`${pairing.mv}-${pairing.cv}`}
            pairing={pairing}
            index={index}
            visible={index < replay.visiblePairingCount}
            reasoning={replay.pairingReasoning[index] || ""}
            check={replay.checkedStatuses[index]}
            active={replay.verifierCursor === index}
          />
        ))}
      </div>
    </div>
  );
}

function PairingRow({ pairing, index, visible, reasoning, check, active }) {
  const status = check?.status || pairing.status;
  return (
    <div
      className={[
        "pairing-row",
        visible ? "is-visible" : "is-pending",
        check ? statusClass(status) : "",
        active ? "is-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="row"
    >
      <span className="loop-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="tag">{visible ? pairing.mv : "--"}</span>
      <span className="tag">{visible ? pairing.cv : "--"}</span>
      <span className="reasoning">
        {visible ? reasoning || <span className="cursor-word">streaming</span> : "pending"}
      </span>
      <span className="status-pill">{check ? statusLabel(status) : visible ? pairing.confidence : "queued"}</span>
    </div>
  );
}

function PIDStage({ pairings }) {
  return (
    <div className="pid-stage">
      <div className="pid-stage-grid">
        <article className="pid-panel">
          <div className="pid-stage-head">
            <span>Agent proposal</span>
            <b>7 matched / 4 review</b>
          </div>
          <div className="pid-scroll">
            {renderPID(pairings, true, {
              title: "Agent Run",
              subtitle: "Green endpoints match Ricker; oxblood endpoints need review.",
              idPrefix: "agent-panel",
            })}
          </div>
        </article>
        <article className="pid-panel">
          <div className="pid-stage-head">
            <span>Ricker 1996 baseline</span>
            <b>reference structure</b>
          </div>
          <div className="pid-scroll">
            {renderPID(rickerBaseline.pairings, false, {
              title: "Ricker 1996 Baseline",
              subtitle: "Reference decentralized control structure.",
              idPrefix: "ricker-panel",
            })}
          </div>
        </article>
      </div>
    </div>
  );
}

function ConsolePanel({ replay }) {
  return (
    <section className="console-block">
      <div className="side-heading">
        <span>Run log</span>
        <b>{replay.phaseId === "idle" ? "standby" : replay.phaseId}</b>
      </div>
      <div className="console-lines">
        {replay.consoleLines.length === 0 ? (
          <p className="muted-line">ready</p>
        ) : (
          replay.consoleLines.map((line) => <p key={line}>{line}</p>)
        )}
      </div>
    </section>
  );
}

function PromptPanel({ prompt, isActive }) {
  return (
    <section className="prompt-block">
      <div className="side-heading">
        <span>Prompt</span>
        <b>{isActive ? "streaming" : "recorded"}</b>
      </div>
      <pre>{prompt || "..."}</pre>
    </section>
  );
}

function VerifierPanel({ replay, report }) {
  const checks = report?.system_checks || {};
  return (
    <section className="verifier-block">
      <div className="side-heading">
        <span>Verifier sweep</span>
        <b>{report?.overall_status || "pending"}</b>
      </div>
      {Object.entries(checks).map(([key, check]) => (
        <div className="check-line" key={key}>
          <span>{key.replaceAll("_", " ")}</span>
          <b className={check.status === "pass" ? "ok" : "review"}>{check.status}</b>
        </div>
      ))}
      <div className="sweep-note">
        {replay.verifierCursor >= 0
          ? `Loop ${String(replay.verifierCursor + 1).padStart(2, "0")} checked`
          : "awaiting pairings"}
      </div>
    </section>
  );
}

function SummaryStrip({ replay, summary }) {
  return (
    <div className="summary-strip" aria-label="Comparison summary">
      {Object.entries(SUMMARY_LABELS).map(([key, label]) => {
        const visible = replay.visibleSummaryKeys.includes(key);
        const value = key === "agreement_pct" ? `${summary[key]}%` : summary[key];
        return (
          <div className={visible ? "summary-stat is-visible" : "summary-stat"} key={key}>
            <span>{label}</span>
            <b>{visible ? value : "--"}</b>
          </div>
        );
      })}
    </div>
  );
}

function RoadmapPanel({ visible }) {
  return (
    <section className={visible ? "roadmap-panel is-visible" : "roadmap-panel"} aria-label="Roadmap">
      <div>
        <span>Roadmap</span>
        <h2>Phase 4: Simulator-in-the-loop</h2>
      </div>
      <p>
        Disabled for this recorded demo. A future build can connect verified pairings to a controllable
        simulator without changing this replay claim.
      </p>
    </section>
  );
}

function ReferencesFooter() {
  return (
    <footer className="references-footer">
      <p>{references.provenance}</p>
      <div>
        {references.items.map((item) => (
          <span key={item.label}>
            <b>{item.label}:</b> {item.citation}
            {item.doi ? ` DOI ${item.doi}` : ""}
          </span>
        ))}
      </div>
    </footer>
  );
}

function PhaseStep({ phase, index, status, onJump }) {
  return (
    <button
      className={`phase-step ${status}`}
      type="button"
      onClick={() => onJump(phase.id)}
      aria-label={`Jump to ${phase.label}`}
      aria-current={status === "active" ? "step" : undefined}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      <b>{phase.label}</b>
    </button>
  );
}

function enrichPairings(pairings, details) {
  const detailByPair = new Map(
    details
      .filter((detail) => detail.agent_mv && detail.agent_cv)
      .map((detail) => [`${detail.agent_mv}->${detail.agent_cv}`, detail])
  );

  return pairings.map((pairing, index) => {
    const detail = detailByPair.get(`${pairing.mv}->${pairing.cv}`);
    return {
      ...pairing,
      loop_id: detail?.loop_id || index + 1,
      loop_name: detail?.control_objective || `Loop ${index + 1}`,
      status: detail?.status || "matched",
      note: detail?.note || "",
    };
  });
}

function phaseStatus(phases, replay, phaseId) {
  if (replay.completed) {
    return "done";
  }

  const activeIndex = phases.findIndex((phase) => phase.id === replay.phaseId);
  const phaseIndex = phases.findIndex((phase) => phase.id === phaseId);

  if (activeIndex === -1) {
    return "queued";
  }
  if (phaseIndex < activeIndex) {
    return "done";
  }
  if (phaseIndex === activeIndex) {
    return "active";
  }
  return "queued";
}

function statusClass(status) {
  return status === "matched" ? "is-matched" : "is-review";
}

function statusLabel(status) {
  if (status === "matched") {
    return "matched";
  }
  if (status === "novel") {
    return "novel";
  }
  return "diverged";
}

function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
