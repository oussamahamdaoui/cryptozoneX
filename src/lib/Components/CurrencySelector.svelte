<script>
  import { getContext } from "svelte";
  const currency = getContext("currency");
  import { cls } from "../utils";
  import DropDown from "./DropDown.svelte";
  import { SUPORTED_CURRENCIES, DEFAUL_CURRENCY } from "../Stores/currency";
  export let value = DEFAUL_CURRENCY;
  export let global = true;
  $: global && currency.set(value);
</script>

<DropDown bind:value class="currency-selector {cls({ global })}">
  <slot name="label" slot="label" />
  <slot slot="value" let:value>{value}</slot>
  <slot slot="options" let:change>
    {#each Object.keys(SUPORTED_CURRENCIES) as curr}
      <button on:click={change(curr)}>{curr}</button>
    {/each}
  </slot>
</DropDown>

<style lang="scss">
  :global(.currency-selector.global .value) {
    padding: 0.5rem;
    padding-right: 0rem !important;
  }
</style>
