<script>
  import Accordion from "./Accordion.svelte";
  import AccordionSection from "./AccordionSection.svelte";
  import ImagePlayer from "./ImagePlayer.svelte";
  import Price from "./Price.svelte";
  import HelperText from "./ProductProps/HelperText.svelte";
  import Rateing from "./Rating.svelte";
  import { getContext } from "svelte";
  /*** @type {string}*/
  export let id = undefined;

  const t = getContext("t");
  const currency = getContext("currency");
  const cache = {};
  $: variations = [];
  $: updateVariations($t);

  const updateVariations = async (_) => {
    variations = await Promise.all(
      ($t(`products.${id}.variations`) || []).map(async (variation) => {
        let component;
        if (cache[variation.type]) {
          component = cache[variation.type];
        } else {
          component = (
            await import(`./ProductProps/${variation.type}/index.svelte`)
          ).default;
        }
        return { variation, component };
      })
    );
  };

  const getPercent = (_) => {
    /**
     * @type {bigint}
     */
    const a = $t(`products.${id}.promotions.${$currency}`);
    /**
     * @type {bigint}
     */
    const b = $t(`products.${id}.productPrices.${$currency}`);
    if (b === 0n) return "0.0";
    return (Number(((a - b) * 10000n) / b) / 100).toFixed(1);
  };
</script>

<div class="product-preview">
  <ImagePlayer></ImagePlayer>
  <div class="info">
    <h1>{$t(`products.${id}.productName`)}</h1>
    <h2 class="price">
      {#if $t(`products.${id}.promotions.${$currency}`) !== undefined}
        <span class="promo">{getPercent($t)}%</span>
        <Price
          price={$t(`products.${id}.promotions.${$currency}`)}
          currency={$currency}
        />
        <h4 class="old-price">
          Old Price: <Price
            price={$t(`products.${id}.productPrices.${$currency}`) || 0n}
            currency={$currency}
            lineTrough
          />
        </h4>
      {:else}
        <Price
          price={$t(`products.${id}.productPrices.${$currency}`) || 0n}
          currency={$currency}
        />
      {/if}
    </h2>
    <h5>Seller: <a href="/">05RFC1230</a></h5>
    <Rateing value={1.6} disabled />
    <div class="line" />

    {#each variations as { component, variation } (variation.id)}
      <HelperText props={variation}></HelperText>
      {#if variation.name}
        <h3>{variation.name}</h3>
      {/if}
      <svelte:component this={component} {...variation.props}
      ></svelte:component>
    {/each}

    <div class="buttons">
      <button class="primary">Add to cart</button>
      <button class="secondary"><i class="ri-heart-2-fill" /></button>
    </div>
    <Accordion opened={[]} let:toggle let:opened>
      <AccordionSection name="details" {opened} toggle={toggle("details")}>
        <slot slot="head" let:isOpen>
          Product details
          <i class={isOpen ? "ri-subtract-line" : "ri-add-line"} />
        </slot>
        <slot slot="content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          nostrum beatae ab, non cumque dicta suscipit placeat corrupti
          molestiae sit ea a tempora velit nisi autem neque eligendi. Repellat,
          quod?</slot
        >
      </AccordionSection>
      <AccordionSection name="size" {opened} toggle={toggle("size")}>
        <slot slot="head" let:isOpen>
          Size & Fit
          <i class={isOpen ? "ri-subtract-line" : "ri-add-line"} />
        </slot>
        <slot slot="content"
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          nostrum beatae ab, non cumque dicta suscipit placeat corrupti
          molestiae sit ea a tempora velit nisi autem neque eligendi. Repellat,
          quod?</slot
        >
      </AccordionSection>
      <AccordionSection name="material" {opened} toggle={toggle("material")}>
        <slot slot="head" let:isOpen>
          Material
          <i class={isOpen ? "ri-subtract-line" : "ri-add-line"} />
        </slot>
        <slot slot="content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          nostrum beatae ab, non cumque dicta suscipit placeat corrupti
          molestiae sit ea a tempora velit nisi autem neque eligendi. Repellat,
          quod?</slot
        >
      </AccordionSection>
      <AccordionSection name="reviews" {opened} toggle={toggle("reviews")}>
        <slot slot="head" let:isOpen>
          Reviews
          <i class={isOpen ? "ri-subtract-line" : "ri-add-line"} />
        </slot>
        <slot slot="content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          nostrum beatae ab, non cumque dicta suscipit placeat corrupti
          molestiae sit ea a tempora velit nisi autem neque eligendi. Repellat,
          quod?
        </slot>
      </AccordionSection>
    </Accordion>
  </div>
</div>

<style lang="scss">
  @use "../../globals.scss";
  .product-preview {
    display: flex;
    padding: 1rem;
    gap: 1rem;
    :global(.color-selector),
    :global(.size-selector) {
      margin-top: 1rem;
    }
    :global(.accordion-section .content) {
      font-size: 0.8rem;
      padding: 1rem 5rem 1rem 0;
    }

    .info {
      flex: 4;
      position: relative;
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
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
        font-size: 1.9rem;
        margin-bottom: 0.1rem;
      }
      .price {
        font-size: 2rem;
        margin-bottom: 0.1rem;
        .promo {
          font-weight: 300;
          color: var(--red-10);
          font-size: 1.5rem;
        }
      }
      .old-price {
        font-size: 0.8rem;
        color: var(--neutral-11);
        margin-bottom: 1rem;
        font-weight: 400;
      }
      h5 {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--neutral-9);
        margin-bottom: 0.2rem;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: var(--neutral-4);
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
  @media (min-width: 300px) and (max-width: 1001px) {
    .product-preview {
      flex-direction: column;
    }
  }
  @media (min-width: 300px) and (max-width: 601px) {
    .product-preview {
      height: auto;
    }
  }
</style>
