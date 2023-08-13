<div class="preview">
    <div class="head">
        <div class="title"></div>
        <div class="p"></div>
        <div class="buttons"></div>
    </div>
    <div class="slide">
        <div class="img"></div>
        <div class="title"></div>
    </div>
    <div class="slide">
        <div class="img"></div>
        <div class="title"></div>
    </div>
    <div class="slide">
        <div class="img"></div>
        <div class="title"></div>
    </div>
    <div class="slide">
        <div class="img"></div>
        <div class="title"></div>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .preview {
        display: flex;
        width: 100%;
        height: 100%;
        gap:2%;
        padding: 2%;
        flex-wrap: wrap;
        .head{
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1%;
            .title{
                height: 70%;
                width: 25%;
                background-color: var(--neutral-7);
            }

            .p{
                height: 100%;
                width: 40%;
                background-color: var(--neutral-7);
            }
            .buttons{
                width: 10%;
                height: 70%;
                background-color: var(--neutral-7);
            }
        }
        .slide{
            flex:1;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap:2%;
            .img{
                background-color: var(--neutral-7);
                height: 70%;
            }
            .title{
                background-color: var(--neutral-7);
                width: 70%;
                height: 5%;
            }
        }
    }
</style>
