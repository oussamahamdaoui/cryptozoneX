<script>
  import { getContext } from "svelte";
  const currency = getContext("currency");
  import { cls } from "../utils";
  import DropDown from "./DropDown.svelte";
  let value = "EUR";
  export let global = true;
  $: global && currency.set(value);
</script>

<DropDown bind:value class="currency-selector {cls({ global })}">
  <slot name="label" slot="label" />
  <slot slot="value" let:value>{value}</slot>
  <slot slot="options" let:change>
    <button on:click={change("EUR")}>EUR</button>
    <button on:click={change("USD")}>USD</button>
  </slot>
</DropDown>

<style lang="scss">
  :global(.currency-selector.global .value) {
    padding: 0.5rem;
    padding-right: 0rem !important;
  }
</style>
