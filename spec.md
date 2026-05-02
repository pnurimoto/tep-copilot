# TEP Control Structure Replay Product Spec

## Objective

Build a local-first, recorded browser demo for the Tennessee Eastman Process (TEP) that shows an LLM proposing a plant-wide decentralized control structure, a deterministic verifier checking that proposal against engineering rules, and an SVG renderer comparing the agent proposal with the Ricker 1996 baseline.

The current product story is control-structure design and verification. It is not a Streamlit fault-detection dashboard, not a model-vs-SPC app, and not a live plant simulator.

## Current Repository Contract

The codebase currently implements these foundations:

- `data/variables.json` with 41 measured variables and 12 manipulated variables.
- `data/objectives.md` with control objectives.
- `data/ricker_baseline.json` with the published baseline structure encoded for comparison.
- `data/agent_run.json` and related run artifacts with recorded LLM proposer output.
- `verifier/verifier.py` with structural engineering checks for MV uniqueness, inventory loops, degrees of freedom, and mass-balance closure.
- `renderer/symbols.jsx` with reusable SVG/React P&ID symbol primitives.
- `tests/` with Python validation scripts and a renderer smoke test.

Not implemented yet:

- No `app.py` or Streamlit surface.
- No runnable React/Vite app under `app/`.
- No complete P&ID layout or pairing-to-diagram renderer beyond isolated symbols.
- No live API-backed proposer in the demo path.
- No closed-loop simulator or replay dynamics affected by user choices.

## Code Wins Rule

When repository docs conflict with implemented code, tracked sprint contracts, or existing data artifacts, the implemented repository wins. Fix stale documentation to match the code before adding new behavior.

`spec.md` is the high-level product contract after this reconciliation. Sprint files under `sprints/` define the active implementation boundaries. If a future product change intentionally moves away from the existing implementation, update `spec.md`, the relevant sprint file, and the README together before writing code.

## Hackathon Submission Strategy

- The project is a proof-of-concept built with IBM Bob IDE as a core development component.
- The final README and demo should explain how IBM Bob helped produce the data catalog, proposer prompt, verifier, renderer groundwork, documentation, tests, and review evidence.
- The final repository must include `bob_sessions/` with relevant exported Bob IDE task-history markdown files and any required judging evidence.
- Bob session artifacts are submission evidence. Do not fabricate them, summarize them in place of exports, or omit them from the final repository.
- watsonx usage is optional unless the hackathon rules impose a stricter requirement. The default demo must remain runnable locally without IBM Cloud credentials.

## Source-Grounded Facts

- The benchmark process is the Tennessee Eastman Process introduced by Downs and Vogel (1993), DOI `10.1016/0098-1354(93)80018-I`.
- Ricker (1996), "Decentralized control of the Tennessee Eastman Challenge Process," is the baseline control-structure reference used for comparison.
- The process has 41 measured variables and 12 manipulated variables in the current project catalog.
- The Rieth et al. (2017) dataset, DOI `10.7910/DVN/6C3JR1`, may be cited as a related TEP data source, but the current replay demo does not depend on loading raw `.RData` files.
- Paper text, copyrighted figures, and raw dataset files must not be copied into this repository.

## Required Repo Layout

The repository root is the project root. Do not nest the app under another top-level project folder.

Primary layout:

- `data/` - variables, objectives, baseline pairings, recorded proposer outputs, verifier reports.
- `verifier/` - deterministic Python verification rules and explanations.
- `renderer/` - React/SVG symbol vocabulary and future P&ID renderer modules.
- `tests/` - validation scripts and smoke tests.
- `docs/` - human-readable explanations and pitch/demo notes.
- `sprints/` - sprint contracts and roadmap.
- `bob_sessions/` - Bob IDE exported session evidence.
- `assets/` - static visual assets such as the TEP flowsheet SVG.

Rules:

- Do not include `tep_hackathon_playbook.md` in the repository.
- Keep raw datasets, generated model artifacts, caches, local credentials, and API keys out of Git.
- Add only support files required for the control-structure replay demo, verification, rendering, documentation, tests, or submission evidence.

## Required Demo Surface

The intended judge-facing surface is a static browser demo built from recorded artifacts.

Required behavior for the future UI:

- Start from prepared local JSON files, not live LLM calls.
- Show that the LLM produced structured MV-CV pairings and reasoning.
- Run or replay deterministic verifier results.
- Render or preview P&ID-style diagrams from deterministic renderer code.
- Compare the agent proposal against the Ricker baseline.
- Display a visible "RECORDED RUN" label.
- Keep runtime suitable for a short stage demo, targeting roughly 35-60 seconds.

Out of scope for the current demo:

