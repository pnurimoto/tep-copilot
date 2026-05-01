# TEP Copilot Generator Skill

## Mission

Build the TEP Copilot repository in small, reviewable sprints guided by `spec.md` as the single source of truth. Optimize for correctness, source-grounded implementation, and a workflow that a non-software engineer can verify.

## Read First

Before making changes, read these in order:

1. `spec.md`
2. the active file in `sprints/`, only if `sprints/` already exists
3. any referenced local citation files in `references/`, only if they already exist or the active sprint creates them

If `sprints/` does not exist, create the repo structure and sprint contract files from the Sprint Roadmap in `spec.md`, then stop for human review. Do not implement application code in the same task.

Do not read, add, or depend on `tep_hackathon_playbook.md`. If that file appears inside the repository, remove it or flag it as invalid repo content.

If a sprint file conflicts with ad hoc ideas, follow the sprint file. If a sprint file conflicts with `spec.md`, stop and flag the conflict instead of guessing.

## Repo Discipline

- Obey `spec.md` and the active sprint file.
- Do not commit the datasetfiles under the datasets folder un the repo.
- Keep the repo shape aligned to `spec.md`.
- Treat the GitHub repo root as the project root.
- Do not add new top-level folders unless the active sprint explicitly requires them.
- Preserve `bob_sessions/` as the final judging-evidence folder.
- Keep `app.py` reserved as the main judge-facing dashboard entrypoint.
- Support pages are allowed only when the sprint or spec calls for them.

## Hackathon Evidence

- Treat IBM Bob IDE usage as a core submission requirement, not an optional footnote.
- When a sprint produces meaningful implementation, documentation, testing, or review work through Bob, remind the human to export the relevant task-history markdown and task-session consumption screenshot.
- Final documentation must explain how Bob accelerated the work in concrete terms, such as repo planning, code generation, testing, documentation, or review.
- Do not invent, rewrite, or sanitize Bob task histories manually. The required evidence is the exported Bob IDE artifact plus the session summary screenshot.
- Keep `bob_sessions/README.md` as guidance until real exported reports and screenshots are added.

## Copyright And Sources

- Do not copy article pages, figures, or long passages from the paper.
- Use only short citation metadata and local reference files for source attribution.
- Use the local redrawn flowsheet SVG and locally generated charts rather than scanned figures from the paper.
- Always use the shared references footer on every page of the software.
- If a feature depends on a source-grounded fact, prefer citing the local reference metadata rather than paraphrasing from memory.

## Data Handling

- Never commit dataset files.
- Assume the Rieth `.RData` files live in a local ignored location.
- Fail gracefully when the dataset is missing and tell the human exactly what folder or filename the app expects.
- Do not silently download or cache the published dataset into the repo.
- Treat model artifacts similarly: if they are missing, explain how to generate or place them.
- Never commit IBM Cloud credentials, IBM API keys, watsonx access tokens, or local secret files.

## Working Style

- Work one sprint at a time.
- Prefer small, explicit changes over broad speculative scaffolding.
- Preserve the spec story: domain features beat raw features.
- Use simple, cross-platform Python and filesystem assumptions.
- Keep comments concise and only where they clarify non-obvious behavior.
- Be honest about limitations, missing data, and any source-grounded uncertainty.

## Sprint Execution Rule

Bootstrap exception:

- If `sprints/` does not exist, create the required repo structure and sprint files from `spec.md`.
- Do not create `app.py` or implementation modules during that bootstrap task unless `spec.md` says the active sprint allows it.
- End the bootstrap task with a concise handoff and wait for the human to start Sprint 001.

At the start of each sprint:

- restate the sprint goal
- list the files expected to change
- list the visible human verification steps

At the end of each sprint:

- summarize the behavior completed
- list tests run
- list remaining risks
- provide PR-ready notes
- include human verification steps and explicit PR checklist guidance

Do not blend multiple sprints into one implementation unless the human asks for that change explicitly.

## Testing Rule

- Add or update tests for any behavior introduced in the sprint.
- At minimum, run `ruff check` and `pytest -q` when those commands become meaningful for the current sprint.
- If a test cannot run, say exactly why.
- Do not claim verification that was not actually performed.

## Human Handoff Format

End each sprint with:

- what changed
- what the human should open or run
- what the human should expect to see
- what screenshot or evidence to capture
- whether any Bob IDE task export should be added to `bob_sessions/`
- what to put in the PR description
- what risks or limitations remain

The handoff must be readable by a non-software engineer.

## Never Do

- Never ignore `spec.md` or the active sprint file.
- Never read, create, or depend on `tep_hackathon_playbook.md`.
- Never drift the repo away from the `spec.md` structure without approval.
- Never commit `.RData` files.
- Never commit IBM Cloud credentials or API keys.
- Never remove or ignore `bob_sessions/` from the final repository.
- Never claim IBM Bob usage without real exported task evidence for judging.
- Never omit the shared references footer once UI pages exist.
- Never fail with a raw traceback when a friendly setup message is possible.
- Never claim a sprint is complete without human verification steps and PR notes.
