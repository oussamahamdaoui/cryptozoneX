<script>
  import { getContext } from "svelte";

  const location = getContext("location");
  const routed = getContext("routed");

  /**@type {string|RegExp|((location:Location)=>boolean)}*/
  let pathname = "";
  let is404 = false;
  $: show = false;
  export { pathname, is404 };

  $: {
    const trimmed = $location.pathname.replace(/\/$/, "");
    if (typeof pathname === "string") {
      show = trimmed === pathname.replace(/\/$/, "");
    } else if (typeof pathname === "function") {
      show = pathname($location);
    } else if (pathname instanceof RegExp) {
      show = pathname.test(trimmed);
    } else {
      show = false;
    }
    if (is404 === false && show === true) {
      routed.set(show);
    } else if ($routed === true && is404) {
      show = false;
    }
  }
</script>

{#if show}
  <slot />
{/if}
