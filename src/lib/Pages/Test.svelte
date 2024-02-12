<script>
  import ColorPicker from "../Components/ColorPicker.svelte";
  let color = "rgba(255, 0, 0, 1)";
</script>

<div>
  <ColorPicker bind:value={color}></ColorPicker>
  <button on:click={() => (color = "rgba(0, 255, 0, 1)")}>Set color</button>
</div>

<style lang="scss">
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
