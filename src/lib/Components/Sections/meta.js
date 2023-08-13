export const categories = /**@type{const}**/([
    "collection",
    "product",
    "text",
    "image",
    "link",
]);

/**
 * @typedef {categories[number]} Capability
 */

/**
 * @type {{name:string, categories:Capability[]}[]}
 */
export const sectionsMeta = [
    { name: "Collection", categories: ["collection"] },
    { name: "Grid", categories: ["collection", "product"] },
    { name: "NewsLetter", categories: ["text"] },
    { name: "Section", categories:  ["text", "image", "link","product", "collection"] },
    { name: "Section1", categories: ["text", "image", "link","product", "collection"] },
    { name: "Section4", categories: ["text", "image", "link","product", "collection"] },
    { name: "Slider", categories: ["product", "collection"] },
    { name: "AB", categories: ["collection"] },
]