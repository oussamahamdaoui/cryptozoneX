<script>
  import { getContext } from "svelte";
  const location = getContext("location");
  import Cart from "./Cart.svelte";
  import CurrencySelector from "./CurrencySelector.svelte";
  import LangSelector from "./GlobalLangSelector.svelte";
  import Logo from "./Logo.svelte";
  import Profile from "./Profile.svelte";
  import Link from "./Routing/Link.svelte";
  import SearchBox from "./SearchBox.svelte";
  let isOpen = false;
  $: selectedItem = $location.pathname;
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Explore shops",
      url: "/shops",
    },
    {
      name: "Best sellers",
      url: "/best-sellers",
    },
    {
      name: "Verified vendors",
      url: "/verified-vendors",
    },
    {
      name: "New products",
      url: "/new-products",
    },
  ];
  let linksEl;
  let element;
  const updateElement = () => {
    if (linksEl) {
      element = linksEl.contains(document.activeElement)
        ? document.activeElement
        : undefined;
    }
  };

  const navigate = (e) => {
    if (!element) return;
    if (e.key === "ArrowRight") {
      if (element.nextElementSibling) {
        element.nextElementSibling.focus();
      } else {
        element.parentNode.firstElementChild?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      if (element.previousElementSibling) {
        element.previousElementSibling.focus();
      } else {
        element.parentNode.lastElementChild?.focus();
      }
    }
  };
</script>

<svelte:body on:focusin={updateElement} />

<menu class:isOpen>
  <div class="top">
    <LangSelector />
    <CurrencySelector />
    <Logo />
    <Profile />
    <button class="hamburger" on:click={() => (isOpen = !isOpen)}>
      <i class={isOpen ? "ri-close-line" : "ri-menu-line"} />
    </button>
  </div>
  <div class="bottom">
    <SearchBox />
    <div class="links" bind:this={linksEl}>
      {#each links as link}
        <Link
          on:keydown={navigate}
          class={selectedItem === link.url ? "selected" : ""}
          href={link.url}>{link.name}</Link
        >
      {/each}
    </div>
    <LangSelector />
    <CurrencySelector />
    <Cart />
    <Profile />
  </div>
</menu>

<style lang="scss">
  @use "../../globals.scss";
  @media (min-width: 802px) {
    menu {
      display: flex;
      flex-direction: column;
      background-color: var(--primary-1);
    }
    .top,
    .bottom {
      display: flex;
      padding: 0 2rem;
    }
    .top {
      padding-top: 1rem;
      margin-bottom: 1rem;
      position: relative;
      height: 3rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      :global(.logo) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      :global(.currency-selector) {
        margin-right: auto;
        height: 30px;
      }
      :global(.lang-selector) {
        height: 30px;
      }
      :global(.profile) {
        margin-left: auto;
      }

      :global(.drop-down .value) {
        padding-left: 0.5rem !important;
      }
    }
    .bottom {
      padding-bottom: 1rem;
      display: flex;
      border-bottom: 1px solid var(--neutral-7);
      position: relative;
      align-items: center;
      :global(.currency-selector) {
        display: none !important;
      }
      :global(.lang-selector) {
        display: none !important;
      }
      :global(.search-box) {
        margin-right: 2rem;
      }
      :global(.cart) {
        margin-left: 2rem;
      }
      :global(.profile) {
        display: none !important;
      }
      .links {
        display: flex;
        font-weight: 600;
        gap: 1rem;
        :global(a) {
          font-size: min(1.3vw, 1rem);
          color: var(--neutral-11);
          min-width: max-content;
          &:hover {
            color: var(--neutral-12);
          }
          &:focus {
            color: var(--primary-12);
          }
        }
        :global(a.selected) {
          color: var(--neutral-12);
        }
      }
    }
    .hamburger {
      display: none;
    }
  }
  @media (min-width: 300px) and (max-width: 801px) {
    menu {
      padding: 1rem;
      display: flex;
      width: 100vw;
      background-color: var(--neutral-1);
      flex-direction: column;
      position: fixed;
      top: 0;
      z-index: 199;
      border-bottom: 1px solid var(--neutral-12);
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        :global(.lang-selector) {
          display: none !important;
        }
        :global(.currency-selector) {
          display: none !important;
        }
        :global(.profile) {
          display: none !important;
        }
      }
      .bottom {
        display: none;
        gap: 1rem;
        :global(.currency-selector > .selected) {
          padding: 1rem 0rem;
        }
        :global(.search-box .drop-down) {
          padding: 1rem 0rem;
          width: auto;
        }
      }
      &.isOpen {
        height: 100vh;
        overflow: hidden;
        top: 0;
        .bottom {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          margin-top: 1rem;
          .links {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            font-weight: 900;
            :global(a) {
              color: var(--neutral-11);
              &:hover {
                color: var(--neutral-12);
              }
            }
            :global(a.selected) {
              color: var(--neutral-12);
            }
          }
          :global(.cart) {
            margin-right: auto;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
        }
      }
      .hamburger {
        background-color: transparent;
        border: none;
        font-size: 2rem;
      }
    }
  }
</style>
