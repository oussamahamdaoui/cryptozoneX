<script>
  export let selected = [];
  export let search = "";
  export let placeholder = "Select elements";
  export let max = Infinity;
  let isOpen = false;

  /**
   *
   * @param {string} v
   */
  const toggle = (v) => () => {
    if (selected.includes(v)) {
      selected = selected.filter((e) => e !== v);
    } else if (selected.length < max) {
      selected.push(v);
      selected = selected;
    }
  };
  let options;
  let oppener;
  let element;
  let empty = false;
  $: {
    search = search;
    setTimeout(() => {
      empty = options?.children.length === 1;
    }, 10);
  }

  const focusChange = () => {
    setTimeout(() => {
      if (!element) return;
      if (
        element.contains(document.activeElement) ||
        document.activeElement === element
      ) {
        isOpen = true;
      } else {
        isOpen = false;
      }
    }, 0);
  };

  const navigate = (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      isOpen = false;
    } else if (
      e.key === "ArrowUp" &&
      options.contains(document.activeElement)
    ) {
      e.preventDefault();
      if (document.activeElement.previousElementSibling) {
        document.activeElement.previousElementSibling["focus"]();
      } else {
        options.lastElementChild?.["focus"]();
      }
    } else if (
      e.key === "ArrowDown" &&
      (options.contains(document.activeElement) ||
        document.activeElement === oppener)
    ) {
      e.preventDefault();
      if (document.activeElement === oppener) {
        options.firstElementChild?.["focus"]();
      } else if (document.activeElement.nextElementSibling) {
        document.activeElement.nextElementSibling["focus"]();
      } else {
        options.firstElementChild?.["focus"]();
      }
    }
  };
</script>

<div
  class="multi-select"
  bind:this={element}
  tabindex="0"
  role="button"
  class:max={selected.length === max}
>
  <div class="label">
    <slot name="label" />
  </div>
  <div class="selected" bind:this={oppener}>
    {#if selected.length === 0}
      <div class="placeholder">{placeholder}</div>
    {:else}
      <slot name="selected" {selected} {toggle}>
        {#each selected as elem}
          <button on:mousedown={toggle(elem)}>
            {elem}
            <i class="ri-close-line" />
          </button>
        {/each}
      </slot>
    {/if}
  </div>
  {#if isOpen}
    <div class="options" bind:this={options}>
      <div class="search" class:empty>
        <slot name="search">
          <i class="ri-search-line" />
          <input type="text" bind:value={search} placeholder="Search..." />
        </slot>
      </div>
      <slot name="options" {selected} {toggle} {search} />
    </div>
  {/if}
</div>

<svelte:window
  on:focusin={focusChange}
  on:focusout={focusChange}
  on:keydown={navigate}
/>

<style lang="scss">
  @use "/src/globals.scss";
  .multi-select {
    display: flex;
    flex-direction: column;
    position: relative;
    outline: none;
    min-width: 0;

    &.max {
      :global(.options > button) {
        opacity: 0.5;
      }
      :global(.options > button.selected) {
        opacity: 1;
      }
    }

    &:focus-within {
      .selected {
        border: 1px solid var(--primary-8);
      }
      .label {
        color: var(--primary-8);
      }
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
    .selected {
      border: 1px solid var(--neutral-9);
      border-radius: 3px;
      height: 52px;
      display: flex;
      align-items: center;
      overflow-x: auto;
      padding-left: 0.5rem;
      color: var(--neutral-8);
      cursor: pointer;
      gap: 0.5em;
      @include globals.hide-scrollbar;

      .placeholder {
        margin-left: 0.5rem;
        font-size: 1rem;
      }

      :global(button) {
        color: var(--primary-11);
        background-color: var(--primary-3);
        border: 1px solid var(--primary-7);
        padding: 0.5rem;
        border-radius: 3px;
        font-size: 0.7rem;
        flex: 0 0 auto;
        &:focus,
        &:hover {
          color: var(--red-11);
          background-color: var(--red-3);
          border: 1px solid var(--red-7);
        }
      }
    }
    .options {
      display: flex;
      flex-direction: column;
      max-height: 200px;
      z-index: 10;
      position: absolute;
      overflow-y: auto;
      top: calc(100% + 0.5rem);
      background-color: var(--neutral-2);
      width: 100%;
      border: 1px solid var(--neutral-7);
      border-radius: 3px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      .search {
        display: flex;
        border-bottom: 1px solid var(--neutral-7);
        justify-content: center;
        align-items: center;
        color: var(--neutral-10);
        position: sticky;
        top: 0;
        background-color: var(--neutral-2);
        z-index: 2;
        &.empty {
          border-bottom: 1px solid transparent;
        }
        i {
          margin-left: 0.5rem;
        }
        input {
          flex: 1;
          height: 50px;
          padding-left: 1rem;
          border: none;
          outline: none;
          background-color: transparent;
          color: var(--neutral-12);
        }
      }
    }
    :global(.options > button) {
      display: flex;
      padding: 0.5rem;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      border: none;
      background-color: transparent;
      outline: none;
      &:hover {
        background-color: var(--neutral-3);
      }
    }
  }
</style>
