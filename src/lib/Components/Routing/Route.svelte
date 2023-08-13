<script>

    import { location, routed } from "../../Stores/location";
    /**@type {string|RegExp|((location:Location)=>boolean)}*/
    let pathname = "";
    let is404 = false;
    $:show = false;
    export { pathname, is404 };

    $:{
        if(typeof pathname === 'string'){
            show = $location.pathname === pathname;
        } else if(typeof pathname === 'function'){
            show = pathname($location);
        } else if(pathname instanceof RegExp){
            show = pathname.test($location.pathname);
        } else {
            show = false;
        }
        if(is404 === false && show === true){
            routed.set(show);
        } else if($routed === true && is404) {
            show = false;
        }
    }

</script>

{#if show}
    <slot/>
{/if}
