<script>
  import { getContext } from "svelte";
  import RadioGroup from "../../RadioGroup.svelte";
  import Price from "../../Price.svelte";
  export let options = [];
  const currency = getContext("currency");
</script>

<RadioGroup selected="" let:select let:selected>
  {#each options as { label, subtitle, id, addPrice }}
    <button class:selected={selected === id} on:click={select(id)}>
      <div class="wpr" class:fullWidth={!addPrice || !addPrice[$currency]}>
        <p class="title">{label}</p>
        {#if subtitle}
          <p class="subtitle">{subtitle}</p>
        {/if}
      </div>
      {#if addPrice && addPrice[$currency]}
        <Price currency={$currency} price={addPrice[$currency]} withSign
        ></Price>
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
    border: 1px solid var(--neutral-9);
    border-radius: 3px;
    background-color: var(--neutral-2);
    .wpr {
      display: flex;
      flex-direction: column;
      max-width: 50%;
      &.fullWidth {
        width: 100%;
        max-width: 100%;
        .subtitle,
        .title {
          text-align: center;
        }
      }
      .title {
        text-align: start;
        font-weight: bolder;
      }
      .subtitle {
        font-size: smaller;
        text-align: start;
        color: var(--neutral-10);
      }
    }

    &:focus {
      border-color: var(--primary-8);
    }
    &.selected {
      border-color: var(--primary-9);
    }
  }
</style>
