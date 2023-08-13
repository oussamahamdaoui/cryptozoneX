import { writable } from "svelte/store";

export const goTo = (href, state)=>{
    history.pushState(state, "", href);
    const event = new Event("popstate");
    window.dispatchEvent(event);
    location.set(document.location);
}

export const replaceState = (href, state)=>{
    history.replaceState(state, "", href);
    location.set(document.location);
}

export const popState=()=>{
    history.back();
}

window.addEventListener("popstate", ()=>{
    routed.set(false);
    location.set(document.location);
})

export const location = writable(document.location);
export const routed   = writable(false);