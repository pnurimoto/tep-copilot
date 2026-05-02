# Sprint 1.2: tep2py Installation Time-box

**ID:** 1.2  
**Time-box:** 60 minutes (HARD STOP)

## Title
Attempt tep2py installation for steady-state gain matrix (Tier 2 vs Tier 1 decision)

## LLM does
- Attempt to install tep2py or equivalent TEP simulator in a clean Python environment
- If successful, run a minimal test to extract steady-state gain matrix
- If successful, save gain matrix to `data/gains.json` with clear row/column labels (XMEAS indices vs XMV indices)
- Document installation steps in `docs/explanations.md` under "Tier 2 Setup"
- If installation fails after ONE debug attempt, document the failure and proceed to Tier 1 (no gains.json)

## Engineer reviews
- Check clock: has 60 minutes elapsed? If yes, stop regardless of status
- If gains.json exists: open it, verify it's a 41x12 matrix with reasonable numeric values (not all zeros, not NaN)
- If gains.json does not exist: confirm LLM documented the failure reason
- Verify the decision (Tier 2 or Tier 1) is clearly stated in explanations.md
- Sanity check: if Tier 2, spot-check one gain value against engineering intuition (e.g., reactor temperature should respond to coolant flow)

## Output artifact
- `data/gains.json` (if Tier 2 successful)
- OR documentation in `docs/explanations.md` stating Tier 1 fallback

## Definition of done
Either gains.json exists and contains a valid 41x12 numeric matrix, OR 60 minutes have elapsed and Tier 1 is documented as the path forward. No third option.