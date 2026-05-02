# TEP Control Structure Replay

An LLM agent that proposes a plant-wide control structure for the Tennessee Eastman Process, verifies it against engineering rules, and compares it against Ricker's published 1996 solution.

## Current Status

Foundations in place (variables, objectives, baseline). Agent run and replay UI in progress.

## What This Is

Plant-wide control structure design (which manipulated variable controls which controlled variable across an entire process) is a senior engineering judgment task. Tennessee Eastman is the canonical 33-year-old benchmark for this problem. Classical solutions disagree on the contested decisions.

This project asks an LLM to do the structural design step, runs its proposal through a deterministic verifier, and compares against Ricker (1996) as the answer key. The deliverable is a browser-only recorded demo: no live API calls, no backend.

## Architecture

Three layers, each auditable on its own:

- **Proposer** (LLM): reads variables and objectives, emits structured pairings with reasoning.
- **Verifier** (Python): checks degrees of freedom, mass balance, MV uniqueness, inventory outflow handles.
- **Renderer** (React + SVG): draws both control structures as P&IDs from the same template.

## Local Setup

```bash
npm install
npm run dev
```

Tests:

```bash
bash tests/run_all.sh
```

## References

- Downs and Vogel (1993), *Computers and Chemical Engineering*, DOI `10.1016/0098-1354(93)80018-I`
- Ricker (1996), *Journal of Process Control*, "Decentralized control of the Tennessee Eastman challenge process"

Paper text is not reproduced in this repository. Only the variable tables and objectives are paraphrased into project JSON.
