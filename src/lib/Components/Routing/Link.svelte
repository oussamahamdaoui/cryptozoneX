<script>
    import { goTo } from "../../Stores/location";

    let href="#";
    let prevent = false;
    let cls = "";
    export {
        href,
        prevent,
        cls as class,
    }
    const navigate = (e)=>{
        e.preventDefault();
        if(prevent) return;
        goTo(href);
    }
</script>

<a href="{href}" on:click={navigate} on:keydown class="{cls}"><slot></slot></a>

<style>
    a{
        all: unset;
        cursor: pointer;
    }
</style>