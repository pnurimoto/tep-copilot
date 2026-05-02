# Sprint 1.4: LLM Proposer Prompt Design

**ID:** 1.4  
**Time-box:** 90 minutes

## Title
Design and test LLM prompt for plant-wide control structure proposal

## LLM does
- Create a structured prompt that includes: TEP process description, variables.json content, objectives.md content, output format specification
- Specify output format as JSON array of pairings: `[{ "mv": "XMV(id)", "cv": "XMEAS(id)", "reasoning": "2-3 sentence justification", "confidence": "high|medium|low" }]`
- Include constraints in prompt: exactly 11 pairings, each MV used at most once, reasoning must reference process dynamics or control objectives
- Run the prompt 2-3 times with a capable LLM (GPT-4 or Claude) to generate candidate proposals
- Save the best run to `data/agent_run.json` with metadata: `{ "model": "...", "timestamp": "...", "prompt_version": "v1", "pairings": [...] }`
- Document the prompt text in `docs/explanations.md` with section "Proposer Prompt Design"

## Engineer reviews
- Read the prompt in explanations.md: does it clearly state the control objectives?
- Open agent_run.json and read ALL 11 reasoning traces line by line
- Flag any reasoning that sounds confident but is engineering-wrong (e.g., "control reactor temp with product flow" is backwards)
- Check that each MV appears at most once
- Verify confidence levels make sense (contested decisions like stripper level should not be "high")
- THIS IS THE BOTTLENECK REVIEW: Engineer's domain knowledge is most valuable here

## Output artifact
- `data/agent_run.json`
- Section in `docs/explanations.md`

## Definition of done
Engineer has read all 11 reasoning traces, flagged any that are clearly wrong, and approved the agent_run.json as "defensible even if not optimal."