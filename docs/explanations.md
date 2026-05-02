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