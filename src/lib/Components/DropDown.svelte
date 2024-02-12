<script>
  import { onMount } from "svelte";

  /*** @type {string}*/
  export let value;
  let cls = "";
  export { cls as class };
  let isOpen = false;
  /*** @type {HTMLElement}*/
  let oppener;
  /*** @type {HTMLElement}*/
  let options;
  /**@type {HTMLElement}*/
  let el;
  let doc;

  const focusOut = (e) => {
    if (
      !oppener.contains(e.target) &&
      oppener !== e.target &&
      e.type === "click"
    ) {
      isOpen = false;
    } else if (e.key === "Escape") {
      isOpen = false;
    } else if (!options.contains(e.target) && e instanceof FocusEvent) {
      isOpen = false;
    } else if (e.key === "ArrowUp" && options.contains(doc.activeElement)) {
      e.preventDefault();
      if (doc.activeElement.previousElementSibling) {
        doc.activeElement.previousElementSibling["focus"]();
      } else {
        options.lastElementChild?.["focus"]();
      }
    } else if (
      e.key === "ArrowDown" &&
      (options.contains(doc.activeElement) || doc.activeElement === oppener)
    ) {
      e.preventDefault();
      if (doc.activeElement === oppener) {
        options.firstElementChild?.["focus"]();
      } else if (doc.activeElement.nextElementSibling) {
        doc.activeElement.nextElementSibling["focus"]();
      } else {
        options.firstElementChild?.["focus"]();
      }
    }
  };
  const change = (select) => () => {
    value = select;
  };

  onMount(() => {
    doc = el.ownerDocument || document;
    doc.addEventListener("click", focusOut);
    doc.addEventListener("keydown", focusOut);
    doc.addEventListener("focusin", focusOut);
    return () => {
      doc.removeEventListener("click", focusOut);
      doc.removeEventListener("keydown", focusOut);
      doc.removeEventListener("focusin", focusOut);
    };
  });
  const toggleOpen = () => {
    if (options.children.length === 0) return;
    isOpen = !isOpen;
  };
</script>

<div class="drop-down {cls}" class:open={isOpen} bind:this={el}>
  <button class="value" on:click={toggleOpen} bind:this={oppener}>
    <slot name="value" {value} />
    <i class="ri-arrow-drop-down-line" />
  </button>
  <div class="options" bind:this={options}>
    <slot name="options" {change} {value} />
  </div>
  <div class="label">
    <slot name="label" />
  </div>
</div>

<style lang="scss">
  @use "../../globals.scss";
  .drop-down {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    height: 52px;
    &:focus-within {
      .value {
        border: 1px solid var(--primary-8);
      }
      .label {
        color: var(--primary-8);
      }
    }
    &.open {
      z-index: 100;
      .options {
        display: flex;
      }
      i {
        transform: rotate(180deg);
      }
    }
    .value {
      align-items: center;
      display: flex;
      justify-content: space-between;
      background-color: transparent;
      border: none;
      padding: 0.5rem;
      height: 100%;
      border-radius: 3px;
      min-width: 70px;
      border: 1px solid var(--neutral-9);
      padding-left: 1rem;
      i {
        font-size: 1.5rem;
        margin-left: auto;
      }
    }
    :global(.options > button) {
      display: flex;
      justify-content: space-between;
      background-color: transparent;
      border: none;
      padding: 0.5rem;
      min-width: max-content;
      border-radius: 3px;
      &:focus,
      &:hover {
        background-color: var(--neutral-3);
      }
    }

    .options {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: calc(100% + 0.5rem);
      display: none;
      padding: 0.5rem;
      background-color: var(--neutral-1);
      min-width: 100%;
      border: 1px solid var(--neutral-7);
      max-height: 120px;
      overflow: auto;
      z-index: 99;
      border-radius: 3px;
    }

    .label {
      position: absolute;
      font-size: 0.6rem;
      top: 0;
      left: 1rem;
      transform: translateY(-50%);
      background-color: var(--bg, var(--neutral-1));
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      color: var(--neutral-9);
    }
  }
</style>
