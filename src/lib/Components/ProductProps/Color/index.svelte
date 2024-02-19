<script>
  import { getContext } from "svelte";
  import Price from "../../Price.svelte";

  export let colors = [];
  export let label = "Color:";
  export let withCheck = true;
  let cls = "";
  export { cls as class };
  let selected = colors[0]?.name;
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
  /**
   *
   * @param {string} rbga
   */
  const inverse = (rbga) => {
    const rgb = rbga
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((e) => parseInt(e));
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[0] + 0.0722 * rgb[0];
    return luminance < 140 ? "#ffffff" : "#000000";
  };

  const showSelectedHovered = (..._) => {
    return hovered || (selected ? selected : "");
  };

  const currency = getContext("currency");

  $: opt = colors.find((e) => e.name === hovered || e.name === selected);
</script>

<svelte:window on:keyup={keypress} />

<div class="radio-selector {cls}">
  <div class="selected">
    {label} <span>{showSelectedHovered(hovered, selected)}</span>
    {#if opt && opt.addPrice[$currency]}
      <Price price={opt.addPrice[$currency]} withSign></Price>
    {/if}
  </div>
  <div class="radios" bind:this={optionsEl}>
    {#each colors as option}
      <button
        class="radio"
        class:isSelected={option.name === selected}
        class:with-check={withCheck}
        class:defaultColor={!option.color}
        style="--color:{option.color}; --fg:{inverse(option.color)}"
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
        {#if option.name === selected && withCheck}
          <i class="ri-check-line" />
        {:else if !withCheck}
          <span>{option.name}</span>
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
    width: 30px;
    height: 30px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--neutral-1);
    border: 2px solid var(--neutral-7);
    outline: none;
    font-size: 0.5rem;
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
      color: var(--fg);
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
