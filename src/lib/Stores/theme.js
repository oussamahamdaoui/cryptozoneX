import { writable } from "svelte/store";

export const newThemeContext = (doc = document) => {
  const theme = writable("dark");

  theme.subscribe((v) => {
    doc.documentElement.classList.value = v;
  });
  return { theme };
};
