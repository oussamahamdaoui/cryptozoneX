<script>
    export let value;
    const select = (v)=>{
        value = v;
    }
</script>
<div class="button-group">
    <div class="head">
        <slot selected={value} name="head"></slot>
    </div>
    <div class="buttons">
        <slot name="buttons" selected={value} {select}></slot>
    </div>
</div>