<script>
    import { t } from "../Stores/lang";
    import { theme } from "../Stores/theme";
    export let iconOnly = false;
    const select = () => {
        if ($theme === "light") {
            theme.set("dark");
        } else {
            theme.set("light");
        }
    };
    $: other = $theme === "dark" ? "light" : "dark";
</script>

<button on:click={select} class="theme-selector">
    <i class={other === "dark" ? "ri-moon-fill" : "ri-sun-fill"} />
    {#if !iconOnly}
        <span>{$t(`theme.${other}`)}</span>
    {/if}
</button>

<style lang="scss">
    .theme-selector {
        display: flex;
        padding: 0.5rem;
        gap: 0.5rem;
        align-items: center;
        background-color: transparent;
        color: var(--neutral-12);
        border: none;
        font-size: 1rem;
        padding: 0.5rem;
        border-radius: 3px;
        border: 1px solid transparent;
        &:hover {
            background-color: var(--neutral-3);
        }
    }
</style>
