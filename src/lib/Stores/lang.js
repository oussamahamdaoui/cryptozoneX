import { writable } from 'svelte/store';
import { I18n } from "i18n-js";
export const i18n = new I18n();

const geter = (t)=>(...params)=>{
    // @ts-ignore
    return i18n[t](...params);
}
export const DEFAULT_LANG = "fr";
export const SUPPORTED_LANGS = ["fr", "en"];
export const lang = writable(DEFAULT_LANG);
export const t = writable(geter('t'));
export const store = (params)=>{
    i18n.store(params);
}

lang.subscribe(async (v)=>{
    if(!i18n.availableLocales.includes(v)){
        const filePromise = await import(`../i18n/${v}.json`);
        i18n.store(filePromise.default);
    }
    i18n.locale = v;
    t.set(geter('t'));
})