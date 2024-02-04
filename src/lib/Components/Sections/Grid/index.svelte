<script>
  import { getContext } from "svelte";
  const t = getContext("t");
  export let id;
</script>

<div class="grid">
  {#if $t(`${id}.filters`)}
    <div class="cell blank">
      <h2>{$t(`${id}.title`)}</h2>
      <div class="categories">
        {#each $t(`${id}.filterBy`).slice(0, 2) as category}
          <a class="thiker" href="/">{category}</a>
        {/each}
        {#if $t(`${id}.filterBy`).slice(2).length > 0}
          <a class="thiker" href="/">See All</a>
        {/if}
      </div>
    </div>
  {/if}
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell blank">
    <a class="see-more" href="/">See more</a>
  </div>
</div>

<style lang="scss">
  @use "/src/globals.scss";
  .grid {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    margin-top: 2rem;
    .cell {
      background-color: var(--neutral-4);
      height: 450px;
      display: flex;
      flex-direction: column;
      &.blank {
        background-color: transparent;
      }
    }
    .categories {
      display: flex;
      flex-direction: column;
      margin-top: auto;
      gap: 1.5rem;
      margin-bottom: 2rem;
      font-weight: 700;
      .thiker {
        font-weight: 900;
      }
    }
    .see-more {
      margin-top: auto;
      border-bottom: 1px solid var(--neutral-7);
      text-align: right;
      font-weight: bold;
    }
    h2 {
      font-size: 2.6rem;
      text-transform: capitalize;
    }
  }
  @media (min-width: 900px) and (max-width: 1200px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (min-width: 600px) and (max-width: 901px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 300px) and (max-width: 601px) {
    .grid {
      grid-template-columns: 1fr;
      padding: 1rem;
      .cell {
        height: 450px;
        width: calc(100% - 0.5rem);
        h2 {
          text-align: center;
        }
      }
      .cell.blank {
        height: auto;
        .see-more {
          padding-bottom: 0.5rem;
        }
        .categories {
          flex-direction: row;
          margin-top: 1rem;
          overflow-x: auto;
          margin-bottom: 1rem;
          gap: 1rem;
          @include globals.hide-scrollbar;
          a {
            display: block;
            min-width: fit-content;
          }
        }
      }
    }
  }
</style>
