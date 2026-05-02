#!/usr/bin/env python3
"""
Test suite for data/variables.json schema validation.
Sprint 1.1: Variable Extraction

If this is wrong, the symptom is: JSON schema violations or missing required fields.
"""

import json
import sys
from pathlib import Path

def test_variables_json():
    """Validate variables.json schema and content."""
    
    # Load the file
    variables_path = Path(__file__).parent.parent / "data" / "variables.json"
    with open(variables_path, 'r') as f:
        data = json.load(f)
    
    # Test 1: Metadata block present
    assert "metadata" in data, "Missing metadata block"
    assert "source" in data["metadata"], "Missing source citation"
    assert "schema_version" in data["metadata"], "Missing schema version"
    assert "unit_conventions" in data["metadata"], "Missing unit conventions"
    assert "Downs" in data["metadata"]["source"], "Source should cite Downs paper"
    
    # Test 2: Measurements array
    assert "measurements" in data, "Missing measurements array"
    measurements = data["measurements"]
    assert len(measurements) == 41, f"Expected 41 measurements, got {len(measurements)}"
    
    # Test 3: Each measurement has required fields
    for i, meas in enumerate(measurements, 1):
        assert "id" in meas, f"Measurement {i} missing id"
        assert "name" in meas, f"Measurement {i} missing name"
        assert "units" in meas, f"Measurement {i} missing units"
        assert "location" in meas, f"Measurement {i} missing location"
        assert meas["id"] == f"XMEAS({i})", f"Measurement {i} has wrong id: {meas['id']}"
    
    # Test 4: Manipulated variables array
    assert "manipulated" in data, "Missing manipulated array"
    manipulated = data["manipulated"]
    assert len(manipulated) == 12, f"Expected 12 manipulated variables, got {len(manipulated)}"
    
    # Test 5: Each manipulated variable has required fields including location
    for i, mv in enumerate(manipulated, 1):
        assert "id" in mv, f"XMV {i} missing id"
        assert "name" in mv, f"XMV {i} missing name"
        assert "units" in mv, f"XMV {i} missing units"
        assert "location" in mv, f"XMV {i} missing location (required for renderer)"
        assert "range" in mv, f"XMV {i} missing range"
        assert mv["id"] == f"XMV({i})", f"XMV {i} has wrong id: {mv['id']}"
        
        # Test 6: Range has low and high
        assert "low" in mv["range"], f"XMV {i} range missing low"
        assert "high" in mv["range"], f"XMV {i} range missing high"
        assert isinstance(mv["range"]["low"], (int, float)), f"XMV {i} range.low not numeric"
        assert isinstance(mv["range"]["high"], (int, float)), f"XMV {i} range.high not numeric"
    
    # Test 7: Spot check specific variables from paper
    xmeas_7 = next(m for m in measurements if m["id"] == "XMEAS(7)")
    assert "pressure" in xmeas_7["name"].lower(), "XMEAS(7) should be reactor pressure"
    assert xmeas_7["units"] == "kPa gauge", "XMEAS(7) units should be kPa gauge"
    
    xmv_1 = next(m for m in manipulated if m["id"] == "XMV(1)")
    assert "D feed" in xmv_1["name"], "XMV(1) should be D feed flow"
    assert xmv_1["units"] == "kg/h", "XMV(1) units should be kg/h"
    assert xmv_1["range"]["high"] == 5811, "XMV(1) high limit should be 5811"
    
    # Test 8: Condenser/separator cooling note present
    assert "notes" in data["metadata"], "Missing notes in metadata"
    assert "condenser_cooling" in data["metadata"]["notes"], "Missing condenser_cooling clarification"
    
    print("✓ All schema validation tests passed")
    print(f"✓ Validated {len(measurements)} XMEAS variables")
    print(f"✓ Validated {len(manipulated)} XMV variables with location fields")
    print("✓ Metadata block present with source, schema_version, unit_conventions")
    print("✓ Condenser/separator cooling clarification present")
    return True

if __name__ == "__main__":
    try:
        test_variables_json()
        sys.exit(0)
    except AssertionError as e:
        print(f"✗ Test failed: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"✗ Unexpected error: {e}", file=sys.stderr)
        sys.exit(1)

# Made with Bob
