<script>
  import { tick } from "svelte";

  /**
   * @type {"text"|"password"|"textarea"|"price"}
   */
  export let type = "text";
  /**
   * @type {string|bigint}
   */
  export let value = type !== "price" ? "" : 0n;
  export let placeholder = "";
  export let digits = 0n;
  let className = "";
  export { className as class };

  /**
   * @param {string} v
   */
  const parsePrice = (v) => {
    if (digits === 0n) return BigInt(v);
    const pt = v.indexOf(".");
    if (pt === -1) {
      return BigInt(v) * digits;
    }
    const int = v.slice(0, pt);
    const fct = v.slice(pt + 1).padEnd(Math.log10(Number(digits)), "0");
    return BigInt(int) * digits + BigInt(fct);
  };

  /**
   * @param {bigint} v
   */
  const stringifyPrice = (v) => {
    const n = Math.log10(Number(digits));
    const s = v.toString().padStart(n + 1, "0");
    const fct = s.slice(-n);
    const int = s.slice(0, s.length - fct.length);
    return digits === 0n ? int : `${int}.${fct}`;
  };

  /**
   *
   * @param {any} v
   * @returns {string}
   */
  const stringify = (v) => {
    if (type === "price") return stringifyPrice(v);
    return v;
  };
  let stringValue = stringify(value);
  let local = false;

  const updateValue = (_) => {
    if (local === false) {
      stringValue = " ";
      value = value ?? (type !== "price" ? "" : 0n);
      stringValue = stringify(value);
    }
  };

  $: updateValue(value);

  const checkPrice = (value) => {
    return (
      value.match(/^(([1-9][0-9]*)|(0))([.,][0-9]*)?$|^$/) &&
      (value.indexOf(".") === -1 ||
        value.slice(value.indexOf(".") + 1).length <=
          Math.log10(Number(digits)))
    );
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
    } else {
      value = target.value;
      stringValue = target.value;
    }
    await tick();
    local = false;
  };
</script>

<label class="input {className}">
  <div class="label">
    <slot name="label" />
  </div>
  <div class="content">
    <slot name="iconLeft" />
    {#if type === "textarea"}
      <textarea {placeholder} on:input={handleInput} on:change
        >{stringValue}</textarea
      >
    {:else if type === "price"}
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
        on:input={handleInput}
        value={stringValue}
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
    // .error {
    //   font-size: 0.5rem;
    //   padding-left: 2rem;
    //   margin-bottom: 0.2rem;
    // }
    input {
      border: none;
      background-color: transparent;
      outline: none;
      padding-left: 1rem;
      font-size: 1rem;
      color: var(--neutral-12);
      flex: 1;
      width: 100%;
      ::placeholder {
        color: red;
      }
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
