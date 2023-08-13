<script>
    import { DEFAULT_LANG, SUPPORTED_LANGS, t } from "../../Stores/lang";
    import DropDown from "../DropDown.svelte";
    export let value = DEFAULT_LANG;
</script>

<div class="language-selector">
    <DropDown bind:value>
        <slot slot="label">
            Language
        </slot>
        <slot slot="value" let:value>
            {$t(`language.${value}`)}
        </slot>
        <slot slot="options" let:change>
            {#each SUPPORTED_LANGS as lang}
                <button on:click={change(lang)}>
                    {$t(`language.${lang}`)}
                </button>
            {/each}
        </slot>
    </DropDown>
</div>

<style lang="scss">
    .language-selector {
        display: contents;
        :global(.drop-down .value) {
            margin: 0;
        }
        :global(.drop-down .options){
            top:calc(0.5rem + 100%);
        }
        button{
            display: flex;
            justify-content: flex-start !important;
        }
    }
</style>
