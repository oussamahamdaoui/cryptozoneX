<script>
  import { getContext } from "svelte";
  import { SUPORTED_CURRENCIES } from "../Stores/currency";
  const currencies = SUPORTED_CURRENCIES;
  const currencySymbol = getContext("currency");
  export let price = 31089n;
  export let useComa = false;
  export let lineTrough = false;
  $: currency = currencies[$currencySymbol];
</script>

<span class="price" class:lineTrough>
  {#if currency.symbolPos === "left"}
    <span class="super">{currency.symbol}</span>
  {/if}
  <span class="integerPart">{price / currency.decimalPlace}</span>
  <span class:super={!useComa}>
    {#if useComa}{currency.decimal}{/if}{price % currency.decimalPlace}
  </span>
  {#if currency.symbolPos === "right"}
    <span class="super">{currency.symbol}</span>
  {/if}
</span>

<style lang="scss">
  .price {
    display: inline-flex;
    align-items: baseline;
    position: relative;
    gap: 0.05rem;
    &.lineTrough {
      &::after {
        height: 0.1rem;
        width: 105%;
        background-color: currentColor;
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0%;
      }
    }
  }
  .super {
    font-size: 0.5rem;
    font-weight: lighter;
    align-self: flex-start;
    transform: translateY(15%);
  }
</style>
