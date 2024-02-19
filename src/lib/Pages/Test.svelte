<script>
  import Input from "../Components/Input.svelte";
  const props = {
    b: {},
    a: {},
  };
  let v = "a";
  const toggle = () => {
    v = v === "a" ? "b" : "a";
  };
</script>

<div>
  <Input type="diff" bind:value={props[v].value}></Input>
  <button on:click={toggle}>Toggle</button>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    gap: 1rem;
    button {
      background-color: var(--neutral-1);
    }
  }
</style>
