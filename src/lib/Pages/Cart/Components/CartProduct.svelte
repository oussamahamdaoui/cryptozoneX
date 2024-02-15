<script>
  import DropDown from "../../../Components/DropDown.svelte";
  import QtySelector from "../../../Components/QtySelector.svelte";
</script>

<div class="cart-product">
  <div class="preview">
    <div class="img"></div>
  </div>
  <div class="info">
    <div class="wrap">
      <div>
        <h1>$100.00</h1>
        <h2>Some product</h2>
      </div>
      <button class="bin">
        <i class="ri-delete-bin-line"></i>
      </button>
    </div>

    <div class="options">
      <QtySelector></QtySelector>
      <DropDown value="M">
        <slot slot="value" let:value>Size: {value}</slot>
        <slot slot="options" let:change>
          <button on:click={change("S")}>S</button>
          <button on:click={change("M")}>M</button>
          <button on:click={change("L")}>L</button>
          <button on:click={change("XL")}>XL</button>
          <button on:click={change("XXL")}>XXL</button>
        </slot>
      </DropDown>
      <DropDown value="yellow">
        <slot slot="value" let:value>Color: {value}</slot>
        <slot slot="options" let:change>
          <button on:click={change("yellow")}>yellow</button>
          <button on:click={change("red")}>red</button>
          <button on:click={change("green")}>green</button>
          <button on:click={change("blue")}>blue</button>
          <button on:click={change("black")}>black</button>
        </slot>
      </DropDown>
    </div>
  </div>
</div>

<style lang="scss">
  .cart-product {
    display: flex;
    gap: 1rem;
    width: 100%;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--neutral-7);
    :global(.drop-down .value) {
      padding: 0.5rem;
      padding-right: 0rem !important;
      height: unset;
      border: 1px solid transparent;
    }
    :global(.drop-down) {
      height: unset;
    }
    .preview {
      width: 120px;
      height: 120px;
      background-color: var(--neutral-4);
    }
    .bin {
      display: flex;
      background-color: transparent;
      outline: none;
      border: none;
      font-size: 1.2rem;
      color: var(--neutral-9);
    }
    .info {
      display: flex;
      flex-direction: column;
      flex: 1;
      .wrap {
        display: flex;
        justify-content: space-between;
      }
      h1 {
        font-size: 1.5rem;
      }
      h2 {
        font-size: 0.9rem;
        font-weight: 500;
      }
      .options {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
    }
  }
</style>
