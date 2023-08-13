<script>
    export let selected;
    /**
     * @type {HTMLElement}
     */
    let head;
    const select = (name) => () => {
        selected = name;
    };
    let element;
    
    const updateElement = ()=>{
        if(head){
            element = (head.contains(document.activeElement) ? document.activeElement : undefined)
        }
    };

    const navigate = (e)=>{
        if(!element) return;
        if(e.key === "ArrowRight"){
            if(element.nextElementSibling){
                element.nextElementSibling.focus();
            } else {
                element.parentNode.firstElementChild?.focus();
            }
        } else if(e.key === "ArrowLeft"){
            if(element.previousElementSibling){
                element.previousElementSibling.focus();
            } else {
                element.parentNode.lastElementChild?.focus();
            }
        }
    }
</script>

<svelte:body on:focusin={updateElement}></svelte:body>
<div class="tabs">
    <div class="head" bind:this={head}>
        <slot name="head" {selected} {select} {navigate} />
    </div>
    <div class="tabs">
        <slot name="tabs" {selected} />
    </div>
</div>

<style lang="scss">
    @use "../../globals.scss";
    .tabs {
        display: flex;
        flex-direction: column;
        .head {
            display: flex;
            gap: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--neutral-7);
        }
        :global(.head > button) {
            background-color: transparent;
            border: none;
            position: relative;
            color: var(--neutral-11);
            padding: 0.5rem;
            border-radius: 3px;
            &:hover{
                background-color: var(--neutral-4);
            }
            &:focus{
                background-color: var(--neutral-4);
            }
            &::after {
                content: "";
                position: absolute;
                top: calc(100% + 0.5rem);
                width: 100%;
                height: 1px;
                left: 0;
            }
        }
        :global(.head > button.active){
            color: var(--neutral-12);
            background-color: var(--neutral-4);
            &::after {
                background-color: var(--primary-11);
            }
            
        }
    }
</style>
