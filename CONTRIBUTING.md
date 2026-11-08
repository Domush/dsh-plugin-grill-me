# Contributing to dsh-plugin-grill-me

Thank you for your interest in contributing to `dsh-plugin-grill-me`! We welcome bug reports, improvements, and feature contributions.

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Domush/dsh-plugin-grill-me.git
   cd dsh-plugin-grill-me
   ```

2. **Link into DeepSeek Harness:**
   To test changes locally in DeepSeek Harness, link the package in your DSH profile `package.json`:
   ```json
   {
     "dependencies": {
       "dsh-plugin-grill-me": "link:/path/to/dsh-plugin-grill-me"
     }
   }
   ```
   Or use the DSH plugin manager / Cordis patch layer.

## Guidelines

- **Antigravity Workflow Parity**: The `/grill-me` slash command mirrors the Antigravity requirement gathering workflow by triggering native plan mode and prompt steering. Ensure additions preserve this parity.
- **Code Style**: Use ES modules (`import`/`export`), clean vanilla JavaScript, and minimal runtime dependencies.
- **Pull Requests**: Submit clear, atomic PRs with descriptive titles and explanations of the problem being solved.

## Reporting Issues

If you encounter unexpected behavior, please open an issue on GitHub with:
1. Steps to reproduce.
2. DSH version and platform details.
3. Relevant error logs or console output.
