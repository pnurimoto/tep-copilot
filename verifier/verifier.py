#!/usr/bin/env python3
"""
Verifier for Tennessee Eastman Process control loop pairings.

This module implements deterministic engineering rules to verify the quality
of MV-CV pairings for decentralized control structures.
"""

import json
from typing import Dict, List, Any, Set
from collections import Counter


def check_mv_uniqueness(pairings: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Check that each manipulated variable (MV) is used at most once.
    
    Rule: In decentralized control, each actuator should be controlled by only
    one controller to avoid conflicting commands.
    
    If wrong, symptom is: Controllers fighting each other, oscillations, and
    inability to achieve stable control as multiple loops try to move the same
    valve/actuator in different directions.
    
    Args:
        pairings: List of pairing dictionaries with 'mv' and 'cv' keys
        
    Returns:
        Dict with 'status' ('pass'/'fail'), 'violations' list, and 'message'
    """
    mv_usage = Counter(p['mv'] for p in pairings)
    duplicates = {mv: count for mv, count in mv_usage.items() if count > 1}
    
    if duplicates:
        violations = [
            f"{mv} used {count} times" for mv, count in duplicates.items()
        ]
        return {
            'status': 'fail',
            'violations': violations,
            'message': f"Found {len(duplicates)} MV(s) used multiple times"
        }
    
    return {
        'status': 'pass',
        'violations': [],
        'message': 'All MVs are unique'
    }


def check_inventory_loops(pairings: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Check that all critical inventory variables (levels) have control loops.
    
    Rule: Every vessel with liquid holdup must have level control to prevent
    overflow or running dry. For TEP: reactor level (XMEAS(8)), separator level
    (XMEAS(12)), and stripper level (XMEAS(15)) must all be controlled.
    
    If wrong, symptom is: Vessel overflow causing safety trips, or vessel
    running dry causing pump cavitation, loss of seal, and potential equipment
    damage. Process becomes unstable and unsafe.
    
    Args:
        pairings: List of pairing dictionaries with 'mv' and 'cv' keys
        
    Returns:
        Dict with 'status' ('pass'/'fail'), 'violations' list, and 'message'
    """
    required_levels = {
        'XMEAS(8)': 'Reactor level',
        'XMEAS(12)': 'Product separator level',
        'XMEAS(15)': 'Stripper level'
    }
    
    controlled_cvs = {p['cv'] for p in pairings}
    missing_levels = []
    
    for level_cv, description in required_levels.items():
        if level_cv not in controlled_cvs:
            missing_levels.append(f"{level_cv} ({description})")
    
    if missing_levels:
        return {
            'status': 'fail',
            'violations': missing_levels,
            'message': f"Missing control for {len(missing_levels)} critical level(s)"
        }
    
    return {
        'status': 'pass',
        'violations': [],
        'message': 'All critical inventory loops present'
    }


def check_degrees_of_freedom(pairings: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Check that the number of control loops doesn't exceed available MVs.
    
    Rule: Cannot control more variables than we have manipulated variables.
    For TEP, there are 12 manipulated variables (XMV(1) through XMV(12)).
    
    If wrong, symptom is: Mathematical impossibility - the control problem is
    over-specified and cannot be solved. Some CVs will not be controllable.
    
    Args:
        pairings: List of pairing dictionaries with 'mv' and 'cv' keys
        
    Returns:
        Dict with 'status' ('pass'/'fail'), 'violations' list, and 'message'
    """
    MAX_MVS = 12  # TEP has 12 manipulated variables
    num_pairings = len(pairings)
    
    if num_pairings > MAX_MVS:
        return {
            'status': 'fail',
            'violations': [f"Attempting to use {num_pairings} loops with only {MAX_MVS} MVs"],
            'message': f"Too many control loops: {num_pairings} > {MAX_MVS}"
        }
    
    return {
        'status': 'pass',
        'violations': [],
        'message': f'Degrees of freedom satisfied: {num_pairings} loops ≤ {MAX_MVS} MVs'
    }


def check_mass_balance_closure(pairings: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Check that all inventory loops are controlled.
    
    Rule: For overall mass balance closure, all inventory (level) controls
    must be present. This ensures material doesn't accumulate or deplete
    in vessels. Production rate control is recommended but not strictly
    required as it can be managed indirectly through composition cascades.
    
    If wrong, symptom is: Process slowly drifts over time with material
    accumulating in uncontrolled vessels. Vessels may overflow or run dry.
    Long-term instability and inability to maintain steady state.
    
    Args:
        pairings: List of pairing dictionaries with 'mv' and 'cv' keys
        
    Returns:
        Dict with 'status' ('pass'/'fail'), 'violations' list, and 'message'
    """
    controlled_cvs = {p['cv'] for p in pairings}
    
    # Check for all inventory loops (production rate is optional)
    required_levels = {
        'XMEAS(8)': 'Reactor level',
        'XMEAS(12)': 'Separator level',
        'XMEAS(15)': 'Stripper level'
    }
    
    missing = []
    for level_cv, description in required_levels.items():
        if level_cv not in controlled_cvs:
            missing.append(f"{level_cv} ({description})")
    
    if missing:
        return {
            'status': 'fail',
            'violations': missing,
            'message': f"Mass balance not closed: missing {len(missing)} inventory loop(s)"
        }
    
    return {
        'status': 'pass',
        'violations': [],
        'message': 'Mass balance closure satisfied (all inventory loops present)'
    }


def verify_pairing(pairing: Dict[str, Any], all_pairings: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Verify a single pairing against all rules.
    
    Args:
        pairing: Single pairing dict with 'mv' and 'cv' keys
        all_pairings: Complete list of all pairings for context
        
    Returns:
        Dict with check results and overall status
    """
    mv = pairing['mv']
    cv = pairing['cv']
    
    # Check if this MV is used elsewhere (uniqueness for this specific pairing)
    mv_count = sum(1 for p in all_pairings if p['mv'] == mv)
    mv_unique = 'pass' if mv_count == 1 else 'fail'
    
    # Individual pairing checks
    checks = {
        'mv_unique': mv_unique
    }
    
    # Overall status for this pairing
    overall = 'pass' if all(v == 'pass' for v in checks.values()) else 'fail'
    
    return {
        'mv': mv,
        'cv': cv,
        'checks': checks,
        'overall': overall
    }


def verify_control_structure(pairings: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Verify entire control structure against all engineering rules.
    
    Args:
        pairings: List of pairing dictionaries
        
    Returns:
        Dict with individual pairing results and system-level checks
    """
    # System-level checks
    system_checks = {
        'mv_uniqueness': check_mv_uniqueness(pairings),
        'inventory_loops': check_inventory_loops(pairings),
        'degrees_of_freedom': check_degrees_of_freedom(pairings),
        'mass_balance_closure': check_mass_balance_closure(pairings)
    }
    
    # Individual pairing verification
    pairing_results = [verify_pairing(p, pairings) for p in pairings]
    
    # Overall system status
    system_pass = all(check['status'] == 'pass' for check in system_checks.values())
    all_pairings_pass = all(p['overall'] == 'pass' for p in pairing_results)
    overall_status = 'pass' if system_pass and all_pairings_pass else 'fail'
    
    return {
        'pairings': pairing_results,
        'system_checks': system_checks,
        'overall_status': overall_status
    }


def load_pairings_file(filepath: str) -> List[Dict[str, Any]]:
    """Load pairings from JSON file."""
    with open(filepath, 'r') as f:
        data = json.load(f)
    return data.get('pairings', [])


def generate_report(agent_file: str, ricker_file: str, output_file: str):
    """
    Generate verification report for both agent and Ricker baseline pairings.
    
    Args:
        agent_file: Path to agent_run.json
        ricker_file: Path to ricker_baseline.json
        output_file: Path to write verifier_report.json
    """
    # Load pairings
    agent_pairings = load_pairings_file(agent_file)
    ricker_pairings = load_pairings_file(ricker_file)
    
    # Verify both
    agent_results = verify_control_structure(agent_pairings)
    ricker_results = verify_control_structure(ricker_pairings)
    
    # Build report
    report = {
        'metadata': {
            'agent_file': agent_file,
            'ricker_file': ricker_file,
            'agent_pairing_count': len(agent_pairings),
            'ricker_pairing_count': len(ricker_pairings)
        },
        'agent': agent_results,
        'ricker': ricker_results
    }
    
    # Write report
    with open(output_file, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"Verification report written to {output_file}")
    print(f"\nAgent pairings: {agent_results['overall_status'].upper()}")
    print(f"Ricker baseline: {ricker_results['overall_status'].upper()}")
    
    return report


if __name__ == '__main__':
    # Generate report for agent and Ricker baseline
    report = generate_report(
        'data/agent_run.json',
        'data/ricker_baseline.json',
        'data/verifier_report.json'
    )
    
    # Print summary
    print("\n" + "="*60)
    print("VERIFICATION SUMMARY")
    print("="*60)
    
    for source in ['agent', 'ricker']:
        print(f"\n{source.upper()}:")
        results = report[source]
        
        print(f"  Overall: {results['overall_status'].upper()}")
        print(f"  System checks:")
        for check_name, check_result in results['system_checks'].items():
            status = check_result['status'].upper()
            message = check_result['message']
            print(f"    - {check_name}: {status} - {message}")
            if check_result['violations']:
                for violation in check_result['violations']:
                    print(f"      ! {violation}")

# Made with Bob
