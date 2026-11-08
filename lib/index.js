import { randomUUID } from "node:crypto";

const COMMAND_NAME = "grill-me";
const COMMAND_DESCRIPTION = "Enter plan mode and start requirement gathering";
const COMMAND_INPUT_HINT = "<goal>";

export function apply(ctx) {
  ctx.inject(["commands"], (child) => {
    child.effect(() => {
      return child.commands.register({
        name: COMMAND_NAME,
        description: COMMAND_DESCRIPTION,
        input: { hint: COMMAND_INPUT_HINT },
        handler: async (invocation) => {
          const userGoal = invocation.rawInput.trim();

          // 1. Enter plan mode natively using the planMode service
          const planMode = child.get("planMode");
          if (planMode) {
            try {
              planMode.set(invocation.agent, true);
            } catch (err) {
              console.warn("[grill-me] Failed to activate planMode:", err);
            }
          }

          // 2. Prepare detailed requirement gathering prompt
          const goalContext = userGoal ? `Regarding the goal: "${userGoal}". ` : "";
          const promptText = `Requirement gathering: ${goalContext}Please ask the user numerous detailed questions regarding their goal and how they want their prompt implemented.

For each question:
1. Offer a suggested option (marked as "(Recommended)").
2. Offer at least 2 alternative options (or use multi-choice).

Guidelines:
- You MUST use the \`ask_user_question\` tool to present these questions in a structured, multi-choice format—never ask them as raw text in the conversation.
- Ask at least 3 questions to ensure all user intentions are fully clarified.
- Ask up to 20 questions for highly complex goals.
- Incorporate the user's answers into the final implementation plan artifact.`;

          // 3. Create a properly formed message with a unique id and role
          const message = {
            id: randomUUID(),
            role: "user",
            content: [{ type: "text", text: promptText }],
            source: { kind: "user" }
          };

          try {
            invocation.agent.steer(message);
          } catch (err) {
            console.error("[grill-me] Failed to steer agent message:", err);
          }

          return {
            kind: "success",
            text: userGoal
              ? `Entered plan mode for goal: "${userGoal}". Starting requirement gathering.`
              : "Entered plan mode. Starting requirement gathering."
          };
        }
      });
    }, "grill-me: slash command");
  });
}
