<script>
    /*** @type {string}*/
    export let value;
    let cls = "";
    export { cls as class };
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
    const change = (select) => () => {
        value = select;
    };
</script>

<svelte:window
    on:click={focusOut}
    on:keydown={focusOut}
    on:focusin={focusOut}
/>
<div class="drop-down {cls}" class:open={isOpen}>
    <button class="value"
        on:click={() => (isOpen = !isOpen)}
        bind:this={oppener}>
        <slot name="value" {value} />
        <i class="ri-arrow-drop-down-line" />
    </button>
    <div class="options" bind:this={options}>
        <slot name="options" {change} {value} />
    </div>
    <div class="label">
        <slot name="label"></slot>
    </div>
</div>

<style lang="scss">
    @use "../../globals.scss";
    .drop-down {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
        height: 52px;
        &:focus-within {
            .value{
                border:1px solid var(--primary-8);
            }
            .label{
                color: var(--primary-8);
            }
        }
        &.open {
            z-index: 100;
            .options {
                display: flex;
            }
            i {
                transform: rotate(180deg);
            }
        }
        .value {
            align-items: center;
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            border: none;
            padding: 0.5rem;
            height: 100%;
            border-radius: 3px;
            min-width: 70px;
            border: 1px solid var(--neutral-9);
            padding-left: 1rem;
            i {
                font-size: 1.5rem;
            }
        }
        :global(.options > button) {
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            border: none;
            padding: 0.5rem;
            min-width: max-content;
            border-radius: 3px;
            &:focus,
            &:hover {
                background-color: var(--neutral-3);
            }
        }

        .options {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: calc(100% + 0.5rem);
            display: none;
            background-color: var(--neutral-1);
            min-width: 100%;
            border: 1px solid var(--neutral-7);
            max-height: 120px;
            overflow: auto;
            z-index: 99;
            border-radius: 3px;
        }

        .label{
            position: absolute;
            font-size: 0.6rem;
            top:0;
            left:1rem;
            transform: translateY(-50%);
            background-color: var(--bg, var(--neutral-1));
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            color: var(--neutral-9);
        }
    }
</style>
