<script>
    import { onMount } from "svelte";
    import { goTo, replaceState, location, popState } from "../Stores/location";
    import DropDown from "./DropDown.svelte";
    import { t } from "../Stores/lang";
    import { categories } from "../utils";
    const params = new URLSearchParams($location.search);
    let search = params.get("q") ?? "";
    let store = $location.pathname.startsWith('/s/')?
    $location.pathname.split('/')[2] : undefined;
    let categorie = params.get("c") ?? store ?? "all";
    

    let searched = false;
    let searchElem;
    onMount(()=>{
        if(search !== ""){
            searchElem?.focus();
        }
    });

    const close = ()=>{
        if(search.length === 0 && $location.pathname === "/search"){
            popState();
        }
    }
    const escape = (e)=>{
        if(e.key === "Escape"){
            search = "";
            close();
        }
    }
    $:{
        if ($location.pathname !== "/search" && search.length !== 0){
            goTo(`/search?q=${search}&c=${categorie}`);
            searched = true;
        } else if(search.length !== 0) {
            replaceState(`/search?q=${search}&c=${categorie}`);
            searched = true;
        }
    }
</script>

<svelte:document on:keydown={escape}></svelte:document>

<div class="search-box">
    <div class="input">
        <DropDown bind:value={categorie}>
            <slot slot="value" let:value>{$t(`categories.${value}`)}</slot>
            <slot slot="options" let:change>
                {#if store}
                    <button on:click={change(store)}>{store}</button>
                {/if}
                {#each categories as categorie}
                    <button on:click={change(categorie)}>
                        {$t(`categories.${categorie}`)}
                    </button>
                {/each}
            </slot>
        </DropDown>
        <input type="text"
        on:focusout={close}
        bind:value={search} 
        bind:this={searchElem} placeholder={$t("searchLabel")}>
        <button class="search" on:click={()=> {search = ""; close()}}>
            {#if search !== ""}
                <i class="ri-close-line"></i>
            {:else}
                <i class="ri-search-2-line"></i>
            {/if}
        </button>
    </div>
</div>

<style lang="scss">
    @use "../../globals.scss";
    .search-box{
        display: flex;
        flex-direction: column;
        width: 100%;
        :global(.drop-down){
            background-color: var(--primary-5);
            height: 100%;
            min-width: fit-content;
            width: 120px;
            border-radius: 4px 0px 0px 4px;
            &:hover{
                background-color: var(--primary-6);
            }
            &:focus-within{
                background-color: var(--primary-6);
            }
        }
        :global(.drop-down>.options){
            top:calc(100% + 0.5rem) !important;
            left: -1px;
            max-height: 300px;
            @include globals.hide-scrollbar;
        }
        :global(.drop-down:focus-within>.value){
            border: none !important;
        }
        :global(.drop-down .value){
            border: none !important;
            color: var(--primary-12);
        }
        .input{
            border:1px solid var(--primary-5);
            display: flex;
            align-items: center;
            color: var(--neutral-12);
            height: 45px;
            border-radius: 5px;
            &:focus-within{
                border: 1px solid var(--primary-8);
            }
            button.search{
                background-color: transparent;
                border: none;
                background-color: var(--primary-5);
                height: 100%;
                aspect-ratio: 1/1;
                border-radius: 0 4px 4px 0;
                &:hover{
                    background-color: var(--primary-6);
                }
            }
            input{
                border: none;
                outline: none;
                flex: 1;
                padding-left: 1rem;
                height: 100%;
                background-color: var(--neutral-1);
                color: var(--neutral-12);
            }
        }
    }
</style>