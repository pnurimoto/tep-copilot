# TEP Copilot Explanations

## Sprint 1.2: TEP2Py Timebox - Tier 1 Decision

### Goal
Produce a working `tep.step(u)` interface in ≤2 hours; fall back to Tier 2 (hardcoded Ricker gains) if blocked.

### Outcome: Tier 1 (Structural Rules Only)

After timeboxed investigation, we are shipping **Tier 1** (structural rules only) because:

1. **Attempt 1 Failed**: `github.com/camaramm/tep2py` does not exist as a Python package
   - Repository is a research artifact without `setup.py` or `pyproject.toml`
   - Installation requires: cloning repo, installing gfortran via Homebrew, compiling Fortran source via `numpy.f2py`
   - Time-box budget did not allow manual compilation workflow

2. **Attempt 2 Failed**: `tep-simulator` package does not exist on PyPI

3. **Attempt 3 Abandoned**: Hardcoding Ricker 1995 linearized gain matrix
   - Would require extracting numerical data from PDF reference paper
   - Time-box constraint made this infeasible
   - Tier 2 would still lack full TEP dynamics (only linearized approximation)

### Tier 1 Implementation

Tier 1 provides **structural validation only**:
- Input vector `u` must have shape `(12,)` (12 manipulated variables)
- Output vector `y` must have shape `(41,)` (41 measured variables)
- No actual TEP dynamics simulation
- Sufficient for testing control algorithm structure and data flow

### Future Work

To implement full TEP simulation (Tier 2 or beyond):
1. Clone `camaramm/tep2py` repository
2. Install gfortran compiler: `brew install gcc`
3. Compile Fortran source: `python -m numpy.f2py -c temain.f -m tep`
4. Integrate compiled module into project

Alternatively, consider:
- Implementing TEP dynamics in pure Python (significant effort)
- Using MATLAB/Simulink TEP models with Python bridge
- Finding alternative Python-native TEP implementations

### References
- Downs, J.J. and Vogel, E.F. (1993). "A plant-wide industrial process control problem"
- Ricker, N.L. (1996). "Decentralized control of the Tennessee Eastman Challenge Process"

## Sprint 1.3: Ricker 1996 Baseline Control Structure

### Overview
The Ricker 1996 baseline represents a well-validated decentralized control structure for the Tennessee Eastman Process. This structure uses 11 primary control loops to manage production rate, inventory levels, pressure, temperature, and product composition.

### The 11 Control Loops

#### Production & Inventory Control (Loops 8-12)

**Loop 8: Production Rate Control**
- **Controls**: Stripper liquid product flow (stream 11) via XMV(8)
- **Measures**: XMEAS(17) - Stripper underflow
- **Purpose**: Maintains target production rate with feedback adjustment to eliminate steady-state offset

**Loop 9: Stripper Level Control**
- **Controls**: Product flow via XMV(8)
- **Measures**: XMEAS(15) - Stripper level
- **Purpose**: Maintains stripper bottoms liquid level following downstream inventory control strategy

**Loop 10: Separator Level Control**
- **Controls**: Separator pot liquid flow (stream 10) via XMV(7)
- **Measures**: XMEAS(12) - Product separator level
- **Purpose**: Controls separator liquid level, coordinated with stripper level to reduce product flow fluctuations

**Loop 11: Reactor Level Control**
- **Controls**: Condenser cooling water flow via XMV(11)
- **Measures**: XMEAS(8) - Reactor level
- **Purpose**: Controls reactor liquid level indirectly by adjusting vapor carryover rate (no direct liquid flows exist in/out of reactor)

**Loop 12: Reactor Pressure Control**
- **Controls**: Purge valve (stream 9) via XMV(6)
- **Measures**: XMEAS(7) - Reactor pressure
- **Purpose**: Balances gas entry/exit rates to maintain safe reactor pressure near optimal operating point (2850 kPa)

#### Composition Control (Loops 13-15, 18)

**Loop 13: Product G Composition Control**
- **Controls**: D feed rate (stream 2) via XMV(1)
- **Measures**: XMEAS(40) - Component G in product
- **Purpose**: Maintains specified mol% G in product stream by controlling rate-limiting reactant D

