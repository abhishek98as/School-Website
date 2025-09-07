import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Allow overriding the default model via environment variable.
const model = process.env.GENKIT_MODEL || 'googleai/gemini-2.5-flash';

export const ai = genkit({
  plugins: [googleAI()],
  model,
});
