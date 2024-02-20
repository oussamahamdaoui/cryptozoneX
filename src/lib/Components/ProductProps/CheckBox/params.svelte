<script>
  import { getContext } from "svelte";
  import { SUPPORTED_CURRENCIES, exchange } from "../../../Stores/currency";
  import CheckBox from "../../CheckBox.svelte";
  import Input from "../../Input.svelte";
  import ToolTip from "../../ToolTip.svelte";
  export let props;
  $: props = props ?? {
    label: "",
    selectedByDefault: false,
    addPrice: Object.keys(SUPPORTED_CURRENCIES).reduce((acc, c) => {
      acc[c] = 0n;
      return acc;
    }, {}),
  };

  const currency = getContext("currency");
  const exchangeRates = getContext("exchangeRates");

  let swapCurrencies = exchange($exchangeRates);

  const updatePrices = (_) => {
    const from = $currency;
    const amount = props.addPrice[from];
    Object.keys(SUPPORTED_CURRENCIES).forEach((to) => {
      if (from === to) return;
      props.addPrice[to] = swapCurrencies(amount, from, to);
    });
  };
</script>

<Input bind:value={props.label}>
  <slot slot="label">{`Checkbox label`}</slot>
</Input>
<Input
  type="diff"
  bind:value={props.addPrice[$currency]}
  on:change={updatePrices}
>
  <slot slot="label">Price</slot>
  <slot slot="iconRight">
    <ToolTip
      text="will increase or decrice the price by this amount when the user selects this variation"
    >
      <i class="ri-information-line" />
    </ToolTip>
  </slot>
</Input>

<label>
  <CheckBox bind:checked={props.selectedByDefault} />
  <slot name="label">Selected by default</slot>
</label>

<style lang="scss">
  .ri-information-line {
    align-self: center;
    margin-right: 0.5rem;
    color: var(--neutral-9);
  }
</style>
