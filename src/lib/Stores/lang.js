import { writable } from "svelte/store";
import { I18n } from "i18n-js";

export const DEFAULT_LANG = "fr";
export const SUPPORTED_LANGS = ["fr", "en"];

export const newLangContext = () => {
  const i18n = new I18n();
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
