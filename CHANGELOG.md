# Changelog

All notable changes to `dsh-plugin-grill-me` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-11-10

### Changed
- Migrated requirement-gathering instructions from synthesized user message steering to dynamic system prompt injection (`systemPrompt.section`).
- Tied requirement-gathering lifecycle directly to native `planMode`: guidelines deactivate automatically upon plan approval via `exit_plan_mode` or `/grill-me off`.
- `/grill-me <goal>` now steers only the user's raw goal text as the user message.

### Fixed
- Fixed chat UI and message history pollution caused by steering multi-paragraph prompt templates with `source.kind: "user"`.
- Fixed message history (`dsh-plugin-message-history`) capturing the requirement template into input arrow-key navigation buffers.

## [1.0.3] - 2026-11-09

### Added
- Added DSH Plugin badge to README.
- Added non-commandline UI installation instructions to README.

## [1.0.2] - 2026-11-08

### Fixed
- Fixed duplicate `id-token` permission entry in GitHub Actions workflow.

## [1.0.1] - 2026-11-08

### Changed
- Added `id-token: write` permissions to GitHub Actions workflow for npm Provenance and Trusted Publishing (OIDC).

## [1.0.0] - 2026-11-08

### Added
- Native `/grill-me` slash command for DeepSeek Harness.
- Automatic plan mode activation via `planMode` service.
- Structured requirement gathering prompt steering mimicking the Google Antigravity `/grill-me` command.
- Multi-choice requirement questioning format with recommended options.
- Localization support (`en`, `zh`).
