<script>
  import CheckBox from "../../Components/CheckBox.svelte";
  import Input from "../../Components/Input.svelte";
  import MultiSelect from "../../Components/MultiSelect.svelte";
  import LanguageSelector from "../../Components/ParamTypes/LanguageSelector.svelte";
  import SideMenu from "../../Components/SideMenu.svelte";
  import ToolTip from "../../Components/ToolTip.svelte";
  import Params from "../../Components/ProductProps/Params.svelte";
  import { categories as c, getUid, swap } from "../../utils";
  import Draggable from "../../Components/Draggable.svelte";
  import Drag from "../../Components/Drag.svelte";
  import ProductPreview from "../../Components/ProductPreview.svelte";
  import CurrencySelector from "../../Components/CurrencySelector.svelte";
  import Link from "../../Components/Routing/Link.svelte";
  import { getContext } from "svelte";

  const updateTranslation = getContext("updateTranslation");
  const t = getContext("t");

  let categories = c.filter((c) => c !== "all");
  let properties = {};
  let language;

  $: properties[language] = properties[language] ?? {
    productName: "",
    productPrice: "",
    variations: [],
  };

  const swapVariants = (a, b) => {
    swap(properties[language].variations, a, b);
    properties = properties;
  };

  const addVariation = () => {
    properties[language].variations.push({
      id: getUid(),
      type: "Color",
      closed: false,
    });
    properties = properties;
  };

  const updateVariation = () => {
    properties[language].variations = properties[language].variations;
  };

  const removeVariation = (id) => () => {
    properties[language].variations = properties[language].variations.filter(
      (e) => e.id !== id
    );
  };

  $: {
    updateTranslation(
      {
        [language]: {
          products: {
            preview: properties[language],
          },
        },
      },
      t
    );
  }
</script>

<div class="seller-products">
  <SideMenu />
  <div class="line" />
  <div class="content">
    <div class="params">
      <LanguageSelector bind:value={language} />
      <Input bind:value={properties[language].productName}>
        <slot slot="label">{$t("seller.product.productNameLabel")}</slot>
      </Input>
      <div class="wrap">
        <Input bind:value={properties[language].productPrice}>
          <slot slot="label">{$t("seller.product.productPriceLabel")}</slot>
        </Input>
        <CurrencySelector global={false}>
          <slot slot="label">{$t("globals.currency")}</slot>
        </CurrencySelector>
        <ToolTip timoutHide={500}>
          <i class="ri-information-line" />
          <slot slot="content">
            <p>
              {$t("seller.helperMessages.currency")}
              <Link href="/exchange-rates">{$t("globals.linkHere")}</Link>
            </p>
          </slot>
        </ToolTip>
      </div>
      <MultiSelect placeholder="Select categories" max={10}>
        <slot slot="selected" let:selected let:toggle>
          {#each selected as categorie}
            <button on:mousedown={toggle(categorie)}>
              {$t(`categories.${categorie}`)}
              <i class="ri-close-line" />
            </button>
          {/each}
        </slot>
        <slot slot="label">Product Categories</slot>
        <slot slot="options" let:toggle let:selected let:search>
          {#each categories as categorie}
            {#if $t(`categories.${categorie}`)
              .toLowerCase()
              .includes(search.toLowerCase())}
              <button
                on:click={toggle(categorie)}
                class:selected={selected.includes(categorie)}
              >
                <CheckBox
                  toggle={() => {}}
                  checked={selected.includes(categorie)}
                />
                {$t(`categories.${categorie}`)}
              </button>
            {/if}
          {/each}
        </slot>
      </MultiSelect>
      <h3>{$t("seller.product.variationsTitle")}</h3>
      <div class="props-list">
        <Drag let:swap onSwap={swapVariants}>
          {#each properties[language].variations as prop (prop.id)}
            <Draggable {swap} let:dragger let:moving>
              <div class="top">
                <button use:dragger class:moving class="dragger">
                  <i class="ri-draggable" />
                </button>
                <button
                  class="close"
                  on:click={() => (prop.closed = !prop.closed)}
                >
                  <i
                    class={!prop.closed
                      ? "ri-contract-up-down-fill"
                      : "ri-expand-up-down-fill"}
                  />
                </button>
                <button class="remove" on:click={removeVariation(prop.id)}>
                  <i class="ri-close-line" />
                </button>
              </div>
              <div class="content" class:closed={prop.closed}>
                <Params {prop} update={updateVariation} />
              </div>
            </Draggable>
          {/each}
        </Drag>
        {#if properties[language].variations.length === 0}
          <div class="emptyProps">{$t("seller.product.noVariations")}</div>
        {/if}
        <button class="button" on:click={addVariation}>
          <i class="ri-add-line" />
          Add a variation
          <ToolTip text="Ex:color, size, lot size">
            <i class="ri-information-line" />
          </ToolTip>
        </button>
      </div>
    </div>
    <div class="preview">
      <ProductPreview id="preview" locale={language} />
    </div>
  </div>
</div>

<style lang="scss">
  .seller-products {
    display: flex;
    align-items: flex-start;
    flex: 1;
    width: 100%;
    .content {
      flex: 1;
      display: flex;
    }
    .params {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 2;
      padding: 0.5rem;
      min-width: 0;
      .props-list {
        display: flex;
        flex-direction: column;
        border: 1px dashed var(--neutral-7);
        border-radius: 5px;
        padding: 0.5rem;
        gap: 1rem;
        .emptyProps {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--neutral-7);
          padding: 1rem;
        }
      }
      .button {
        background-color: var(--primary-3);
        color: var(--primary-10);
        border: 1px solid var(--primary-7);
        padding: 0.5rem;
        width: max-content;
        border-radius: 3px;
        align-self: center;
      }
    }

    .wrap {
      display: flex;
      gap: 1rem;
      align-items: center;
      :global(.input) {
        flex: 1;
      }
      :global(.tool-tip-content a) {
        color: var(--primary-10);
        text-decoration: underline;
      }
    }

    .content {
      display: contents;
      &.closed {
        display: none;
      }
    }

    .top {
      display: flex;
      overflow: hidden;
      background-color: var(--neutral-2);
      border: 1px solid var(--neutral-7);
      border-radius: 3px 3px 0px 0px;
      margin-top: 1rem;
      button {
        user-select: none;
        touch-action: none;
        background-color: transparent;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        &.moving {
          cursor: grabbing !important;
        }
        &.dragger {
          cursor: grab;
        }
        &.remove {
          color: var(--red-9);
          &:hover {
            color: var(--red-10);
            background-color: var(--red-a3);
          }
        }
        &:hover {
          background-color: var(--neutral-3);
        }
        &.close {
          i {
            transform: rotate(-45deg);
            display: block;
          }
        }
      }
    }

    .preview {
      flex: 5;
    }
  }
</style>
