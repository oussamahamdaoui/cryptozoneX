<script>
  export let checked = false;
  export let toggle = undefined;

  /**
   * @param {MouseEvent} e
   */
  const tgl = (e) => {
    e.preventDefault();
    if (toggle) {
      toggle(e);
    } else {
      checked = !checked;
    }
  };
</script>

<button class="check-box" on:click={tgl} class:checked>
  {#if checked}
    <i class="ri-check-fill"></i>
  {/if}
</button>

<style lang="scss">
  .check-box {
    background-color: var(--neutral-2);
    width: 1rem;
    height: 1rem;
    display: inline-flex;
    justify-content: center;
    border-radius: 2px;
    position: relative;
    border: 1px solid var(--neutral-7);
    font-weight: 900;
    background-color: var(--neutral-1);
    &.checked {
      background-color: var(--accent-3);
      color: var(--accent-10);
      border-color: var(--accent-7);
    }
    &:focus {
      border: 1px solid var(--accent-8);
      background-color: var(--accent-5);
      color: var(--accent-11);
    }
    i {
      position: absolute;
      font-size: 0.8rem;
      top: 1px;
      left: 0px;
    }
  }
</style>
