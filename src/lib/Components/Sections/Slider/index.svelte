<div class="slider">
    <div class="head">
        <h2>New in</h2>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            placeat blanditiis eum iusto maiores id eius, est, nisi pariatur,
            velit necessitatibus neque voluptates.
        </p>
        <div class="controls big-screen">
            <button><i class="ri-arrow-left-s-line" /></button>
            <span>1/12</span>
            <button><i class="ri-arrow-right-s-line" /></button>
        </div>
    </div>
    <div class="slides">
        {#each { length: 10 } as slide}
            <div class="slide">
                <div class="img" />
                <a href="/" class="info">
                    <h3>Sony FE 18-135mm f/3.5-5.6 OSS | Optique Monture E, Zoom APS-C</h3>
                    <span>$123.50</span>
                </a>
            </div>
        {/each}
    </div>
    <div class="controls small-screen">
        <button><i class="ri-arrow-left-s-line" /></button>
        <span>1/12</span>
        <button><i class="ri-arrow-right-s-line" /></button>
    </div>
    <div class="line">
        <a href="see-all">See all new bags</a>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .slider {
        margin-top: 2rem;
        display: flex;
        padding: 2rem;
        flex-direction: column;
        overflow: hidden;
        .controls {
                display: flex;
                align-items: center;
                font-size: 1.2rem;
                &.small-screen{
                    display: none;
                }
                button {
                    background-color: transparent;
                    border: none;
                    font-size: 1.2rem;
                    font-weight: 900;
                }
            }
        .head {
            display: flex;
            align-items: center;
            p {
                max-width: 30%;
                margin-right: auto;
                font-size: 0.8rem;
            }
            h2 {
                margin-right: 3rem;
                font-size: 2.5rem;
            }
        }
        .slides {
            display: flex;
            overflow-y: auto;
            gap: 1rem;
            margin-top: 1rem;
            @include globals.hide-scrollbar;
            .slide {
                height: 500px;
                aspect-ratio: 2/3;
                display: flex;
                flex-direction: column;
                .img {
                    width: 100%;
                    background-color: var(--neutral-4);
                    flex: 1;
                }
                .info {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    button {
                        background-color: t;
                    }
                }
            }
        }
        .line {
            margin-top: 3rem;
            border-bottom: 1px solid var(--neutral-7);
            padding-bottom: 0.5rem;
            display: flex;
            justify-content: flex-end;
            a {
                font-weight: 900;
            }
        }
    }
    @media (min-width: 600px) and (max-width: 901px) {
        .slider {
            .head {
                flex-direction: column;
                align-items: flex-start;
                gap:1rem;
                p {
                    max-width: 100%;
                }
            }
        }
    }
    @media (min-width: 300px) and (max-width: 601px) {
        .slider {
            .controls{
                &.small-screen{
                    display: flex;
                }
                &.big-screen{
                    display: none;
                }
            }
            .head {
                flex-direction: column;
                align-items: flex-start;
                gap:1rem;
                p {
                    max-width: 100%;
                }
            }
            .slides>.slide>.info{
                display: none;
            }
        }
    }
</style>
