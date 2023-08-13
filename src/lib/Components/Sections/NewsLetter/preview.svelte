<div class="preview">
    <div class="title"></div>
    <div class="subtitle"></div>
    <div class="button"></div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .preview{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:2%;
        background-color: var(--neutral-7);
        .title{
            width: 70%;
            height: 10%;
            background-color: var(--neutral-1);
        }
        .subtitle{
            width: 40%;
            height: 6%;
            background-color: var(--neutral-1);
        }

        .button{
            width: 15%;
            height: 10%;
            background-color: var(--neutral-1);
            margin-top: 2%;
        }
    }
</style>