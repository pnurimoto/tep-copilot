# Sprint 2.4: Replay UI Integration

**ID:** 2.4  
**Time-box:** 120 minutes

## Title
Build single-page app with timed replay of agent run and P&ID rendering

## LLM does
- Create `app/App.jsx` as main React component with "Run Agent" button
- Create `app/timing.js` with setTimeout sequence for the 35-60 second replay:
  - Phase 1 (5s): "Loading paper..." and "Parsing variables..." console lines
  - Phase 2 (10s): Stream LLM prompt token by token
  - Phase 3 (20s): Reveal 11 pairings one by one, each with reasoning streaming character by character
  - Phase 4 (10s): Verifier sweep animates over pairings, marking green/oxblood
  - Phase 5 (5s): Summary stats animate in
  - Phase 6 (10s): Render both P&IDs side by side (agent vs Ricker)
- Add a visible "RECORDED RUN" label in the UI (not hidden, not loud)
- Add a greyed-out "Phase 4: Simulator-in-the-loop" panel at the bottom as roadmap signal
- Create `app/package.json` with Vite + React + Tailwind (core utilities only, no extra plugins)
- Test the full replay end-to-end and verify timing feels natural (not too fast, not too slow)

## Engineer reviews
- Run the app locally with `npm run dev`
- Click "Run Agent" and watch the full 35-60 second sequence
- Verify the pairings match agent_run.json (spot-check 2-3)
- Confirm the P&IDs render correctly and divergent loops are highlighted
- Check that the "RECORDED RUN" label is visible
- Verify the greyed-out Phase 4 panel appears at the end
- Time the replay: is it between 35-60 seconds?

## Output artifact
- `app/App.jsx`
- `app/timing.js`
- `app/package.json`

## Definition of done
Engineer runs the app, watches the full replay, and confirms "this tells the story clearly and the timing feels right for a demo."