**Loop 14: Reactor Feed %A Control**
- **Controls**: A feed flow (stream 1) via XMV(3)
- **Measures**: XMEAS(23) - Component A in reactor feed
- **Purpose**: Controls percentage of A relative to A+C in reactor feed to maintain excess reactants

**Loop 15: Reactor Feed %A+C Control**
- **Controls**: A+C feed flow (stream 4) via XMV(4)
- **Measures**: XMEAS(23) - Component A in reactor feed (used to calculate A+C percentage)
- **Purpose**: Controls total A+C percentage in reactor feed to ensure reactants are in excess for rate-limiting control

**Loop 18: Product E Composition Control**
- **Controls**: E feed rate (stream 3) via XMV(2)
- **Measures**: XMEAS(38) - Component E in product
- **Purpose**: Maintains specified mol% E in product stream by controlling rate-limiting reactant E

#### Temperature Control (Loops 16-17)

**Loop 16: Reactor Temperature Control**
- **Controls**: Reactor cooling water flow via XMV(10)
- **Measures**: XMEAS(9) - Reactor temperature
- **Purpose**: Maintains reactor temperature to control selectivity (relative rates of reactions 3-4) and prevent thermal runaway

**Loop 17: Separator Temperature Control**
- **Controls**: Condenser cooling water flow via XMV(11)
- **Measures**: XMEAS(11) - Product separator temperature
- **Purpose**: Inner (slave) loop of cascade structure for reactor level control; rejects disturbances in condenser coolant temperature

### Design Philosophy

The Ricker structure follows several key control engineering principles:

1. **Downstream Inventory Control**: Liquid levels are controlled in a consistent downstream direction (reactor → separator → stripper → product)

2. **Production Rate as Primary Variable**: Production rate is the primary manipulated variable, with feed ratios adjusted to maintain stoichiometry

3. **Pressure Control Strategy**: Only reactor pressure is controlled directly; separator and stripper pressures float

4. **Excess Reactants**: A and C are maintained in excess so that D and E are rate-limiting, providing self-regulation

5. **Cascade Control**: Reactor level control uses separator temperature as an inner loop to reject cooling water disturbances

### Engineering Rationale

The structure was designed to handle key constraints:
- Reactor pressure must not exceed 3000 kPa (safety limit)
- Product composition must meet specifications (mol% G and H)
- Inventory levels must be maintained in all vessels
- Production rate should be maximized while respecting constraints

The choice of manipulated-controlled variable pairings considers:
- Relative gain array (RGA) analysis for loop interaction
- Process dynamics and time constants
- Constraint management (which variables are likely to saturate)
- Disturbance rejection capabilities

### References

## Sprint 1.4: Proposer Prompt Design

### Overview
The proposer prompt is designed to elicit a complete plant-wide control structure from a capable LLM. The prompt provides comprehensive context about the TEP process, available variables, control objectives, and engineering constraints to guide the LLM toward defensible control pairings.

### API Support
The proposer script (`scripts/run_proposer.py`) supports two LLM APIs:
- **Anthropic Claude API**: Set `ANTHROPIC_API_KEY` in `.env` file
- **BOB IBM API**: Set `BOB_IBM_API_KEY` and optionally `BOB_MODEL` in `.env` file

The script auto-detects which API key is available and uses the appropriate client. BOB IBM API is prioritized if both keys are present.

### Prompt Structure

The prompt (stored in `data/proposer_prompt_v1.txt`) consists of six main sections:

1. **Process Description**: High-level overview of the TEP units (reactor, separator, stripper, recycle loop) with emphasis on key process characteristics that affect control design (e.g., reactor has no direct liquid outlet, exothermic reactions require cooling).

2. **Available Variables**: Complete listing of all 12 manipulated variables (XMV) and key controlled variables (XMEAS) with units, ranges, and locations. This ensures the LLM understands what actuators and measurements are available.

3. **Control Objectives**: Prioritized list of objectives from safety-critical (reactor pressure, temperature, levels) to production targets (flow rate, composition) to economic optimization (minimize feed valve movement). Objectives are explicitly labeled as HARD or soft constraints.

