<script>
  export let props;
</script>

{#if props.withHelper}
  <h2>{props.helperTitle}</h2>
  <p>{props.helperText}</p>
{/if}
