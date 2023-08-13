import { writable } from "svelte/store";

export const theme = writable("dark");

theme.subscribe(v=>{
    document.documentElement.classList.value = v;
})