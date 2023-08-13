<div class="preview">
    <div class="title"></div>
    <div class="buttons">
        <div class="button"></div>
        <div class="button"></div>
        <div class="button"></div>
        <div class="button"></div>
        <div class="button"></div>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .preview{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:6%;

        .title{
            width: 70%;
            height: 10%;
            background-color: var(--neutral-7);
        }
        .buttons{
            display: flex;
            justify-content: center;
            gap:2%;
            width: 100%;
            height: 10%;
            .button{
                height: 100%;
                width: 10%;
                background-color: var(--neutral-7);
            }
        }
    }
</style>