<script>
  let move = false;
  let sliderContent;
  export let value = 0.5;
  export let min = 0;
  export let max = 1;
  let step = 0.01;
  $: pos = (value - min) / (max - min);

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") {
      pos -= step;
      pos = Math.min(Math.max(0, pos), 1);
      value = pos;
    } else if (e.key === "ArrowRight") {
      pos += step;
      pos = Math.min(Math.max(0, pos), 1);
      value = pos;
    }
  };

  const updatePos = (e) => {
    if (e.touches) {
      e.clientX = e.touches[0].clientX;
    }
    const box = sliderContent.getBoundingClientRect();
    let p = (e.clientX - box.left) / box.width;
    p = Math.min(Math.max(0, p), 1);
    value = (max - min) * p;
    pos = p;
  };

  const mousedown = (e) => {
    e.preventDefault();
    move = true;
  };
</script>

<svelte:window
  on:mousemove={(e) => move && updatePos(e)}
  on:touchmove={(e) => move && updatePos(e)}
  on:touchend={() => (move = false)}
  on:mouseup={() => (move = false)}
/>
<div
  class="slider"
  role="slider"
  aria-valuenow={pos}
  tabindex="0"
  on:keydown={handleKey}
  on:mousedown={(e) => {
    move = true;
    updatePos(e);
  }}
  bind:this={sliderContent}
  style="--v:{pos}"
>
  <slot name="bg" />
  <slot name="dragger" {mousedown}>
    <button class="dragger" on:mousedown={mousedown}></button>
  </slot>
</div>

<style lang="scss">
  .slider {
    width: 100%;
    position: relative;
    outline: none;
    border: 1px solid transparent;
    :global(.dragger) {
      touch-action: none;
      position: absolute;
      top: 50%;
      transform: translate(calc(var(--v) * -100%), -50%);
      left: calc(var(--v) * 100%);
    }
  }
</style>
