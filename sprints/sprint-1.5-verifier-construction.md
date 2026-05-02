# Sprint 1.5: Verifier Construction

**ID:** 1.5  
**Time-box:** 120 minutes

## Title
Build deterministic verifier with engineering rules and optional RGA checks

## LLM does
- Create `verifier/verifier.py` with functions for each rule: check_mv_uniqueness, check_inventory_loops, check_degrees_of_freedom, check_mass_balance_closure
- If Tier 2 (gains.json exists): add check_rga function that computes Relative Gain Array and flags pairings with RGA elements outside [0.5, 2.0]
- Create `verifier/rules.md` explaining each rule in plain English with examples of pass/fail cases
- Add "if wrong, symptom is X" comments to each check function
- Run verifier on both agent_run.json and ricker_baseline.json to generate `data/verifier_report.json`
- Structure report as: `{ "agent": { "pairings": [{ "mv": "...", "cv": "...", "checks": { "mv_unique": "pass", "rga": "fail", ... }, "overall": "pass|fail" }] }, "ricker": { ... } }`

## Engineer reviews
- Read rules.md: do the rules match standard process control principles?
- Open verifier.py and find one "if wrong, symptom is X" comment, verify it makes sense
- Run verifier on a hand-crafted bad pairing (e.g., two loops using same MV) and confirm it fails
- Check verifier_report.json: do the pass/fail results align with her engineering judgment?
- If Tier 2: spot-check one RGA calculation by hand for a simple 2x2 subsystem

## Output artifact
- `verifier/verifier.py`
- `verifier/rules.md`
- `data/verifier_report.json`

## Definition of done
Engineer runs verifier on a deliberately bad pairing, sees it fail with the correct reason, and confirms "this would catch the obvious mistakes."