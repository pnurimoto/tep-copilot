# Sprint 2.2: Hardcoded TEP Layout

**ID:** 2.2  
**Time-box:** 90 minutes

## Title
Define fixed positions for all TEP units in the P&ID canvas

## LLM does
- Create `renderer/layout.jsx` with a single exported object `TEP_LAYOUT` containing hardcoded (x, y) positions for all major units:
  - Reactor, Condenser, Separator, Stripper, Compressor
  - All 12 XMV valve positions
  - All 41 XMEAS measurement tap points
- Use a 1200x800 canvas with units arranged left-to-right following process flow: reactor → condenser → separator → stripper
- Add a simple ASCII art diagram in comments showing the layout topology
- Include "if wrong, symptom is X" comment: "if layout is wrong, lines will cross chaotically or units will overlap"
- Document the layout rationale in `docs/explanations.md` (why this arrangement matches TEP flow)

## Engineer reviews
- Open layout.jsx and look at the ASCII art diagram
- Verify the flow direction matches her mental model of TEP (reactor feeds condenser, etc.)
- Check that no two units have identical (x, y) coordinates
- Confirm that measurement taps are positioned near their physical locations (e.g., reactor temp sensor near reactor)
- Read the explanations.md rationale and verify it makes process sense

## Output artifact
- `renderer/layout.jsx`
- Section in `docs/explanations.md`

## Definition of done
Engineer looks at the ASCII art in layout.jsx and confirms "this is a reasonable approximation of TEP topology, good enough for a demo."