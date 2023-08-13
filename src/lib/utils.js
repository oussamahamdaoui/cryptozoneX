import ShortUniqueId from "short-unique-id"
import c from "color";

const uid = new ShortUniqueId({length:10});
export const getUid = ()=>{
    return uid();
}

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
    "fashion-womens"
]

export class Color {
    /**
     * @param {any} colorObj
     */
    constructor(colorObj){
        if(String(colorObj) === colorObj){
            this.color = c(colorObj, "hex");
        } else if('r' in colorObj){
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

    hue(arg = undefined){
        if(arg !== undefined){
            return new Color(this.color.hue(arg).rgb());
        }
        return this.color.hue();
    }
    /**
     * 
     * @param {number} arg
     * @returns 
     */
    white(arg = undefined){
        if(arg !== undefined){
            return new Color(this.color.white(arg).rgb());
        }
        return this.color.white()
    }
    /**
     * 
     * @param {number} arg
     * @returns 
     */
    black(arg = undefined){
        if(arg !== undefined){
            return new Color(this.color.black(arg).rgb());
        }
        return this.color.black()
    }
     /**
     * 
     * @param {number} arg
     * @returns 
     */
    hex(arg = undefined){
        return this.color.hex();
    }
    /**
     * 
     * @param {{h:number, s:number, l:number}} hsl
     * @returns {any}
     */
    hsl(hsl = undefined){
        if(hsl !== undefined){
            return new Color(this.color.hsl(hsl.h, hsl.s, hsl.l));
        }
        return {
            h:this.color.hue(),
            s:this.color.lightness(),
            l:this.color.luminosity(),
        }
    }
    /**
     * @param {{r:number, g:number, b:number}} rgb
     * @returns {any}
     */
    rgb(rgb = undefined){
        if(rgb !== undefined){
            return new Color(this.color.rgb(rgb.r, rgb.g, rgb.b));
        }
        return {
            r:this.color.red(),
            g:this.color.green(),
            b:this.color.blue(),
        }
    }
};