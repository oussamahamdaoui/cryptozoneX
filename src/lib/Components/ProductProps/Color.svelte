<script>
    import CheckBox from "../CheckBox.svelte";
    import ColorPicker from "../ColorPicker.svelte";
    import Input from "../Input.svelte";
    export let colors = [];
    let dualColors = false;
</script>
<Input>
    <slot slot="label">Name</slot>
</Input>
<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
    <CheckBox bind:checked={dualColors}></CheckBox>
    Use dual color
</label>
{#each colors as color}
    <Input bind:value={color.name}>
        <slot slot="label">Name</slot>
    </Input>
    <ColorPicker></ColorPicker>
    {#if dualColors}
        <ColorPicker></ColorPicker>
    {/if}
{/each}
<button class="addColor"></button>
