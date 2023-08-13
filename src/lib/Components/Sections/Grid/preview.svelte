<div class="preview">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .preview{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        width: 100%;
        height: 100%;
        gap: 0.3vw;
        padding: 1rem;
        .cell{
            background-color: var(--neutral-7);
        }
    }
</style>