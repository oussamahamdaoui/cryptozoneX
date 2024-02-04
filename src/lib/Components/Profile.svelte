<script>
  import Link from "./Routing/Link.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import { getContext } from "svelte";
  const t = getContext("t");
  const user = getContext("user");
  const goTo = getContext("goTo");
  let isOpen = false;
  let timeout;
  const openMenu = () => {
    isOpen = true;
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  const logOut = () => {
    user.set(null);
    goTo("/");
  };
  const closeMenu = () => {
    timeout = setTimeout(() => {
      isOpen = false;
    }, 500);
  };
</script>

<div
  class="profile"
  on:mouseenter={openMenu}
  on:mouseleave={closeMenu}
  role="tooltip"
>
  {#if $user}
    <button>
      <i class="ri-user-3-fill" />
      <span>{$t("greeting.name", { name: $user.name })}</span>
    </button>
    <div class="profileMenu" class:isOpen>
      <Link href="/my-shop">
        <i class="ri-store-fill" />
        My shop
      </Link>
      <Link href="/">
        <i class="ri-shopping-bag-3-fill" />
        Shopping
      </Link>
      <ThemeSelector />
      <button on:click={logOut}>
        <i class="ri-logout-box-fill" />
        Log out
      </button>
    </div>
  {:else}
    <div class="flex">
      <Link href="/login">
        <i class="ri-user-3-fill" />
        <span>{$t("login.login")}</span>
      </Link>
      <ThemeSelector iconOnly />
    </div>
  {/if}
</div>

<style lang="scss">
  @use "/src/globals.scss";
  .profile {
    position: relative;
    cursor: pointer;
    z-index: 199;
    &:hover {
      button {
        color: var(--neutral-12);
      }
    }
    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      :global(a) {
        padding: 0.5rem;
        border-radius: 3px;
        padding-right: 1rem;
        border: 1px solid transparent;

        &:hover {
          border: 1px solid var(--primary-8);
          background-color: var(--primary-4);
        }
      }
    }
    button {
      background-color: transparent;
      border: none;
      text-transform: capitalize;
      font-size: 1rem;
      padding: 0.5rem;
      border-radius: 3px;
      color: var(--neutral-12);
    }
    i {
      margin-right: 0.5rem;
    }
    .profileMenu {
      flex-direction: column;
      position: absolute;
      background-color: var(--neutral-1);
      border: 1px solid var(--neutral-7);
      border-radius: 3px;
      z-index: 1;
      right: 0px;
      width: 100%;
      top: calc(100% + 0rem);
      font-size: 1rem;
      display: none;
      &.isOpen {
        display: flex;
      }
      :global(a) {
        padding: 0.5rem 0.5rem;
        color: var(--neutral-12);
        &:hover {
          background-color: var(--neutral-3);
        }
      }
      button {
        display: flex;
        font-size: 1rem;
        padding: 0.5rem 0.5rem;
        margin: 0;
        color: var(--neutral-12);
        &:hover {
          background-color: var(--neutral-3);
        }
      }
    }
  }
</style>
