<script>
    import { tick } from "svelte";
    /**
     * @type {(idxA:number, idxB:number)=>void}
     */
    export let onSwap;

    /**
     * @param {"up"|"down"} dir
     * @param {HTMLElement} e
     */
    const swap = async (dir, e)=>{
        if(dir === "up"){
            if(e.previousElementSibling){
                const idx = Array.from(e.parentNode.children).indexOf(e);
                // e.parentNode.insertBefore(e, e.previousElementSibling);
                onSwap(idx, idx - 1);
                await tick();
                return true;
            }
        } else {
            if(e.nextElementSibling){
                const idx = Array.from(e.parentNode.children).indexOf(e);
                // e.parentNode.insertBefore(e.nextElementSibling, e);
                onSwap(idx, idx + 1);
                await tick();
                return true;
            }
        }
        return false;
    }
</script>
<div class="drag">
    <slot {swap}></slot>
</div>

<style lang="scss">
    .drag{
        position: relative;
    }
</style>