# Tennessee Eastman Process Control Objectives

The following control objectives are paraphrased from Downs & Vogel (1993) and represent typical goals for chemical process control.

## Objective Classification Summary

| Objective | Type | Priority | Rationale |
|-----------|------|----------|-----------|
| 1. Setpoint Tracking | Mixed | High for safety-critical, Medium for others | Hard constraints for reactor pressure/level/temperature; soft for compositions |
| 2. Constraint Satisfaction | Hard | Critical | Non-negotiable equipment protection and safety limits |
| 3. Product Stream Stability | Soft | Medium | Optimization target for downstream operations |
| 4. Minimize Feed Valve Movement | Soft | Low | Economic consideration to reduce upstream disturbances |
| 5. Disturbance Rejection | Soft | Medium | Performance metric for control system effectiveness |

---

## 1. Setpoint Tracking
**Classification:** Mixed (Hard for safety-critical variables, Soft for others)

Maintain process variables at their desired setpoint values to ensure stable operation and product quality.

*Note: This objective is hard (non-negotiable) for safety-critical variables such as reactor pressure (XMEAS(7)), reactor level (XMEAS(8)), and reactor temperature (XMEAS(9)). It is soft (optimization target) for composition variables and other non-critical measurements.*

## 2. Constraint Satisfaction
**Classification:** Hard (Non-negotiable)

Keep all process operating conditions within equipment constraints to protect equipment and ensure safe operation. These constraints include shutdown limits that trigger process interlocks.

*Note: This is a hard constraint. Violating equipment limits can cause equipment damage or unsafe conditions.*

## 3. Product Stream Stability
**Classification:** Soft (Optimization target)

Minimize variability in product rate and product quality during disturbances, particularly for stream 11 which feeds downstream distillation. Flow rate changes greater than ±5% with frequency content in the range 0-16 h⁻¹ are especially problematic for downstream operations.

*Note: This is a soft constraint representing an optimization goal to improve downstream process efficiency.*

## 4. Minimize Feed Valve Movement
**Classification:** Soft (Economic consideration)

Minimize movement of valves that affect other processes, specifically the gas feed valves (XMV(3) and XMV(4)), to reduce disturbances to upstream units and associated economic costs.

*Note: This is a soft constraint representing an economic optimization to reduce operational costs and upstream disturbances.*

## 5. Disturbance Rejection
**Classification:** Soft (Performance metric)

Recover quickly and smoothly from disturbances, production rate changes, or product mix changes to maintain process efficiency and product quality.

*Note: This is a soft constraint representing a performance metric for evaluating control system effectiveness.*

---

*Source: Downs, J.J. and Vogel, E.F., 1993. A plant-wide industrial process control problem. Computers & Chemical Engineering, 17(3), pp.245-255.*

*Classification rationale: Hard constraints are non-negotiable safety and equipment protection requirements. Soft constraints are optimization targets that improve economic performance and product quality but can be traded off against each other.*