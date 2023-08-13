<script>
    import CartProduct from "./CartProduct.svelte";
    import Input from "../../Components/Input.svelte";
    import RadioGroup from "../../Components/RadioGroup.svelte";
    import RadioOption from "../../Components/RadioOption.svelte";
    let showDiscountCode = false;
</script>

<div class="cart-preview">
    <h1>My cart</h1>
    <div class="cart">
        <div class="prducts">
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <div class="sub-total">Sub total <span>$1000</span></div>
        </div>
        <div class="payment-form">
            <RadioGroup selected="free" let:selected let:select>
                <RadioOption value="free" {selected} {select}>
                    Free delivery <span class="lighter">10-20 business days</span>
                </RadioOption>
                <RadioOption value="payed" {selected} {select}>
                    $20 DHL delivery <span class="lighter">10-20 business days</span>
                </RadioOption>
            </RadioGroup>
            <div class="line" />
            <div class="logos">
                <i class="ri-mastercard-fill" />
                <i class="ri-visa-fill" />
                <i class="ri-paypal-fill" />
            </div>
            <input placeholder="XXXX-XXXX-XXXX-XXXX" />
            <div class="group">
                <input placeholder="CCV" />
                <input placeholder="MM/YY" />
            </div>
            {#if showDiscountCode}
                <div class="group">
                <Input>
                    <slot slot="label">Code</slot>
                </Input>
                <button class="third">Apply</button>
                </div>
                <button class="primary">Paye $256.54</button>
            {:else}
                <button class="primary">Paye $256.54</button>
                <button class="secondary" on:click={()=>showDiscountCode = true}>Add discount code</button>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    @use "/src/globals.scss";
    .lighter {
        color: var(--neutral-9);
        font-size: 0.8rem;
        margin-left: 1rem;
    }
    .line {
        height: 1px;
        background-color: var(--neutral-3);
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .cart-preview {
        padding: 2rem;
        h1 {
            font-size: 4rem;
            margin-bottom: 0.5rem;
        }
        .cart {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            .payment-form {
                width: 35%;
                max-width: 400px;
                border: 1px solid var(--neutral-7);
                padding: 2rem;
                position: sticky;
                top:2rem;
                input {
                    width: 100%;
                    height: 35px;
                    border: 1px solid var(--neutral-8);
                    margin-bottom: 1rem;
                    padding-left: 1rem;
                }
                .group {
                    display: flex;
                    gap: 1rem;
                }
                .logos {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }
                button{
                    @include globals.button;
                    width: 100%;
                    margin-bottom: 1rem;
                    font-weight: 900;
                    border-radius: 3px;
                    &.primary{
                        background-color: var(--accent-3);
                        color: var(--neutral-12);
                        text-transform: uppercase;
                        border: 1px solid var(--accent-7);
                        &:hover{
                            background-color: var(--accent-4);
                            border: 1px solid var(--accent-8);
                            color: var(--neutral-12);
                        }
                        &:focus{
                            background-color: var(--accent-5);
                        }
                    }
                    &.secondary{
                        background-color: transparent;
                        border: none;
                    }
                    &.third{
                        background-color: transparent;
                        border: 1px solid var(--primary-7);
                        color: var(--primary-10);
                        &:hover{
                            background-color: var(--primary-1);
                        }
                    }
                }
            }
            .prducts {
                width: 60%;
                .sub-total{
                    display: flex;
                    justify-content: space-between;
                    font-weight: 900;
                }
            }
        }
    }

    @media (min-width: 300px) and (max-width: 901px) {
        .cart-preview{
            padding: 1rem;
        }
        .cart{
            flex-direction: column;
            gap: 0;
            padding: 1rem;
            .prducts {
                width: 100% !important;
            }
            .payment-form{
                width: 100% !important;
                margin-top: 2rem;
                margin-left: auto;
                margin-right: auto;
            }
        }
    }
</style>
