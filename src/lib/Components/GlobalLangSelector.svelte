<script>
    import { lang, t, DEFAULT_LANG, SUPPORTED_LANGS } from "../Stores/lang";
    import DropDown from "./DropDown.svelte";
    let selected = $lang;
    lang.subscribe((e)=>{
        selected = e;
    });
    $:lang.set(selected);
</script>

<DropDown bind:value={selected} class="lang-selector">
    <slot slot="value" let:value>{$t(`language.${value}`)}</slot>
    <slot slot="options" let:change>
        {#each SUPPORTED_LANGS as lan}
            <button on:click={change(lan)}>{$t(`language.${lan}`)}</button>
        {/each}
    </slot>
</DropDown>

<style lang="scss">
    :global(.lang-selector .value){
        padding: 0.5rem;
        padding-right: 0rem !important;
    }
</style>
