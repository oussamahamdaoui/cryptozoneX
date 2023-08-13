<script>
    let move = false;
    let sliderContent;
    export let valueX = 0.5;
    export let valueY = 0.5;
    export let min = 0;
    export let max = 1;
    $: posX = (valueX - min)/(max - min);
    $: posY = (valueY - min)/(max - min);


    const updatePos = (e)=>{
            if(e.touches){
                e.clientX = e.touches[0].clientX
                e.clientY = e.touches[0].clientY
            }
            const box = sliderContent.getBoundingClientRect();
            let pX = ((e.clientX - box.left)/box.width);
            let pY = ((e.clientY - box.top)/box.height);
            pX = Math.min(Math.max(0, pX), 1);
            pY = Math.min(Math.max(0, pY), 1);
            valueX = (max - min) * pX;
            valueY = (max - min) * pY;
            posX = pX;
            posY = pY;
            
    }

    const mousedown = ()=>{
        move = true;
    }
</script>

<svelte:window 
on:mousemove={(e)=> move && updatePos(e)}
on:touchmove={(e)=> move && updatePos(e)}
on:touchend={()=>move=false}
on:mouseup={()=>move=false}></svelte:window>
<div class="slider2d"
role="slider"
aria-valuenow={posX}
tabindex="0"
bind:this={sliderContent}
on:mousedown={(e)=>{ move = true; updatePos(e)}}
 style="--x:{posX};--y:{posY}">
    <slot name="bg"></slot>
    <slot name="dragger" {mousedown}>
        <button class="dragger" on:mousedown={mousedown}></button>
    </slot>
</div>

<style lang="scss">
    .slider2d{
        aspect-ratio: 2/1;
        width: 100%;
        position: relative;
        :global(.dragger){
            touch-action: none;
            position: absolute;
            transform: translate(-50%, -50%);
            left: calc(var(--x)*100%);
            top: calc(var(--y)*100%);
        }
    }
</style>