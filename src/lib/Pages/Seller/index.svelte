<script>
  import Route from "../../Components/Routing/Route.svelte";
  import TopMenu from "../../Components/TopMenu.svelte";
  import ShowShop from "./ShowShop.svelte";
  import ShowDashboard from "./ShowDashboard.svelte";
  import EditNewProduct from "./EditNewProduct.svelte";
  import IndexProduct from "./IndexProduct.svelte";

  const SHOW_SHOP = "/my-shop";
  const SELLER_DASHBOARD = "/dashboard";
  const EDIT_NEW_PRODUCT = /products\/(new|([a-z-0-9]{3,60})\/edit)$/;
  const INDEX_PRODUCT = /products$/;
</script>

<Route pathname={SHOW_SHOP}>
  <TopMenu />
  <ShowShop />
</Route>
<Route pathname={SELLER_DASHBOARD}>
  <TopMenu />
  <ShowDashboard />
</Route>
<Route pathname={EDIT_NEW_PRODUCT}>
  <TopMenu />
  <EditNewProduct />
</Route>
<Route pathname={INDEX_PRODUCT}>
  <TopMenu></TopMenu>
  <IndexProduct></IndexProduct>
</Route>
