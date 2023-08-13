<div class="preview">
    <div class="left">

    </div>
    <div class="right">
        <div class="title"></div>
        <div class="p"></div>
        <div class="p"></div>
        <div class="p"></div>
        <div class="button"></div>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .preview{
        display: flex;
        width: 100%;
        height: 100%;
        .left{
            flex:1;
            background-color: var(--neutral-7);
            min-width: 50%;
        }

        .right{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap:2%;
            flex:1;
            padding-left: 3%;
            background-color: var(--neutral-7);
        }

        .title{
            width: 90%;
            height: 10%;
            background-color: var(--neutral-1);
        }
        .p{
            width: 60%;
            height: 4%;
            background-color: var(--neutral-1);
            &:nth-of-type(3){
                width: 70%;
            }
            &:nth-of-type(4){
                width: 34%;
            }
        }

        .button{
            width: 35%;
            height: 10%;
            background-color: var(--neutral-1);
            margin-top: 2%;
        }
    }
</style>