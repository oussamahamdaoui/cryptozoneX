<script>
    import SideMenu from "../../Components/SideMenu.svelte";
    import ShopEditor from "../../Components/ShopEditor.svelte";
    import SectionSelector from "../../Components/SectionSelector.svelte";
    import Draggable from "../../Components/Draggable.svelte";
    import Drag from "../../Components/Drag.svelte";
    import DropDown from "../../Components/DropDown.svelte";
    import PreviewApp from "../../Components/PreviewApp.svelte";
    import LanguageSelector from "../../Components/ParamTypes/LanguageSelector.svelte";
    import ToolTip from "../../Components/ToolTip.svelte";
    import { SUPPORTED_LANGS, DEFAULT_LANG } from "../../Stores/lang";
    import { getUid } from "../../utils";
    import { onMount } from "svelte";

    let selectedTab;
    let lang = DEFAULT_LANG;
    let selectedPage = "Home";
    let sectionParams = {
        [selectedPage]: [],
    };
    $: previewWidth = selectedTab === "preview-small" ? "375px" : "100%";
    let sections = sectionParams[selectedPage].map((e) => ({
        name: e.name,
        id: e.id,
    }));
    let params = {
        [selectedPage]: SUPPORTED_LANGS.reduce((acc, l) => {
            acc[l] = {};
            return acc;
        }, {}),
    };

    export const createParam = async (section) => {
        const c = await import(
            `../../components/Sections/${section}/params.svelte`
        );
        return c.default;
    };

    const addSection = async (section) => {
        if(selectedTab !== "page"){
            selectedTab = "page";
        }
        const paramsComp = await createParam(section);
        const id = getUid();
        sectionParams[selectedPage].push({
            comp: paramsComp,
            id,
            name: section,
        });
        sectionParams = sectionParams;
    };

    const removeSection = (id) => () => {
        sectionParams[selectedPage] = sectionParams[selectedPage].filter(
            (e) => {
                return e.id !== id;
            }
        );
        SUPPORTED_LANGS.forEach((k) => {
            if (params[selectedPage][k][id]) {
                delete params[selectedPage][k][id];
            }
        });
        params = params;
    };

    const swap = (arr, idxA, idxB) => {
        [arr[idxA], arr[idxB]] = [arr[idxB], arr[idxA]];
    };
    const onSwap = async (idxA, idxB) => {
        swap(sectionParams[selectedPage], idxA, idxB);
        sectionParams = sectionParams;
    };

    /**
     * @type {HTMLIFrameElement}
     */
    let iframe;
    let iframeLoaded = true;
    /**@type {MutationObserver} */
    

    onMount(()=>{
        const observer = new MutationObserver(()=>{
            if(iframe){
                iframe.contentWindow.document.head.replaceWith(
                    document.head.cloneNode(true)
                );
            }
        });
        observer.observe(document.head, { attributes: true, childList: true, subtree: true });
        return ()=>{
            observer.disconnect();
        }
    })
    $: {
        sectionParams[selectedPage] = sectionParams[selectedPage] ?? [];
        sections = sectionParams[selectedPage].map((e) => ({
            name: e.name,
            id: e.id,
        }));
        params[selectedPage] =
            params[selectedPage] ??
            SUPPORTED_LANGS.reduce((acc, l) => {
                acc[l] = {};
                return acc;
            }, {});
        if (iframe) {
            iframe.contentWindow.document.body.innerHTML = "";
            iframe.contentWindow.document.head.replaceWith(
                    document.head.cloneNode(true)
                );
            new PreviewApp({
                target: iframe.contentWindow.document.body,
                props: {
                    sections,
                    params: params[selectedPage],
                },
            });
        }
    }
</script>

