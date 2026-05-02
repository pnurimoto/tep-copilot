# TEP Copilot

Predictive maintenance copilot for the Tennessee Eastman Process benchmark, designed to show how process-engineering features can detect faults earlier than classical SPC.

## Current Status

Planning bootstrap complete; app build not started

## Hackathon Submission Note

This project is being shaped as an IBM Bob Dev Day Hackathon submission. The final repository must show IBM Bob IDE as a core development component, including exported Bob task-history markdown files and task-session consumption summary screenshots under `bob_sessions/`.

The technical artifact remains TEP Copilot: a local-first process copilot that compares domain-informed fault detection against classical SPC. The submission narrative must also explain how Bob helped turn the idea into a tested, documented proof of concept faster.

## Local Data Policy

The Rieth dataset stays local and is not committed to GitHub. Raw `.RData` files belong in a gitignored local folder such as `data_raw/` or `dataverse_files/`.

## Upcoming Sprints

- Sprint 000: bootstrap files only
- Sprint 001: foundation and local run
- Sprint 002: main dashboard shell and shared footer
- Sprint 003: dataset loader and tag mapping
- Sprint 004: flowsheet binding for continuous measurements
- Sprint 005: engineered features and QA page
- Sprint 006: model training, SPC baseline, and results page
- Sprint 007: live replay, SHAP, and cost or cost-index
- Sprint 008: polish, README expansion, and submission readiness

## References

- Rieth et al. (2017), Harvard Dataverse, DOI `10.7910/DVN/6C3JR1`
- Downs and Vogel (1993), *Computers and Chemical Engineering*, DOI `10.1016/0098-1354(93)80018-I`

## License

Project code and locally authored documentation are released under the MIT License. External datasets, papers, IBM materials, and third-party assets remain under their own terms and are not relicensed by this repository.
