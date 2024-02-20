<script>
  import NestedSelector from "../Components/NestedSelector.svelte";
  const three = [
    { name: "color", children: [{ name: "red" }, { name: "green" }] },
    {
      name: "size",
      children: [{ name: "s" }, { name: "m" }, { name: "l" }, { name: "xl" }],
    },
    {
      name: "checkbox",
    },
  ];
</script>

<div>
  <NestedSelector children={three} name="Variations"></NestedSelector>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    gap: 1rem;
    // button {
    //   background-color: var(--neutral-1);
    // }
  }
</style>
