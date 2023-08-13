<div class="section-news-letter">
    <h1>Sign up to our news letter!</h1>
    <p>Get 10% off your first order</p>
    <button>Subscribe</button>
</div>
<style lang="scss">
    @use "/src/globals.scss";
    .section-news-letter{
        margin: 2rem;
        padding: 5rem;
        background-color: var(--neutral-12);
        color: var(--neutral-1);

        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button{
            @include globals.button;
            background-color: var(--neutral-1);
            margin-top: 2rem;
        }
    }
</style>