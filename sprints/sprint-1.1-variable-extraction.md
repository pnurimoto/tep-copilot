# Sprint 1.1: Variable Extraction and Objectives

**ID:** 1.1  
**Time-box:** 45 minutes

## Title
Extract TEP variables and control objectives into structured JSON

## LLM does
- Create `data/variables.json` containing all 41 XMEAS measurements (id, name, units, location)
- Add all 12 XMV manipulated variables (id, name, units, range) to the same file
- Create `data/objectives.md` with the 5 control objectives paraphrased from Downs & Vogel 1993
- Structure variables.json with clear schema: `{ "measurements": [...], "manipulated": [...] }`
- Add inline comments explaining variable categories (flows, pressures, temperatures, compositions)

## Engineer reviews
- Spot-check 5 random XMEAS variables against the paper table for accuracy
- Verify all 12 XMV variables are present with correct units
- Read objectives.md to confirm they match the paper's intent without copying text
- Check that JSON is valid and parseable
- Confirm variable IDs match the paper's numbering (XMEAS(1) through XMEAS(41), XMV(1) through XMV(12))

## Output artifact
- `data/variables.json`
- `data/objectives.md`

## Definition of done
Engineer opens variables.json, picks 3 random entries, cross-references with paper, and all 3 match exactly on name and units.