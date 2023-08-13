<script>
    export let sectionName;
    export let params;
    export let id;
    const load = async (sectionName) => {
        const comp = await import(`../Sections/${sectionName}/params.svelte`);
        return comp.default;
    };
    let comp = load(sectionName);
    $:{
        comp = load(sectionName);
    }
</script>

{#await comp then comp}
    <svelte:component this={comp} bind:params bind:id={id} />
{/await}
