<script>
    import CheckBox from "../../CheckBox.svelte";
    import Input from "../../Input.svelte";

    export let props;
    $: props = props ?? {
        label: "",
        selectedByDefault: false,
    };
</script>

<Input bind:value={props.label}>
    <slot slot="label">{`Checkbox label`}</slot>
</Input>
<label>
    <CheckBox bind:checked={props.selectedByDefault} />
    <slot name="label">Selected by default</slot>
</label>

<style lang="scss">
</style>
