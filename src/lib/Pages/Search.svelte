<script>
    import { location } from "../Stores/location";
    $:search = new URLSearchParams($location.search).get("q");
</script>
<div>
    {search}
</div>