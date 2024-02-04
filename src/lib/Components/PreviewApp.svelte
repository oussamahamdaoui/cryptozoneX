<script>
  import "../../app.scss";
  import "remixicon/fonts/remixicon.css";
  import { getContext, onMount } from "svelte";
  import TopMenu from "./TopMenu.svelte";
  const updateTranslation = getContext("updateTranslation");
  const t = getContext("t");

  export let sections;
  export let params;
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
