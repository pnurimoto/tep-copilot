# TEP Control Structure Replay

TEP Control Structure Replay is a local-first prototype for evaluating plant-wide control-loop pairings for the Tennessee Eastman Process (TEP). The current repository focuses on the data catalog, LLM proposer prompt/output, deterministic verifier, and SVG symbol vocabulary used for later P&ID rendering.

## Current Status

Implemented now:

- TEP variable catalog in `data/variables.json` with 41 measurements and 12 manipulated variables.
- Control objectives and Ricker 1996 baseline pairing data in `data/objectives.md` and `data/ricker_baseline.json`.
- LLM proposer prompt and generated agent outputs in `data/proposer_prompt_v1.txt`, `data/agent_run.json`, and `data/agent_run_3.json`.
- Deterministic Python verifier in `verifier/verifier.py` with tests in `tests/test_verifier.py`.
- SVG/React symbol primitives in `renderer/symbols.jsx` plus a renderer smoke test in `tests/run_all.sh`.
- Bob IDE session evidence in `bob_sessions/`.

Not implemented yet:

- No runnable browser UI or app interface is present.
- No `app.py`, `app/`, `index.html`, or Vite setup exists in the tracked repo.
- No full P&ID layout/rendering layer exists yet beyond isolated SVG symbols.

## Repository Map

- `data/` - source-grounded variables, objectives, baseline pairings, agent outputs, and verifier report artifacts.
- `scripts/run_proposer.py` - optional API-backed proposer runner. Requires either `BOB_IBM_API_KEY` or `ANTHROPIC_API_KEY` in the environment or `.env`.
- `verifier/` - deterministic engineering-rule checks for MV uniqueness, inventory loops, degrees of freedom, and mass-balance closure.
- `renderer/` - current SVG symbol vocabulary. This is renderer groundwork, not a complete UI.
- `tests/` - Python validation tests and a shell-based renderer smoke test.
- `docs/` and `sprints/` - design notes, sprint contracts, and implementation plan.
- `bob_sessions/` - exported Bob IDE evidence for hackathon judging.

## Local Setup

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

Install the declared Node dependency for renderer smoke tests:

```bash
npm install
```

Run the checks:

```bash
python3 tests/test_variables.py
python3 tests/test_verifier.py
bash tests/run_all.sh
```

Generate a verifier report:

```bash
python3 verifier/verifier.py
```

This rewrites `data/verifier_report.json` from `data/agent_run.json` and `data/ricker_baseline.json`.

## UI Status

There is no user-facing interface yet. The project only has reusable SVG symbol components and a smoke test that renders a static preview SVG to `/private/tmp/tep-symbols-preview.svg`. The planned interface work is described in the Sprint 2 files, especially `sprints/sprint-2.2-tep-layout.md`, `sprints/sprint-2.3-pid-renderer.md`, and `sprints/sprint-2.4-replay-ui.md`.

## Current Limitations

- The renderer is a symbol vocabulary only; it does not yet render complete plant layouts or loop connections.
- The proposer runner requires an API key and is not part of the offline demo path.
- The verifier checks structural rules only. It does not perform dynamic simulation or Relative Gain Array analysis.
- The Ricker baseline intentionally contains cascade/duplicate MV structure that the simple decentralized uniqueness rule marks as failing.

## Data And Secrets Policy

Raw Rieth TEP `.RData` files, `.env`, API keys, model artifacts, and local caches must stay out of Git. The repository `.gitignore` excludes `.env`, `datasets/*.RData`, `*.RData`, `models_trained/*.pkl`, `.pytest_cache/`, and common IDE/cache files.

## References

- Downs and Vogel (1993), *Computers and Chemical Engineering*, DOI `10.1016/0098-1354(93)80018-I`.
- Ricker (1996), *Journal of Process Control*, "Decentralized control of the Tennessee Eastman Challenge Process".
- Rieth et al. (2017), *Additional Tennessee Eastman Process Simulation Data for Anomaly Detection Evaluation*, Harvard Dataverse, DOI `10.7910/DVN/6C3JR1`.

Paper text is not reproduced in this repository. Only project-specific variables, objectives, citations, and control-structure artifacts are stored here.
