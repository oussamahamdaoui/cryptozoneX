<script>
  import { SUPORTED_CURRENCIES, DEFAUL_CURRENCY } from "../Stores/currency";
  const currencies = SUPORTED_CURRENCIES;

  export let price = 0n;
  export let useComa = false;
  export let lineTrough = false;
  /**
   * @type {keyof typeof SUPORTED_CURRENCIES}
   */
  export let currency = DEFAUL_CURRENCY;

  /**
   * @param {bigint} v
   */
  const stringifyPrice = (v) => {
    const n = Math.log10(Number(currencyData.decimalPlace));
    const s = v.toString().padStart(n + 1, "0");
    const fct = s.slice(-n);
    const int = s.slice(0, s.length - fct.length);
    return currencyData.decimalPlace === 0n ? { int } : { int, fct };
  };
  $: currency = currency ?? DEFAUL_CURRENCY;
  $: currencyData = currencies[currency];
  $: disp = stringifyPrice(price);
</script>

<span class="price" class:lineTrough>
  {#if currencyData.symbolPos === "left"}
    <span class="super">{currencyData.symbol}</span>
  {/if}
  <span class="integerPart">{disp.int}</span>
  <span class:super={!useComa}>
    {#if useComa}{currencyData.decimal}{/if}{disp.fct}
  </span>
  {#if currencyData.symbolPos === "right"}
    <span class="super">{currencyData.symbol}</span>
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
    align-self: flex-start;
    transform: translateY(15%);
  }
</style>
