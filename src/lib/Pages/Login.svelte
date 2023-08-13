<script>
    import { t } from "../Stores/lang";
    import keplrLogo from "../../assets/keplrLogo.svg";
    import googleLogo from "../../assets/google.svg";
    import microsoftLogo from "../../assets/microsoft.svg";
    import Link from "../Components/Routing/Link.svelte";
    import { goTo, location } from "../Stores/location";
    import Input from "../Components/Input.svelte";
    import { user } from "../Stores/user";

    $: login = $location.pathname === "/login";
    const logIn = () => {
        user.set({
            name: "Oussama",
        });
        goTo("/my-shop");
    };
</script>

<div class="login">
    <div class="content">
        {#if !login}
            <h1>{$t("createAccount")}</h1>
            <Input>
                <slot slot="label">Email</slot>
                <slot slot="error" />
            </Input>
            <Input>
                <slot slot="label">Name</slot>
                <slot slot="error" />
            </Input>
            <button on:click={logIn}>{$t("login")}</button>
            <div class="switchLogin">
                {$t("haveAccount")}
                <Link href="/login">{$t("useAccount")}</Link>
            </div>
        {:else}
            <h1>{$t("useAccount")}</h1>
            <Input>
                <slot slot="label">Email</slot>
                <slot slot="error" />
            </Input>
            <button on:click={logIn}>{$t("login")}</button>
            <div class="switchLogin">
                {$t("noAccount")}
                <Link href="/sign-up">{$t("createAccount")}</Link>
            </div>
        {/if}
        <div class="or-line">{$t("or")}</div>
        <div class="buttons">
            <button>
                <img src={googleLogo} alt="google" />
                <span>{$t("continueWith")} Google</span>
            </button>
            <button>
                <img src={microsoftLogo} alt="google" />
                <span>{$t("continueWith")} Microsoft</span>
            </button>
            <button>
                <img src={keplrLogo} alt="keplr" />
                <span>{$t("continueWith")} Keplr</span>
            </button>
        </div>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        display: flex;
        // min-height: 100vh;
        margin-bottom: auto;
        margin-top: auto;
        flex-direction: column;
        h1 {
            text-align: center;
            font-size: 1.4rem;
        }
        .content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            min-width: 30%;
            max-width: 300px;
            width: 100%;
            .switchLogin {
                font-size: 0.8rem;
                color: var(--neutral-9);
            }
            :global(a) {
                text-decoration: underline;
                color: var(--accent-11);
            }
        }
        .or-line {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--neutral-9);
            gap: 1rem;
            text-transform: uppercase;
            &::before,
            &::after {
                height: 1px;
                flex: 1;
                content: "";
                background-color: var(--neutral-7);
            }
        }
        .buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .content > button {
            border: 1px solid var(--primary-7);
            background-color: var(--primary-3);
            &:hover {
                background-color: var(--primary-4);
                border: 1px solid var(--primary-8);
            }
        }
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            text-transform: uppercase;
            padding: 1rem 2rem;
            border: 1px solid var(--neutral-7);
            color: var(--neutral-12);
            height: 52px;
            border-radius: 3px;
            &:hover {
                background-color: var(--neutral-4);
            }
            img {
                width: 1rem;
                height: 1rem;
                object-fit: contain;
                display: inline;
                margin-right: 0.5rem;
            }
        }
    }
</style>
