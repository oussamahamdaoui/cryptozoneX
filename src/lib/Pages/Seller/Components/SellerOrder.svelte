<script>
  import ContextMenu from "../../../Components/ContextMenu.svelte";
  import Price from "../../../Components/Price.svelte";
  export let status = "online";
</script>

<div class="seller-order">
  <div class="cell flex">
    <div class="clientImg {status}"></div>
    <div>
      <div class="label">Client</div>
      <div class="name">Oussama Hamdaoui</div>
    </div>
  </div>
  <div class="cell">
    <div class="label">Total</div>
    <Price></Price>
  </div>
  <div class="cell date">
    <div class="label">Deadline</div>
    <div class="date">13 December 2023</div>
  </div>
  <div class="cell address">
    <div class="label">Address</div>
    <div class="country">France</div>
  </div>
  <div class="cell small">
    <ContextMenu
      actions={{
        accept: () => {},
        cancel: () => {},
      }}
      let:action
    >
      <button on:click={action("accept")}>Accept Order</button>
      <button on:click={action("cancel")}>Cancel & Refund</button>
    </ContextMenu>
  </div>
</div>

<style lang="scss">
  @use "../../../../globals.scss";
  .seller-order {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--neutral-7);
    border-radius: 5px;
    margin-top: 1rem;
    flex-wrap: wrap;
    cursor: pointer;
    &:hover {
      background-color: var(--neutral-2);
    }
    .clientImg {
      min-width: 35px;
      min-height: 35px;
      background-color: var(--neutral-4);
      border-radius: 35px;
      margin-right: 1rem;
      position: relative;
      border: 1px solid var(--neutral-8);
      &::after {
        content: "";
        width: 8px;
        height: 8px;
        position: absolute;
        right: 0px;
        top: 70%;
        border-radius: 8px;
      }
      &.offline::after {
        background-color: var(--red-10);
      }
      &.online::after {
        background-color: var(--orange-10);
      }
    }
    .more-info {
      margin-left: auto;
      height: 100%;
      background-color: transparent;
      border: none;
      font-size: 1.2rem;
      margin-left: 0.2rem;
    }
    .cell {
      flex: 1;
      align-items: center;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      position: relative;
      &.small {
        max-width: max-content;
      }
      .label {
        font-weight: 400;
        font-size: 0.5rem;
        color: var(--neutral-9);
      }
    }
    .flex {
      flex-direction: row;
    }
    .context-menu {
      position: absolute;
      width: 150px;
      flex-direction: column;
      top: 100%;
      right: 0;
      background-color: var(--neutral-1);
      padding: 0.5rem;
      border: 1px solid var(--neutral-7);
      display: none;
      &.open {
        display: flex;
      }
    }
  }
  @media (min-width: 300px) and (max-width: 500px) {
    .seller-order {
      .date {
        display: none;
      }
    }
  }
  @media (min-width: 300px) and (max-width: 901px) {
    .seller-order {
      .address {
        display: none;
      }
    }
  }
</style>
