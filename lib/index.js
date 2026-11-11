import { randomUUID } from "node:crypto";

const COMMAND_NAME = "grill-me";
const COMMAND_DESCRIPTION = "Enter plan mode and start requirement gathering";
const COMMAND_INPUT_HINT = "[off|<goal>]";

/**
 * Tracks session IDs where /grill-me was invoked.
 * Once plan mode exits for a session, it is automatically pruned.
 */
const activeGrillSessions = new Set();

const GRILL_ME_PROMPT = `Requirement gathering guidelines:
Please ask the user detailed questions regarding their goal and how they want their feature/prompt implemented.

For each question:
1. Offer a suggested option (marked as "(Recommended)").
2. Offer at least 2 alternative options (or use multi-choice).

Guidelines:
- You MUST use the \`ask_user_question\` tool to present these questions in a structured, multi-choice format—never ask them as raw text in the conversation.
- Ask at least 3 questions to ensure all user intentions are fully clarified (up to 20 for complex goals).
- Incorporate the user's answers into the final implementation plan artifact and present it for review using the \`exit_plan_mode\` tool.`;

export const name = "grill-me";
export const inject = ["commands", "planMode", "systemPrompt"];

export function apply(ctx) {
  // 1. Dynamic System Prompt Section
  // Assembled before every step. Evaluates to GRILL_ME_PROMPT while in plan mode,
  // and automatically deactivates as soon as plan mode exits.
  ctx.systemPrompt.section({
    name: "grill-me:guidelines",
    order: (ctx.systemPrompt.getSectionOrder?.("PLAN_POLICY") ?? 500) + 10,
    text: (context) => {
      const agent = context.agent;
      if (!agent) return "";

      const sessionId = agent.session?.id;
      if (!sessionId || !activeGrillSessions.has(sessionId)) return "";

      // Check native plan mode state
      const planMode = ctx.get("planMode");
      const isPlanActive = planMode ? planMode.get(agent).active : false;

      // If the user or agent exited plan mode (via exit_plan_mode or /plan off):
      if (!isPlanActive) {
        activeGrillSessions.delete(sessionId);
        return "";
      }

      return GRILL_ME_PROMPT;
    }
  });

  // 2. Register /grill-me slash command
  ctx.commands.register({
    name: COMMAND_NAME,
    description: COMMAND_DESCRIPTION,
    input: { hint: COMMAND_INPUT_HINT },
    handler: async (invocation) => {
      const userGoal = invocation.rawInput.trim();
      const sessionId = invocation.agent.session.id;
      const planMode = ctx.get("planMode");

      // Support manual cancellation: /grill-me off
      if (userGoal === "off") {
        activeGrillSessions.delete(sessionId);
        if (planMode) {
          try {
            planMode.set(invocation.agent, false);
          } catch (err) {}
        }
        return { kind: "success", text: "Grill-me mode turned off." };
      }

      // Mark this session as actively grilling
      activeGrillSessions.add(sessionId);

      // Enter native plan mode
      if (planMode) {
        try {
          planMode.set(invocation.agent, true);
        } catch (err) {
          console.warn("[grill-me] Failed to activate planMode:", err);
        }
      }

      // Steer the agent cleanly:
      if (userGoal) {
        // Send ONLY what the user typed:
        // - UI displays only the user's actual goal
        // - Message history (Up Arrow) stores only what the user typed
        invocation.agent.steer({
          id: randomUUID(),
          role: "user",
          content: [{ type: "text", text: userGoal }],
          source: { kind: "user" }
        });
      } else {
        // If called without arguments (/grill-me), steer a background notice
        // so it wakes the agent without creating an artificial speech bubble or polluting history
        invocation.agent.steer({
          id: randomUUID(),
          role: "user",
          content: [{ type: "text", text: "Please begin requirement gathering." }],
          source: {
            kind: "grill-me",
            form: "notice",
            summary: "Started requirement gathering"
          }
        });
      }

      return {
        kind: "success",
        text: userGoal
          ? `Entered plan mode for: "${userGoal}". Starting requirement gathering.`
          : "Entered plan mode. Starting requirement gathering."
      };
    }
  });
}
