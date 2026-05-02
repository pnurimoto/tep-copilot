# Sprint 1.3: Ricker Baseline Encoding

**ID:** 1.3  
**Time-box:** 30 minutes

## Title
Encode Ricker 1996 baseline control structure as ground truth JSON

## LLM does
- Create `data/ricker_baseline.json` with the 11 published MV-CV pairings from Ricker 1996
- Structure each pairing as: `{ "mv": "XMV(id)", "cv": "XMEAS(id)", "loop_name": "descriptive name", "reasoning": "one-sentence justification from paper" }`
- Include metadata: `{ "source": "Ricker 1996", "citation": "full citation", "pairings": [...] }`
- Cross-reference variable IDs with variables.json to ensure consistency
- Add a plain-language summary in `docs/explanations.md` explaining what each loop controls and why

## Engineer reviews
- Open ricker_baseline.json and count pairings (must be exactly 11)
- Spot-check 3 pairings against the Ricker paper table
- Verify all MV and CV IDs exist in variables.json
- Check that loop names are descriptive (e.g., "Reactor Pressure Control" not "Loop 1")
- Read the explanations.md summary and confirm it matches her understanding of the Ricker structure

## Output artifact
- `data/ricker_baseline.json`
- Section in `docs/explanations.md`

## Definition of done
Engineer opens ricker_baseline.json, picks the reactor pressure loop, confirms the MV and CV match the paper, and the reasoning makes engineering sense.