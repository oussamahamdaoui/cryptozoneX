<div class="section">
    <div class="img"></div>
    <div class="content">
        <h1>Discover our New arival</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda corrupti delectus ab eos consequatur quibusdam nobis tempore voluptate quo autem voluptates dolore laboriosam iure, sapiente amet earum laborum. Veniam, est!</p>
        <button>Explore now</button>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .section{
        padding: 2rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70vh;
        .content{
            z-index: 2;
            position: relative;
            width: 50%;
            margin-left: auto;
            padding: 1rem;
            h1{
                font-size: 6vw;
            }
            p{
                font-size: 0.8rem;
                line-height: 1.3rem;
                max-width: 90%;
                margin-bottom: 1rem;
            }
            button{
                @include globals.button;
                background-color: var(--neutral-12);
                color: var(--neutral-1);
            }
        }
        .img{
            height: 100%;
            width: calc(100% - 4rem);
            background-color: var(--neutral-4);
            position: absolute;
        }
    }

    @media (min-width: 300px) and (max-width: 701px) {
        .section{
            .content{
                margin: auto;
                margin-top: auto;
                top:50%;
                transform: translateY(-50%);
                width: 90%;
            }
        }
    }
</style>