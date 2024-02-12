<script>
  import RadioGroup from "../../RadioGroup.svelte";
  export let options = [];
  $: hasPrice = options.some((e) => parseInt(e.addPrice) !== 0);
</script>

<RadioGroup selected="" let:select let:selected>
  {#each options as { label, id, addPrice }}
    <button class:selected={selected === id} on:click={select(id)}>
      <p class="title">{label}</p>
      {#if hasPrice}
        <span>{addPrice}</span>
      {/if}
    </button>
  {/each}
</RadioGroup>

<style lang="scss">
  button {
    display: flex;
    flex: 1;
    background-color: transparent;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 2px solid var(--neutral-9);
    border-radius: 3px;
    .title {
      max-width: 50%;
      text-align: justify;
      font-weight: bolder;
    }
    &:focus {
      border-color: var(--primary-8);
    }
    &.selected {
      border-color: var(--primary-9);
    }
  }
</style>
