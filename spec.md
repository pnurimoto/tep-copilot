## What we are building

A browser-based, recorded demo of an LLM agent that proposes a plant-wide control structure for the Tennessee Eastman Process (TEP), verifies it against engineering rules, renders both the agent’s proposal and a published baseline as P&IDs, and compares them side by side. The output is a static web app that plays a 35-to-60 second “agent run” without any live API calls.

This is a 2-day hackathon deliverable. Scope is tight by design.

## Why this is interesting

Plant-wide control structure design (which manipulated variable controls which controlled variable, across an entire process) is a senior chemical engineering judgment task that takes days of expert reasoning. Tennessee Eastman is the canonical 33-year-old benchmark for this problem. Classical solutions (Ricker 1996, Luyben, McAvoy) disagree on the contested decisions. As of writing, no one has published an LLM-driven plant-wide control structure design on TEP. This project is a first cut, framed honestly with its gaps marked.

The headline is the LLM/agent architecture, not the chemistry. Judges are technical (engineers/devs). Assume they recognize “benchmark” framing and skip extended TEP background.

## What success looks like (the demo, end to end)

A single-page web app, served statically. User clicks “Run agent.” A 35-to-60 second sequence plays:

1. Console-style “loading paper” + “parsing variables” lines appear.
1. The LLM prompt streams in token by token.
1. Eleven MV-CV pairings appear one by one, each with a short reasoning trace that streams in character by character.
1. A verifier sweep animates over the pairings, marking each green (passes) or oxblood (fails or diverges from baseline).
1. Summary stats animate in: 11 loops total, X matched, Y diverged, Z% agreement.
1. Two P&IDs render side by side: agent’s proposal and Ricker (1996) baseline. Divergent loops highlighted.
1. A greyed-out “Phase 4: simulator-in-the-loop” panel appears as roadmap signal.

There is no live LLM inference during the demo. All content is loaded from prepared JSON files. The “streaming” is timed setTimeout calls revealing pre-recorded data. This is a deliberate constraint: hackathon stages are not where you debug API keys.

## Two-tier strategy

**Tier 2 (primary target):** Includes a steady-state gain matrix from the TEP simulator (tep2py or equivalent), used by the verifier to compute Relative Gain Array (RGA) and reject pairings with bad RGA elements. Stronger demo.

**Tier 1 (fallback):** Skips the simulator entirely. Verifier uses only structural rules (degrees of freedom, mass balance, MV uniqueness, inventory loop outflow handles). Defensible demo, less impressive.

**Decision rule:** Attempt tep2py installation in the first 60 minutes of work. If it installs cleanly, proceed with Tier 2. If installation fails after one debug attempt, hard stop, switch to Tier 1, do not retry. Time-box is non-negotiable.

## Architecture (three layers)

The whole point of the project is the separation of concerns. Each layer is auditable on its own.

1. **Proposer (LLM).** Reads variables and objectives. Emits structured pairings as JSON. Reasoning per pairing is required output, not optional.
1. **Verifier (deterministic Python).** Checks proposals against engineering rules. Returns pass/fail per loop with reasons. The LLM does not run the verifier; the verifier is plain code.
1. **Renderer (deterministic JavaScript/SVG).** Takes pairings JSON, draws P&ID with hardcoded unit positions. Same renderer used for agent’s proposal and Ricker baseline.

This separation must survive into the demo. If a judge asks “did the LLM draw the diagram,” the answer is no, the LLM produced structured pairings, the renderer drew the diagram from a deterministic template. This is the correct answer and a feature, not a limitation.

## Critical: LLM does, user reviews

The user (call her the Engineer) is a 14-year process operations engineer. She is not coding this herself. The LLM (you) does the building. The Engineer reviews.

Every artifact you produce must come with a plain-language explanation of what it does, what its inputs and outputs are, and one sentence of the form “if this is wrong, the symptom would be X.” The Engineer reads explanations, not source code. She sanity-checks by running the symptom test or by spot-checking domain logic against her process knowledge.

You must not advance to the next sprint task without her explicit approval. Approval means she has read the explanation and run at least one sanity check.

The Engineer’s domain knowledge is the bottleneck of the project. Her time is best spent reviewing your pairings reasoning (Sprint 1.4) and verifying P&ID correctness (Sprint 2.3). Do not waste her time asking her to read code.

## Inputs the project depends on

These exist outside the project. The user has access to them and will provide them when needed.

- Downs and Vogel 1993, “A plant-wide industrial process control problem,” Computers and Chemical Engineering. Source paper. Defines the process, variables, objectives.
- Ricker 1996, “Decentralized control of the Tennessee Eastman challenge process,” Journal of Process Control. The answer key for the comparison.
- The 41 XMEAS measurement variables (id, name, units, location).
- The 12 XMV manipulated variables (id, name, units, range).
- The 5 control objectives stated in the original paper.

