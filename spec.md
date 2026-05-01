# TEP Copilot Product Spec

## Objective

Build a local-first Streamlit app for the Tennessee Eastman Process benchmark that demonstrates earlier fault detection than classical 3-sigma SPC by combining domain-informed engineered features with a lightweight ML workflow. The final judge-facing experience must be a single main dashboard in `app.py`, centered on a default `Copilot` flow and optionally including a secondary replay-based operator decision challenge. Support pages for QA and review are allowed, but they must remain secondary to the main dashboard story.

## Hackathon Submission Strategy

- The project is a proof-of-concept solution built with IBM Bob IDE as a core development component, not only an industrial ML dashboard.
- The final README and demo must explain how IBM Bob helped turn the idea into a working artifact faster, including repository planning, implementation, documentation, tests, or review.
- The final repository must include a `bob_sessions/` folder containing the relevant exported Bob IDE task-history markdown files and task-session consumption summary screenshots required for judging.
- Bob session artifacts are submission evidence. Do not fabricate them, summarize them in place of exports, or omit them from the final repository.
- watsonx usage is optional for this project unless the hackathon organizers give a stricter team-specific requirement. The core app must remain runnable locally without IBM Cloud credentials.

## Single Source Of Truth

- `spec.md` is the controlling project plan and product contract.
- IBM Bob must be able to start from this repository without any separate playbook file.
- `SKILL.md` contains operating rules for Bob, but if `SKILL.md` conflicts with `spec.md`, `spec.md` wins.
- If `sprints/` does not exist yet, Bob must create sprint contract files from the Sprint Roadmap in this spec before implementing application code.
- Once sprint files exist, each implementation task must follow the active sprint contract and remain inside that sprint boundary.

## Source-Grounded Facts

- The benchmark process is the Tennessee Eastman Process introduced by Downs and Vogel (1993), DOI `10.1016/0098-1354(93)80018-I`.
- The dataset is Rieth et al. (2017), *Additional Tennessee Eastman Process Simulation Data for Anomaly Detection Evaluation*, Harvard Dataverse, DOI `10.7910/DVN/6C3JR1`.
- The Rieth dataset is distributed as four `.RData` tables: fault-free training, fault-free testing, faulty training, and faulty testing.
- Each row contains `faultNumber`, `simulationRun`, `sample`, `xmeas_1..41`, and `xmv_1..11`.
- The original process has 41 measured variables and 12 manipulated variables; the Rieth dataset omits `xmv_12` because agitator speed is held constant.
- Training runs are 500 samples long and testing runs are 960 samples long. The sample interval is 3 minutes.
- In faulty training runs, the first post-fault point is sample 21. In faulty testing runs, the first post-fault point is sample 161.
- The local flowsheet SVG already supports live placeholders for continuous tags `XMEAS 1-22`. The analyzer banks for `XMEAS 23-41` are drawn but not yet individually bindable.

## Required Repo Layout

The repository root is the project root. Bob should create any missing directories and support files from this spec during bootstrap.


Rules:
- Keep this layout as the primary app architecture.
- Add only minimal support files or directories that are required for generator control, references, Bob judging evidence, tests, and PR workflow.
- Do not nest the app under another top-level folder.
- Do not include `tep_hackathon_playbook.md` in the repository.
- The raw dataset may exist beside the repository on the local machine, but not inside the repository.

## Required App Surface

- `app.py` remains the main judge-facing dashboard and must implement this spec's core story: flowsheet, time series, callout, replay controls, and model-vs-SPC narrative.
- `app.py` may include a secondary `Training Challenge` mode, but `Copilot` remains the default judge-facing flow.
- Any training interaction in v1 must be single-step, replay-based, and advisory rather than a live simulator.
- Support pages are allowed later for development and review, such as Data QA, Feature QA, and Model Results.
- Support pages must not replace the main dashboard or change the product story.
- The app must degrade gracefully when local data or model artifacts are missing.

## Sprint Roadmap

Bob must create sprint contract files under `sprints/` from this roadmap if they are missing. Each sprint file should include: metadata, activation preconditions, product goal, what will be built, explicit out-of-scope items, done criteria, test plan, pass/fail thresholds, allowed file scope, and guardrails.

### Sprint 000: Bootstrap Files Only

- Goal: create the controlled repo shape and sprint contract stack before app code exists.
- Allowed files: `spec.md`, `SKILL.md`, `README.md`, `requirements.txt`, `.gitignore`, `.github/pull_request_template.md`, `references/`, `bob_sessions/README.md`, `sprints/`, `tests/.gitkeep`, `models_trained/.gitkeep`, and empty app directories with `.gitkeep` files if needed.
- Must create sprint contracts for Sprints 000 through 008 from this roadmap.
- Must not create `app.py` or app modules.
- Done when the repo has the required structure, docs, ignore rules, citation metadata, Bob evidence folder, PR template, and sprint files.

## Replay-Based Training Constraint

