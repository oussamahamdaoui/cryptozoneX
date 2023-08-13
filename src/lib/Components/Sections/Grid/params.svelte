<script>
    import Boolean from "../../ParamTypes/Boolean.svelte";
    import CollectionList from "../../ParamTypes/CollectionList.svelte";
    import Title from "../../ParamTypes/Title.svelte";
    import Params from "../Params.svelte";
    export let params;
    export let id;
    $: params = params ?? {
            title:"",
            filters:false,
            filterBy:[],
        }
</script>
<Params {id}>
    <Boolean bind:value={params.filters}>
        With filters
    </Boolean>
    {#if params.filters}
        <Title bind:value={params.title} label="Title"/>
        <CollectionList bind:collections={params.filterBy} />
    {/if}
</Params>