Do not redistribute the paper text. Treat the papers as read-only references. Reproduce only the variable tables and objectives into project JSON.

## Required artifacts (by end of project)

```
/
  spec.md                  (this file)
  sprints.md               (you generate, user approves)
  /data
    variables.json         (41 XMEAS + 12 XMV)
    objectives.md          (paraphrased, not copied)
    ricker_baseline.json   (11 published pairings, ground truth)
    agent_run.json         (LLM proposer output, version-tagged)
    verifier_report.json   (pass/fail per loop)
    comparison.json        (agent vs ricker)
    gains.json             (Tier 2 only; steady-state gain matrix)
  /verifier
    verifier.py            (deterministic checks)
    rules.md               (plain-English description of each rule)
  /renderer
    symbols.jsx            (5 SVG primitives: vessel, valve, controller, instrument line, process line)
    layout.jsx             (hardcoded TEP unit positions)
    render.jsx             (pairings JSON to SVG)
  /app
    App.jsx                (replay UI, single-page)
    timing.js              (setTimeout sequence)
    package.json           (Vite + React + Tailwind core utilities only)
  /docs
    pitch_script.md        (60-second narration)
    explanations.md        (one section per artifact, plain language)
```

## Constraints and non-negotiables

- **No live API calls in the demo.** All LLM output is captured beforehand into `agent_run.json` and replayed.
- **No backend.** Static site. Vite build, deployable to Cloudflare Pages or Vercel.
- **No browser storage APIs.** No localStorage, sessionStorage. State lives in React state during the session.
- **No auto-layout for the P&ID.** Hardcode unit positions. Auto-layout will eat the day.
- **No paper text in the deliverable.** Reproduce only variable tables and objectives, paraphrased where the original would be copied.
- **No premature polish.** Ship normal effort with frontend skills by end of Day 1. Polish on Day 2.
- **Demo total runtime: 35 to 60 seconds on auto-play.** Longer loses judges.
- **The replay must include a visible “recorded run” label somewhere.** Not hidden, not loud. Honest.

## Sprint structure (use this when generating sprints.md)

Generate two days of sprints. Each sprint is one task. Each task has the following fields:

- **ID** (e.g., `1.1`, `1.2`, `2.1`)
- **Title** (one short sentence)
- **Time-box** (in minutes; total Day 1 should be 6-8 hours, Day 2 should be 6-8 hours)
- **LLM does** (3-5 bullet points; what you will produce)
- **Engineer reviews** (3-5 bullet points; what she checks before approving)
- **Output artifact** (filename or filenames produced)
- **Definition of done** (one sentence; the sanity check that confirms the task is finished)

Day 1 covers: paper ingestion, variable extraction, baseline encoding, optional tep2py install, proposer prompt design, agent run with iteration, verifier construction, comparison generation. End of Day 1 should produce all six (or seven, with gains) JSON files clean.

Day 2 covers: SVG symbol vocabulary, hardcoded TEP layout, P&ID rendering function, replay UI extension to include diagrams, greyed-out Phase 4 panel, speed multiplier, pitch script, dry runs, deployment.

Do not collapse multiple tasks into one. Do not skip the time-box on tep2py (Sprint 1.2). Do not start building until the Engineer approves sprints.md.

## Drop list (cut top to bottom if behind schedule)

1. Speed multiplier on replay.
1. Side-by-side diagram view (show one, then swap).
1. RGA in verifier (drops to Tier 1).
1. Custom SVG P&ID (drop to Mermaid flowchart).
1. Diagrams entirely (comparison table is still defensible).

## Risk register

- **High:** LLM ships subtly wrong code that the Engineer does not catch because she reads explanations, not code. Mitigation: every non-trivial function carries a one-line “if wrong, symptom is X” comment. Engineer runs the symptom test.
- **High:** tep2py install eats hours. Mitigation: 60-minute time-box on Sprint 1.2, no negotiation.
- **High:** Agent reasoning sounds confident but is engineering-wrong. Mitigation: Sprint 1.4 review by Engineer is the bottleneck of the project. Read every reasoning line.
- **Medium:** SVG layout produces visual mess. Mitigation: hardcode positions, fall back to Mermaid.
- **Medium:** Replay JSON mismatches latest agent run because of caching. Mitigation: in Sprint 2.4 final check, open JSON and replay side by side.

## The single rule

Code that the Engineer has not understood is code that will betray the demo on stage. Do not advance any task to “done” until the Engineer has read your explanation and run at least one sanity check. If she has not approved, the task is not done.” until the Engineer has read your explanation and run at least one sanity check. If she has not approved, the task is not done.