# Sprint 1.6: Agent vs Ricker Comparison

**ID:** 1.6  
**Time-box:** 45 minutes

## Title
Generate side-by-side comparison of agent proposal vs Ricker baseline

## LLM does
- Create `data/comparison.json` that aligns agent pairings with Ricker pairings
- For each of 11 loops, determine: "matched" (same MV-CV pair), "diverged" (different pairing for same control objective), or "novel" (agent proposed something Ricker didn't)
- Structure as: `{ "summary": { "total": 11, "matched": X, "diverged": Y, "novel": Z, "agreement_pct": ... }, "details": [{ "loop_id": 1, "agent_mv": "...", "agent_cv": "...", "ricker_mv": "...", "ricker_cv": "...", "status": "matched|diverged", "note": "..." }] }`
- Add a section in `docs/explanations.md` explaining the comparison methodology
- Include a plain-language summary of which loops diverged and why that's interesting

## Engineer reviews
- Open comparison.json and verify the summary stats add up correctly
- Spot-check 2-3 "diverged" loops: does the agent's choice make any engineering sense, even if different from Ricker?
- Confirm that "matched" loops are truly identical (same MV and CV)
- Read the explanations.md summary and verify it accurately describes the divergences
- Check that the comparison is fair (not biased toward declaring everything "diverged")

## Output artifact
- `data/comparison.json`
- Section in `docs/explanations.md`

## Definition of done
Engineer opens comparison.json, sees the agreement percentage, picks one diverged loop, and confirms "yes, this is a real difference worth highlighting in the demo."

---

**END OF DAY 1** (Total: ~6.5 hours)