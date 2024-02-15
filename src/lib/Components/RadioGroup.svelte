<script>
  export let selected;
  const select = (v) => () => {
    selected = v;
  };
  let optionsEl;
  const keypress = (e) => {
    if (e.key === "ArrowUp" && optionsEl.contains(document.activeElement)) {
      e.preventDefault();
      if (document.activeElement.previousElementSibling) {
        document.activeElement.previousElementSibling["focus"]();
      } else {
        optionsEl.lastElementChild?.["focus"]();
      }
    } else if (
      e.key === "ArrowDown" &&
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

<svelte:window on:keydown={keypress} />

<div class="radio-group" bind:this={optionsEl}>
  <slot {selected} {select} />
</div>

<style lang="scss">
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
