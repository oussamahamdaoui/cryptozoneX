<script>
    import { getUid } from "../../../utils";
    import DropDown from "../../DropDown.svelte";
    import Section from "../../ParamTypes/Section.svelte";
    import Params from "../Params.svelte";
    import { sectionsMeta } from "../meta";
    export let params;
    export let id;

    $: params = params ?? {
        sections: [],
    };

    const add = () => {
        params.sections.push({
            id: getUid(),
            name: "Grid",
            params: undefined,
        });
        params = params;
    };
</script>

<Params {id} name="AB">
    {#each params.sections as section (section.id)}
        <div class="section">
            <DropDown bind:value={section.name}>
                <slot slot="label">Section type</slot>
                <slot slot="value" let:value>{value}</slot>
                <slot slot="options" let:change>
                    {#each sectionsMeta as section (section)}
                        <button on:click={change(section.name)}>
                            {section.name}
                        </button>
                    {/each}
                </slot>
            </DropDown>
            <Section
                bind:params={section.params}
                id={section.id}
                bind:sectionName={section.name}
            />
        </div>
    {/each}
    <button on:click={add} class="add-section">
        <i class="ri-add-line"></i>
        Add Section
    </button>
</Params>

<style lang="scss">
    .section {
        padding: 1rem;
        border: 1px solid var(--neutral-7);
        display: flex;
        gap: 1rem;
        flex-direction: column;
        border-radius: 3px;
        background-color: var(--neutral-3);
        --bg: var(--neutral-3);
        :global(.params) {
            --bg: var(--neutral-3);
        }
    }

    .add-section {
        background-color: var(--primary-3);
        border: 1px solid var(--primary-7);
        color: var(--primary-10);
        padding: 1rem;
        border-radius: 3px;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        &:hover{
            background-color: var(--primary-5);
            border: 1px solid var(--primary-8);
            color: var(--primary-10);
        }
    }
</style>
