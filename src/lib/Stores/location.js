import { writable } from "svelte/store";

export const newLocationContext = (win = window) => {
  const goTo = (href, state) => {
    if (win.parent === win) {
      history.pushState(state, "", href);
    }
    const event = new Event("popstate");
    win.dispatchEvent(event);
    location.set(new URL(document.location.href));
  };

  const replaceState = (href, state) => {
    if (win.parent === win) {
      history.replaceState(state, "", href);
      location.set(new URL(document.location.href));
    }
  };

  const popState = () => {
    if (win.parent === win) {
      history.back();
    }
  };

  win.addEventListener("popstate", () => {
    routed.set(false);
    // location.set(new URL(document.location.href));
  });

  const location = writable(new URL(document.location.href));
  const routed = writable(false);
  return {
    location,
    routed,
    popState,
    replaceState,
    goTo,
  };
};