- The Rieth dataset provides fixed replay trajectories; operator choices in v1 do not change future plant state.
- If a `Training Challenge` is implemented, it must pause at a selected replay point, collect a first diagnostic or control move, score that move against a local curated rubric, and then continue the same replay unchanged.
- Any cost implication shown in training mode is advisory and derived from the replay and cost model; it is not proof that the operator optimized plant behavior.
- The app must not claim to be a live simulator, a closed-loop trainer, or a control optimizer unless a controllable simulator is added later.

## Shared Footer Rule

- Every page in the software must render the same shared references footer.
- The footer must include at minimum:
  - dataset citation and DOI
  - benchmark paper citation and DOI
  - provenance note stating that figures in the app are redrawn or generated from cited data and that original paper pages are not reproduced
- Footer content must be loaded from local files in `references/`, not hardcoded separately on each page.
- The footer rule applies to the main dashboard and any later support pages.

## Data Policy

- Raw `.RData` dataset files are local-only and must not be committed to GitHub.
- The repo must ignore dataset storage locations such as `data_raw/`, `dataverse_files/`, and `*.RData`.
- The app must read the dataset from a local ignored location.
- If the dataset is missing, the app must show a friendly setup message rather than a traceback.
- Small synthetic fixtures may be added later for tests, but the published Rieth dataset stays out of the repo.
- Do not use client data, personal information, social-media data, company-confidential data, or any data without permission from the data owner.

## IBM Platform Policy

- IBM Bob IDE is required for the hackathon workflow and judging evidence.
- Bob task-session exports belong in `bob_sessions/` and should be reviewed for secrets before commit.
- IBM Cloud credentials, IBM API keys, watsonx access tokens, and `.streamlit/secrets.toml` must never be committed.
- If optional watsonx.ai artifacts are added later, do not use out-of-scope hackathon features or models identified in the guide.
- The app must not require a live watsonx or IBM Cloud account to run the default local demo.

## Cross-Platform Rule

- macOS and Windows must both work with Python `3.11`, `venv`, and `pip`.
- Avoid Docker, Conda, Makefiles, Linux-only shell assumptions, and hardcoded absolute paths.
- Setup and run steps must be expressible in both Terminal and PowerShell.
- File paths and local environment assumptions must be platform-safe.

## GitHub PR Rule

- Work one sprint at a time.
- Use one branch per sprint and one PR per sprint.
- Each PR must include:
  - goal
  - changed behavior
  - local run steps
  - human verification checklist
  - references touched
  - Bob session evidence produced or not applicable yet
  - known limitations
- The sprint contract for the active sprint is the implementation boundary for that PR.

## Generator Boundaries

- The generator must obey `spec.md`.
- If sprint files are missing, the generator must first create the repo structure and sprint contracts from this spec, then stop for human review.
- After sprint files exist, the generator must obey the active sprint file.
- The generator must not create app code outside the current sprint scope.
- The generator must not introduce repo shape drift from this spec without explicit approval in `spec.md` or the active sprint contract.
- The generator must not commit dataset files or copied copyrighted article content.
- The generator must not invent closed-loop simulator behavior or control-optimization claims from replay-only data.
- Sprint 000 is documentation/bootstrap only. No app code modules are to be created in this sprint.

## Human Responsibilities

- Create and own the GitHub repo.
- Use the hackathon-provisioned IBM Bob IDE account for project tasks that will be submitted for judging.
- Place the local source materials at repo root.
- Keep the raw dataset local and out of Git.
- Export relevant Bob IDE task-history markdown files and task-session consumption summary screenshots into `bob_sessions/`.
- Start each sprint intentionally and review the resulting files.
- Run visible verification steps and review draft PRs.
- Reject scope creep and merge only after the checklist passes.
- Own the final README narrative, screenshots, demo flow, and submission packaging.

## Acceptance Criteria

- Repo root stays spec-aligned and not nested under another app folder.
- `app.py` remains reserved as the future main dashboard entrypoint.
- Every later page must use the shared references footer.
- The dataset policy is explicit and enforceable through `.gitignore` and the docs.
- macOS and Windows compatibility is a stated product requirement from the start.
- The generator has a clear operating contract and sprint boundary before code generation begins.
- The final repo contains `bob_sessions/` with relevant IBM Bob IDE task evidence for judging.
- The README frames the artifact as Bob-assisted delivery of a process copilot, not just standalone data science.
- Any operator-training interaction is explicitly described as replay-based and not as a plant simulator.
- The main judge-facing story remains earlier fault detection first, with training challenge behavior secondary.

## Out Of Scope

- Uploading the full Rieth dataset to GitHub
- Committing IBM Cloud credentials, Bob account secrets, API keys, or watsonx access tokens
- Fabricating or replacing Bob IDE session exports with hand-written summaries
- Reproducing copyrighted paper figures or article pages
- Cloud deployment
- Dockerization
- Conda-specific workflows
- Auto-merge or unattended PR approval
- Building application modules during Sprint 000
- A live closed-loop operator simulator built from the Rieth replay dataset alone
- Causal proof that a user action minimized plant cost
- Claims that user-entered control moves change the future replay trajectory in v1
- Claims that the app optimizes controls directly from user actions in v1
