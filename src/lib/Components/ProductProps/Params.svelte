<script>
  import { copy, eq } from "../../utils";
  import CheckBox from "../CheckBox.svelte";
  import DropDown from "../DropDown.svelte";
  import Input from "../Input.svelte";
  import { propTypes } from "./meta";
  export let prop;
  let type = prop.type;
  let prevPorp = copy(prop);
  export let update = () => {};
  $: {
    if (prevPorp.type !== prop.type) {
      prop.props = undefined;
      type = prop.type;
      prevPorp = copy(prop);
    } else if (!eq(prevPorp, prop)) {
      update();
      prevPorp = copy(prop);
    }
  }
</script>

<div class="variation-params">
  <slot name="head" />
  <Input bind:value={prop.name}>
    <slot slot="label">Variant title</slot>
  </Input>
  <DropDown bind:value={prop.type}>
    <slot slot="label">Varient type</slot>
    <slot slot="value" let:value>
      {value}
    </slot>
    <slot slot="options" let:change>
      {#each propTypes as { name }}
        <button on:click={change(name)}>{name}</button>
      {/each}
    </slot>
  </DropDown>
  {#await import(`../../Components/ProductProps/${type}/params.svelte`) then component}
    <svelte:component this={component.default} bind:props={prop.props} />
  {/await}
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>
    <CheckBox bind:checked={prop.withHelper} />
    Add helper text
  </label>
  {#if prop.withHelper}
    <Input bind:value={prop.helperTitle}>
      <slot slot="label">Title</slot>
    </Input>
    <Input bind:value={prop.helperText} type="textarea">
      <slot slot="label">Text</slot>
    </Input>
  {/if}
</div>

<style lang="scss">
  .variation-params {
    padding: 1rem 0.5rem;
    background-color: var(--neutral-2);
    border: 1px solid var(--neutral-7);
    border-top: none;
    display: flex;
    flex-direction: column;
    gap: 1em;
    border-radius: 0px 0px 3px 3px;
    margin-bottom: 1rem;
    --bg: var(--neutral-2);
    label {
      width: max-content;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
