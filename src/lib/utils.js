import ShortUniqueId from "short-unique-id";
import c from "color";

const uid = new ShortUniqueId({ length: 10 });
export const getUid = () => {
  return uid();
};

export const categories = [
  "all",
  "arts-crafts",
  "automotive",
  "baby-products",
  "beauty",
  "stripbooks",
  "fashion-boys",
  "computers",
  "deals",
  "digital-music",
  "electronics",
  "fashion-girls",
  "hpc",
  "kitchen",
  "industrial",
  "digital-text",
  "luggage",
  "fashion-mens",
  "movies-tv",
  "music",
  "pets",
  "software",
  "sporting",
  "tools",
  "toys-and-games",
  "videogames",
  "fashion-womens",
];

export class Color {
  /**
   * @param {any} colorObj
   */
  constructor(colorObj) {
    if (String(colorObj) === colorObj) {
      this.color = c(colorObj, "hex");
    } else if ("r" in colorObj) {
      this.color = c(colorObj, "rgb");
    } else {
      this.color = c(colorObj, "hsl").rgb();
    }
  }
  /**
   *
   * @param {number} arg
   * @returns
   */

  hue(arg = undefined) {
    if (arg !== undefined) {
      return new Color(this.color.hue(arg).rgb());
    }
    return this.color.hue();
  }
  /**
   *
   * @param {number} arg
   * @returns
   */
  white(arg = undefined) {
    if (arg !== undefined) {
      return new Color(this.color.white(arg).rgb());
    }
    return this.color.white();
  }
  /**
   *
   * @param {number} arg
   * @returns
   */
  black(arg = undefined) {
    if (arg !== undefined) {
      return new Color(this.color.black(arg).rgb());
    }
    return this.color.black();
  }
  hex() {
    return this.color.hex();
  }
  /**
   *
   * @param {{h:number, s:number, l:number}} hsl
   * @returns {any}
   */
  hsl(hsl = undefined) {
    if (hsl !== undefined) {
      return new Color(this.color.hsl(hsl.h, hsl.s, hsl.l));
    }
    return {
      h: this.color.hue(),
      s: this.color.lightness(),
      l: this.color.luminosity(),
    };
  }
  /**
   * @param {{r:number, g:number, b:number}} rgb
   * @returns {any}
   */
  rgb(rgb = undefined) {
    if (rgb !== undefined) {
      return new Color(this.color.rgb(rgb.r, rgb.g, rgb.b));
    }
    return {
      r: this.color.red(),
      g: this.color.green(),
      b: this.color.blue(),
    };
  }
}

/**
 *
 * @param {Record<string, boolean>} obj
 * @returns
 */
export const cls = (obj) => {
  return Object.keys(obj)
    .filter((e) => obj[e])
    .join(" ");
};

/**
 *
 * @param {any[]} arr
 * @param {number} idxA
 * @param {number} idxB
 */
export const swap = (arr, idxA, idxB) => {
  [arr[idxA], arr[idxB]] = [arr[idxB], arr[idxA]];
};

export const eq = (objA, objB) => {
  if (typeof objA !== typeof objB) return false;
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return (
      objA.length === objB.length &&
      objA.reduce((acc, _, i) => {
        if (acc) {
          return eq(objA[i], objB[i]);
        }
        return false;
      }, true)
    );
  }
  if (typeof objA === "object" && typeof objB === "object") {
    return (
      Object.keys(objA).length === Object.keys(objB).length &&
      Object.keys(objA).reduce((acc, i) => {
        if (acc) {
          return eq(objA[i], objB[i]);
        }
        return false;
      }, true)
    );
  }
  return objA === objB;
};

export const copy = (obj) => {
  if (typeof obj !== "object") {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
};

/**
 *
 * @param {boolean} multi
 * @param {string} accept
 * @returns {Promise<File[]>}
 */
export const upload = (multi = false, accept = "image/*") => {
  return new Promise((resolve) => {
    const file = document.createElement("input");
    file.type = "file";
    file.setAttribute("style", `opacity:0;position:fixed;top:0;left:0;`);
    file.setAttribute("accept", accept);
    if (multi) {
      file.setAttribute("multiple", "true");
    }
    file.click();
    file.onchange = () => {
      resolve([...file.files]);
      file.remove();
    };
  });
};

/** Dispatch event on click outside of node */
export function clickOutside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("click-outside", node));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
