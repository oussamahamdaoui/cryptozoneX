<script>
  import DatePicker from "../Components/DatePicker.svelte";
  const props = {
    date: {
      type: "date",
    },
    range: {
      type: "range",
    },
  };
  let v = "date";
  const toggle = () => {
    v = v === "date" ? "range" : "date";
    console.log(props[v].value);
  };
</script>

<div>
  <DatePicker bind:value={props[v].value} bind:type={props[v].type}>
    <slot slot="label">hello</slot>
  </DatePicker>
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
