<script>
    export let selected;
    export let value;
    export let select = (_)=>{};
    $:isSelected = selected === value;
    
</script>
<label class="radio-option" class:isSelected>
    <button class="radio" on:click={()=>select(value)}></button>
    <slot></slot>
</label>

<style lang="scss">
    @use "../../globals.scss";
    .radio-option{
        display: flex;
        align-items: flex-end;
        button{
            min-width: 20px;
            min-height: 20px;
            background-color: transparent;
            border: 2px solid var(--neutral-12);
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0.5rem;
        }
        &.isSelected{
            button::after{
                content: "";
                width: 10px;
                height: 10px;
                display: block;
                position: relative;
                background-color: var(--neutral-12);
                border-radius: 100%;
            }
        }
    }
</style>