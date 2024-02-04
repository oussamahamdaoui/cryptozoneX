<script>
  import { getContext } from "svelte";
  const cart = getContext("cart");
  import Link from "./Routing/Link.svelte";
</script>

<Link href="/cart">
  <button class="cart">
    <i class="ri-shopping-bag-2-line"></i>
    {#if $cart.items.length > 0}
      <div>{$cart.items.length}</div>
    {/if}
  </button>
</Link>

<style lang="scss">
  @use "../../globals.scss";
  button {
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 3px;
    position: relative;
    &:hover {
      background-color: var(--neutral-4);
    }
    i {
      font-size: 1.2rem;
    }
    div {
      width: 20px;
      height: 20px;
      position: absolute;
      font-size: 0.7rem !important;
      transform: translate(50%, 50%);
      background-color: var(--accent-4);
      color: var(--accent-10);
      border: 1px solid var(--accent-7);
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 0.8rem;
    }
  }
</style>
