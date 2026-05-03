# TEP Control Structure Replay

TEP Control Structure Replay is a local-first proof of concept for reviewing plant-wide control-loop designs for the Tennessee Eastman Process benchmark. It helps a controls engineer inspect an agent-generated control structure, verify it against deterministic engineering rules, and compare it with the Ricker 1996 reference design through a recorded browser replay.

## Problem

In complex chemical processes, choosing which manipulated variables should control which measured variables is not obvious. A proposed control structure can look reasonable in text while still creating weak process gain, poor inventory control, unstable interactions, or violations of basic engineering constraints.

This is especially difficult for newer engineers, small teams, or teams working under time pressure. Reviewing a plant-wide control design requires process knowledge, source references, and careful comparison against proven baselines.

## Solution

This project turns that review process into an inspectable workflow:

1. Start from structured Tennessee Eastman Process data, control objectives, and known variables.
2. Use a structured proposer prompt to produce a plant-wide control-loop proposal.
3. Run deterministic engineering checks against the proposal.
4. Compare the proposal with the Ricker 1996 baseline.
5. Present the result in a recorded browser replay with verifier output and side-by-side P&ID-style diagrams.

The goal is not to replace a controls engineer. The goal is to make expert review faster and more transparent by narrowing the design space, highlighting questionable pairings, and turning implicit engineering judgment into visible evidence.

## Demo Flow

The judge-facing demo is in `app/`. It is a recorded replay, not a live cloud workflow.

When you click `Run Agent`, the UI shows:

- the proposer prompt streaming into the workspace
- the generated MV/CV pairings for the TEP control structure
- deterministic verifier checks
- agreement and divergence against the Ricker 1996 baseline
- side-by-side P&ID-style diagrams for the agent proposal and reference design
- an honest roadmap that separates this proof of concept from future simulator work

The replay uses local artifacts only. It does not require IBM Cloud credentials, watsonx credentials, or live model access.

## IBM Bob Usage

I used IBM Bob IDE as a major development partner for this project. I am a single-person team and not a traditional software developer, so Bob was more than a coding assistant. It helped bridge my process-engineering knowledge into a working software prototype.

My role was to define the industrial problem, explain the Tennessee Eastman Process context, review whether the control-loop reasoning made engineering sense, and steer the product direction. Bob helped translate that domain intent into concrete early project artifacts, including the repository structure, sprint plans, source data organization, proposer prompt, verifier logic, and initial renderer work.

Bob was especially useful because this project required both chemical-process reasoning and software implementation. I could describe the control challenge in operational terms, and Bob helped convert that into structured prompts, JSON artifacts, Python verification checks, and React/SVG rendering foundations. This allowed me, as a low-code builder, to move much faster than I could have alone.

Specific Bob-assisted artifacts include:

- `sprints/` - sprint plans and implementation contracts
- `data/proposer_prompt_v1.txt` - structured control-pairing prompt
- `data/` - source-grounded TEP variables, objectives, baseline data, and agent proposal artifacts
- `verifier/verifier.py` - deterministic engineering-rule checks
- `renderer/` - SVG/React rendering foundations for the P&ID comparison
- `docs/` - explanatory documentation and process notes

I used Bob heavily during the early implementation work, but I reached the Bobcoin limit during Sprint 2, so some later demo and UI polish was completed outside Bob tasks. Bob IDE usage evidence, including exported task histories and Bobalytics screenshots, is included in `bob_sessions/`.

I did not use IBM watsonx.ai or IBM watsonx Orchestrate in the submitted version. Given the time constraints as a single-person team, I focused on using Bob IDE deeply and completing a working local proof of concept rather than adding IBM Cloud services that I could not properly validate before submission.

## Repository Map

- `app/` - Vite React recorded replay UI.
- `data/` - TEP variables, objectives, Ricker baseline, generated proposal, comparison, and verifier report artifacts.
- `verifier/` - deterministic checks for MV uniqueness, inventory loops, degrees of freedom, and mass-balance closure.
- `renderer/` - hardcoded TEP layout and SVG/React P&ID renderer.
- `tests/` - Python validation tests and renderer smoke tests.
- `docs/` - process explanations and design notes.
- `sprints/` - sprint-by-sprint build plan.
- `bob_sessions/` - exported IBM Bob IDE evidence for hackathon judging.
- `scripts/run_proposer.py` - optional API-backed proposer runner. This is not required for the recorded demo.

## Run Locally

Python setup:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

On Windows PowerShell:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Install root Node dependencies for renderer smoke tests:

```bash
npm install
```

Run validation checks:

```bash
python3 tests/test_variables.py
python3 tests/test_verifier.py
bash tests/run_all.sh
```

Run the recorded browser replay:

```bash
cd app
npm install
npm run dev
```

Open the local Vite URL, click `Run Agent`, and watch the recorded replay.

Build the browser app:

```bash
cd app
npm run build
```

Generate a verifier report:

```bash
python3 verifier/verifier.py
```

This rewrites `data/verifier_report.json` from `data/agent_run.json` and `data/ricker_baseline.json`.

## Current Limitations

- The browser UI is a recorded/static replay and does not execute a live LLM or simulator.
- The proposer runner requires an API key and is not part of the offline judge-facing demo path.
- The verifier checks structural engineering rules only. It does not perform dynamic simulation, Relative Gain Array analysis, or closed-loop stability analysis.
- The Ricker baseline intentionally contains cascade/duplicate MV structure that the simple decentralized uniqueness rule marks as failing.
- This proof of concept supports control-structure review. It is not a production control system.

## Data And Secrets Policy

Raw Rieth TEP `.RData` files, `.env`, API keys, model artifacts, and local caches must stay out of Git. The repository `.gitignore` excludes `.env`, `datasets/*.RData`, `*.RData`, `models_trained/*.pkl`, `.pytest_cache/`, and common IDE/cache files.

The project is designed to run the submitted demo locally without secrets.

## References

- Downs and Vogel (1993), *Computers and Chemical Engineering*, DOI `10.1016/0098-1354(93)80018-I`.
- Ricker (1996), *Journal of Process Control*, "Decentralized control of the Tennessee Eastman Challenge Process".
- Rieth et al. (2017), *Additional Tennessee Eastman Process Simulation Data for Anomaly Detection Evaluation*, Harvard Dataverse, DOI `10.7910/DVN/6C3JR1`.

Paper text is not reproduced in this repository. Only project-specific variables, objectives, citations, and control-structure artifacts are stored here.
