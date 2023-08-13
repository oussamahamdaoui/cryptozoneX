<script>
    export let selected;
    const select = (v)=>{
        selected = v;
    }
</script>
<div class="radio-group">
    <slot {selected} {select}></slot>
</div>

<style lang="scss">
    .radio-group{
        display: flex;
        flex-direction: column;
        gap:1rem;
    }
</style>