<script>
    export let opened = [];
    export let toggle = ()=>{};
    export let name;
    let content;
    let element;
    $:isOpen = opened.includes(name);
    const navigate = (e)=>{
        if(e.key === "ArrowDown"){
            if(element.nextElementSibling){
                element.nextElementSibling.focus();
            } else {
                element.parentNode.firstElementChild?.focus();
            }
        } else if(e.key === "ArrowUp"){
            if(element.previousElementSibling){
                element.previousElementSibling.focus();
            } else {
                element.parentNode.lastElementChild?.focus();
            }
        }
    }
</script>

<label class="accordion-section" bind:this={element}>
    <button class="head" on:click={toggle} on:keydown={navigate}>
        <slot name="head" {isOpen} />
    </button>
    <div class="content" class:isOpen bind:this={content}>
        <slot name="content" />
    </div>
</label>

<style lang="scss">
    @use "/src/globals.scss";
    .accordion-section {
        border-bottom: 1px solid var(--neutral-7);
        &:hover{
            border-bottom: 1px solid var(--neutral-9);
        }
    }
    .head {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        text-transform: uppercase;
        justify-content: space-between;
        background-color: transparent;
        border: none;
        width: 100%;
        outline: none;
        padding: 1rem 0rem;
        font-weight: 900;
        color: var(--neutral-11);
        &:hover{
            color: var(--neutral-12);
        }

        &:focus{
            color: var(--neutral-12);
        }
    }
    .content {
        display: none;
        &.isOpen{
            display: flex;
        }
    }
</style>
