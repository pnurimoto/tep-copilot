# Control Loop Verification Rules

This document explains the engineering rules used to verify Tennessee Eastman Process (TEP) control loop pairings.

## Rule 1: MV Uniqueness

**Principle:** Each manipulated variable (MV) should be used by at most one control loop.

**Why it matters:** In decentralized control, each actuator (valve, pump, etc.) receives commands from only one controller. If multiple controllers try to manipulate the same actuator, they will fight each other, causing oscillations and instability.

**Pass example:**
```
Loop 1: XMV(10) → XMEAS(9)  (Reactor cooling water → Reactor temperature)
Loop 2: XMV(11) → XMEAS(8)  (Condenser cooling → Reactor level)
Loop 3: XMV(6) → XMEAS(7)   (Purge valve → Reactor pressure)
```
Each MV appears exactly once.

**Fail example:**
```
Loop 1: XMV(10) → XMEAS(9)  (Reactor cooling water → Reactor temperature)
Loop 2: XMV(10) → XMEAS(11) (Reactor cooling water → Separator temperature)
```
XMV(10) is used twice - controllers will conflict.

**If wrong, symptom is:** Controllers fighting each other, valve oscillations, inability to achieve stable control, and potential equipment damage from rapid actuator cycling.

---

## Rule 2: Inventory Loops

**Principle:** All critical liquid inventory variables (vessel levels) must have control loops.

**Why it matters:** Vessels with liquid holdup can overflow (causing safety trips and spills) or run dry (causing pump cavitation and equipment damage). Every vessel must have level control.

**Required for TEP:**
- **XMEAS(8)** - Reactor level
- **XMEAS(12)** - Product separator level  
- **XMEAS(15)** - Stripper level

**Pass example:**
```
XMV(11) → XMEAS(8)  (Condenser cooling → Reactor level)
XMV(7) → XMEAS(12)  (Separator pot flow → Separator level)
XMV(8) → XMEAS(15)  (Product flow → Stripper level)
```
All three critical levels are controlled.

**Fail example:**
```
XMV(11) → XMEAS(8)  (Condenser cooling → Reactor level)
XMV(7) → XMEAS(12)  (Separator pot flow → Separator level)
```
Missing stripper level control - stripper could overflow or run dry.

**If wrong, symptom is:** Vessel overflow causing safety trips and environmental hazards, or vessel running dry causing pump cavitation, loss of seal, equipment damage, and potential safety incidents. Process becomes unstable and unsafe.

---

## Rule 3: Degrees of Freedom

**Principle:** The number of control loops cannot exceed the number of available manipulated variables.

**Why it matters:** This is a fundamental constraint - you cannot control more variables than you have actuators. TEP has 12 manipulated variables (XMV(1) through XMV(12)), so you can have at most 12 control loops.

**Pass example:**
```
11 control loops using 11 different MVs
```
11 ≤ 12, so this is feasible.

**Fail example:**
```
13 control loops attempting to use 12 MVs
```
Mathematically impossible - at least one CV cannot be controlled.

**If wrong, symptom is:** Mathematical impossibility - the control problem is over-specified and cannot be solved. Some controlled variables will not be controllable, leading to specification violations and process instability.

---

## Rule 4: Mass Balance Closure

**Principle:** For overall mass balance, production rate and all inventory loops must be controlled.

**Why it matters:** Material must not accumulate or deplete anywhere in the process. This requires:
1. Production rate control (XMEAS(17) - stripper product flow)
2. All inventory (level) controls

Without this, the process will slowly drift over time.

**Required for TEP:**
- **XMEAS(17)** - Production rate (stripper underflow)
- **XMEAS(8)** - Reactor level
- **XMEAS(12)** - Separator level
- **XMEAS(15)** - Stripper level

**Pass example:**
```
XMV(8) → XMEAS(17)  (Product flow → Production rate)
XMV(11) → XMEAS(8)  (Condenser cooling → Reactor level)
XMV(7) → XMEAS(12)  (Separator pot flow → Separator level)
XMV(8) → XMEAS(15)  (Product flow → Stripper level)
```
Production rate and all levels controlled - mass balance closed.

**Fail example:**
```
XMV(11) → XMEAS(8)  (Condenser cooling → Reactor level)
XMV(7) → XMEAS(12)  (Separator pot flow → Separator level)
XMV(8) → XMEAS(15)  (Product flow → Stripper level)
```
Missing production rate control - material will accumulate or deplete.

**If wrong, symptom is:** Process slowly drifts over time with material accumulating in uncontrolled vessels or production rate varying uncontrollably. Inventory levels trend up or down, eventually hitting constraints. Long-term instability and inability to maintain steady state operation.

---

## Verification Process

The verifier checks each rule systematically:

1. **System-level checks** - Applied to the entire control structure:
   - MV uniqueness across all loops
   - Presence of all required inventory loops
   - Degrees of freedom constraint
   - Mass balance closure

2. **Individual pairing checks** - Applied to each MV-CV pair:
   - MV uniqueness for that specific pairing

3. **Overall status** - PASS only if all system checks and all individual pairings pass.

## Using the Verifier

```bash
python verifier/verifier.py
```

This generates `data/verifier_report.json` with detailed results for both agent-proposed and Ricker baseline control structures.

## Limitations

These rules check for **necessary but not sufficient** conditions for good control. A control structure can pass all these rules and still have poor performance due to:
- Weak process gains (small effect of MV on CV)
- Wrong directionality (MV moves CV in wrong direction)
- Poor dynamic response (too slow or too fast)
- Strong interactions between loops

For more sophisticated analysis, Tier 2 verification includes Relative Gain Array (RGA) analysis to detect interaction problems.