import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const hasPath = (obj, path) => {
  if (obj === undefined) return false;
  if (path.length === 0) {
    return true;
  }
  return hasPath(obj[path[0]], path.slice(1));
};

export function checkMissingTranslations() {
  let languages;
  /**
   *
   * @param {{content:string, filename:string}} param0
   * @returns
   */
  async function templateTranslates({ content, filename }) {
    const inDir = join(process.cwd(), "src", "lib", "i18n");
    languages = (
      await Promise.all(
        (await readdir(inDir)).map((fp) => readFile(join(inDir, fp), "utf-8"))
      )
    )
      .map((e) => JSON.parse(e))
      .reduce((acc, c) => {
        return { ...acc, ...c };
      }, {});

    const reg = /\$t\([`'"](.+)[`'"]\)/g;
    const keys = [...content.matchAll(reg)];
    const warnings = [];
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        const match = keys[i];
        let to = match[1].indexOf("$");
        to = to === -1 ? undefined : to;
        const path = match[1]
          .slice(0, to)
          .split(".")
          .filter((e) => e !== "");
        Object.keys(languages).forEach((language) => {
          const translations = languages[language];
          if (!hasPath(translations, path)) {
            throw Error(
              `key:${path.join(".")} is missing for language ${language}`
            );
          }
        }, true);
      }
    }
    return { code: content, diagnostics: warnings };
  }
  return { markup: templateTranslates };
}
