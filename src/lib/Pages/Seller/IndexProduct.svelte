<script>
  import SellerProduct from "./Components/SellerProduct.svelte";
</script>

<div class="seller-procucts">
  <div class="grid">
    {#each { length: 10 } as _, i}
      <SellerProduct id="some-product-id-{i.toString()}"></SellerProduct>
    {/each}
  </div>
</div>

<style lang="scss">
  .seller-procucts {
    padding: 0 2rem;
  }
  .grid {
    padding-top: 1rem;
    display: grid;
    overflow-y: auto;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
</style>
