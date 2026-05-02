# TEP Control Structure Replay Product Spec

## Objective

Build a local-first, browser-based recorded demo for the Tennessee Eastman Process benchmark that shows an LLM-proposed plant-wide control structure, verifies it against deterministic engineering rules, and compares it with the Ricker 1996 baseline. The final judge-facing experience should be a static replay-style interface with no live API calls, no backend, and no claim of closed-loop plant simulation.

The current product story is control-structure design and verification. It is not a Streamlit fault-detection dashboard, not a model-vs-SPC app, and not a live plant simulator.

- The project is a proof-of-concept solution built with IBM Bob IDE as a core development component, not only static documentation.
- The final README and demo must explain how IBM Bob helped turn the idea into a working artifact faster, including repository planning, implementation, documentation, tests, or review.
- The final repository must include a `bob_sessions/` folder containing the relevant exported Bob IDE task-history markdown files and task-session consumption summary screenshots required for judging.
- Bob session artifacts are submission evidence. Do not fabricate them, summarize them in place of exports, or omit them from the final repository.
- watsonx usage is optional for this project unless the hackathon organizers give a stricter team-specific requirement. The core app must remain runnable locally without IBM Cloud credentials.

## Hackathon Submission Strategy

- The project is a proof-of-concept built with IBM Bob IDE as a core development component.
- The final README and demo should explain how IBM Bob helped produce the data catalog, proposer prompt, verifier, renderer groundwork, documentation, tests, and review evidence.
- The final repository must include `bob_sessions/` with relevant exported Bob IDE task-history markdown files and any required judging evidence.
- Bob session artifacts are submission evidence. Do not fabricate them, summarize them in place of exports, or omit them from the final repository.
- watsonx usage is optional unless the hackathon rules impose a stricter requirement. The default demo must remain runnable locally without IBM Cloud credentials.

## Source-Grounded Facts

- The benchmark process is the Tennessee Eastman Process introduced by Downs and Vogel (1993), DOI `10.1016/0098-1354(93)80018-I`.
- The original process has 41 measured variables and 12 manipulated variables.
- The current demo encodes the 41 measured variables and 12 manipulated variables in `data/variables.json`.
- The current demo compares an LLM-proposed decentralized structure against the Ricker 1996 baseline in `data/ricker_baseline.json`.
- The current verifier is structural: MV uniqueness, required inventory loops, degrees of freedom, and mass-balance closure. It does not simulate TEP dynamics.

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

- The future judge-facing interface must show the LLM proposal, verifier results, and Ricker baseline comparison as a recorded/static replay.
- The interface may be built as a static browser app; no backend or live API call is required for the default demo.
- The interface must clearly label prerecorded content and avoid implying live simulation or optimization.
- Support pages are allowed later for development and review, but they must not replace the main comparison story.
- The app must degrade gracefully when optional local data or generated artifacts are missing.

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

## Recorded Demo Constraint

- The default demo replays static local artifacts: the LLM proposal, verifier report, and Ricker baseline comparison.
- User choices in any future training or challenge mode must not be presented as changing plant state unless a real controllable simulator is added later.
- Any score or cost implication shown in a future training mode must be described as advisory, not as proof that the operator optimized plant behavior.
- The app must not claim to be a live simulator, a closed-loop trainer, or a control optimizer unless a controllable simulator is added later.

## Architecture Principles

- Every page in the software must render the same shared references footer.
- The footer must include at minimum:
  - dataset citation and DOI
  - benchmark paper citation and DOI
  - provenance note stating that figures in the app are redrawn or generated from cited data and that original paper pages are not reproduced
- Footer content must be loaded from local files in `references/`, not hardcoded separately on each page.
- The footer rule applies to the main UI and any later support pages.

1. Proposer: reads variables and objectives, then emits structured pairings JSON with reasoning.
2. Verifier: checks pairings with deterministic Python rules and produces pass/fail details.
3. Renderer: consumes pairings and layout data, then draws SVG/P&ID output deterministically.

- Raw `.RData` dataset files are local-only and must not be committed to GitHub.
- The current control-structure replay does not require the Rieth `.RData` files.
- The repo must ignore dataset storage locations such as `data_raw/`, `dataverse_files/`, and `*.RData`.
- If a later UI reads optional local data, missing files must produce a friendly setup message rather than a traceback.
- Small synthetic fixtures may be added later for tests, but the published Rieth dataset stays out of the repo.
- Do not use client data, personal information, social-media data, company-confidential data, or any data without permission from the data owner.

## Data And Secrets Policy

- IBM Bob IDE is required for the hackathon workflow and judging evidence.
- Bob task-session exports belong in `bob_sessions/` and should be reviewed for secrets before commit.
- IBM Cloud credentials, IBM API keys, watsonx access tokens, and `.streamlit/secrets.toml` must never be committed.
- If optional watsonx.ai artifacts are added later, do not use out-of-scope hackathon features or models identified in the guide.
- The app must not require a live watsonx, IBM Cloud account, or LLM API key to run the default recorded demo.

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

- Repo root stays spec-aligned and not nested under another app folder.
- A future UI entrypoint remains reserved for the recorded browser demo; the repository currently has no runnable UI entrypoint.
- Every later page must use the shared references footer.
- The dataset policy is explicit and enforceable through `.gitignore` and the docs.
- macOS and Windows compatibility is a stated product requirement from the start.
- The generator has a clear operating contract and sprint boundary before code generation begins.
- The final repo contains `bob_sessions/` with relevant IBM Bob IDE task evidence for judging.
- The README frames the artifact as Bob-assisted delivery of a control-structure replay prototype, not just standalone data files.
- Any operator-training interaction is explicitly described as replay-based and not as a plant simulator.
- The main judge-facing story remains LLM proposal, verifier audit, and Ricker baseline comparison.

## Out Of Scope

- Uploading the full Rieth dataset to GitHub
- Committing IBM Cloud credentials, Bob account secrets, API keys, or watsonx access tokens
- Fabricating or replacing Bob IDE session exports with hand-written summaries
- Reproducing copyrighted paper figures or article pages
- Cloud deployment
- Dockerization
- Conda-specific workflows
- Auto-merge or unattended PR approval
- Building UI modules during Sprint 000
- A live closed-loop operator simulator built from the Rieth replay dataset alone
- Causal proof that a user action minimized plant cost
- Claims that user-entered control moves change the future replay trajectory in v1
- Claims that the app optimizes controls directly from user actions in v1
