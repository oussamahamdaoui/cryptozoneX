<script>
    export let selected = false;
    export let name;
</script>
{#if selected === name}
<div class="tab">
    <slot></slot>
</div>
{/if}