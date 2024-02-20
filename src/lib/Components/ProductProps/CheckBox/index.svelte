<script>
  import CheckBox from "../../CheckBox.svelte";
  export let label;
  export let selectedByDefault;
  export let value = selectedByDefault;
</script>

<label>
  <CheckBox bind:checked={value} />
  <slot>{label}</slot>
</label>

<style lang="scss">
  label {
    margin-top: 1rem;
  }
</style>
