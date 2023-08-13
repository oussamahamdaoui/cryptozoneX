<script>
    export let maxOpened = -1;
    export let opened = [];
    const toggle = (name)=>()=>{
        if(opened.includes(name)){
            opened = opened.filter(e=>e!==name);
        } else {
            opened.push(name);
            if(maxOpened !== -1 && opened.length > maxOpened){
                opened.shift();
            }
        }
        opened = opened;
    }
</script>

<div class="accordion">
    <slot {opened} {toggle}></slot>
</div>

<style lang="scss">
    @use "../../globals.scss";
    .accordion{
        display: flex;
        flex-direction: column;
    }
</style>