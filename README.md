# dsh-plugin-grill-me

[![npm version](https://img.shields.io/npm/v/dsh-plugin-grill-me.svg)](https://www.npmjs.com/package/dsh-plugin-grill-me)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Structured planning and requirement gathering slash command for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).

---

## Overview & Antigravity Compatibility

`dsh-plugin-grill-me` introduces the **`/grill-me`** command to DeepSeek Harness, designed to **faithfully mimic the popular Google Antigravity `/grill-me` slash command**.

In Antigravity workflows, `/grill-me` is the standard trigger to prevent rushed or ambiguous implementations by forcing an intensive, structured requirement gathering session. This plugin bridges that exact methodology to DeepSeek Harness:

- **Mimics the Google Antigravity `/grill-me` Slash Command**: Seamlessly replaces or complements Antigravity interactive workflows.
- **Native Plan Mode Activation**: Automatically hooks into the DeepSeek Harness `planMode` service, switching the session to plan mode before running actions.
- **Interactive Multi-Choice Questioning**: Steers the agent to interrogate user intent using the interactive `ask_user_question` tool with recommended choices, preventing shallow assumptions.
- **Implementation Artifact Generation**: Concludes requirement gathering by producing concrete, durable task lists and plan specifications.

---

## Usage

Type `/grill-me` directly into the conversation input:

```
/grill-me review the newly created plugins for completeness before i publish them on github
```

Or run `/grill-me` on its own:
```
/grill-me
```

### What Happens When You Run `/grill-me`

1. The session immediately transitions into **Plan Mode** (`planMode: true`).
2. An interactive requirement questionnaire is initiated. The agent is directed to formulate between 3 and 20 focused, structured questions using `ask_user_question`.
3. Each question provides a `(Recommended)` option alongside at least two alternatives or multi-selection choices.
4. Once you answer the questions, the agent synthesizes your specifications into an actionable implementation plan artifact before any code is modified.

---

## Installation

### From NPM (Recommended)
Add the plugin to your DeepSeek Harness profile dependencies:

```json
{
  "dependencies": {
    "dsh-plugin-grill-me": "^1.0.0"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "dsh-plugin-grill-me"
      ]
    }
  }
}
```

Or install it via the DeepSeek Harness Plugin Manager:
```bash
dsh plugin install dsh-plugin-grill-me
```

---

## Configuration

In your profile's `cordis.patch.yml`:

```yaml
- insert:
    - id: grill-me
      name: 'dsh-plugin-grill-me'
```

---

## License

[MIT](LICENSE) © 2026 Phillip Webber (Domush)
