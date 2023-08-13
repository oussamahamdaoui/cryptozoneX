<script>
    /**
     * @type {{[key:string]:()=>void}}
     */
    export let actions;
    let cls ="";
    export {cls as class}
    let isOpen = false;
    /*** @type {HTMLElement}*/
    let oppener;
    /*** @type {HTMLElement}*/
    let options;
    const focusOut = (e) => {
        if (
            !oppener.contains(e.target) &&
            oppener !== e.target &&
            e instanceof MouseEvent
        ) {
            isOpen = false;
        } else if (e.key === "Escape") {
            isOpen = false;
        } else if (!options.contains(e.target) && e instanceof FocusEvent) {
            isOpen = false;
        } else if (
            e.key === "ArrowUp" &&
            options.contains(document.activeElement)
        ) {
            e.preventDefault();
            if (document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling["focus"]();
            } else {
                options.lastElementChild?.["focus"]();
            }
        } else if (
            e.key === "ArrowDown" &&
            (options.contains(document.activeElement) ||
                document.activeElement === oppener)
        ) {
            e.preventDefault();
            if (document.activeElement === oppener) {
                options.firstElementChild?.["focus"]();
            } else if (document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling["focus"]();
            } else {
                options.firstElementChild?.["focus"]();
            }
        }
    };
    /**
     * 
     * @param {keyof typeof actions} select
     */
    const action = (select) => ()=>{
        if(actions[select]){
            actions[select]();
        }
    };


</script>

<svelte:window
    on:click={focusOut}
    on:keydown={focusOut}
    on:focusin={focusOut}
/>
<div class="context-menu {cls}" class:open={isOpen}>
    <button
        class="selected"
        on:click={() => (isOpen = !isOpen)}
        bind:this={oppener}>
        <i class="ri-more-line" />
    </button>
    <div class="options" bind:this={options}>
        <slot {action} />
    </div>
</div>

<style lang="scss">
    @use "../../globals.scss";
    .context-menu {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
        &.open {
            z-index: 100;
            .options {
                display: flex;
            }
            i {
                transform: rotate(180deg);
            }
        }
        .selected {
            align-items: center;
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            border: none;
            padding: 0.5rem;
            height: 100%;
            i {
                font-size: 1.5rem;
            }
        }
        :global(.options > button){
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            border: none;
            padding: 0.5rem;
            min-width: max-content;
            &:focus,
            &:hover {
                background-color: var(--neutral-3);
            }
        }

        .options {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0%;
            display: none;
            background-color: var(--neutral-1);
            min-width: 100%;
            border: 1px solid var(--neutral-7);
            border-radius: 3px;
            max-height: 120px;
            overflow: auto;
            z-index: 99;
        }
    }
</style>
