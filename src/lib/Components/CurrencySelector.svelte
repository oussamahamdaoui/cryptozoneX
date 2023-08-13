<script>
    import { currency } from "../Stores/currency";
    import DropDown from "./DropDown.svelte";
    let value = "EUR";
    $:currency.set(value);
</script>
<DropDown bind:value={value} class="currency-selector">
    <slot slot="value" let:value>{value}</slot>
    <slot slot="options" let:change>
        <button on:click={change("EUR")}>EUR</button>
        <button on:click={change("USD")}>USD</button>
    </slot>
</DropDown>

<style lang="scss">
    @use "/src/globals.scss";
    :global(.currency-selector .value){
        padding: 0.5rem;
        padding-right: 0rem !important;
    }
</style>