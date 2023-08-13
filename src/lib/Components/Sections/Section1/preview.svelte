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
        position: relative;
        .left{
            flex:1;
            background-color: var(--neutral-7);
            min-width: 50%;
        }

        .right{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            gap:2%;
            width: 50%;
            padding-left: 20%;
            padding-bottom: 5%;
            background-color: var(--neutral-7);
        }

        .title{
            width: 90%;
            height: 6%;
            background-color: var(--neutral-1);
        }
        .p{
            width: 60%;
            height: 3%;
            background-color: var(--neutral-1);
            &:nth-of-type(3){
                width: 50%;
            }
            &:nth-of-type(4){
                width: 34%;
            }
        }

        .button{
            width: 45%;
            height: 10%;
            background-color: var(--neutral-1);
            margin-top: 2%;
        }
    }
</style>