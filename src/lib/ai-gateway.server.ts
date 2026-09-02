import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable-ai",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
    },
    supportsStructuredOutputs: true,
  });
}

export function getGeminiModel(modelId: string) {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (key) {
    const google = createGoogleGenerativeAI({ apiKey: key });
    return google(modelId);
  }
  const lovableKey = process.env.LOVABLE_API_KEY;
  if (lovableKey) {
    const gateway = createLovableAiGatewayProvider(lovableKey);
    const gatewayId = modelId.includes("/") ? modelId : `google/${modelId}`;
    return gateway(gatewayId);
  }
  throw new Error(
    "Nenhuma chave de IA configurada. Defina GEMINI_API_KEY (ou GOOGLE_GENERATIVE_AI_API_KEY) no .env e na Vercel. Obtenha em https://aistudio.google.com/api-keys",
  );
}
