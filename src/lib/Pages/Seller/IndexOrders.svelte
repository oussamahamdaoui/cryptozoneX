<script>
  import Tabs from "../../Components/Tabs.svelte";
  import SellerOrder from "./Components/SellerOrder.svelte";
  import Tab from "../../Components/Tab.svelte";
</script>

<div class="seller-orders">
  <Tabs selected="pending">
    <slot slot="head" let:selected let:select>
      <button
        on:click={select("pending")}
        class:active={selected === "pending"}
      >
        <sapn>Pending Orders</sapn>
        <span class="tag">5</span>
      </button>
      <button
        on:click={select("pending-refund")}
        class:active={selected === "pending-refund"}>Pending Refunds</button
      >
      <button
        on:click={select("completed")}
        class:active={selected === "completed"}>Completed</button
      >
      <button
        on:click={select("canceled")}
        class:active={selected === "canceled"}>Canceled</button
      >
    </slot>
    <slot slot="tabs" let:selected>
      <div class="body">
        <Tab name="pending" {selected}>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
          <SellerOrder></SellerOrder>
        </Tab>
        <Tab name="completed" {selected}>
          <h2 class="emptyTab">Nothing to see here</h2>
        </Tab>
        <Tab name="canceled" {selected}>
          <h2 class="emptyTab">Nothing to see here</h2>
        </Tab>
        <Tab name="pending-refund" {selected}>
          <h2 class="emptyTab">Nothing to see here</h2>
        </Tab>
      </div>
    </slot>
  </Tabs>
</div>

<style lang="scss">
  .seller-orders {
    // padding: 2rem;
    .tag {
      background-color: var(--red-5);
      color: var(--red-11);
      padding: 0.2rem 0.9rem;
      border-radius: 50px;
      font-size: smaller;
      font-weight: 600;
    }
    .emptyTab {
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--neutral-8);
    }
    button {
      display: flex;
      align-items: flex-start;
      font-size: min(2.5vw, 1rem);
      gap: 0.5rem;
    }
  }
</style>
