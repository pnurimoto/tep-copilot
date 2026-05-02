#!/usr/bin/env python3
"""
Run the proposer prompt through Claude API to generate control structure proposals.
Saves results to data/agent_run_*.json for review.
"""

import json
import os
from datetime import datetime
from pathlib import Path
import anthropic

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("WARNING: python-dotenv not installed. Install with: pip install python-dotenv")
    print("Falling back to environment variables only.")

def load_prompt():
    """Load the proposer prompt from file."""
    with open('data/proposer_prompt_v1.txt', 'r') as f:
        return f.read()

def run_proposal(client, prompt, run_number):
    """Run a single proposal generation."""
    print(f"\n{'='*60}")
    print(f"Running proposal {run_number}...")
    print(f"{'='*60}\n")
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4000,
        temperature=0.7,  # Some creativity but not too much
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    response_text = message.content[0].text
    print(f"Response received ({len(response_text)} chars)")
    
    # Try to extract JSON from the response
    # Look for JSON array in the response
    start_idx = response_text.find('[')
    end_idx = response_text.rfind(']') + 1
    
    if start_idx == -1 or end_idx == 0:
        print("WARNING: Could not find JSON array in response")
        return None
    
    json_str = response_text[start_idx:end_idx]
    
    try:
        pairings = json.loads(json_str)
        print(f"Successfully parsed {len(pairings)} pairings")
        return {
            "model": "claude-sonnet-4-20250514",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "prompt_version": "v1",
            "pairings": pairings,
            "full_response": response_text
        }
    except json.JSONDecodeError as e:
        print(f"ERROR: Failed to parse JSON: {e}")
        print(f"Attempted to parse: {json_str[:200]}...")
        return None

def main():
    # Check for API key
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY environment variable not set")
        print("Please set it with: export ANTHROPIC_API_KEY='your-key-here'")
        return
    
    client = anthropic.Anthropic(api_key=api_key)
    prompt = load_prompt()
    
    print("Loaded prompt:")
    print(f"  Length: {len(prompt)} characters")
    print(f"  Lines: {len(prompt.splitlines())}")
    
    # Run 3 proposals
    results = []
    for i in range(1, 4):
        result = run_proposal(client, prompt, i)
        if result:
            results.append(result)
            # Save each run
            filename = f"data/agent_run_{i}.json"
            with open(filename, 'w') as f:
                json.dump(result, f, indent=2)
            print(f"Saved to {filename}")
        else:
            print(f"Skipping run {i} due to errors")
    
    print(f"\n{'='*60}")
    print(f"Completed {len(results)} successful runs")
    print(f"{'='*60}\n")
    
    # Print summary of each run
    for i, result in enumerate(results, 1):
        print(f"\nRun {i} summary:")
        print(f"  Timestamp: {result['timestamp']}")
        print(f"  Pairings: {len(result['pairings'])}")
        
        # Check for duplicates
        mvs = [p['mv'] for p in result['pairings']]
        if len(mvs) != len(set(mvs)):
            print(f"  WARNING: Duplicate MVs detected!")
        
        # Show confidence distribution
        confidence_counts = {}
        for p in result['pairings']:
            conf = p.get('confidence', 'unknown')
            confidence_counts[conf] = confidence_counts.get(conf, 0) + 1
        print(f"  Confidence: {confidence_counts}")

if __name__ == '__main__':
    main()

# Made with Bob
