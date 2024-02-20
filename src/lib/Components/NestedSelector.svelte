<script>
  import CheckBox from "./CheckBox.svelte";

  export let name = "";
  export let children = [];
  export let indent = 0;
  export let selected = false;

  let open = indent !== 0;

  function toggleOpen(e) {
    open = !open;
  }

  const setNested = (e, v) => {
    if (Array.isArray(e)) {
      e.forEach((el) => {
        setNested(el, v);
      });
      e = e;
      return;
    }
    if (e.children) {
      setNested(e.children, v);
    }
    e.selected = v;
  };

  function selectAll(e) {
    selected = !selected;
    if (children && children.length > 0) {
      setNested(children, selected);
      children = children;
    }
  }

  function checkChildren(_) {
    if (children && children.length > 0) {
      const allSelected = children.reduce((acc, c) => {
        return c.selected && acc;
      }, true);
      selected = allSelected;
    }
  }

  let ctnr;

  const handleBlur = (e) => {
    if (indent !== 0) return;
    setTimeout(() => {
      if (!ctnr) return;
      if (
        ctnr.contains(document.activeElement) ||
        document.activeElement === ctnr
      ) {
        open = true;
      } else {
        open = false;
      }
    }, 10);
  };

  $: checkChildren(children);
</script>

<div
  class="wpr"
  class:main-item={indent === 0}
  style="--indent: {indent}"
  bind:this={ctnr}
>
  {#if indent === 0}
    <div
      tabindex="0"
      class="item"
      role="listbox"
      on:keydown={() => {}}
      class:has-children={children && children.length > 0}
    >
      <CheckBox bind:checked={selected} toggle={selectAll} />
      <span>{name}</span>
      <i class:ri-arrow-down-s-line={!open} class:ri-arrow-up-s-line={open}></i>
    </div>
    {#if open}
      <div class="content">
        {#each children || [] as child}
          <svelte:self
            name={child.name}
            children={child.children}
            bind:selected={child.selected}
            indent={indent + 1}
          />
        {/each}
      </div>
    {/if}
  {:else}
    {#if children && children.length > 0 && open}
      <div class="line"></div>
    {/if}
    <div
      tabindex="0"
      class="item"
      role="listbox"
      on:keydown={(e) => {
        if (e.key !== "Enter") return;
        if (children && children.length > 0) {
          toggleOpen(e);
        } else {
          selectAll(e);
        }
      }}
      on:click={children && children.length > 0 ? toggleOpen : selectAll}
      class:has-children={children && children.length > 0}
    >
      {#if children && children.length > 0}
        <i class:ri-arrow-down-s-fill={!open} class:ri-arrow-up-s-fill={open}
        ></i>
        <CheckBox bind:checked={selected} toggle={selectAll} />
        <span>{name}</span>
      {:else}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <CheckBox bind:checked={selected} toggle={selectAll} />
        <span>{name}</span>
      {/if}
    </div>
    {#if open}
      {#each children || [] as child}
        <svelte:self
          name={child.name}
          children={child.children}
          bind:selected={child.selected}
          indent={indent + 1}
        />
      {/each}
    {/if}
  {/if}
</div>

<svelte:window on:focusin={handleBlur} on:focusout={handleBlur} />

<style lang="scss">
  .wpr {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: flex-start;
    width: 100%;

    &.main-item {
      position: absolute;
      max-width: 200px;
      &:focus-within {
        & > .item.has-children {
          border: 1px solid var(--primary-8);
        }
      }
      & > .item.has-children {
        height: 52px;
        border: 1px solid var(--neutral-9);
        padding-right: 1rem;
        padding-left: 1rem;
        border-radius: 3px;
        i {
          margin-left: auto;
        }
        &:focus,
        &:hover {
          background-color: transparent;
        }
      }
      .content {
        position: absolute;
        top: calc(100% + 0.5rem);
        background-color: var(--neutral-3);
        border: 1px solid var(--neutral-7);
        width: 100%;
        border-radius: 3px;
        max-height: 200px;
        overflow: auto;
      }
    }
    .line {
      width: 1px;
      background-color: var(--neutral-7);
      height: calc(100% - 35px);
      position: absolute;
      left: calc(var(--indent) * 1rem);
      top: 35px;
      z-index: 1;
    }
    .item {
      cursor: pointer;
      user-select: none;
      display: flex;
      gap: 0.3rem;
      height: 35px;
      align-items: center;
      width: 100%;
      padding-left: calc(var(--indent) * 1rem + 0.5rem);
      outline: none;
      &.has-children {
        padding-left: calc(var(--indent) * 1rem - 0.5rem);
      }
      &:hover,
      &:focus {
        background-color: var(--neutral-2);
      }
      span {
        margin-left: 0.2rem;
      }
    }
  }
</style>
