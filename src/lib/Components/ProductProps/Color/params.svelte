<script>
  import { getContext } from "svelte";
  import { SUPPORTED_CURRENCIES, exchange } from "../../../Stores/currency";
  import { getUid, swap } from "../../../utils";
  import ColorPicker from "../../ColorPicker.svelte";
  import Drag from "../../Drag.svelte";
  import Draggable from "../../Draggable.svelte";
  import Input from "../../Input.svelte";
  import ToolTip from "../../ToolTip.svelte";
  export let props;
  $: props = props ?? {
    colors: [],
    label: `Color`,
  };

  const exchangeRates = getContext("exchangeRates");
  let swapCurrencies = exchange($exchangeRates);

  const currency = getContext("currency");

  const addColor = () => {
    props.colors.push({
      name: "",
      id: getUid(),
      addPrice: Object.keys(SUPPORTED_CURRENCIES).reduce((acc, c) => {
        acc[c] = 0n;
        return acc;
      }, {}),
    });
    props = props;
  };
  const removeColor = (id) => () => {
    props.colors = props.colors.filter((e) => e.id !== id);
    props = props;
  };
  const onSwap = async (idxA, idxB) => {
    swap(props.colors, idxA, idxB);
    props = props;
  };

  const updatePrices = (id) => () => {
    const color = props.colors.find((c) => c.id === id);
    const from = $currency;
    const amount = color.addPrice[from];
    Object.keys(SUPPORTED_CURRENCIES).forEach((to) => {
      if (from === to) return;
      color.addPrice[to] = swapCurrencies(amount, from, to);
    });
  };
</script>

<div class="params">
  <Input bind:value={props.label}>
    <slot slot="label">Value label</slot>
  </Input>
  {#if props.colors.length === 0}
    <p class="empty">No colors for this variation</p>
  {/if}
  <Drag let:swap {onSwap}>
    {#each props.colors as color (color.id)}
      <Draggable {swap} let:dragger let:moving>
        <div class="color">
          <button use:dragger class:moving>
            <i class="ri-draggable" />
          </button>
          <div class="color-params">
            <div class="wrap">
              <ColorPicker bind:value={color.color} />
              <Input bind:value={color.name}>
                <slot slot="label">Color Name</slot>
              </Input>
            </div>
            <Input
              type="diff"
              bind:value={color.addPrice[$currency]}
              on:change={updatePrices(color.id)}
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
          <button on:click={removeColor(color.id)}>
            <i class="ri-close-line" />
          </button>
        </div>
      </Draggable>
    {/each}
  </Drag>
  <button class="addColor" on:click={addColor}>
    <i class="ri-add-line" />
    {`New color`}
  </button>
</div>

<style lang="scss">
  .params {
    display: contents;
    .empty {
      text-align: center;
      color: var(--neutral-7);
    }
    :global(.drag:empty) {
      display: none;
    }
    .color {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--neutral-2);
      .color-params {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .ri-information-line {
          align-self: center;
          margin-right: 0.5rem;
          color: var(--neutral-9);
        }
      }
      button {
        background-color: transparent;
        border: none;
        color: var(--neutral-9);
        &:first-of-type {
          cursor: grab;
        }
        &:last-of-type {
          &:hover {
            color: var(--red-11);
          }
        }
      }
    }
    .wrap {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem 0;
      :global(.input) {
        flex: 2;
      }
      :global(.input.price) {
        flex: 1;
      }
      &.moving {
        button {
          &:first-of-type {
            cursor: grabbing;
          }
        }
      }
    }
    .addColor {
      background-color: transparent;
      border: none;
      color: var(--primary-11);
      width: max-content;
      align-self: center;
    }
  }
</style>
