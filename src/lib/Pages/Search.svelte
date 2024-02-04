<script>
  import { getContext } from "svelte";
  const location = getContext("location");
  $: search = new URLSearchParams($location.search).get("q");
</script>

<div>
  {search}
</div>
