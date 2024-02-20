<script>
  import { getContext } from "svelte";
  import { getUid, swap } from "../../../utils";
  import Drag from "../../Drag.svelte";
  import Draggable from "../../Draggable.svelte";
  import Input from "../../Input.svelte";
  import ToolTip from "../../ToolTip.svelte";
  import { SUPPORTED_CURRENCIES } from "../../../Stores/currency";

  export let props;
  $: props = props ?? {
    options: [],
  };

  const addOption = () => {
    props.options.push({
      label: "",
      subtitle: "",
      id: getUid(),
      addPrice: Object.keys(SUPPORTED_CURRENCIES).reduce((acc, c) => {
        acc[c] = 0n;
        return acc;
      }, {}),
    });
    props = props;
  };
  const removeOption = (id) => () => {
    props.options = props.options.filter((o) => o.id !== id);
    props = props;
  };
  const swapOption = (a, b) => {
    swap(props.options, a, b);
    props = props;
  };

  const updatePrices = (id) => () => {
    const option = props.options.find((c) => c.id === id);
    const from = $currency;
    const amount = option.addPrice[from];
    Object.keys(SUPPORTED_CURRENCIES).forEach((to) => {
      if (from === to) return;
      option.addPrice[to] = swapCurrencies(amount, from, to);
    });
  };

  const currency = getContext("currency");

  function swapCurrencies(amount, from, to) {
    throw new Error("Function not implemented.");
  }
</script>

<div class="option">
  <Drag let:swap onSwap={swapOption}>
    {#each props.options as option (option.id)}
      <Draggable {swap} let:dragger let:moving>
        <div class="wrap">
          <button use:dragger class:moving>
            <i class="ri-draggable" />
          </button>
          <div class="inputs">
            <Input bind:value={option.label}>
              <slot slot="label">Option title</slot>
            </Input>
            <Input bind:value={option.subtitle}>
              <slot slot="label">Option subtitle</slot>
            </Input>
            <Input
              bind:value={option.addPrice[$currency]}
              type="diff"
              on:change={updatePrices}
              class="price"
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
          </div>
          <button on:click={removeOption(option.id)}>
            <i class="ri-close-line" />
          </button>
        </div>
      </Draggable>
    {/each}
  </Drag>
  {#if props.options.length === 0}
    <p class="empty">No options for this variation</p>
  {/if}
  <button class="addOption" on:click={addOption}>
    <i class="ri-add-line" />
    New option
  </button>
</div>

<style lang="scss">
  .option {
    display: contents;
  }
  .inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }
  .wrap {
    display: flex;
    background-color: var(--neutral-2);
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-top: 1px solid var(--neutral-9);
    :global(.input) {
      flex: 2;
    }
    :global(.input.price) {
      flex: 1;
    }
    .ri-information-line {
      align-self: center;
      margin-right: 0.5rem;
      color: var(--neutral-9);
    }
    button {
      background-color: transparent;
      border: none;
      color: var(--neutral-9);
      &:focus {
        background-color: red;
      }
      &:first-of-type {
        cursor: grab;
        &.moving {
          cursor: grabbing;
        }
      }
      &:last-of-type {
        &:hover {
          color: var(--red-11);
        }
      }
    }
  }
  .empty {
    text-align: center;
    color: var(--neutral-7);
  }
  .addOption {
    background-color: transparent;
    border: none;
    color: var(--primary-11);
    width: max-content;
    align-self: center;
  }
</style>
