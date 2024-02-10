<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements.d.ts";
  type $$Props = HTMLImgAttributes;
  enum STATUS {
    LOADING,
    LOADED,
    ERROR,
  }
  let state: STATUS = STATUS.LOADING;
</script>

{#if [STATUS.LOADING, STATUS.LOADED].includes(state)}
  {#if state !== STATUS.LOADED}
    <slot name="loading">
      <i class="ri-loader-3-line loader"></i>
    </slot>
  {/if}
  <!-- svelte-ignore a11y-missing-attribute -->
  <img
    {...$$props}
    class:hide={state === STATUS.LOADING}
    on:load={() => {
      state = STATUS.LOADED;
    }}
    on:error={() => {
      state = STATUS.ERROR;
    }}
    loading="lazy"
  />
{:else}
  <slot name="error" />
{/if}

<style lang="scss">
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
  .hide {
    opacity: 0 !important;
    pointer-events: none !important;
  }
  img {
    opacity: 1;
  }
  .loader {
    display: inline-block;
    animation: rotate 1.5s linear infinite;
  }
</style>
