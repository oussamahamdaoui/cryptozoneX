<script>
    import Accordion from "./Accordion.svelte";
    import AccordionSection from "./AccordionSection.svelte";
    import { categories, sectionsMeta } from "./Sections/meta";
    const sectionComponents = Promise.all(
        sectionsMeta.map(async (e) => {
            const c = await import(`./Sections/${e.name}/preview.svelte`);
            return { component: c.default, name: e.name };
        })
    );
    
    export let addSection;
    const getSectionPreview = async (section) => {
        const c = await import(`./Sections/${section}/preview.svelte`);
        return c.default;
    };
   
</script>

<div class="sections">
    <div class="big-screen">
        <Accordion let:toggle let:opened>
            {#each categories as categorie}
                <AccordionSection name={categorie} toggle={toggle(categorie)} {opened}>
                    <slot slot="head" let:isOpen>
                        {categorie}
                        <i class={isOpen ? "ri-arrow-up-s-line": "ri-arrow-down-s-line"}/>
                    </slot>
                    <slot slot="content">
                        <div class="previews">
                            {#each sectionsMeta.filter( (e) => e.categories.includes(categorie) ) as section}
                                {#await getSectionPreview(section.name) then preview}
                                    <button on:click={addSection(section.name)}>
                                        <svelte:component this={preview} />
                                    </button>
                                {/await}
                            {/each}
                        </div>
                    </slot>
                </AccordionSection>
            {/each}
        </Accordion>
    </div>
    <div class="small-screen">
        {#await sectionComponents then sections}
            {#each sections as section}
                <button on:click={addSection(section.name)}>
                    <svelte:component this={section.component} />
                </button>
            {/each}
        {/await}
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .sections {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 1rem;
        .previews {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 1rem;
            padding-bottom: 1rem;
        }
        .big-screen {
            display: contents;
        }
        .small-screen {
            display: none;
        }
        button {
            background-color: transparent;
            border: 1px solid var(--neutral-7);
            width: 100%;
            aspect-ratio: 2/1;
            border-radius: 3px;
            overflow: hidden;
            &:hover{
                border:  1px solid var(--neutral-9);
            }
        }
    }
    @media (min-width: 300px) and (max-width: 1101px) {
        .sections {
            display: grid;
            width: 100%;
            grid-template-columns: 1fr 1fr 1fr 1fr;

            .small-screen {
                display: contents;
            }
            .big-screen {
                display: none;
            }
        }
    }
    @media (min-width: 300px) and (max-width: 901px) {
        .sections {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media (min-width: 300px) and (max-width: 651px) {
        .sections {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (min-width: 300px) and (max-width: 421px) {
        .sections {
            grid-template-columns: 1fr;
        }
    }
</style>
