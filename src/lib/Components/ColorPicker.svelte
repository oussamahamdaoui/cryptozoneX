<script>
  import Slider from "./Slider.svelte";
  import convert from "color-convert";
  import Slider2d from "./Slider2d.svelte";
  import DropDown from "./DropDown.svelte";

  export let value = "rgba(255, 255, 255, 1)";
  export let full = false;

  /// visuals
  let hueNobColor = "#FF0000";
  let hsvNobColor = "#FF0000";

  let hueValue = 0;
  let opacityValue = 1;
  let x = 0;
  let y = 0;
  let colorType = "hex";

  /// inputs

  let hexInputValue = "#FF0000";
  let inputAlphaValue = "1";
  let rgbInputValues = ["255", "0", "0"];
  // other
  let open = false;
  let active = true;
  /**@type {HTMLElement}*/
  let selectedEl;
  /**@type {HTMLElement}*/
  let ctnr;

  const valueToVisuals = () => {
    active = false;
    if (value.startsWith("#")) {
      const a =
        value.slice(0, 7) === "" ? 1 : parseInt(value.slice(0, 7), 16) / 255;
      value = `rgba(${convert.hex.rgb(value.slice(0, 7)).join(",")},${a})`;
    }
    if (value.startsWith("rgb(")) {
      value = `rgba(${[
        value.replace("rgb(", "").replace(")", "").split(","),
        1,
      ].join(",")})`;
    }
    const rgbaArr = value
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((e) => parseFloat(e));
    const hsv = convert.rgb.hsv(rgbaArr.slice(0, 3));
    opacityValue = rgbaArr[3];
    hueValue = hsv[0] / 360;
    x = hsv[1] / 100;
    y = 1 - hsv[2] / 100;
    hueNobColor = `#${convert.hsv.hex(hsv[0], 100, 100)}`;
    hsvNobColor = `#${convert.rgb.hex(rgbaArr.slice(0, 3))}`;
    rgbInputValues = rgbaArr.slice(0, 3).map((e) => e.toFixed(0));
    hexInputValue = hsvNobColor;
    inputAlphaValue = opacityValue.toFixed(3);
    setTimeout(() => {
      active = true;
    });
  };

  const visualsToValue = (..._) => {
    if (active === false) return;
    const v = 1 - Math.max(y, 0.001);
    const sv = x;
    const l = (v / 2) * (2 - sv);
    const s = (v * sv) / (1 - Math.abs(2 * l - 1));

    hueNobColor = `#${convert.hsv.hex(hueValue * 360, 100, 100)}`;
    hsvNobColor = `#${convert.hsl.hex(hueValue * 360, s * 100, l * 100)}`;
    const rgbaArr = convert.hex.rgb(hsvNobColor);
    rgbInputValues = rgbaArr;
    hexInputValue = hsvNobColor;
    inputAlphaValue = opacityValue.toFixed(3);
    value = `rgba(${rgbaArr.join(",")},${opacityValue})`;
  };

  const updateRanges = () => {
    if (colorType === "hex") {
      const rgbArr = convert.hex.rgb(hexInputValue);
      value = `rgba(${rgbArr.join(",")}, ${inputAlphaValue})`;
    } else {
      value = `rgba(${rgbInputValues.join(",")}, ${inputAlphaValue})`;
    }
    valueToVisuals();
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (!ctnr) return;
      if (
        ctnr.contains(document.activeElement) ||
        document.activeElement === ctnr
      ) {
        open = true;
      } else {
        open = false;
      }
    }, 10);
  };

  valueToVisuals();

  $: visualsToValue(hueValue, x, y, opacityValue);
  $: value && valueToVisuals();
</script>

<svelte:window on:focusin={handleBlur} on:focusout={handleBlur} />

<div
  class="color-picker"
  class:open
  bind:this={ctnr}
  tabindex="0"
  role="button"
