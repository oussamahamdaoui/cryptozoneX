<script>
    import { t } from "../../../Stores/lang";
    export let id;
</script>

<div class="collections-section">
    <h1>{$t(`${id}.title`)}</h1>
    <div class="collections">
        {#each $t(`${id}.collections`) as collection}
            <button class="selected">{collection}</button>
        {/each}
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .collections-section {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        h1 {
            font-size: 4rem;
            margin-bottom: 0.5rem;
            text-align: center;
        }
        .collections {
            display: flex;
            justify-content: flex-start;
            padding-bottom: 3rem;
            gap: 1rem;
            border-bottom: 1px solid var(--neutral-7);
            width: 100%;
            overflow-x: auto;

            @include globals.hide-scrollbar;
            button {
                @include globals.button;
                background-color: transparent;
                font-size: 1.1rem;
                border-radius: 3px;
                min-width: max-content;
                &:first-of-type {
                    margin-left: auto;
                }
                &:last-of-type {
                    margin-right: auto;
                }
                &.selected {
                    background-color: var(--neutral-12);
                    color: var(--neutral-1);
                }
            }
        }
    }
    @media (min-width: 300px) and (max-width: 701px) {
        .collections-section {
            padding: 1rem;
            .collections {
                button {
                    font-size: 0.9rem;
                }
            }
        }
    }
</style>