- Streamlit `app.py`.
- Fault-detection model training.
- Earlier-than-SPC claims.
- User actions that change future plant trajectory.
- Live closed-loop simulation.
- Claims that the app optimizes controls directly.

## Sprint Roadmap

The active roadmap is the sprint set already tracked under `sprints/`.

Day 1 foundations:

- Sprint 1.1: variable extraction and objectives.
- Sprint 1.2: TEP simulator time-box and Tier 1 fallback.
- Sprint 1.3: Ricker baseline encoding.
- Sprint 1.4: LLM proposer prompt and recorded run.
- Sprint 1.5: verifier construction.
- Sprint 1.6: agent-vs-Ricker comparison.

Day 2 demo build:

- Sprint 2.1: SVG symbol vocabulary.
- Sprint 2.2: hardcoded TEP layout.
- Sprint 2.3: P&ID rendering function.
- Sprint 2.4: replay UI integration.
- Sprint 2.5: pitch script and documentation.
- Sprint 2.6: dry runs and polish.
- Sprint 2.7: deployment and final checks.

Each implementation task must stay inside the active sprint file's allowed scope unless the human explicitly updates the sprint contract.

## Architecture Principles

The three-layer separation must remain auditable:

1. Proposer: reads variables and objectives, then emits structured pairings JSON with reasoning.
2. Verifier: checks pairings with deterministic Python rules and produces pass/fail details.
3. Renderer: consumes pairings and layout data, then draws SVG/P&ID output deterministically.

If a judge asks whether the LLM drew the diagram, the answer is no. The LLM produced structured pairings; deterministic code renders the diagram.

## Data And Secrets Policy

- `.env`, API keys, IBM Cloud credentials, watsonx tokens, and `.streamlit/secrets.toml` must never be committed.
- Raw Rieth/TEP `.RData` files must stay local and ignored.
- Generated model artifacts must stay ignored unless a future sprint explicitly changes that policy.
- Bob session exports should be reviewed for secrets before commit.
- Do not use client data, personal information, company-confidential data, or any data without permission from the data owner.

## Cross-Platform Rule

- Python checks should run on macOS and Windows with Python 3.11+ where practical.
- Avoid Docker, Conda-only workflows, Linux-only assumptions, and hardcoded absolute paths.
- Setup and run steps should be expressible in both Terminal and PowerShell when they become part of the documented workflow.
- JavaScript tooling must be declared in a repo-local package file before it is treated as a required workflow.

## GitHub PR Rule

- Work one sprint at a time.
- Use one branch per sprint and one PR per sprint.
- Each PR should include goal, changed behavior, local run steps, human verification checklist, references touched, Bob session evidence, and known limitations.
- The active sprint contract is the implementation boundary for that PR.

## Generator Boundaries

- Follow the active sprint file and this reconciled spec.
- Do not add app code outside the current sprint scope.
- Do not introduce repo-shape drift without updating `spec.md` and the active sprint contract first.
- Do not commit dataset files, credentials, copied paper text, or copied paper figures.
- Do not invent simulator behavior or control-optimization claims from replay-only data.
- Prefer small, reviewable changes that preserve the proposer/verifier/renderer separation.

## Human Responsibilities

- Own the GitHub repo and final submission.
- Use the hackathon-provisioned IBM Bob IDE account for project tasks that will be submitted for judging.
- Keep raw source datasets and secrets local.
- Export relevant Bob IDE task-history files and judging evidence into `bob_sessions/`.
- Review sprint outputs before advancing.
- Run visible verification steps and review PRs.
- Own the final README narrative, screenshots, demo flow, and submission packaging.

## Acceptance Criteria

- Repo root stays aligned with the control-structure replay architecture.
- README, `spec.md`, and sprint files describe the same product direction.
- The default demo path uses recorded local artifacts and no live credentials.
- The verifier output is deterministic and traceable to local JSON inputs.
- Renderer output is deterministic and does not imply the LLM drew diagrams directly.
- Bob session evidence is present and reviewed for secrets.
- Raw data, model artifacts, and credentials remain out of Git.
- Any future operator-training behavior is described as replay-based unless a real controllable simulator is added.

## Out Of Scope

- Streamlit dashboard work unless a future spec update intentionally reintroduces it.
- Uploading the full Rieth dataset to GitHub.
- Committing IBM Cloud credentials, Bob account secrets, API keys, or watsonx access tokens.
- Fabricating or replacing Bob IDE session exports with hand-written summaries.
- Reproducing copyrighted paper figures or article pages.
- Live LLM inference in the stage demo.
- Backend services for the current demo.
- Cloud deployment as a requirement for local verification.
- Dockerization or Conda-specific workflows.
- Auto-merge or unattended PR approval.
- A live closed-loop operator simulator built from replay data alone.
