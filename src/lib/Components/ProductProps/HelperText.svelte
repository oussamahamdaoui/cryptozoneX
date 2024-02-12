<script>
  export let props;
</script>

{#if props.withHelper}
  {#if props.helperTitle !== ""}
    <h2>{props.helperTitle}</h2>
  {/if}
  {#if props.helperText !== ""}
    <p>{props.helperText}</p>
  {/if}
{/if}

<style lang="scss">
  h2 {
    font-size: 1.5rem;
  }
</style>
