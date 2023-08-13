<script>
    import CollectionList from "../../ParamTypes/CollectionList.svelte";
    import Title from "../../ParamTypes/Title.svelte";
    import Params from "../Params.svelte";
    export let params;
    export let id;


    $: params = params ?? {
        title: "",
        collections: [],
    };
</script>
<Params id={id} name="Collection">
    <Title bind:value={params.title} label="Title"/>
    <CollectionList bind:collections={params.collections} />
</Params>
