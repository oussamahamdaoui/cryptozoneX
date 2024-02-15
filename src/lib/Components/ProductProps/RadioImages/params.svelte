<script>
  import { getUid, swap } from "../../../utils";
  import Drag from "../../Drag.svelte";
  import Draggable from "../../Draggable.svelte";
  import Input from "../../Input.svelte";
  import Media from "../../Media.svelte";
  import ToolTip from "../../ToolTip.svelte";
  export let props;
  $: props = props ?? {
    variants: [],
    label: ``,
  };
  const addVarient = () => {
    const id = getUid();
    props.variants.push({
      name: "",
      id,
      addPrice: 0,
    });
    props = props;
    showMedia[id] = false;
  };
  const removeVarient = (id) => () => {
    props.variants = props.variants.filter((e) => e.id !== id);
    props = props;
  };
  const onSwap = async (idxA, idxB) => {
    swap(props.variants, idxA, idxB);
    props = props;
  };
  let showMedia = {};

  const hideMedia = (id) => () => {
    showMedia[id] = !showMedia[id];
    showMedia = showMedia;
  };
</script>

<div class="params">
  <Input bind:value={props.label}>
    <slot slot="label">Value label</slot>
  </Input>
  {#if props.variants.length === 0}
    <p class="empty">No options in this variation</p>
  {/if}
  <Drag let:swap {onSwap}
    >{#each props.variants as varient (varient.id)}
      <Draggable {swap} let:dragger let:moving>
        <div class="wrap">
          <button use:dragger class:moving>
            <i class="ri-draggable" />
          </button>
          <button class="oppener" on:click={hideMedia(varient.id)}>
            {#if varient.image}
              <img src={varient.image.src} alt={varient.name} />
            {:else}
              <i class="ri-file-image-line"></i>
            {/if}
          </button>
          <Input bind:value={varient.name}>
            <slot slot="label">Variation Name</slot>
          </Input>
          <Input value={varient.addPrice} class="price">
            <slot slot="label">Price</slot>
            <slot slot="iconRight">
              <ToolTip
                text="will increase or decrice the price by this amount when the user selects this variation"
              >
                <i class="ri-information-line" />
              </ToolTip>
            </slot>
          </Input>
          <button on:click={removeVarient(varient.id)}>
            <i class="ri-close-line" />
          </button>
          {#if showMedia[varient.id]}
            <Media
              limit={1}
              bind:value={varient.image}
              on:submit={hideMedia(varient.id)}
            ></Media>
          {/if}
        </div>
      </Draggable>
    {/each}</Drag
  >
  <button class="addVarient" on:click={addVarient}>
    <i class="ri-add-line" />
    {`New varient`}
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
    .wrap {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem 0;
      background-color: var(--neutral-2);
      position: relative;
      align-items: center;
      :global(.media) {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: var(--neutral-3);
        --bg: var(--neutral-3);
        border: 1px solid var(--neutral-7);
        border-radius: 5px;
        padding: 0.5rem;
      }
      .oppener {
        width: 52px;
        height: 52px;
        border: 1px solid var(--neutral-9);
        border-radius: 3px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .ri-information-line {
        align-self: center;
        margin-right: 0.5rem;
        color: var(--neutral-9);
      }
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
    .addVarient {
      background-color: transparent;
      border: none;
      color: var(--primary-11);
      width: max-content;
      align-self: center;
    }
  }
</style>
