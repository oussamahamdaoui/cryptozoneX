<script>
    import '../../app.scss';
    import 'remixicon/fonts/remixicon.css'
    import { onMount } from 'svelte';
    import { store } from '../Stores/lang';
    import TopMenu from './TopMenu.svelte';

    export let sections;
    export let params;
    onMount(()=>{
        store(params);
    })
    export const createComponent = async (section) => {
        const c = await import(
            `../components/Sections/${section.name}/index.svelte`
        );

        return {
            comp: c.default,
            id: section.id,
        };
    };
</script>
<TopMenu></TopMenu>
<div class="page">
{#each sections as section, i}
    {#await createComponent(section) then conponent}
        <svelte:component this={conponent.comp} id={conponent.id}></svelte:component>
    {/await}
{/each}
</div>