>
  <slot name="label" />
  <div class="selected">
    <div
      class="opener checkers"
      bind:this={selectedEl}
      style="--color: {value};"
    ></div>
    {#if full}
      <input class="hex" bind:value={hexInputValue} on:change={updateRanges} />
      <input
        class="alpha"
        bind:value={inputAlphaValue}
        on:change={updateRanges}
      />
    {/if}
  </div>
  <div class="picker">
    <Slider2d bind:valueX={x} bind:valueY={y}>
      <slot slot="bg">
        <div class="colorArea" style="--color:{hueNobColor}">
          <div class="saturationWhite"></div>
          <div class="saturationBlack"></div>
        </div>
      </slot>
      <slot slot="dragger" let:mousedown>
        <button
          class="dragger"
          style="--color:{hsvNobColor}"
          on:mousedown={mousedown}
        ></button>
      </slot>
    </Slider2d>
    <div class="wpr">
      <Slider bind:value={hueValue}>
        <slot slot="dragger" let:mousedown>
          <button
            class="dragger"
            style="--color:{hueNobColor}"
            on:mousedown={mousedown}
          ></button>
        </slot>
        <slot slot="bg">
          <div class="hue"></div>
        </slot>
      </Slider>

      <Slider bind:value={opacityValue}>
        <slot slot="dragger" let:mousedown>
          <button
            class="dragger"
            style="--color:{hsvNobColor}; --opacity:{opacityValue}"
            on:mousedown={mousedown}
          ></button>
        </slot>
        <slot slot="bg">
          <div class="opacity checkers" style="--color:{hsvNobColor}"></div>
        </slot>
      </Slider>
    </div>
    <div class="ranges">
      <DropDown bind:value={colorType}>
        <slot slot="value" let:value>{value}</slot>
        <slot slot="options" let:change>
          <button on:click={change("hex")}>hex</button>
          <button on:click={change("rgb")}>rgb</button>
        </slot>
      </DropDown>
      {#if colorType === "hex"}
        <input
          class="hex"
          bind:value={hexInputValue}
          on:change={updateRanges}
        />
        <input
          class="alpha"
          bind:value={inputAlphaValue}
          on:change={updateRanges}
        />
      {:else}
        <input
          class="rgb"
          bind:value={rgbInputValues[0]}
          on:change={updateRanges}
        />
        <input
          class="rgb"
          bind:value={rgbInputValues[1]}
          on:change={updateRanges}
        />
        <input
          class="rgb"
          bind:value={rgbInputValues[2]}
          on:change={updateRanges}
        />
        <input
          class="alpha"
          bind:value={inputAlphaValue}
          on:change={updateRanges}
        />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .color-picker {
    position: relative;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--neutral-9);
    min-width: 54px;
    border-radius: 3px;
    &.open {
      .picker {
        display: flex;
      }
      z-index: 5;
    }
    .picker {
      background-color: var(--neutral-3);
      border: 1px solid var(--neutral-7);
      border-radius: 5px;
      padding: 0.5rem;
      flex-direction: column;
      gap: 1rem;
      width: 240px;
      display: none;
      position: absolute;
      left: 0;
      top: 100%;
    }

    .selected {
      display: flex;
      gap: 0.5rem;
      .hex {
        flex: 1;
      }
      .alpha {
        max-width: 6ch;
      }
      .opener {
        height: 22px;
        width: 22px;
        &::after {
          width: 100%;
          height: 100%;
          background-color: var(--color);
          content: "";
          display: block;
        }
      }
    }

    :global(.drop-down .value) {
      padding: 0;
      min-width: unset;
      min-height: 20px !important;
      border: none !important;
    }
    :global(.drop-down .value i) {
      font-size: unset;
    }
    :global(.drop-down) {
      height: 32px;
      min-width: unset;
    }
    :global(.drop-down .options) {
      width: 70px;
      padding: 0;
    }
    input {
      width: fit-content;
      min-width: 0;
      flex: 1;
      font-size: 12px;
      background-color: transparent;
      border: 1px solid var(--neutral-9);
      border-radius: 3px;
      padding-left: 1ch;
      color: var(--neutral-12);
      outline: none;

      &:focus {
        border: 1px solid var(--primary-8);
      }

      &.alpha {
        max-width: 6ch;
        min-width: 6ch;
      }
    }

    .wpr {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .ranges {
      display: flex;
      gap: 0.5rem;
    }
    .hue {
      background: linear-gradient(
        to right,
        #f00 0%,
        #ff0 17%,
        #0f0 33%,
        #0ff 50%,
        #00f 67%,
        #f0f 83%,
        #f00 100%
      );
      height: 12px;
      width: 100%;
      border-radius: 12px;
      position: relative;
    }

    .checkers {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=")
        left center;
      background-size: 10px;
      background-color: var(--neutral-12);
    }
    .opacity {
      height: 12px;
      width: 100%;
      border-radius: 12px;
      position: relative;
      border-radius: 12px;
      &::after {
        content: "";
        position: absolute;
        pointer-events: none;
        border-radius: 12px;
        background: linear-gradient(
          to right,
          rgba(255, 0, 0, 0) 0%,
          var(--color) 100%
        );
        height: 100%;
        width: 100%;
      }
    }

    .dragger {
      width: 14px;
      height: 14px;
      border-radius: 14px;
      border: 0.5px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;

      &::after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 8px;
        position: relative;
        display: block;
        border: 0.5px solid black;
        background-color: var(--color);
        opacity: var(--opacity);
      }
    }

    .colorArea {
      height: 200px;
      position: relative;
      background-color: var(--color);
      border-radius: 5px;
    }
    .saturationWhite,
    .saturationBlack {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .saturationWhite {
      background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    }
    .saturationBlack {
      background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
    }
  }
</style>
