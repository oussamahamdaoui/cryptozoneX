<div class="preview">
    <div class="left">A</div>
    <div class="right">B</div>
</div>

<style lang="scss">
    .preview{
        height: 100%;
        width: 101%;
        position: relative;
        div{
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            font-size: 2rem;
            padding: 25%;
            color: var(--neutral-10);
        }
        .left{
            clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
            background-color: var(--neutral-3);
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .right{
            clip-path: polygon(60% 0%, 100% 0, 100% 100%, 40% 100%);
            background-color: var(--neutral-6);
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
</style>