<script>
  import CheckBox from "../../Components/CheckBox.svelte";
  import Input from "../../Components/Input.svelte";
  import MultiSelect from "../../Components/MultiSelect.svelte";
  import LanguageSelector from "../../Components/ParamTypes/LanguageSelector.svelte";
  import SideMenu from "./Components/SideMenu.svelte";
  import ToolTip from "../../Components/ToolTip.svelte";
  import Params from "../../Components/ProductProps/Params.svelte";
  import { categories as c, getUid, swap } from "../../utils";
  import Draggable from "../../Components/Draggable.svelte";
  import Drag from "../../Components/Drag.svelte";
  import ProductPreview from "../../Components/ProductPreview.svelte";
  import CurrencySelector from "../../Components/CurrencySelector.svelte";
  import Link from "../../Components/Routing/Link.svelte";
  import { getContext, setContext } from "svelte";
  import {
    SUPPORTED_CURRENCIES,
    exchange,
    newCurrencyStore,
  } from "../../Stores/currency";
  import Media from "../../Components/Media.svelte";

  import {
    DEFAULT_LANG,
    SUPPORTED_LANGS,
    newLangContext,
  } from "../../Stores/lang";
  import DatePicker from "../../Components/DatePicker.svelte";
  import ProductImages from "./Components/ProductImages.svelte";

  const t = getContext("t");

  const exchangeRates = getContext("exchangeRates");

  const { t: nt, updateTranslation, lang } = newLangContext();
  const { currency, currencyData } = newCurrencyStore();

  setContext("currency", currency);
  setContext("currencyData", currencyData);

  setContext("t", nt);

  let swapCurrencies = exchange($exchangeRates);

  let categories = c.filter((c) => c !== "all");
  let properties = {
    promotions: {},
    productPrices: {},
    ...SUPPORTED_LANGS.reduce((acc, l) => {
      acc[l] = {
        productName: "",
        variations: [],
      };
      return acc;
    }, {}),
  };
  const globalProps = {
    promotions: properties.promotions,
    productPrices: properties.productPrices,
  };
  let language = DEFAULT_LANG;
  let hasPromotion = false;
  const intitialCurrency = getContext("currency");
  let selectedCurrency = $intitialCurrency;

  const swapVariants = (a, b) => {
    swap(properties[language].variations, a, b);
    properties = properties;
  };

  const addVariation = () => {
    properties[language].variations.push({
      id: getUid(),
      type: "Color",
      closed: false,
      helperTitle: "",
      helperText: "",
      withHelper: false,
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

  const recalculatePrices = () => {
    const from = selectedCurrency;
    const amount = properties.productPrices[selectedCurrency];
    Object.keys(SUPPORTED_CURRENCIES).forEach((to) => {
      if (from === to) return;
      properties.productPrices[to] = swapCurrencies(amount, from, to);
    });
  };
  $: {
    lang.set(language);
    currency.set(selectedCurrency);
    updateTranslation(
      {
        [language]: {
          products: {
            preview: {
              ...properties[language],
              ...globalProps,
            },
          },
        },
      },
      nt
    );
  }
</script>

<div class="seller-products">
  <SideMenu />
  <div class="line" />
  <div class="content">
    <div class="params">
      <h3>{"General params"}</h3>
      <LanguageSelector bind:value={language} />
      <Input bind:value={properties[language].productName} type="textarea">
        <slot slot="label">{$t("seller.product.productNameLabel")}</slot>
      </Input>
      <div class="wrap">
        <Input
          bind:value={properties.productPrices[selectedCurrency]}
          type="price"
          currency={selectedCurrency}
          on:change={recalculatePrices}
        >
          <slot slot="label">{$t("seller.product.productPriceLabel")}</slot>
        </Input>
        <CurrencySelector global={false} bind:value={selectedCurrency}>
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

      <MultiSelect placeholder={$t("seller.product.selectCategory")} max={10}>
        <slot slot="selected" let:selected let:toggle>
          {#each selected as categorie}
            <button on:mousedown={toggle(categorie)}>
              {$t(`categories.${categorie}`)}
              <i class="ri-close-line" />
            </button>
          {/each}
        </slot>
        <slot slot="label">{$t("seller.product.category")}</slot>
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
      <label>
        <CheckBox bind:checked={hasPromotion}></CheckBox>
        <slot>Discount</slot>
      </label>
      {#if hasPromotion}
        <div class="wrap">
          <Input
            bind:value={properties.promotions[selectedCurrency]}
            type="price"
            currency={selectedCurrency}
          >
            <slot slot="label">{$t("seller.product.productPriceLabel")}</slot>
          </Input>
          <DatePicker placeholder="Pick promotion duration" type="range">
            <slot slot="label">{"Promotion duration"}</slot>
          </DatePicker>
        </div>
      {/if}
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
                <div class="type">{prop.name || prop.type}</div>
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
      <ProductImages></ProductImages>
    </div>
    <div class="preview">
      <ProductPreview id="preview" />
    </div>
  </div>
</div>

<style lang="scss">
  .seller-products {
    display: flex;
    align-items: flex-start;
    flex: 1;
    width: 100%;
    .props-list {
      :global(.draggable) {
        margin-bottom: 1rem;
      }
    }

    .params {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 2;
      padding: 1rem;
      overflow-y: auto;
      overflow-y: auto;
      position: sticky;
      top: 0;
      z-index: 2;
      label {
        width: fit-content;
        cursor: pointer;
      }
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

    .line {
      width: 1px;
      align-self: stretch;
      background-color: var(--neutral-7);
      margin-left: -1px;
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
      align-items: center;
      position: relative;
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
      .type {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        font-size: smaller;
      }
    }

    .preview {
      flex: 5;
      border-left: 1px solid var(--neutral-7);
      align-self: stretch;
      :global(.product-preview) {
        position: sticky;
        top: 0;
      }
    }
  }
</style>
