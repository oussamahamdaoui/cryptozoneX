<script>
  import Input from "../Input.svelte";
  export let value;
  export let label = "";
</script>

<Input bind:value class="title-param">
  <slot slot="label">{label}</slot>
</Input>
