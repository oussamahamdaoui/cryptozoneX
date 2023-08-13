<script>
    import { Color } from "../utils";
    import Slider from "./Slider.svelte";
    import Slider2d from "./Slider2d.svelte";
    export let label = "Color";

    let isOpen = false;
    let hueC = new Color({ r: 255, g: 0, b: 0 });
    let color = new Color({ r: 255, g: 0, b: 0 });
    const f = Math.floor;
    const eq = (a, b)=>{
        return a.reduce((acc, e, i)=>{
            return acc && e === b[i];
        }, true);
    }

    let rgb = color.rgb();
    let hex = color.hex();
    let s = 1;
    let l = 0;
    let h = 0;

    let prev =  [h, l, s];

    const update = (c)=>()=>{
        color = new Color({
            ...color.rgb(),
            [c]:rgb[c]
        });
        hex = color.hex();
        updateSlides();
    }

    const updateHex = ()=>{
        color = new Color(hex);
        // @ts-ignore
        rgb = color.rgb();
        updateSlides();

    }

    const updateSlides = ()=>{
        s = 1 - color.white()/100;
        l = color.black()/100;
        h = color.hue()/360;
        prev =  [h, l, s];
        hex = color.hex();
        hueC = new Color({
            ...color.hsl(),
            s:100,
            l:50,
        })
    }

    let element;

    const focusChange = () => {
        setTimeout(() => {
            if (!element) return;
            if (
                element.contains(document.activeElement) ||
                document.activeElement === element
            ) {
                isOpen = true;
            } else {
                isOpen = false;
            }
        }, 100);
    };

    const navigate = (e)=>{
        if(e.key === 'Escape'){
            isOpen = false;
        }
    }

    const toggle = ()=>{
        isOpen = !isOpen;
    }

   // @ts-ignore
     $: (()=> {
        if(eq(prev, [h,l, s])){
            return;
        }
        hueC = hueC.hue(h*360);
        color = hueC.white(100-s*100);
        color = color.black(l*100);

        rgb = {
            ...color.rgb(),
        }
        rgb.r = f(rgb.r);
        rgb.g = f(rgb.g);
        rgb.b = f(rgb.b);
        hex = color.hex();
        prev = [h,l, s];
    })()

</script>

<svelte:window
    on:focusin={focusChange}
    on:focusout={focusChange}
    on:keydown={navigate}
/>

<div class="color-picker" class:open={isOpen} bind:this={element}>
    <button  class="selected-color" style="--color: {color.hex()};" on:click={toggle}>
        <div class="label">{label}</div>
    </button>
    <div class="picker">
        <Slider2d bind:valueX={s} bind:valueY={l}>
            <slot slot="bg">
                <div class="gs">
                    <div
                        class="bg"
                        style="background-color: {hueC.hex()};"
                    />
                    <div class="bg1 bg" />
                    <div class="bg2 bg" />
                </div>
            </slot>
            <slot slot="dragger" let:mousedown>
                <button
                    class="dragger"
                    on:mousedown={mousedown}
                    on:touchstart={mousedown}
                    style="--color: {color.hex()};"
                />
            </slot>
        </Slider2d>
        <Slider bind:value={h}>
            <slot slot="bg">
                <div class="hue" />
            </slot>
            <slot slot="dragger" let:mousedown>
                <button
                    class="dragger long"
                    on:mousedown={mousedown}
                    on:touchstart={mousedown}
                    style="--color: {hueC.hex()};"
                />
            </slot>
        </Slider>
        <div class="wrap">
            <input
                type="number"
                bind:value={rgb.r}
                on:change={update('r')}
            />
            <input
                type="number"
                bind:value={rgb.g}
                on:change={update('g')}
            />
            <input
                type="number"
                bind:value={rgb.b}
                on:change={update('b')}
            />

            <input type="text" class="hex" bind:value={hex} on:change={updateHex}/>
        </div>
    </div>
</div>

<style lang="scss">
    .color-picker {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        
        .selected-color{
            width: 90px;
            height: 52px;
            border: 1px solid var(--neutral-8);
            padding: 0.5rem;
            border-radius: 3px;
            position: relative;
            background-color: transparent;
            outline: none;
            .label{
                position: absolute;
                font-size: 0.6rem;
                top:0;
                left:1rem;
                transform: translateY(-50%);
                background-color: var(--bg, var(--neutral-1));
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                color: var(--neutral-9);
            }
            &::after{
                background-color: var(--color);
                content: "";
                display: block;
                position: relative;
                height: 100%;
                width: 100%;
                border-radius: 2px;
            }
        }

        &.open{
            .picker{
                display: flex;
            }
        }

        &:focus-within{
            .selected-color{
                border-color: var(--primary-8);
                .label{
                    color: var(--primary-8);
                }
            }
        }
        .picker {
            flex-direction: column;
            width: 300px;
            border: 1px solid var(--neutral-7);
            padding: 1rem;
            background-color: var(--neutral-2);
            border-radius: 4px;
            gap: 1rem;
            display: none;
            position: absolute;
            z-index: 99;
            top:calc(100% + 0.5rem);
        }
        .wrap {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            :global(.drop-down) {
                flex: 1;
            }
        }
        .hue {
            background: linear-gradient(
                to right,
                red 0%,
                #ff0 17%,
                lime 33%,
                cyan 50%,
                blue 66%,
                #f0f 83%,
                red 100%
            );
            height: 20px;
            width: 100%;
            border-radius: 3px;
        }
        .dragger {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            outline: 2px solid var(--gray-12);
            border: 2px solid var(--gray-1);
            background-color: var(--color);
            &.long {
                width: 10px;
                height: 26px;
                border-radius: 3px;
            }
        }
        .gs {
            border-radius: 0px;
            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
        }
        .bg {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .bg1 {
            background: linear-gradient(
                to right,
                #fff 0%,
                rgba(255, 255, 255, 0) 100%
            );
        }
        .bg2 {
            background: linear-gradient(to bottom, transparent 0%, #000 100%);
        }
        input {
            flex: 2;
            max-width: 5ch;
            font-family: monospace;
            &.hex {
                min-width: 9ch;
            }
            background-color: var(--neutral-2);
            border: 1px solid var(--neutral-9);
            border-radius: 3px;
            padding-left: 0.5rem;
            color: var(--neutral-12);
            outline: none;
            height: 32px;
            &:focus {
                border: 1px solid var(--primary-8);
            }
        }

        input[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
</style>
