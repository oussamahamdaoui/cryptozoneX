import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { checkMissingTranslations } from "./translate.js";

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [vitePreprocess(), checkMissingTranslations()],
};
