<script>
    import { onMount } from "svelte";

    let text = "";
    let visible = false;
    let x = 0;
    let y = 0;
    let self;
    let timout;
    export { text };
    export let timeoutShow = 100;
    let pos = "bottom-center";
    let content;



    $: visible &&
        (() => {
            const box = self.children[1].getBoundingClientRect();
            const contentBox = content.getBoundingClientRect();
            let yPos = "bottom";
            let xPos = "center";
            y = box.top;
            x = box.left + box.width / 2;
            if(x+contentBox.width/2 > document.body.clientWidth){
                xPos = "left";
            }
            if(x-contentBox.width/2 < 0){
                xPos = "right";
            }
            if(y + box.height + contentBox.height > window.innerHeight){
                yPos = "top";
            }
            pos = `${yPos}-${xPos}`
        })();

    const hideTooltip = () => {
        clearTimeout(timout);
        visible = false;
    };
    const showTooltip = () => {
        timout = setTimeout(() => {
            visible = true;
        }, timeoutShow);
    };

    onMount(() => {
        const sc =  () =>{
            visible = false;
        };
        document.addEventListener("scroll", sc, true);
        return () => {
            document.removeEventListener("scroll", sc);
        };
    });
</script>

<div class="tool-tip"
    style="--x:{x};--y:{y}"
    bind:this={self}
    on:mouseenter={showTooltip}
    on:mouseleave={hideTooltip}
    role="tooltip">
    <div class="tool-tip-content {pos}" class:visible bind:this={content}>
        <slot name="content">
            <div class="text">{text}</div>
        </slot>
    </div>
    <slot />
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .tool-tip {
        display: contents;
        z-index: 100;
        cursor: pointer;
    }

    .tool-tip-content {
        &.bottom-right{
            transform: translate(0%, 60%);
        }
        &.bottom-left{
            transform: translate(-100%, 60%);
        }
        &.bottom-center{
            transform: translate(-50%, 60%);
        }
        &.top-right{
            transform: translate(0%, -110%);
        }
        &.top-left{
            transform: translate(-100%, -110%);
        }
        &.top-center{
            transform: translate(-50%, -110%);
        }
        position: fixed;
        left: calc(var(--x) * 1px);
        top: calc(var(--y) * 1px);
        pointer-events: none;
        opacity: 0;
        background-color: var(--neutral-1);
        color: var(--slate12);
        padding: 0.5rem ;
        border-radius: 3px;
        border: 1px solid var(--neutral-7);
        font-size: 12px;
        z-index: 100;
        div {
            cursor: pointer;
            max-width: 200px;
            width: max-content;
            // white-space: nowrap;
        }
        &.visible {
            opacity: 1;
            z-index: 100;
        }
    }
</style>
