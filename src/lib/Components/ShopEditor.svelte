<script>
    import Tabs from "./Tabs.svelte";
    import Tab from "./Tab.svelte";
    export let selected = "page";
</script>

<div class="shop-editor">
    <Tabs bind:selected={selected}>
        <slot slot="head" let:selected let:select let:navigate>
            <button on:click={select("page")} class:active={selected === "page"} on:keydown={navigate}>
                <i class="ri-layout-3-fill"></i>Editor
            </button>
            <button on:click={select("preview-large")} class:active={selected === "preview-large"} on:keydown={navigate}>
                <i class="ri-macbook-fill"></i>
            </button>
            <button on:click={select("preview-small")} class:active={selected === "preview-small"} on:keydown={navigate}>
                <i class="ri-smartphone-fill"></i>
            </button>
            <button on:click={select("parameters")} class:active={selected === "parameters"} on:keydown={navigate}>
                <i class="ri-settings-3-fill"></i>
                Parameters
            </button>
        </slot>
        <slot slot="tabs" let:selected>
            <div class="body">
                <Tab name="page" {selected}>
                    <slot name="sections"></slot>
                </Tab>
                <Tab name="preview-large"  {selected}>
                    <slot name="preview"></slot>
                </Tab>
                <Tab name="preview-small"  {selected}>
                    <slot name="preview"></slot>
                </Tab>
                <Tab name="parameters"  {selected}>
                </Tab>
            </div>
        </slot>
    </Tabs>
</div>
<style lang="scss">
    @use "../../globals.scss";
    .shop-editor{
        display: flex;
        flex-direction: column;
        :global(.tabs .head){
            z-index: 100 !important;
            position: relative;
        }
        :global(.tabs){
                flex:1;
                display: flex;
                flex-direction: column;
            }
        .body{
            display: flex;
            flex-direction: column;
            flex:1;
            :global(.tab){
                flex:1;
                display: flex;
                flex-direction: column;
            }
        }
        button{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: min(2.5vw, 1rem);
            gap:1rem;

        }
    }
</style>