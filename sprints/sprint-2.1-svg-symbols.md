# Sprint 2.1: SVG Symbol Vocabulary

**ID:** 2.1  
**Time-box:** 60 minutes

## Title
Create reusable SVG components for P&ID elements

## LLM does
- Create `renderer/symbols.jsx` with 5 React components returning SVG elements:
  - `Vessel` (reactor, separator, stripper - parameterized by type)
  - `Valve` (with open/closed state indicator)
  - `Controller` (PID controller symbol with label)
  - `InstrumentLine` (dashed line for measurement signals)
  - `ProcessLine` (solid line for material flows)
- Each component accepts props: position (x, y), size, label, and type-specific props
- Add clear JSDoc comments explaining parameters
- Include "if wrong, symptom is X" comment for each component (e.g., "if Vessel is wrong, all units will be misshapen")
- Create a test file `renderer/symbols.test.jsx` that renders each symbol in isolation

## Engineer reviews
- Open symbols.jsx and verify all 5 components are present
- Run the test file to see each symbol rendered
- Check that symbols are recognizable as standard P&ID elements (doesn't need to be perfect, just clear)
- Verify that labels are readable and positioned sensibly
- Confirm that the code is modular (changing one symbol doesn't break others)

## Output artifact
- `renderer/symbols.jsx`
- `renderer/symbols.test.jsx`

## Definition of done
Engineer runs the test file, sees all 5 symbols rendered, and confirms "I can tell what each one represents without reading the code."