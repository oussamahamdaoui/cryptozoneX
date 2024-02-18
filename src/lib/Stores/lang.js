import { writable } from "svelte/store";
import { I18n } from "i18n-js";
import deflang from "../i18n/en.json";

export const DEFAULT_LANG = "en";
export const SUPPORTED_LANGS = ["fr", "en"];

export const newLangContext = (store) => {
  const i18n = new I18n();
  if (store) {
    i18n.store(store);
  }

  i18n.missingTranslation.get = () => {
    return undefined;
  };
  const updateTranslation = (params, v) => {
    i18n.store(params);
    v.set(geter);
  };

  const geter = (id, params) => {
    return i18n.t(id, {
      ...params,
    });
  };

  const lang = writable(DEFAULT_LANG);
  const t = writable(geter);

  i18n.store(deflang);
  i18n.locale = DEFAULT_LANG;

  lang.subscribe(async (v) => {
    if (!i18n.availableLocales.includes(v)) {
      const filePromise = await import(`../i18n/${v}.json`);
      i18n.store(filePromise.default);
    }
    i18n.locale = v;
    t.set(geter);
  });

  return {
    t,
    updateTranslation,
    lang,
  };
};
