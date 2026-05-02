# TEP Copilot - Sprint Plan Overview

This document provides an overview of the 2-day sprint plan for building the Tennessee Eastman Process (TEP) LLM-driven control structure demo.

## Project Goal

Build a browser-based, recorded demo of an LLM agent that proposes a plant-wide control structure for TEP, verifies it against engineering rules, renders both the agent's proposal and Ricker (1996) baseline as P&IDs, and compares them side by side. The demo is a 35-60 second replay with no live API calls.

## Sprint Structure

Each sprint follows this format:
- **ID**: Unique identifier (e.g., 1.1, 2.3)
- **Title**: One-sentence description
- **Time-box**: Allocated time in minutes
- **LLM does**: 3-5 bullet points of what will be produced
- **Engineer reviews**: 3-5 bullet points of what to check before approval
- **Output artifact**: Files produced
- **Definition of done**: One-sentence sanity check

## Day 1: Data, Agent, and Verifier (6.5 hours)

| Sprint | Title | Time | Key Output |
|--------|-------|------|------------|
| 1.1 | Variable Extraction and Objectives | 45 min | `data/variables.json`, `data/objectives.md` |
| 1.2 | tep2py Installation Time-box | 60 min | `data/gains.json` OR Tier 1 fallback |
| 1.3 | Ricker Baseline Encoding | 30 min | `data/ricker_baseline.json` |
| 1.4 | LLM Proposer Prompt Design | 90 min | `data/agent_run.json` |
| 1.5 | Verifier Construction | 120 min | `verifier/verifier.py`, `data/verifier_report.json` |
| 1.6 | Agent vs Ricker Comparison | 45 min | `data/comparison.json` |

**Day 1 Goal**: All JSON files clean and verified. Engineer has reviewed agent reasoning and verifier logic.

## Day 2: Renderer, UI, and Deployment (7.5 hours)

| Sprint | Title | Time | Key Output |
|--------|-------|------|------------|
| 2.1 | SVG Symbol Vocabulary | 60 min | `renderer/symbols.jsx` |
| 2.2 | Hardcoded TEP Layout | 90 min | `renderer/layout.jsx` |
| 2.3 | P&ID Rendering Function | 120 min | `renderer/render.jsx` |
| 2.4 | Replay UI Integration | 120 min | `app/App.jsx`, `app/timing.js` |
| 2.5 | Pitch Script and Documentation | 45 min | `docs/pitch_script.md`, `docs/explanations.md` |
| 2.6 | Dry Runs and Final Polish | 90 min | Bug fixes, `README.md` |
| 2.7 | Deployment and Final Checks | 30 min | Deployed URL, `docs/deployment_checklist.md` |

**Day 2 Goal**: Working demo deployed and ready for stage presentation.

## Critical Decision Points

### Sprint 1.2: Tier 2 vs Tier 1
- **60-minute hard time-box** on tep2py installation
- If successful: Tier 2 with RGA checks in verifier
- If failed: Tier 1 with structural rules only
- **No negotiation on time-box**

### Sprint 1.4: Agent Reasoning Review
- **Bottleneck review**: Engineer reads all 11 reasoning traces
- This is where domain expertise is most valuable
- Flag any engineering-wrong reasoning before proceeding

### Sprint 2.3: P&ID Correctness
- **Second bottleneck review**: Visual correctness is critical
- Engineer traces loops from sensor to valve
- Incorrect P&ID undermines demo credibility

## Architecture Principles

The three-layer separation must be auditable:

1. **Proposer (LLM)**: Reads variables/objectives → Emits structured pairings JSON
2. **Verifier (Python)**: Checks proposals against rules → Returns pass/fail with reasons
3. **Renderer (JavaScript/SVG)**: Takes pairings JSON → Draws P&ID from template

**Key point**: If a judge asks "did the LLM draw the diagram?" the answer is NO. The LLM produced structured pairings, the renderer drew the diagram deterministically.

## Non-Negotiables

- No live API calls in demo (all content pre-recorded)
- No backend (static site only)
- No auto-layout for P&ID (hardcoded positions)
- Demo runtime: 35-60 seconds
- Visible "RECORDED RUN" label
- Engineer approval required before advancing each sprint

## Drop List (if behind schedule)

Cut in this order:
1. Speed multiplier on replay
2. Side-by-side diagram view (show one, then swap)
3. RGA in verifier (drops to Tier 1)
4. Custom SVG P&ID (drop to Mermaid flowchart)
5. Diagrams entirely (comparison table still defensible)

## The Single Rule

**Code that the Engineer has not understood is code that will betray the demo on stage.**

Do not advance any task to "done" until the Engineer has:
1. Read the plain-language explanation
2. Run at least one sanity check
3. Explicitly approved the sprint

---

**Total Project Time**: ~14 hours across 2 days
**Target Deliverable**: Production-ready demo for hackathon stage presentation