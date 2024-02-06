<script>
  import { SUPPORTED_LANGS } from "../Stores/lang";
  import DropDown from "./DropDown.svelte";
  import { getContext } from "svelte";

  const lang = getContext("lang");
  const t = getContext("t");

  let selected = $lang;
  lang.subscribe((e) => {
    selected = e;
  });
  $: lang.set(selected);
</script>

<DropDown bind:value={selected} class="lang-selector">
  <slot slot="value" let:value>{$t(`language.${value}`)}</slot>
  <slot slot="options" let:change>
    {#each SUPPORTED_LANGS as lan}
      <button on:click={change(lan)}>
        {$t(`language.${lan}`, { locale: lan })}
      </button>
    {/each}
  </slot>
</DropDown>

<style lang="scss">
  :global(.lang-selector .value) {
    padding: 0.5rem;
    padding-right: 0rem !important;
  }
</style>
