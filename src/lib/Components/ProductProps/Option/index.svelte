<script>
  import { getContext } from "svelte";
  import DropDown from "../../DropDown.svelte";
  import Price from "../../Price.svelte";
  export let options = [];
  export let label = "";
  export let value = options[0]?.id;
  const currency = getContext("currency");
</script>

<DropDown bind:value>
  <slot slot="label">{label}</slot>
  <slot slot="value" let:value>
    {options.find((e) => e.id === value)?.label || ""}
  </slot>
  <slot slot="options" let:change>
    {#each options as { label, id, addPrice }}
      <button on:click={change(id)}>
        {label}
        {#if addPrice}
          <Price
            price={addPrice[$currency]}
            withSign={true}
            currency={$currency}
          ></Price>
        {/if}
      </button>
    {/each}
  </slot>
</DropDown>
