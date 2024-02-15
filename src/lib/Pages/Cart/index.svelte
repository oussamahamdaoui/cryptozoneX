<script>
  import Route from "../../Components/Routing/Route.svelte";
  import TopMenu from "../../Components/TopMenu.svelte";
  import ShowCart from "./ShowCart.svelte";

  const CART = "/cart";
</script>

<Route pathname={CART}>
  <TopMenu></TopMenu>
  <ShowCart />
</Route>
