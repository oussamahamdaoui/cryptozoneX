<script>
    import CheckBox from "../CheckBox.svelte";
    export let value;
</script>
<label>
    <CheckBox bind:checked={value}></CheckBox>
    <slot></slot>
</label>

<style lang="scss">
    label{
        width: max-content;
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: baseline;
        gap:0.5rem;
    }
</style>