# Sprint 2.6: Dry Runs and Final Polish

**ID:** 2.6  
**Time-box:** 90 minutes

## Title
Run full demo multiple times, fix bugs, and apply normal-effort polish

## LLM does
- Run the complete demo 3 times end-to-end, noting any visual glitches, timing issues, or unclear elements
- Fix any bugs found (e.g., overlapping text, incorrect colors, broken animations)
- Apply normal-effort polish to the UI:
  - Ensure text is readable (sufficient contrast, appropriate font sizes)
  - Add subtle transitions for phase changes (fade-ins, not jarring cuts)
  - Verify the layout works on a typical projector resolution (1920x1080)
- Verify that all JSON files are in sync (agent_run.json matches what's displayed in the replay)
- Add a README.md at project root with: project description, how to run locally, how to build for deployment
- Test the build process (`npm run build`) and verify the static output works

## Engineer reviews
- Watch the demo 2 times back-to-back
- Check for any visual elements that are hard to read or confusing
- Verify the timing feels natural (not rushed, not dragging)
- Confirm the "RECORDED RUN" label is visible but not distracting
- Test the build output by opening the built index.html in a browser
- Read the README.md and verify the instructions are clear

## Output artifact
- Bug fixes in various files
- `README.md`
- Verified build output in `dist/`

## Definition of done
Engineer watches the demo twice, sees no obvious bugs, and confirms "this is ready to show to judges without embarrassment."