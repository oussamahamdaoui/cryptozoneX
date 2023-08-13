<script>
    import Logo from "./Logo.svelte";

</script>
<footer class="footer">
    <div class="content">
        <div class="links">
            <a href="/">Home</a>
            <a href="/">Shop</a>
            <a href="/">About</a>
        </div>
        <Logo></Logo>
        <div class="links">
            <a href="/">Blog</a>
            <a href="/">Terms</a>
            <a href="/">Contact</a>
        </div>
    </div>
    <div class="copyright">All rights reseved</div>
</footer>

<style lang="scss">
    @use "../../globals.scss";
    .footer{
        padding: 2rem;
        display: flex;
        flex-direction: column;
        .content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--neutral-7);
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            position: relative;
            :global(.logo){
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                font-size: min(3vw, 2rem);
            }
            .links{
                display: flex;
                font-weight: bold;
                gap: 2rem;
                font-size: 0.9rem;
            }
        }
        .copyright{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8rem;
            color: var(--neutral-9);
        }
    }
    @media (min-width: 300px) and (max-width: 601px) {
        .content{
            .links{
                gap: 0.5rem !important;
            }
            :global(.logo){
                top:-100%;
                font-size: 1rem !important;;
            }
        }
    }
</style>