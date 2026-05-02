# Sprint 2.3: P&ID Rendering Function

**ID:** 2.3  
**Time-box:** 120 minutes

## Title
Build deterministic renderer that converts pairings JSON to SVG P&ID

## LLM does
- Create `renderer/render.jsx` with main function `renderPID(pairings, highlightDivergent)`
- For each pairing in the input JSON:
  - Draw the MV valve at its layout position
  - Draw the CV measurement tap at its layout position
  - Draw a Controller symbol between them
  - Draw InstrumentLine from CV to Controller, ProcessLine from Controller to MV
  - If pairing is marked divergent, use oxblood color; otherwise use green
- Draw all TEP units (vessels, lines) as background using symbols and layout
- Add a legend showing green = matched, oxblood = diverged
- Include "if wrong, symptom is X" comment: "if renderer is wrong, loops will connect to wrong units or colors will be inverted"
- Test by rendering both agent_run.json and ricker_baseline.json side by side

## Engineer reviews
- Run the renderer on ricker_baseline.json and visually inspect the output
- Pick one loop (e.g., reactor pressure) and trace the line from CV to Controller to MV
- Verify the line connects to the correct units (not crossing to wrong equipment)
- Check that divergent loops (if any) are highlighted in oxblood
- Confirm the P&ID is readable at demo resolution (not too cluttered)
- THIS IS THE SECOND BOTTLENECK REVIEW: P&ID correctness is critical for demo credibility

## Output artifact
- `renderer/render.jsx`

## Definition of done
Engineer looks at the rendered Ricker baseline P&ID, picks the stripper level loop, traces it from sensor to valve, and confirms "this is physically correct."