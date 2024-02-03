<script>
    import CheckBox from "../CheckBox.svelte";
    import MultiSelect from "../MultiSelect.svelte";

    export let collections = [];
    const allCollections = [
        "Adidas",
        "Prada",
        "Dunlop",
        "Gucci",
        "read",
        "ckaks",
        "adsvkjl",
        "hk xiuasd",
    ];
</script>

<MultiSelect bind:selected={collections}>
    <slot slot="label">Collections</slot>
    <slot slot="options" let:selected let:toggle let:search>
        {#each allCollections as collection}
            {#if collection
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())}
                <button class="option" on:mousedown={toggle(collection)}>
                    <CheckBox
                        checked={selected.includes(collection)}
                        toggle={() => {}}
                    />
                    {collection}
                </button>
            {/if}
        {/each}
    </slot>
</MultiSelect>
