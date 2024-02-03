<script>
    import CheckBox from "../../Components/CheckBox.svelte";
    import Input from "../../Components/Input.svelte";
    import MultiSelect from "../../Components/MultiSelect.svelte";
    import LanguageSelector from "../../Components/ParamTypes/LanguageSelector.svelte";
    import SideMenu from "../../Components/SideMenu.svelte";
    import ToolTip from "../../Components/ToolTip.svelte";
    import Params from "../../Components/ProductProps/Params.svelte";
    import { t, store } from "../../Stores/lang";
    import { categories as c, getUid, swap } from "../../utils";
    import Draggable from "../../Components/Draggable.svelte";
    import Drag from "../../Components/Drag.svelte";
    import ProductPreview from "../../Components/ProductPreview.svelte";
    import CurrencySelector from "../../Components/CurrencySelector.svelte";
    import Link from "../../Components/Routing/Link.svelte";
    let categories = c.filter((c) => c !== "all");
    let properties = {};
    let language;

    $: properties[language] = properties[language] ?? {
        productName: "",
        productPrice: "",
        variations: [],
    };

    const swapVariants = (a, b) => {
        swap(properties[language].variations, a, b);
        properties = properties;
    };

    const addVariation = () => {
        properties[language].variations.push({
            id: getUid(),
            type: "Color",
        });
        properties = properties;
    };

    const updateVariation = (i) => () => {
        properties[language].variations[i] = properties[language].variations[i];
    };

    $: {
        store({
            [language]: {
                products: {
                    preview: properties[language],
                },
            },
        });
    }
</script>

<div class="seller-products">
    <SideMenu />
    <div class="line" />
    <div class="content">
        <div class="params">
            <LanguageSelector bind:value={language} />
            <Input bind:value={properties[language].productName}>
                <slot slot="label">Product name</slot>
            </Input>
            <div class="wrap">
                <Input bind:value={properties[language].productPrice}>
                    <slot slot="label">Product price</slot>
                </Input>
                <CurrencySelector global={false}>
                    <slot slot="label">Currency</slot>
                </CurrencySelector>
                <ToolTip timoutHide={500}>
                    <i class="ri-information-line" />
                    <slot slot="content">
                        Prices for the other currencies are calculated
                        automaticly<br />
                        Set your exchange rates
                        <Link href="/exchange-rates">here</Link>
                    </slot>
                </ToolTip>
            </div>
            <MultiSelect placeholder="Select categories" max={10}>
                <slot slot="selected" let:selected let:toggle>
                    {#each selected as categorie}
                        <button on:mousedown={toggle(categorie)}>
                            {$t(`categories.${categorie}`)}
                            <i class="ri-close-line" />
                        </button>
                    {/each}
                </slot>
                <slot slot="label">Product Categories</slot>
                <slot slot="options" let:toggle let:selected let:search>
                    {#each categories as categorie}
                        {#if $t(`categories.${categorie}`)
                            .toLowerCase()
                            .includes(search.toLowerCase())}
                            <button
                                on:click={toggle(categorie)}
                                class:selected={selected.includes(categorie)}
                            >
                                <CheckBox
                                    toggle={() => {}}
                                    checked={selected.includes(categorie)}
                                />
                                {$t(`categories.${categorie}`)}
                            </button>
                        {/if}
                    {/each}
                </slot>
            </MultiSelect>
            <h3>Product Variations</h3>
            <div class="props-list">
                <Drag let:swap onSwap={swapVariants}
                    >{#each properties[language].variations as prop, i (prop.id)}
                        <Draggable {swap} let:dragger let:moving>
                            {prop.id}
                            <button use:dragger class:moving>+</button>
                            <Params {prop} update={updateVariation(i)} />
                        </Draggable>
                    {/each}</Drag
                >
                {#if properties[language].variations.length === 0}
                    <div class="emptyProps">No variations for this product</div>
                {/if}
                <button class="button" on:click={addVariation}>
                    <i class="ri-add-line" />
                    Add a variation
                    <ToolTip text="Ex:color, size, lot size">
                        <i class="ri-information-line" />
                    </ToolTip>
                </button>
            </div>
        </div>
        <div class="preview">
            <ProductPreview id="preview" locale={language} />
        </div>
    </div>
</div>

<style lang="scss">
    .seller-products {
        display: flex;
        align-items: flex-start;
        flex: 1;
        width: 100%;
        .content {
            flex: 1;
            display: flex;
        }
        .params {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex: 2;
            padding: 0.5rem;
            .props-list {
                display: flex;
                flex-direction: column;
                border: 1px dashed var(--neutral-7);
                border-radius: 5px;
                padding: 0.5rem;
                gap: 1rem;
                .emptyProps {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--neutral-7);
                    padding: 1rem;
                }
            }
            .button {
                background-color: var(--primary-3);
                color: var(--primary-10);
                border: 1px solid var(--primary-7);
                padding: 0.5rem;
                width: max-content;
                border-radius: 3px;
                align-self: center;
            }
        }

        .wrap {
            display: flex;
            gap: 1rem;
            align-items: center;
            :global(.input) {
                flex: 1;
            }
            :global(.tool-tip-content a) {
                color: var(--primary-10);
                text-decoration: underline;
            }
        }

        .preview {
            flex: 5;
        }
    }
</style>
