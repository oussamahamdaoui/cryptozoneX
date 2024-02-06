<script>
  import "../../app.scss";
  import "remixicon/fonts/remixicon.css";
  import { getContext, onMount, setContext } from "svelte";
  import TopMenu from "./TopMenu.svelte";
  import { newLangContext } from "../Stores/lang";
  import { newThemeContext } from "../Stores/theme";
  import { newLocationContext } from "../Stores/location";

  export let sections;
  export let params;
  export let doc = document;

  const user = getContext("user");
  const currency = getContext("currency");
  const cart = getContext("cart");

  // setContext("user", $user);
  // setContext("currency", $currency);
  const { theme } = newThemeContext(doc);
  setContext("theme", theme);
  // setContext("cart", $cart);
  const { t, lang, updateTranslation } = newLangContext();
  setContext("t", t);
  setContext("lang", lang);
  setContext("updateTranslation", updateTranslation);

  const { location, goTo, routed, popState, replaceState } = newLocationContext(
    doc.defaultView
  );
  setContext("location", location);
  setContext("goTo", goTo);
  setContext("routed", routed);
  setContext("replaceState", replaceState);
  setContext("popState", popState);

  // setContext("location", location);
  // setContext("goTo", goTo);
  // setContext("routed", $routed);
  // setContext("replaceState", replaceState);
  // setContext("popState", popState);

  onMount(() => {
    updateTranslation(params, t);
  });

  export const createComponent = async (section) => {
    const c = await import(
      `../components/Sections/${section.name}/index.svelte`
    );

    return {
      comp: c.default,
      id: section.id,
    };
  };
</script>

<TopMenu></TopMenu>
<div class="page">
  {#each sections as section, i}
    {#await createComponent(section) then conponent}
      <svelte:component this={conponent.comp} id={conponent.id}
      ></svelte:component>
    {/await}
  {/each}
</div>
