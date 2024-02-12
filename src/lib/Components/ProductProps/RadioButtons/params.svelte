<script>
  import { getUid, swap } from "../../../utils";
  import Drag from "../../Drag.svelte";
  import Draggable from "../../Draggable.svelte";
  import Input from "../../Input.svelte";
  import ToolTip from "../../ToolTip.svelte";

  export let props;
  $: props = props ?? {
    options: [],
  };

  const addOption = () => {
    props.options.push({
      label: "",
      id: getUid(),
      addPrice: 0,
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
</script>

<div class="option">
  <Drag let:swap onSwap={swapOption}>
    {#each props.options as option (option.id)}
      <Draggable {swap} let:dragger let:moving>
        <div class="wrap">
          <button use:dragger class:moving>
            <i class="ri-draggable" />
          </button>
          <Input bind:value={option.label} type="textarea">
            <slot slot="label">Option label</slot>
          </Input>
          <Input bind:value={option.addPrice} class="price">
            <slot slot="label">Price</slot>
            <slot slot="iconRight">
              <ToolTip
                text="will increase or decrice the price by this amount when the user selects this variation"
              >
                <i class="ri-information-line" />
              </ToolTip>
            </slot>
          </Input>
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
  .wrap {
    display: flex;
    background-color: var(--neutral-2);
    gap: 0.5rem;
    padding: 0.5rem 0;
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
