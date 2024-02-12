<script>
  import Route from "./lib/Components/Routing/Route.svelte";
  import Home from "./lib/Pages/Home.svelte";
  import "remixicon/fonts/remixicon.css";
  import SellerShop from "./lib/Pages/Seller/SellerShop.svelte";
  import TopMenu from "./lib/Components/TopMenu.svelte";
  import Login from "./lib/Pages/Login.svelte";
  import Search from "./lib/Pages/Search.svelte";

  import { user } from "./lib/Stores/user";
  import { currency } from "./lib/Stores/currency";
  import { newLangContext } from "./lib/Stores/lang";
  import { newLocationContext } from "./lib/Stores/location";

  import Footer from "./lib/Components/Footer.svelte";
  import SellerDashboard from "./lib/Pages/Seller/SellerDashboard.svelte";
  import Page404 from "./lib/Pages/Page404.svelte";
  import SellerProducts from "./lib/Pages/Seller/SellerProducts.svelte";
  import Cart from "./lib/Pages/Cart/index.svelte";
  import ProductPreview from "./lib/Components/ProductPreview.svelte";
  import Test from "./lib/Pages/Test.svelte";

  import { setContext } from "svelte";
  import { newThemeContext } from "./lib/Stores/theme";
  import { cart } from "./lib/Stores/cart";

  const { theme } = newThemeContext();
  const { t, lang, updateTranslation } = newLangContext();
  const { location, goTo, routed, popState, replaceState } =
    newLocationContext();

  setContext("user", user);
  setContext("currency", currency);
  setContext("theme", theme);
  setContext("cart", cart);

  setContext("t", t);
  setContext("lang", lang);
  setContext("updateTranslation", updateTranslation);

  setContext("location", location);
  setContext("goTo", goTo);
  setContext("routed", routed);
  setContext("replaceState", replaceState);
  setContext("popState", popState);

  const STORE = /\/s\/[a-z-]{1,10}$/;
  const LOGIN = /\/(login|sign-up)/;
  const SEARCH = "/search";
  const SHOP_DASHBOARD = "/my-shop";
  const SELLER_DASHBOARD = "/dashboard";
  const HOME = "/";
  const PAGE_404 = /.*/;
  const SELLER_PRODUCTS = "/products";
  const CART = "/cart";
  const PRODUCT = /\/p\/[a-z-]{5,10}$/;
</script>

<main>
  <div class="page">
    <Route pathname={STORE}>
      <TopMenu />
      <Home />
    </Route>
    <Route pathname={HOME}>
      <TopMenu />
      <Home />
    </Route>
    <Route pathname={SEARCH}>
      <TopMenu />
      <Search />
    </Route>
    <Route pathname={CART}>
      <TopMenu />
      <Cart />
    </Route>
    <Route pathname={PRODUCT}>
      <TopMenu />
      <ProductPreview />
    </Route>
    {#if !$user}
      <Route pathname={LOGIN}>
        <Login />
        <Footer />
      </Route>
    {:else}
      <Route pathname={SHOP_DASHBOARD}>
        <TopMenu />
        <SellerShop />
      </Route>
      <Route pathname={SELLER_DASHBOARD}>
        <TopMenu />
        <SellerDashboard />
      </Route>
      <Route pathname={SELLER_PRODUCTS}>
        <TopMenu />
        <SellerProducts />
      </Route>
    {/if}
    <Route pathname={"/test"}>
      <TopMenu />
      <Test />
    </Route>
    <Route pathname={PAGE_404} is404>
      <TopMenu />
      <Page404 />
    </Route>
  </div>
</main>

<style lang="scss"></style>
