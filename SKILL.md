# TEP Control Structure Replay — Generator Skill

## Mission

Build the project described in `spec.md` in small, reviewable sprints. The Engineer (a 14-year process operations engineer, not a software engineer) reviews everything you produce. Optimize for correctness, source-grounded reasoning, demo reliability, and a workflow she can verify by reading explanations rather than code.

## Read First

Before making changes, read these in order:

1. `spec.md` — the single source of truth.
2. `sprints.md`, only if it already exists.
3. The active sprint section inside `sprints.md`, only after `sprints.md` exists.
4. Any referenced JSON artifacts in `data/`, only if the sprint depends on them.

If `sprints.md` does not exist, generate it from `spec.md` section "Sprint structure," following the field schema (ID, Title, Time-box, LLM does, Engineer reviews, Output artifact, Definition of done) and the test-mapping rules from `spec.md` section "Testing strategy." Then stop. Do not implement application code in the same task. Wait for the Engineer to approve `sprints.md` before any sprint executes.

If a sprint conflicts with `spec.md`, stop and flag the conflict instead of guessing.

## Two Lanes Discipline

Every sprint task in `sprints.md` has two lanes: **LLM does** and **Engineer reviews**. Honor both.

- The LLM produces artifacts and writes plain-language explanations.
- The Engineer reads the explanation and runs at least one sanity check.
- A task is not done until the Engineer approves. "Done" without approval is not done.
- Every non-trivial function carries a one-line comment of the form `# if this is wrong, the symptom is X`. This is what the Engineer uses for sanity checks.
- Do not ask the Engineer to read source code. Explain in plain language and let her test by behavior.

## Repo Discipline

- Obey `spec.md` and the active sprint task.
- Keep the repo shape aligned to the artifacts list in `spec.md`.
- Do not add new top-level folders unless the active sprint explicitly requires them.
- Do not commit dataset files (Rieth `.RData`, simulator outputs, large numerical artifacts).
- Do not commit API keys or secrets of any kind. There is no live API in this project; if a key appears in the working directory, stop and flag it.
- Treat the repo root as the project root.

## Source Material And Copyright

The project depends on two papers (Downs and Vogel 1993; Ricker 1996) which are copyrighted.

- Do not reproduce paper text, figures, tables, or long passages in the deliverable.
- Reproduce only variable tables (41 XMEAS, 12 XMV) and the 5 control objectives, paraphrased into the Engineer's own structure.
- Cite by short metadata only (author, year, journal). Never paste paper paragraphs into JSON, code comments, or UI.
- The P&ID rendering uses a locally drawn template, not scanned figures from any paper.
- If a sprint task requires a fact that would be a direct quote, paraphrase it or ask the Engineer to confirm the paraphrase is accurate.

## Data And Simulator Handling

- Tier 2 work depends on `tep2py` or an equivalent simulator port. Treat installation as a 60-minute time-box (Sprint 1.2). After 60 minutes of installation work including one debug attempt, hard stop and switch to Tier 1. Do not retry.
- If the simulator is missing or fails, fail gracefully with a friendly message naming the expected package and version, not a raw traceback.
- Never silently download or cache simulator binaries into the repo.
- Generated artifacts like `gains.json` are committed (small, deterministic). Raw simulator binaries are not.

## Working Style

- Work one sprint task at a time.
- Prefer small, explicit changes over broad speculative scaffolding.
- Use simple, cross-platform Python (for verifier and tests) and plain React with Tailwind core utilities (for replay UI).
- Use hardcoded layouts for the P&ID. No auto-layout libraries.
- Keep comments concise and only where they clarify non-obvious behavior, plus the mandatory "if this is wrong, the symptom is X" lines.
- Be honest about limitations, missing data, and uncertainty. The Engineer prefers honest gaps to confident hand-waving.

## Sprint Execution Rule

Bootstrap exception:

- If `sprints.md` does not exist, generate it from `spec.md` and stop. Do not start implementing. Wait for the Engineer to approve `sprints.md`.
- During bootstrap, you may create empty directories from the artifacts list in `spec.md`, but no application code, no tests, no UI.

At the start of each sprint task:

- Restate the sprint goal verbatim from `sprints.md`.
- List the files expected to change.
- List the visible Engineer verification steps from the sprint's "Engineer reviews" lane.
- If anything is unclear, ask before generating code.

At the end of each sprint task:

- Summarize what behavior is now working in plain language.
- Run the regression suite (`bash tests/run_all.sh`) and report results.
- List remaining risks and known gaps.
- Provide the human handoff (see "Human Handoff Format" below).
- Wait for explicit Engineer approval before starting the next task.

Do not blend multiple sprint tasks into one implementation. The Engineer's review cadence is the brake; respect it.

## Testing Rule

The testing strategy is defined in `spec.md` section "Testing strategy." Honor it strictly.

- Tests for an artifact are written in the same sprint that produces the artifact, not in a later "testing sprint."
- The full test suite (`bash tests/run_all.sh`) must run in under 30 seconds. If it grows beyond that, cut tests rather than tolerating slowness.
- After every sprint task, run the regression suite before marking the task done. If any test fails: do not advance, do not weaken assertions to make them pass, report the failure honestly to the Engineer with the failing test name and your hypothesis about what changed.
- If a test cannot run, say exactly why.
- Do not propose tests outside the required list in `spec.md`. If you think a test is missing that should be added, raise it with the Engineer rather than adding it silently.

## Human Handoff Format

End each sprint task with a handoff readable by a non-software engineer:

- **What changed.** One paragraph in plain language. No code in the summary.
- **What the Engineer should open or run.** Specific commands or files.
- **What she should expect to see.** Concrete observable behavior.
- **Sanity checks to run.** From the sprint's "Engineer reviews" lane, restated.
- **Test results.** Output of `bash tests/run_all.sh`, or a clear statement of why it could not run.
- **Risks or limitations remaining.** Honest, including any "this looks right but I'm not sure" cases.
- **Approval question.** End with: "Approve to advance to Sprint X.Y, or push back?"

The handoff is the contract between you and the Engineer. Do not skip it. Do not abbreviate it on the assumption that "she can see what changed." She is reading explanations, not diffs.

## Demo Integrity

The deliverable is a recorded-run demo. Honor the constraints in `spec.md`:

- No live API calls during the demo.
- All LLM output is captured into `agent_run.json` ahead of the demo, reviewed by the Engineer, and replayed deterministically.
- A visible "recorded run" label appears somewhere in the UI. Honest, not loud, not hidden.
- Demo total runtime on auto-play: 35 to 60 seconds.
- The replay must work offline after first page load. Static site only.

If a sprint task tempts you to add live inference, persistent storage, or a backend, stop and re-read `spec.md` constraints.

## Drop List Awareness

`spec.md` includes a drop list. If a sprint runs over time, surface the drop list to the Engineer and recommend the highest-numbered cut that protects the demo. Do not silently skip features; do not silently keep features that are eating budget. Make the trade-off visible.

## Never Do

- Never ignore `spec.md` or the active sprint task in `sprints.md`.
- Never advance a sprint task without Engineer approval.
- Never reproduce paper text, figures, or long passages in the deliverable.
- Never commit dataset files, simulator binaries, or API keys.
- Never weaken a test assertion to make a failing test pass.
- Never propose tests outside the required list without raising it with the Engineer first.
- Never add live API calls, backends, or browser storage to the replay UI.
- Never auto-layout the P&ID. Hardcode positions.
- Never hand off without the full Human Handoff Format.
- Never claim a task is done when it is not, or claim verification that was not performed.
- Never fail with a raw traceback when a friendly setup message is possible.