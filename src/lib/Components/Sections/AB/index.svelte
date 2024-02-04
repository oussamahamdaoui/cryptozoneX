<script>
  import { getContext } from "svelte";
  const t = getContext("t");
  export let id;
  let c;
  let params;
  const compontent = async () => {
    // @ts-ignore
    const sections = $t(`${id}`).sections;
    if (sections.length > 0) {
      const comp = await import(`../${sections[0].name}/index.svelte`);
      params = sections[0].params;
      c = comp.default;
    }
  };
  compontent();
</script>

{#await c then c}
  <svelte:component this={c} id={`${id}.sections.0.params`}></svelte:component>
{/await}

<div></div>
