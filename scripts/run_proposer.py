#!/usr/bin/env python3
"""
Run the proposer prompt through LLM API to generate control structure proposals.
Supports both Anthropic Claude and BOB IBM API.
Saves results to data/agent_run_*.json for review.
"""

import json
import os
from datetime import datetime
from pathlib import Path

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

def run_proposal_anthropic(client, prompt, run_number, model_name):
    """Run a single proposal generation using Anthropic API."""
    print(f"\n{'='*60}")
    print(f"Running proposal {run_number} (Anthropic)...")
    print(f"{'='*60}\n")
    
    message = client.messages.create(
        model=model_name,
        max_tokens=4000,
        temperature=0.7,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    response_text = message.content[0].text
    print(f"Response received ({len(response_text)} chars)")
    
    return extract_pairings(response_text, model_name)

def run_proposal_bob(api_key, prompt, run_number, model_name):
    """Run a single proposal generation using BOB IBM API."""
    print(f"\n{'='*60}")
    print(f"Running proposal {run_number} (BOB IBM)...")
    print(f"{'='*60}\n")
    
    import requests
    
    # BOB IBM API endpoint
    url = "https://api.bob.ibm.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": model_name,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 4000,
        "temperature": 0.7
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    
    result = response.json()
    response_text = result['choices'][0]['message']['content']
    print(f"Response received ({len(response_text)} chars)")
    
    return extract_pairings(response_text, model_name)

def extract_pairings(response_text, model_name):
    """Extract pairings JSON from LLM response."""
    # Try to extract JSON from the response
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
            "model": model_name,
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
    # Check which API to use
    anthropic_key = os.environ.get('ANTHROPIC_API_KEY')
    bob_key = os.environ.get('BOB_IBM_API_KEY')
    
    if bob_key:
        print("Using BOB IBM API")
        api_type = "bob"
        model_name = os.environ.get('BOB_MODEL', 'claude-3-5-sonnet')
        run_proposal_func = lambda prompt, run_num: run_proposal_bob(bob_key, prompt, run_num, model_name)
    elif anthropic_key:
        print("Using Anthropic API")
        import anthropic
        api_type = "anthropic"
        model_name = "claude-sonnet-4-20250514"
        client = anthropic.Anthropic(api_key=anthropic_key)
        run_proposal_func = lambda prompt, run_num: run_proposal_anthropic(client, prompt, run_num, model_name)
    else:
        print("ERROR: No API key found")
        print("Please set either:")
        print("  - ANTHROPIC_API_KEY for Anthropic Claude API")
        print("  - BOB_IBM_API_KEY for BOB IBM API")
        return
    
    prompt = load_prompt()
    
    print("Loaded prompt:")
    print(f"  Length: {len(prompt)} characters")
    print(f"  Lines: {len(prompt.splitlines())}")
    print(f"  API: {api_type}")
    print(f"  Model: {model_name}")
    
    # Run 3 proposals
    results = []
    for i in range(1, 4):
        result = run_proposal_func(prompt, i)
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
