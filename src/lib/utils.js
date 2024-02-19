export const getUid = () => {
  return crypto.randomUUID();
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
  if (objA === objB) return true;
  if (null === objA || null === objB) return false;
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
  return false;
};

export const copy = (obj) => {
  if (typeof obj !== "object") {
    return obj;
  }
  const serialize = (_, v) =>
    typeof v === "bigint" ? `BigInt(${v.toString()})` : v;
  const decerialize = (key, value) => {
    return value.startsWith && value.startsWith("BigInt(")
      ? BigInt(value.slice(7, -1))
      : value;
  };
  return JSON.parse(JSON.stringify(obj, serialize), decerialize);
};

/**
 *
 * @param {boolean} multi
 * @param {string} accept
 * @returns {Promise<File[]>}
 */
export const fileSelector = (multi = false, accept = "image/*") => {
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
