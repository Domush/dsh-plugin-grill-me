# Changelog

All notable changes to `dsh-plugin-grill-me` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
