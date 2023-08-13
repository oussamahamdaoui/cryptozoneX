<script>
    import CheckBox from "../../Components/CheckBox.svelte";
    import ColorPicker from "../../Components/ColorPicker.svelte";
    import DatePicker from "../../Components/DatePicker.svelte";
    import Input from "../../Components/Input.svelte";
    import MultiSelect from "../../Components/MultiSelect.svelte";
    import LanguageSelector from "../../Components/ParamTypes/LanguageSelector.svelte";
    import SideMenu from "../../Components/SideMenu.svelte";
    import ToolTip from "../../Components/ToolTip.svelte";
    import { t } from "../../Stores/lang";
    import { categories as c } from "../../utils";
    let categories = c.filter(c=>c!=="all");
    let properties = [];

</script>
<div class="seller-products">
    <SideMenu></SideMenu>
    <div class="line"></div>
    <div class="content">
        <div class="params">
            <LanguageSelector></LanguageSelector>
            <Input>
                <slot slot="label">Product name</slot>
            </Input>
            <MultiSelect placeholder="Select categories" max={4}>
                <slot slot="selected" let:selected let:toggle>
                    {#each selected as categorie}
                        <button on:click={toggle(categorie)}>
                            {$t(`categories.${categorie}`)}
                            <i class="ri-close-line" />
                        </button>
                    {/each}
                </slot>
                <slot slot="label">Product Categories</slot>
                <slot slot="options" let:toggle let:selected let:search>
                    {#each categories as categorie}
                        {#if $t(`categories.${categorie}`).toLowerCase().includes(search.toLowerCase())}
                            <button on:click={toggle(categorie)} class:selected={selected.includes(categorie)}>
                                <CheckBox toggle={()=>{}} checked={selected.includes(categorie)}></CheckBox>
                                {$t(`categories.${categorie}`)}
                            </button>
                        {/if}
                    {/each}
                </slot>
            </MultiSelect>
            <div class="props-list">
                {#each properties as prop}
                    <svelte:component this="{prop}"></svelte:component>
                {/each}
                {#if properties.length === 0}
                    <div class="emptyProps">
                        No variations for this product
                    </div>
                {/if}
                <button class="button">
                    <i class="ri-add-line"></i>
                    Add a variation
                    <ToolTip text="Ex:color, size, lot size">
                        <i class="ri-information-line"></i>
                    </ToolTip>
                </button>
            </div>
            <ColorPicker></ColorPicker>
            <DatePicker></DatePicker>
        </div>
        <div class="preview"></div>
    </div>
</div>

<style lang="scss">
    .seller-products{
        display: flex;
        align-items: flex-start;
        flex: 1;
        width: 100%;
        .content{
            flex:1;
            display: flex;
        }
        .params{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex:3;
            padding: 0.5rem;
            .props-list{
                display: flex;
                flex-direction: column;
                border: 1px dashed var(--neutral-7);
                border-radius: 5px;
                padding: 0.5rem;
                .emptyProps{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--neutral-7);
                    padding: 1rem;
                }
            }
            .button{
                background-color: var(--primary-3);
                color: var(--primary-10);
                border:1px solid var(--primary-7);
                padding: 0.5rem;
                width: max-content;
                border-radius: 3px;
                align-self: center;
            }
        }

        .preview{
            flex:5;
        }
    }
</style>