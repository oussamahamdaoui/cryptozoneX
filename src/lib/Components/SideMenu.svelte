<script>
    import { location } from "../Stores/location";
    import Link from "./Routing/Link.svelte";
    const link = $location.pathname;
    const links = [
        {
            href:"/dashboard",
            icon:"ri-dashboard-fill"
        },
        {
            href:"/my-shop",
            icon:"ri-store-2-fill"
        },
        {
            href:"/products",
            icon:"ri-shopping-bag-3-fill"
        },
        {
            href:"/customers",
            icon:"ri-group-fill"
        },
        {
            href:"/promotions",
            icon:"ri-price-tag-3-fill"
        },
        {
            href:"/statistics",
            icon:"ri-bar-chart-box-fill"
        },
    ]
</script>
<div class="side-menu">
    {#each links as l}
        <Link href={l.href} class={link === l.href ? "selected" : ""}>
            <i class={l.icon} />
        </Link>
    {/each}
</div>

<style lang="scss">
    @use "../../globals.scss";
    .side-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid var(--neutral-7);
        position: sticky;
        top: 2rem;
        :global(a) {
            padding: 1rem;
            position: relative;
            &::after {
                content: "";
                height: 100%;
                width: 1px;
                right: -1px;
                top:50%;
                transform: translateY(-50%);
                background-color: transparent;
                position: absolute;
            }
            &:hover{
                background-color: var(--primary-3);
            }
            &:focus{
                background-color: var(--primary-3);
            }
        }
        :global(a.selected){
            color: var(--neutral-12);
            background-color: var(--primary-4);
            &::after {
                background-color: var(--primary-11);
            }
        }
    }
    @media (min-width: 300px) and (max-width: 801px){
        .side-menu{
            top: 7rem;
        }
    }
    @media (min-width: 300px) and (max-width: 561px){
        .side-menu{
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            position: fixed;
            width: 100%;
            top: 100%;
            transform: translateY(-100%);
            height: auto;
            z-index: 109;
            background-color: var(--neutral-1);
            padding: 0;
            border-top: 1px solid var(--neutral-7);
            height: 80px;
            align-self: stretch;
            padding-bottom: 1rem;
            :global(a){
                &::after {
                    height: 5px;
                    width: 100%;
                    top:1px;
                    left: 0;
                }
            }
        }
    }
</style>
