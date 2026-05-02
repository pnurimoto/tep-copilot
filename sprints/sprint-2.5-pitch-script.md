# Sprint 2.5: Pitch Script and Documentation

**ID:** 2.5  
**Time-box:** 45 minutes

## Title
Write 60-second narration script and complete explanations document

## LLM does
- Create `docs/pitch_script.md` with a 60-second narration that covers:
  - Problem statement (plant-wide control is hard, TEP is the benchmark)
  - Approach (LLM proposes, verifier checks, renderer draws)
  - Key result (X% agreement with Ricker, Y divergences worth discussing)
  - Honest framing (this is a first cut, gaps marked, Phase 4 is future work)
- Complete `docs/explanations.md` with plain-language sections for every artifact produced
- Each section must include: what it does, inputs/outputs, and "if wrong, symptom is X"
- Add a "Known Limitations" section listing what the demo does NOT do (no dynamic simulation, no optimization, no multi-objective trade-offs)
- Add a "Future Work" section describing Phase 4 (simulator-in-the-loop validation)

## Engineer reviews
- Read pitch_script.md out loud and time it (should be ~60 seconds)
- Verify the script is honest about limitations (doesn't oversell)
- Check that the script highlights the architecture separation (proposer/verifier/renderer)
- Read explanations.md and spot-check 3 sections for clarity
- Confirm the "Known Limitations" section is accurate and not defensive

## Output artifact
- `docs/pitch_script.md`
- `docs/explanations.md` (completed)

## Definition of done
Engineer reads the pitch script, confirms "I could deliver this on stage without feeling like I'm overselling," and the timing is under 65 seconds.