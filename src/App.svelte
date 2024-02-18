<script>
  import Route from "./lib/Components/Routing/Route.svelte";
  import Home from "./lib/Pages/Home.svelte";
  import "remixicon/fonts/remixicon.css";
  import TopMenu from "./lib/Components/TopMenu.svelte";
  import Login from "./lib/Pages/Login.svelte";
  import Search from "./lib/Pages/Search.svelte";

  import { user } from "./lib/Stores/user";
  import { newCurrencyStore } from "./lib/Stores/currency";
  import { newLangContext } from "./lib/Stores/lang";
  import { newLocationContext } from "./lib/Stores/location";

  import Seller from "./lib/Pages/Seller/index.svelte";

  import Footer from "./lib/Components/Footer.svelte";
  import Page404 from "./lib/Pages/Page404.svelte";
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

  const { currency, currencyData, exchangeRates } = newCurrencyStore();

  setContext("user", user);
  setContext("currency", currency);
  setContext("currencyData", currencyData);
  setContext("exchangeRates", exchangeRates);

  setContext("theme", theme);
  setContext("cart", cart);

  setContext("lang", lang);
  setContext("t", t);
  setContext("updateTranslation", updateTranslation);

  setContext("location", location);
  setContext("goTo", goTo);
  setContext("routed", routed);
  setContext("replaceState", replaceState);
  setContext("popState", popState);

  // GET /users user_path(:index)
  // GET /users/new user_path(:new)
  // GET /users/:id user_path(:show, user)
  // GET /users/:id/edit user_path(:edit, user)

  // POST /users user_path(:create, user)
  // PUT /users/:id user_path(:update, user)
  // DELETE /users/:id user_path(:delete, user)

  const STORE = /\/s\/[a-z-]{3,60}$/;
  const LOGIN = /\/(login|sign-up)/;
  const SEARCH = "/search";

  const HOME = "/";
  const PAGE_404 = /.*/;
  const PRODUCT = /\/p\/[a-z-]{3,60}$/;
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
    <Cart></Cart>
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
      <Seller></Seller>
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