4. **Design Constraints**: Explicit rules that must be followed:
   - Exactly 11 pairings required (one MV unused)
   - Each MV used at most once
   - Inventory loops must use outflow handles (downstream control strategy)
   - Reactor level is special case (no direct liquid outlet)
   - Consider process dynamics (fast vs. slow loops)

5. **Engineering Principles**: Guidance on control engineering best practices including RGA considerations, process gain direction, cascade opportunities, degrees of freedom analysis, and material balance requirements.

6. **Output Format Specification**: JSON schema with required fields (mv, cv, reasoning, confidence) and guidelines for confidence levels (high/medium/low based on how contested the decision is).

### Key Design Decisions

**Emphasis on Reasoning**: The prompt requires 2-3 sentence justifications that reference process dynamics, control objectives, or engineering principles. This forces the LLM to articulate its logic rather than just listing pairings, making the output auditable by the Engineer.

**Confidence Calibration**: The prompt explicitly defines what constitutes high/medium/low confidence, with examples of contested decisions (e.g., stripper level control strategy). This helps the LLM self-assess uncertainty in its recommendations.

**Process-Specific Constraints**: The prompt highlights TEP-specific challenges like reactor level control (no direct liquid outlet) and the need to control reactor pressure below 3000 kPa safety limit. These constraints guide the LLM toward physically feasible solutions.

**Degrees of Freedom Framing**: By stating "12 MVs, must control 11 CVs," the prompt frames the problem as a selection task, encouraging the LLM to think about which variable to leave uncontrolled and why.

### Agent Run Results

The prompt was executed using Claude Sonnet 4 (model: claude-sonnet-4-20250514) on 2026-05-02. The selected run (`data/agent_run.json`) produced 11 pairings with the following characteristics:

- **High confidence pairings (6)**: Reactor temperature via cooling water, reactor level via condenser cooling, reactor pressure via purge, separator level via liquid flow, component A ratio via A+C feed, component E via E feed
- **Medium confidence pairings (4)**: Stripper level via product flow, separator temperature via steam, production rate via D feed, component G via A feed  
- **Low confidence pairings (1)**: Agitator speed controlling separator cooling water temperature (flagged as questionable)

### Engineering Review Notes

The Engineer should focus review on:

1. **Pairing #11 (XMV(12) → XMEAS(22))**: Uses agitator speed to control separator cooling water outlet temperature. This pairing is physically questionable since the agitator is in the reactor, not the separator. The LLM correctly assigned "low" confidence, indicating uncertainty.

2. **Production Rate Strategy**: The proposal uses D feed (XMV(1)) to control production rate (XMEAS(17)) rather than using product flow (XMV(8)) directly. This differs from Ricker's approach and represents a contested design decision.

3. **Separator Temperature Control**: Uses stripper steam (XMV(9)) to control separator temperature (XMEAS(11)). This is an indirect pairing that may have weak process gain compared to using condenser cooling directly.

4. **Unused Variable**: XMV(5) (compressor recycle valve) is left uncontrolled, which is a common choice in decentralized structures.

### Prompt Effectiveness

The prompt successfully:
- Generated exactly 11 pairings with no duplicate MVs
- Produced detailed reasoning for each pairing
- Identified high-confidence vs. contested decisions
- Followed inventory control best practices (outflow handles)
- Addressed safety-critical loops (pressure, temperature, levels)

Areas for improvement:
- Pairing #11 suggests the LLM may need stronger guidance on physical feasibility checks
- Could benefit from explicit examples of good vs. bad pairings
- Might need more emphasis on process gain magnitude and loop interaction

### If Wrong, Symptom Would Be

If the prompt design is inadequate, symptoms would include:
- Pairings that violate material balance (e.g., trying to control level with an inlet flow in a vessel with no outlet)
- Missing safety-critical loops (reactor pressure, temperature uncontrolled)
- Duplicate use of manipulated variables
- Reasoning that sounds confident but contradicts basic process engineering (e.g., "control reactor temperature with product flow")
- All pairings marked "high confidence" even for contested decisions

The Engineer's domain knowledge is the final check: read all 11 reasoning traces and flag any that are clearly wrong before approving for the demo.
- Ricker, N.L., 1996. Decentralized control of the Tennessee Eastman Challenge Process. Journal of Process Control, 6(4), pp.205-221.

