<script>
    import Accordion from "./Accordion.svelte";
    import AccordionSection from "./AccordionSection.svelte";
    import ColorSelector from "./ColorSelector.svelte";
    import Price from "./Price.svelte";
    import Rateing from "./Rating.svelte";
    import SizeSelector from "./SizeSelector.svelte";
</script>

<div class="product-preview">
    <div class="player">
        <div class="preview">
            <div class="wrapper">
                <div class="img selected" />
                <div class="img" />
                <div class="img" />
                <div class="img" />
                <div class="img" />
                <div class="img" />
                <div class="img" />
            </div>
        </div>
        <div class="slider">
            <div class="controls">
                <button><i class="ri-arrow-left-s-line" /></button>
                <button><i class="ri-arrow-right-s-line" /></button>
            </div>
            <div class="images">
                <div class="img" />
            </div>
        </div>
    </div>
    <div class="info">
        <h1>Sony FE 18-135mm f/3.5-5.6 OSS | Optique Monture E, Zoom APS-C</h1>
        <h3>Seller: <a href="/">05RFC1230</a></h3>
        <Rateing value={1.6} disabled></Rateing>
        <div class="line"></div>
        <h2 class="price">
            <span class="promo">-50%</span>
            <Price></Price>
        </h2>
        <h4 class="old-price">
            Old Price: <Price lineTrough></Price>
        </h4>
        <ColorSelector />
        <SizeSelector />
        <div class="buttons">
            <button class="primary">Add to cart</button>
            <button class="secondary"><i class="ri-heart-2-fill" /></button>
        </div>
        <Accordion opened={[]} let:toggle let:opened>
            <AccordionSection name="details" {opened} toggle={toggle("details")}>
                <slot slot="head" let:isOpen>
                    Product details 
                    <i class={isOpen ? "ri-subtract-line" : "ri-add-line"}></i>
                </slot>
                <slot slot="content">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Deleniti, nostrum beatae ab, non cumque dicta suscipit
                    placeat corrupti molestiae sit ea a tempora velit nisi autem
                    neque eligendi. Repellat, quod?</slot>
            </AccordionSection>
            <AccordionSection name="size" {opened} toggle={toggle("size")}>
                <slot slot="head" let:isOpen>
                    Size & Fit
                    <i class={isOpen ? "ri-subtract-line" : "ri-add-line"}></i>
                </slot>
                <slot slot="content">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Deleniti, nostrum beatae ab, non cumque dicta suscipit
                    placeat corrupti molestiae sit ea a tempora velit nisi autem
                    neque eligendi. Repellat, quod?</slot>
            </AccordionSection>
            <AccordionSection name="material" {opened} toggle={toggle("material")}>
                <slot slot="head" let:isOpen>
                    Material
                    <i class={isOpen ? "ri-subtract-line" : "ri-add-line"}></i>
                </slot>
                <slot slot="content">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Deleniti, nostrum beatae ab, non cumque dicta suscipit
                    placeat corrupti molestiae sit ea a tempora velit nisi autem
                    neque eligendi. Repellat, quod?</slot>
            </AccordionSection>
            <AccordionSection name="reviews" {opened} toggle={toggle("reviews")}>
                <slot slot="head" let:isOpen>
                    Reviews
                    <i class={isOpen ? "ri-subtract-line" : "ri-add-line"}></i>
                </slot>
                <slot slot="content">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Deleniti, nostrum beatae ab, non cumque dicta suscipit
                    placeat corrupti molestiae sit ea a tempora velit nisi autem
                    neque eligendi. Repellat, quod?
                </slot>
            </AccordionSection>
        </Accordion>
    </div>
</div>

<style lang="scss">
    @use "../../globals.scss";
    .product-preview {
        display: flex;
        padding: 2rem;
        gap: 2rem;
        :global(.color-selector),
        :global(.size-selector) {
            margin-top: 1rem;
        }
        :global(.accordion-section .content){
            font-size: 0.8rem;
            padding: 1rem 5rem 1rem 0;
        }
        .player {
            flex: 6;
            display: flex;
            gap: 1rem;
            height: 700px;
            grid-row-start: auto;
            .preview {
                flex: 1;
                overflow-y: auto;
                height: 700px;
                @include globals.hide-scrollbar;
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .img {
                    width: 100%;
                    aspect-ratio: 1/1;
                    background-color: var(--neutral-4);
                    border: 1.5px solid transparent;
                    &.selected{
                        border-color: var(--neutral-12);
                    }
                }
            }
            .slider {
                height: 700px;
                flex: 6;
                position: relative;
                .images {
                    width: 100%;
                    height: 100%;
                    background-color: var(--neutral-4);
                }
                .controls {
                    position: absolute;
                    width: 100%;
                    padding: 2rem;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: space-between;
                    top: 50%;
                    button {
                        width: 30px;
                        height: 30px;
                        border-radius: 50px;
                        border: none;
                        background-color: var(--neutral-1);
                        font-size: 1.2rem;
                    }
                }
            }
        }
        .info {
            flex: 4;
            .buttons {
                margin-top: 3rem;
                margin-bottom: 3rem;
                display: flex;
                gap: 1rem;
                button {
                    &.primary {
                        @include globals.button;
                        background-color: var(--neutral-12);
                        color: var(--neutral-1);
                        border-color: transparent;
                        flex: 1;
                        font-weight: 900;
                    }
                    &.secondary {
                        background-color: transparent;
                        border-color: transparent;
                        padding: 0rem 1rem;
                        font-size: 1.5rem;
                        color: var(--neutral-7);
                    }
                }
            }
            h1 {
                font-size: 1.5rem;
                margin-bottom: 0.1rem;
            }
            .price{
                font-size: 2rem;
                margin-bottom: 0.1rem;
                .promo{
                    font-weight: 300;
                    color: var(--red-10);
                    font-size: 1.5rem;
                }
            }
            .old-price{
                font-size: 0.8rem;
                color: var(--neutral-11);
                margin-bottom: 1rem;
                font-weight: 400;
            }
            h3 {
                font-size: 0.8rem;
                font-weight: 500;
                color: var(--neutral-9);
                margin-bottom: .2rem;
            }
            
        }
        .line{
            width: 100%;
            height: 1px;
            background-color: var(--neutral-4);
            margin-top: .5rem;
            margin-bottom: .5rem;

        }
    }
    @media (min-width: 300px) and (max-width: 1001px) {
        .product-preview{
            flex-direction: column;
        }
    }
    @media (min-width: 300px) and (max-width: 601px) {
        .product-preview{
            height: auto;
            .player{
                flex-direction: column-reverse;
                .preview{
                    width: 100%;
                    height: 90px;
                    overflow-x: auto;
                    flex: unset;
                    .wrapper{
                        flex-direction: row;
                        height: 100%;
                        .img{
                            height: 100%;
                            width: auto;
                        }
                    }
                } 
                .slider{
                    height: 500px;
                    flex: unset;
                    .controls{
                        padding: 1rem;
                    }
                }
            }
        }
    }
</style>
