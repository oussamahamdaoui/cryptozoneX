<script>
  import DropDown from "../../DropDown.svelte";
  export let options = [];
  export let label = "";
</script>

<DropDown value={options[0]?.id}>
  <slot slot="label">{label}</slot>
  <slot slot="value" let:value>
    {options.find((e) => e.id === value)?.label || ""}
  </slot>
  <slot slot="options" let:change>
    {#each options as { label, id }}
      <button on:click={change(id)}>{label}</button>
    {/each}
  </slot>
</DropDown>
