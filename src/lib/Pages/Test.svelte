<script>
  import { getContext } from "svelte";
  import Price from "../Components/Price.svelte";
  import CurrencySelector from "../Components/CurrencySelector.svelte";
  import Input from "../Components/Input.svelte";

  const currency = getContext("currency");
  const exchangeRates = {
    USD: 1_000000000n,
    EUR: 1_072097600n,
    INR: 12042628n,
  };
  /**
   *
   * @param {bigint} amount
   * @param of
   * @param to
   */
  const exchange = (amount, of, to) => {
    const amountUSD = amount * exchangeRates[of];
    if (to === "USD") return amountUSD / exchangeRates.USD;
    return amountUSD / exchangeRates[to];
  };
  let from = "USD";
  /**
   * @type {any}
   */
  let to = "EUR";

  let amount;
  let v;

  const calculate = () => {
    v = exchange(amount, from, to);
  };
</script>

<div>
  <CurrencySelector global={false} bind:value={from}></CurrencySelector>
  <CurrencySelector global={false} bind:value={to}></CurrencySelector>
  <Input type="price" bind:value={amount} digits={100n} />
  <button on:click={calculate}>Change</button>
  <Price bind:currency={to} bind:price={v}></Price>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    gap: 1rem;
    button {
      background-color: var(--neutral-11);
      color: var(--neutral-1);
      padding: 1rem 4rem;
    }
    :global(.multi-select) {
      min-width: 190px;
    }
  }
</style>
