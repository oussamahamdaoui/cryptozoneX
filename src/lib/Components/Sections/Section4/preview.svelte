<div class="preview">
    <div class="top">
        <div class="img" />
        <div class="img" />
    </div>
    <div class="bottom">
        <div class="titles">
            <div class="title" />
            <div class="title" />
        </div>
        <div class="ps">
            <div class="p" />
            <div class="p" />
            <div class="p" />
            <div class="button" />
        </div>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .preview {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        
        .top {
            flex: 3;
            display: flex;
            padding: 3%;
            gap: 3%;
        }

        .bottom {
            flex: 1;
            display: flex;
            gap: 3%;
            padding: 3%;
        }

        .ps {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 10%;
        }
        .img {
            height: 100%;
            background-color: var(--neutral-7);
            flex: 1;
        }

        .titles {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 3%;
        }

        .title {
            width: 80%;
            margin-right: auto;
            height: 35%;
            background-color: var(--neutral-7);
            &:last-of-type {
                width: 50%;
            }
        }
        .p {
            width: 60%;
            height: 9%;
            background-color: var(--neutral-7);
            &:nth-of-type(3) {
                width: 50%;
            }
            &:nth-of-type(4) {
                width: 34%;
            }
        }

        .button {
            width: 25%;
            height: 20%;
            background-color: var(--neutral-7);

            margin-top: 2%;
        }
    }
</style>
