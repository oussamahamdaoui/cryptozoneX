<script>
  import { getUid, swap } from "../../../utils";
  import Drag from "../../../Components/Drag.svelte";
  import Input from "../../../Components/Input.svelte";
  import Draggable from "../../../Components/Draggable.svelte";
  import Media from "../../../Components/Media.svelte";

  let props = {
    variants: [],
  };

  const addVarient = () => {
    const id = getUid();
    props.variants.push({
      name: "",
      id,
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
  {#if props.variants.length === 0}
    <p class="empty">No images for this product</p>
  {/if}
  <Drag let:swap {onSwap}>
    {#each props.variants as varient (varient.id)}
      <Draggable {swap} let:dragger let:moving>
        <div class="wrap">
          <button use:dragger class:moving class="dragger">
            <i class="ri-draggable" />
          </button>
          <div class="inputs">
            <div class="wrap">
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
            </div>
          </div>

          <button class="remove-image" on:click={removeVarient(varient.id)}>
            <i class="ri-close-line" />
          </button>
          {#if showMedia[varient.id]}
            <Media
              limit={1}
              defaultPanel="gallery"
              bind:value={varient.image}
              on:submit={hideMedia(varient.id)}
            ></Media>
          {/if}
        </div>
      </Draggable>
    {/each}
  </Drag>
  <button class="addVarient" on:click={addVarient}>
    <i class="ri-add-line" />
    {`Add image`}
  </button>
</div>

<style lang="scss">
  .params {
    display: contents;
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }
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
      --bg: var(--neutral-2);
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
        padding: 0.2rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      :global(.input) {
        flex: 2;
      }
      :global(.input.price) {
        flex: 1;
      }
      button {
        background-color: transparent;
        border: none;
        color: var(--neutral-9);
        &.dragger {
          cursor: grab;
          &.moving {
            cursor: grabbing;
          }
        }
        &.remove-image {
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