## Sprint 1.6: Agent vs. Ricker Comparison

### Overview

`data/comparison.json` contains a loop-by-loop alignment of the agent's 11 proposed pairings against the Ricker 1996 baseline. The comparison classifies each loop as **matched**, **diverged**, or **novel**.

### Comparison Methodology

Matching is done by **control objective**, not loop index. For each agent pairing:

1. Identify the control objective (e.g., "reactor temperature," "production rate") by matching the CV to a Ricker loop.
2. If the agent's MV and CV are identical to Ricker's → **matched**.
3. If the agent targets the same CV but uses a different MV (or the same MV but a different CV) → **diverged**.
4. If the agent proposes a CV that appears in none of Ricker's 11 loops → **novel**.

Agreement percentage = matched / total = 7/11 ≈ **63.6%**.

### Results Summary

| Status | Count | Loops |
|--------|-------|-------|
| Matched | 7 | Reactor temp, reactor level, reactor pressure, separator level, stripper level, feed A+C ratio, product E |
| Diverged | 3 | Separator temperature, production rate, product G composition |
| Novel | 1 | Reactor component D via agitator speed |

### What Matched (7/11)

The agent agreed with Ricker on all five inventory and pressure loops (reactor level, reactor pressure, separator level, stripper level) and on three composition/temperature loops (reactor temperature, feed A+C ratio, product E). These are the most structurally constrained loops — in most cases only one physically feasible pairing exists (e.g., reactor level via condenser cooling is the only option since the reactor has no liquid outlet).

### Where the Agent Diverged (3/11)

**Loop 8 — Separator Temperature (XMV(9) vs. XMV(11)):**

Ricker uses condenser cooling water (XMV(11)) as the inner leg of a cascade with reactor level. The agent uses stripper steam (XMV(9)) instead. This breaks the cascade structure. The agent's choice is physically defensible — steam does affect column heat balance — but the process gain is weaker and disturbance rejection from condenser coolant is lost.

**Loop 9 — Production Rate (XMV(1) vs. XMV(8)):**

This is the most consequential divergence. Ricker commands production rate from the **outlet** (product flow, XMV(8)); the agent commands it from the **inlet** (D feed, XMV(1)). Both approaches appear in the academic literature, but they create fundamentally different inventory dynamics. Outlet-based control (Ricker) tightens the material balance from downstream; inlet-based control (agent) ties throughput directly to reactant supply, which can propagate disturbances upstream. This choice is worth discussing in the demo.

**Loop 10 — Product G Composition (XMV(3) vs. XMV(1)):**

Ricker uses D feed (XMV(1)) to control G composition; the agent uses A feed (XMV(3)). This divergence is **structurally coupled** to Loop 9: because the agent already assigned XMV(1) to production rate, it repurposes XMV(3) here. A feed does influence G yield via stoichiometry, but D feed has a more direct and stronger gain on G composition since D is the rate-limiting reactant for the G-producing reaction.

### The Novel Loop (1/11)

The agent proposes using agitator speed (XMV(12)) to control component D in the reactor feed (XMEAS(22)). Ricker leaves the agitator at constant speed — a standard practice in TEP control studies. The agent correctly assigned "low" confidence to this pairing. In the physical process, agitator speed affects mixing intensity but has negligible gain on feed composition, which is set upstream. This pairing is the agent's weakest proposal and the clearest area where domain expertise would override the LLM suggestion.

### Engineering Significance

The 63.6% agreement rate tells a useful story for the demo: **the agent gets all the hard-constrained loops right** (the ones where there's only one answer) but diverges on contested design decisions — exactly where human expertise adds value. The three divergences are all defensible from a pure text-reasoning perspective, yet an experienced controls engineer would likely prefer Ricker's choices based on process gain, cascade structure, and inventory dynamics. This demonstrates the intended human-in-the-loop role of the copilot: the agent narrows the solution space and forces explicit discussion of the contested decisions.

### References
- Ricker, N.L., 1996. Decentralized control of the Tennessee Eastman Challenge Process. Journal of Process Control, 6(4), pp.205-221.