<div class="seller-shop">
    <SideMenu />
    <div class="line" />
    <div class="body">
        <div class="parameters">
            <div class="head">
                <DropDown bind:value={selectedPage}>
                    <slot slot="label">Page</slot>
                    <slot slot="value" let:value>{value}</slot>
                    <slot slot="options" let:change>
                        <button on:click={change("Home")}>Home</button>
                        <button on:click={change("Page 1")}>Page 1</button>
                        <button on:click={change("Page 2")}>Page 2</button>
                        <button on:click={change("Page 3")}>Page 3</button>
                    </slot>
                </DropDown>
                <div class="wrap">
                    <LanguageSelector bind:value={lang} />
                    <ToolTip text="Helper text">
                        <i class="ri-information-line" />
                    </ToolTip>
                </div>
                <h2>Sections</h2>
            </div>
            <SectionSelector {addSection} />
        </div>
        <div class="line" />
        <div class="editor">
            <ShopEditor bind:selected={selectedTab}>
                <slot slot="sections">
                    {#if sectionParams[selectedPage].length === 0}
                        <h2>This page is empty</h2>
                    {/if}
                    <Drag let:swap {onSwap}>
                        {#each sectionParams[selectedPage] as component (component.id)}
                            <Draggable {swap} remove={removeSection(component.id)}>
                                <svelte:component
                                    this={component.comp}
                                    id={component.id}
                                    bind:params={params[selectedPage][lang][
                                        component.id
                                    ]}/>
                            </Draggable>
                        {/each}
                    </Drag>
                </slot>
                <slot slot="preview">
                    <iframe
                        style="--width:{previewWidth}"
                        bind:this={iframe}
                        class:loaded={iframeLoaded}
                        title="Preview"
                    />
                </slot>
            </ShopEditor>
        </div>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .seller-shop {
        display: flex;
        align-items: flex-start;
        flex: 1;
        .wrap {
            display: flex;
            align-items: center;
            margin-top: 1rem;
            i {
                margin-left: 1rem;
                margin-right: 1rem;
                cursor: pointer;
            }
            :global(.drop-down) {
                flex: 1;
            }
        }
        :global(.shop-editor .head) {
            background-color: var(--neutral-1);
            z-index: 9;
            position: sticky;
            top: 0rem;
            padding-top: 1rem;
        }
        :global(.drop-down .value) {
            min-width: 100%;
        }

      
        .line {
            width: 1px;
            align-self: stretch;
            background-color: var(--neutral-7);
            margin-left: -1px;
        }
        .body {
            padding-left: 1rem;
            padding-right: 2rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            flex: 1;
            max-width: 100%;
            align-self: stretch;
        }
        .parameters {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
            overflow-y: auto;
            max-height: calc(100vh - 1rem);
            position: sticky;
            top: 0rem;
            z-index: 10;
            padding-top: 1rem;
            @include globals.hide-scrollbar;

            h2 {
                font-size: 1rem;
                margin-bottom: 1rem;
                margin-top: 1rem;
            }
            .head {
                display: flex;
                flex-direction: column;
                width: 100%;
            }
        }
        iframe {
            width: var(--width);
            height: 100%;
            margin: auto;
            flex: 1;
            border: 2px solid var(--neutral-9);
            margin-top: 2rem;
            opacity: 0;
            &.loaded{
                opacity: 1;
            }
        }
        .editor {
            margin-top: 2rem;
            flex: 3;
            display: flex;
            flex-direction: column;
            align-self: stretch;
            h2 {
                align-self: center;
                margin-top: auto;
                margin-bottom: auto;
                color: var(--neutral-8);
            }
        }
        :global(.shop-editor) {
            flex: 1;
        }
    }
    @media (min-width: 300px) and (max-width: 1100px) {
        .seller-shop {
            :global(.shop-editor) {
                min-height: 100vh;
            }
            .body {
                flex-direction: column;
                width: 70px;
                .editor {
                    width: 100%;
                }
                .parameters {
                    width: 100%;
                    position: relative;
                    align-items: flex-start;
                    gap: 2rem;
                    overflow-y: visible;
                    max-height: unset;
                }
            }
        }
    }
    @media (min-width: 300px) and (max-width: 650px) {
        .seller-shop {
            .body {
                .parameters {
                    width: 100%;
                    flex-direction: column;
                }
            }
        }
    }
    @media (min-width: 300px) and (max-width: 561px) {
        .body {
            padding-left: 2rem !important;
        }
    }
    @media (min-width: 300px) and (max-width: 801px) {
        :global(.shop-editor .head) {
            top: 4rem !important;
        }
    }
</style>
