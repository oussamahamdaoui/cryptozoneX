<script>
    export let value = 0;
    export let disabled = false;
    export let nb = 1;
    let rate = value;
    const hover = (newRate)=>()=>{
        if(disabled) return;
        rate = newRate;
    }
    const set = (newRate)=>(e)=>{
        if(disabled) return;
        if(e instanceof KeyboardEvent){
            if(e.key === "Enter"){
                value = newRate
            } else {
                return;
            }
        }
        value = newRate
    }
</script>
<div class="rating">
    <div class="stars" class:disabled 
    style="--size:{100*rate/5}%;" 
    on:mouseout={()=>rate = value} 
    on:blur={()=>rate = value} role="group">
        {#each {length:5} as _, i}
            <i class="ri-star-fill"
            on:keypress={set(i+1)}
            on:click={set(i+1)}
            on:mouseover={hover(i+1)} 
            on:focus={hover(i+1)}
            on:blur={()=>rate = value}
            tabindex="0" 
            role="button"></i>
        {/each}
    </div>
    <a href="/">{nb} Rating</a>
</div>


<style lang="scss">
    .rating{
        display: flex;
        align-items: flex-end;
        a{
            margin-left: 1rem;
            font-weight: 500;
            font-size: 0.8rem;
            &:hover{
                text-decoration: underline;
            }
        }

    }
    .stars{
        background: linear-gradient(to right, var(--orange-10) var(--size), var(--neutral-6) var(--size));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        display: inline-flex;
        position: relative;
        font-size: 1rem;
        &.disabled{
            i{
                &:hover{
                    color: transparent;
                }
                cursor: default;
            }
        }
        i{
            cursor: pointer;
            outline: none;
            &:hover{
                color: var(--orange-10);
            }
        }
    }
</style>