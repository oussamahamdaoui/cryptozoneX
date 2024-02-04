<script>
  import { getContext } from "svelte";
  const goTo = getContext("goTo");

  let href = "#";
  let prevent = false;
  let cls = "";
  export { href, prevent, cls as class };
  const navigate = (e) => {
    e.preventDefault();
    if (prevent) return;
    goTo(href);
  };
</script>

<a {href} on:click={navigate} on:keydown class={cls}><slot /></a>

<style>
  a {
    all: unset;
    cursor: pointer;
  }
</style>
