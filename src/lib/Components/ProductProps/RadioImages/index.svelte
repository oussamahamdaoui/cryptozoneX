<script>
  export let variants = [];
  export let label = "Color:";
  let cls = "";
  export { cls as class };
  let selected = variants[0]?.name;
  let hovered = "";
  let select = (s) => {
    selected = s;
  };
  let optionsEl;
  const keypress = (e) => {
    if (e.key === "ArrowLeft" && optionsEl.contains(document.activeElement)) {
      e.preventDefault();
      if (document.activeElement.previousElementSibling) {
        document.activeElement.previousElementSibling["focus"]();
      } else {
        optionsEl.lastElementChild?.["focus"]();
      }
    } else if (
      e.key === "ArrowRight" &&
      optionsEl.contains(document.activeElement)
    ) {
      e.preventDefault();
      if (document.activeElement.nextElementSibling) {
        document.activeElement.nextElementSibling["focus"]();
      } else {
        optionsEl.firstElementChild?.["focus"]();
      }
    }
  };
</script>

<svelte:window on:keyup={keypress} />

<div class="radio-selector {cls}">
  <div class="selected">
    {label} <span>{hovered || (selected ? selected : "")}</span>
  </div>
  <div class="radios" bind:this={optionsEl}>
    {#each variants as option}
      <button
        class="radio"
        class:isSelected={option.name === selected}
        class:defaultColor={!option.color}
        style="--color:{option.color}"
        on:click={() => select(option.name)}
        on:mouseover={() => {
          hovered = option.name;
        }}
        on:mouseout={() => {
          hovered = "";
        }}
        on:focus={() => {
          hovered = option.name;
        }}
        on:blur={() => {
          hovered = "";
        }}
      >
        {#if option.image}
          <img src={option.image.src} alt={label} />
        {:else}
          <i class="ri-file-image-line"></i>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  .radio-selector {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .radios {
    display: flex;
    gap: 0.5rem;
  }
  .radio {
    background-color: var(--color);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--neutral-1);
    border: 2px solid var(--neutral-7);
    outline: none;
    font-size: 0.5rem;
    overflow: hidden;
    &.defaultColor {
      background-color: var(--neutral-2);
      color: var(--neutral-12);
      border: 1px solid var(--neutral-7);
    }
    &:focus,
    &:hover {
      border: 2px solid var(--primary-8);
    }
    &.isSelected {
      border: 2px solid var(--primary-9);
      font-weight: 900;
      &.defaultColor {
        color: var(--primary-12);
        background-color: var(--primary-2);
      }
    }
    i {
      font-weight: 900;
      font-size: 1rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .selected {
    color: var(--neutral-11);
    font-size: 0.8rem;
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
    min-height: 1.5rem;
    span {
      color: var(--neutral-12);
      font-weight: 600;
      font-size: 1rem;
    }
  }
</style>
