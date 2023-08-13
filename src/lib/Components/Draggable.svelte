<script>
    export let swap = async (dir, e) => false;
    export let remove = () => {};
    let top = 0;
    /**
     * @type {HTMLElement}
     */
    let element;
    let moving = false;
    let previousTouch;
    let topH;
    let bottomH;
    let closed = false;

    const updateLimits = () => {
        if (element.previousElementSibling) {
            topH =
                element.previousElementSibling.getBoundingClientRect().height;
        } else {
            topH = null;
        }
        if (element.nextElementSibling) {
            bottomH = element.nextElementSibling.getBoundingClientRect().height;
        } else {
            bottomH = null;
        }
    };
    function onMouseDown(e) {
        moving = true;
        if (e?.touches?.[0]) {
            const touch = e.touches[0];
            previousTouch = touch;
        }
        updateLimits();
    }

    const onMouseMove = async (e) => {
        if (moving) {
            const dir = Math.sign(top + e.movementY);
            if (dir > 0 && bottomH === null) {
                top = 0;
                return;
            }
            if (dir < 0 && topH === null) {
                top = 0;
                return;
            }
            top += e.movementY;
            const limit = dir <= 0 ? topH : bottomH;
            if (limit && Math.abs(top) > limit) {
                let swaped;
                if (top > 0) {
                    swaped = await swap("down", element);
                } else {
                    swaped = await swap("up", element);
                }
                if (!swaped) {
                    moving = false;
                } else {
                    top = 0;
                    updateLimits();
                }
            }
        }
    };

    function touchMove(e) {
        const touch = e?.touches[0];
        if (previousTouch) {
            e.movementX = touch.pageX - previousTouch.pageX;
            e.movementY = touch.pageY - previousTouch.pageY;
            onMouseMove(e);
        }

        previousTouch = touch;
    }

    function onMouseUp() {
        if (moving) {
            moving = false;
            previousTouch = null;
            top = 0;
        }
    }
</script>

<div class="draggable" class:moving bind:this={element} style="top: {top}px;">
    <div class="top">
        <button class="dragger" on:mousedown={onMouseDown} on:touchstart={onMouseDown}>
            <i class="ri-draggable" />
        </button>
        <button class="close" on:click={() => closed = !closed}>
            <i class="{!closed ? "ri-contract-up-down-line" : "ri-expand-up-down-line"}"></i>
        </button>
        <button class="remove" on:click={remove}>
            <i class="ri-delete-bin-5-line" />
        </button>
    </div>
    <div class="content" class:closed>
        <slot />
    </div>
</div>

<svelte:window
    on:mouseup={onMouseUp}
    on:mousemove={onMouseMove}
    on:touchmove={touchMove}
    on:touchend={onMouseUp}
/>

<style lang="scss">
    @use "/src/globals.scss";
    .draggable {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--neutral-2);
        border: 1px solid var(--neutral-7);
        border-radius: 5px;
        margin-bottom: 1rem;
        .top {
            display: flex;
            border-radius: 5px 5px 0px 0px;
            overflow: hidden;
            border-bottom: 1px solid var(--neutral-7);
            button {
                user-select: none;
                touch-action: none;
                background-color: transparent;
                border: none;
                padding: 1rem;
                cursor: pointer;
                &.dragger{
                    cursor: grab;
                }
                &.remove {
                    color: var(--red-9);
                    &:hover {
                        color: var(--red-10);
                        background-color: var(--red-a3);
                    }
                }
                &:hover {
                    background-color: var(--neutral-3);
                }
            }
        }
        .content {
            padding: 1rem;
            flex: 1;
            &.closed{
                max-height: 3.5rem;
                overflow-y: hidden;
            }
        }
        &.moving {
            z-index: 99;
            .dragger {
                cursor: grabbing !important;
            }
        }
    }
</style>
