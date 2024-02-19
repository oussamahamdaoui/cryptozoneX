<script>
  import { getContext, tick } from "svelte";
  import Diff from "../Components/Icons/Diff.svelte";
  import { SUPPORTED_CURRENCIES } from "../Stores/currency";

  const defaults = {
    price: 0n,
    diff: 0n,
    text: "",
    password: "",
    textarea: "",
  };

  /**
   * @type {"text"|"password"|"textarea"|"price"|"diff"}
   */
  export let type = "text";
  /**
   * @type {string|bigint}
   */
  export let value = defaults[type];
  const currencyCtx = getContext("currency");
  /**
   * @type {keyof typeof SUPPORTED_CURRENCIES}
   */
  export let currency = undefined;

  if (!currency) {
    currency = $currencyCtx;
    currencyCtx.subscribe((nc) => {
      currency = nc;
    });
  }

  export let placeholder = "";
  let className = "";
  export { className as class };

  let digits = ["price", "diff"].includes(type)
    ? SUPPORTED_CURRENCIES[currency].decimalPlace
    : 0n;

  /**
   * @param {string} v
   */
  const parsePrice = (v) => {
    if (digits === 0n) return BigInt(v);
    const pt = v.indexOf(SUPPORTED_CURRENCIES[currency].decimal);
    if (pt === -1) {
      return BigInt(v) * digits;
    }
    const int = v.slice(0, pt);
    const fct = v.slice(pt + 1).padEnd(Math.log10(Number(digits)), "0");
    return BigInt(int) * digits + BigInt(fct);
  };

  const parseDiff = (v) => {
    if (v.startsWith("-") || v.startsWith("+")) {
      return parsePrice(v.slice(1)) * (v.startsWith("-") ? -1n : 1n);
    }
    return parsePrice(v);
  };

  /**
   * @param {bigint} v
   */
  const stringifyPrice = (v) => {
    const n = Math.log10(Number(digits));
    const s = v.toString().padStart(n + 1, "0");
    const fct = s.slice(-n);
    const int = s.slice(0, s.length - fct.length);
    return digits === 0n
      ? int
      : `${int}${SUPPORTED_CURRENCIES[currency].decimal}${fct}`;
  };

  /**
   * @param {bigint} v
   */
  const stringifyDiff = (v) => {
    if (v > 0) {
      return stringifyPrice(v);
    }
    return stringifyPrice(-v);
  };

  /**
   *
   * @param {any} v
   * @returns {string}
   */
  const stringify = (v) => {
    if (type === "price") return stringifyPrice(v);
    if (type === "diff") return stringifyDiff(v);
    return v;
  };
  let stringValue = stringify(value);
  let local = false;

  const updateValue = (..._) => {
    if (local === false) {
      stringValue = " ";
      value = value ?? defaults[type];
      stringValue = stringify(value);
    }
  };

  const checkPrice = (value) => {
    const reg = new RegExp(
      `^(([1-9][0-9]*)|(0))([${SUPPORTED_CURRENCIES[currency].decimal}][0-9]*)?$|^$`
    );
    return (
      value.match(reg) &&
      (value.indexOf(SUPPORTED_CURRENCIES[currency].decimal) === -1 ||
        value.slice(value.indexOf(SUPPORTED_CURRENCIES[currency].decimal) + 1)
          .length <= Math.log10(Number(digits)))
    );
  };
  /**
   *
   * @param {string}value
   */
  const checkDiff = (value) => {
    return value.startsWith("+") || value.startsWith("-")
      ? checkPrice(value.slice(1))
      : checkPrice(value);
  };

  const handleInput = async (e) => {
    local = true;
    const target = e.target;
    if (type === "price") {
      if (!checkPrice(target.value)) {
        target.value = stringValue;
      } else {
        stringValue = target.value;
      }
      value = parsePrice(stringValue);
    } else if (type === "diff") {
      if (!checkDiff(target.value)) {
        target.value = stringValue;
      } else {
        stringValue = target.value;
      }
      value = parseDiff(stringValue);
    } else {
      value = target.value;
      stringValue = target.value;
    }
    await tick();
    local = false;
  };

  const toggleNeg = async () => {
    local = true;
    value = BigInt(value) * -1n;
    stringValue = stringify(value);
    await tick();
    local = false;
  };

  $: updateValue(value, currency);
  $: {
    digits = SUPPORTED_CURRENCIES[currency].decimalPlace;
  }
</script>

<label class="input {className}">
  <div class="label">
    <slot name="label" />
  </div>
  <div class="content">
    <slot name="iconLeft" />
    {#if type === "diff"}
      <button
        class="sig"
        class:pos={BigInt(value) > 0n}
        class:neg={BigInt(value) < 0n}
        on:click={toggleNeg}
      >
        <Diff></Diff>
      </button>
    {/if}
    {#if type === "textarea"}
      <textarea {placeholder} on:input={handleInput} on:change
        >{stringValue}</textarea
      >
    {:else if ["price", "diff"].includes(type)}
      <input
        type="text"
        inputmode="numeric"
        {placeholder}
        value={stringValue}
        on:input={handleInput}
        on:change
      />
    {:else}
      <input
        {type}
        {placeholder}
        value={stringValue}
        on:input={handleInput}
        on:change
      />
    {/if}
    <slot name="iconRight" />
  </div>
</label>

<style lang="scss">
  @use "/src/globals.scss";
  .input {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 52px;
    height: max-content;
    justify-content: flex-end;
    border: 1px solid var(--neutral-9);
    border-radius: 3px;
    cursor: text;
    .sig {
      background-color: transparent;
      color: var(--neutral-9);
      border: 0;
      padding: 0 0.5rem;
      &:hover {
        background-color: var(--neutral-2);
      }
      &.neg {
        :global(.neg) {
          color: var(--primary-9);
        }
      }
      &.pos {
        :global(.pos) {
          color: var(--primary-9);
        }
      }
    }
    &:focus-within {
      border: 1px solid var(--primary-8);
      .label {
        color: var(--primary-8);
      }
    }
    .label {
      position: absolute;
      font-size: 0.6rem;
      top: 0;
      left: 1rem;
      transform: translateY(-50%);
      background-color: var(--bg, var(--neutral-1));
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      color: var(--neutral-9);
    }
    .content {
      display: flex;
      flex: 1;
    }
    input {
      border: none;
      background-color: transparent;
      outline: none;
      padding-left: 1rem;
      font-size: 1rem;
      color: var(--neutral-12);
      flex: 1;
      width: 100%;
    }
    textarea {
      font-size: 1rem;
      padding-left: 1rem;
      padding-top: 1rem;
      background-color: transparent;
      height: 100px;
      flex: 1;
      color: var(--neutral-12);
      outline: none;
      border: none;
      resize: none;
    }
  }
</style>
