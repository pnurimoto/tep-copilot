# Pull Request: Sprint 1.4 - LLM Proposer Prompt Design

## Summary
Implemented LLM-based proposer that generates plant-wide control structure recommendations for the Tennessee Eastman Process. Supports both Anthropic Claude and BOB IBM APIs.

## Changes

### New Files
- `data/proposer_prompt_v1.txt` - Structured prompt with TEP process description, variables, objectives, constraints
- `data/agent_run.json` - Selected LLM proposal with 11 MV-CV pairings and reasoning traces
- `scripts/run_proposer.py` - Python script to execute prompt via Anthropic or BOB IBM API
- `.env.template` - API key configuration template (supports both APIs)

### Modified Files
- `docs/explanations.md` - Added Sprint 1.4 documentation section with API support details
- `requirements.txt` - Added anthropic, python-dotenv, requests dependencies

## Proposer Results

Generated 11 control loop pairings with confidence distribution:
- **6 high-confidence**: Safety-critical loops (reactor temp/pressure/level, separator level, composition)
- **4 medium-confidence**: Contested decisions (stripper level, production rate strategy)
- **1 low-confidence**: Questionable pairing flagged for review

### Key Pairings
1. ✅ XMV(10) → XMEAS(9): Reactor temperature via cooling water
2. ✅ XMV(11) → XMEAS(8): Reactor level via condenser cooling
3. ✅ XMV(6) → XMEAS(7): Reactor pressure via purge valve
4. ✅ XMV(7) → XMEAS(12): Separator level via liquid flow
5. ⚠️ XMV(8) → XMEAS(15): Stripper level via product flow (contested)
6. ⚠️ XMV(1) → XMEAS(17): Production rate via D feed (differs from Ricker)
7. ❌ XMV(12) → XMEAS(22): Agitator → separator cooling temp (questionable)

## Engineer Review Required

### Critical Issues
1. **Pairing #11**: Agitator speed controlling separator cooling water temperature is physically questionable - agitator is in reactor, not separator. Demonstrates need for human oversight.

2. **Production Rate Strategy**: Uses D feed flow instead of direct product flow control. Valid but differs from Ricker 1996 baseline.

3. **Separator Temperature**: Uses stripper steam (indirect) rather than condenser cooling (direct).

### Validation Checklist
- [x] Exactly 11 pairings generated
- [x] No duplicate MVs
- [x] All safety-critical loops covered (pressure, temperature, levels)
- [x] Follows downstream inventory control strategy
- [x] Detailed reasoning provided for each pairing
- [x] Confidence levels calibrated appropriately
- [ ] **Engineer approval of all 11 reasoning traces**

## API Configuration

The proposer supports two LLM APIs (auto-detected from environment variables):

### Option 1: Anthropic Claude API
```bash
# In .env file
ANTHROPIC_API_KEY=sk-ant-...your-key...
```

### Option 2: BOB IBM API
```bash
# In .env file
BOB_IBM_API_KEY=your-bob-key
BOB_MODEL=claude-3-5-sonnet  # Optional, defaults to claude-3-5-sonnet
```

The script prioritizes BOB IBM API if both keys are present.

## Testing
```bash
# Install dependencies
pip install -r requirements.txt

# Run proposer (requires API key in .env)
python3 scripts/run_proposer.py

# Verify output
cat data/agent_run.json | jq '.pairings | length'  # Should output: 11
cat data/agent_run.json | jq '.pairings[].mv' | sort | uniq -d  # Should be empty (no duplicates)
```

## Next Steps (Sprint 1.5)
- Build verifier to check pairings against engineering rules
- Compare agent proposal vs. Ricker baseline
- Flag divergent pairings for demo

## Definition of Done
✅ Prompt designed with comprehensive TEP context
✅ Agent run executed and saved to data/agent_run.json
✅ Documentation added to explanations.md
⏳ **Awaiting Engineer review of all 11 reasoning traces**

---

**Note**: This is Sprint 1.4 of the TEP Copilot hackathon project. The proposer demonstrates LLM-driven control structure design with explicit reasoning traces for human review.