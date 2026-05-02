#!/usr/bin/env python3
"""
Test script for verifier to ensure it catches deliberately bad pairings.
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from verifier.verifier import verify_control_structure, load_pairings_file


def test_bad_pairings():
    """Test that verifier catches deliberately bad pairings."""
    print("="*60)
    print("TESTING VERIFIER WITH BAD PAIRINGS")
    print("="*60)
    
    # Load bad pairings
    bad_pairings = load_pairings_file('data/bad_pairings_test.json')
    
    print(f"\nLoaded {len(bad_pairings)} bad pairings")
    print("\nExpected failures:")
    print("  1. MV uniqueness (XMV(10) used twice)")
    print("  2. Inventory loops (missing reactor level XMEAS(8))")
    print("  3. Mass balance closure (missing reactor level XMEAS(8))")
    
    # Verify
    results = verify_control_structure(bad_pairings)
    
    print("\n" + "-"*60)
    print("VERIFICATION RESULTS")
    print("-"*60)
    
    print(f"\nOverall status: {results['overall_status'].upper()}")
    
    print("\nSystem checks:")
    for check_name, check_result in results['system_checks'].items():
        status = check_result['status'].upper()
        message = check_result['message']
        print(f"  {check_name}: {status}")
        print(f"    {message}")
        
        if check_result['violations']:
            print("    Violations:")
            for violation in check_result['violations']:
                print(f"      - {violation}")
    
    # Verify we caught the expected failures
    print("\n" + "-"*60)
    print("VALIDATION")
    print("-"*60)
    
    checks = results['system_checks']
    
    assert results['overall_status'] == 'fail', "Should fail overall"
    print("✓ Overall status is FAIL (correct)")
    
    assert checks['mv_uniqueness']['status'] == 'fail', "Should fail MV uniqueness"
    print("✓ MV uniqueness check failed (correct)")
    
    assert checks['inventory_loops']['status'] == 'fail', "Should fail inventory loops"
    print("✓ Inventory loops check failed (correct)")
    
    assert checks['mass_balance_closure']['status'] == 'fail', "Should fail mass balance"
    print("✓ Mass balance closure check failed (correct)")
    
    assert checks['degrees_of_freedom']['status'] == 'pass', "Should pass degrees of freedom"
    print("✓ Degrees of freedom check passed (correct)")
    
    print("\n" + "="*60)
    print("ALL TESTS PASSED!")
    print("Verifier correctly catches obvious mistakes.")
    print("="*60)


if __name__ == '__main__':
    test_bad_pairings()

# Made with Bob
