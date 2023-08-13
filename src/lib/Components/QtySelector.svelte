<script>
    export let qty = 1;
    export let label = "Q-ty:";
    export let max = Infinity;

    const plusOne = ()=>{
        qty ++;
        qty = Math.min(max, qty);
    }
    const minusOne = ()=>{
        qty --;
        qty = Math.max(0, qty);
    }
</script>

<div class="qty-selector">
    <span class="label">{label}</span>
    <button on:click={minusOne}><i class="ri-subtract-line"></i></button>
    <span>{qty}</span>
    <button on:click={plusOne}><i class="ri-add-line"></i></button>
</div>

<style lang="scss">
    @use "../../globals.scss";
    .qty-selector{
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;
        .label{
            color: var(--neutral-12);
            font-weight: 900;
        }
        button{
            background-color: var(--primary-3);
            border: 1px solid var(--primary-8);
            color: var(--primary-11);
            border-radius: 100%;
            width: 20px;
            height: 20px;
            &:hover{
                background-color: var(--primary-5);
            }
        }
    }
</style>