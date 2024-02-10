<script>
  export let label = "";
  export let placeholder = "";
  export { value };
  export let disabled = false;

  let val = "";
  /**
   * @type {HTMLElement}
   */
  let sizer;
  /**
   * @type {HTMLInputElement}
   */
  let ipt;
  /**
   * @type {HTMLElement}
   */
  let ctnr;
  let w = 1;
  /**
   * @type {string[]}
   */
  let value = [];
  /**
   * @type {({type:"input"}|{type:"tag", value:string})[]}
   */
  let tags = [
    ...value.map((e) => ({ type: /**@type {const}**/ ("tag"), value: e })),
    { type: "input" },
  ];
  $: value && updateTags();
  $: tags && updateValue();
  $: showPlaceholder = tags.length <= 1 && placeholder !== "" && val === "";

  const updateValue = () => {
    value = tags
      .filter((e) => e.type !== "input")
      .map((e) => (e.type === "input" ? "" : e.value));
  };
  const updateTags = () => {
    tags = [
      ...[...new Set(value)].map((e) => ({
        type: /**@type {const}**/ ("tag"),
        value: e,
      })),
      { type: "input" },
    ];
  };
  const updateSize = () => {
    sizer.innerText = val;
    w = sizer.getBoundingClientRect().width;
  };
  const focusInput = (pos) => {
    setTimeout(() => {
      if (!ipt) return;
      ipt.focus();
      ipt.selectionStart = pos;
      ipt.selectionEnd = pos;
    }, 0);
  };
  /**
   * @param {Element} i
   */
  const animate = (i) => {
    if (i.nodeName === "INPUT") return;
    i.classList.add("shake");
    setTimeout(() => {
      if (i) {
        i.classList.remove("shake");
      }
    }, 300);
  };

  /**
   *
   * @param {KeyboardEvent} e
   */
  const handleSpecialKeys = (e) => {
    const cursorPos = tags.findIndex((e) => e.type === "input");
    const found = tags.findIndex((e) => "value" in e && e.value === val);
    let pos = 0;
    if (e.key === "ArrowLeft" && ipt.selectionStart === 0) {
      if (val.length === 0 && tags[cursorPos - 1]) {
        // @ts-ignore
        const v = tags[cursorPos - 1].value;
        tags.splice(cursorPos - 1, 2, { type: "input" });
        tags = tags;
        val = v;
        pos = v.length;
      } else if (tags[cursorPos - 1]) {
        // @ts-ignore
        const v = tags[cursorPos - 1].value;
        if (found === -1) {
          tags.splice(
            cursorPos,
            1,
            { type: "input" },
            { type: "tag", value: val }
          );
          tags = tags;
          val = "";
          pos = v.length;
        } else {
          animate(ctnr.children[found]);
          tags.splice(cursorPos - 1, 2, { type: "input" });
          tags = tags;
          val = v;
          pos = v.length;
        }
      } else if (val.length !== 0) {
        if (found === -1) {
          tags.splice(
            cursorPos,
            1,
            { type: "input" },
            { type: "tag", value: val }
          );
          tags = tags;
          val = "";
        } else {
          animate(ctnr.children[found]);
        }
      }
      updateSize();
      focusInput(pos);
    }
    if (e.key === "ArrowRight" && ipt.selectionStart === val.length) {
      if (val.length === 0 && tags[cursorPos + 1]) {
        // @ts-ignore
        const v = tags[cursorPos + 1].value;
        tags.splice(cursorPos, 2, { type: "input" });
        tags = tags;
        val = v;
        pos = 0;
      } else if (tags[cursorPos + 1]) {
        if (found === -1) {
          tags.splice(
            cursorPos,
            1,
            { type: "tag", value: val },
            { type: "input" }
          );
          tags = tags;
          val = "";
          pos = 0;
        } else {
          animate(ctnr.children[found]);
          // @ts-ignore
          const v = tags[cursorPos + 1].value;
          tags.splice(cursorPos, 2, { type: "input" });
          tags = tags;
          val = v;
          pos = 0;
        }
      } else if (val.length !== 0) {
        if (found === -1) {
          tags.splice(
            cursorPos,
            1,
            { type: "tag", value: val },
            { type: "input" }
          );
          tags = tags;
          val = "";
        } else {
          animate(ctnr.children[found]);
          pos = val.length;
        }
      }
      updateSize();
      focusInput(pos);
    }
    if (e.key === "Enter" && val.length !== 0) {
      if (found === -1) {
        tags.splice(
          cursorPos,
          1,
          { type: "tag", value: val },
          { type: "input" }
        );
      } else {
        animate(ctnr.children[found]);
      }
      tags = tags;
      val = "";
      pos = 0;
      updateSize();
      focusInput(pos);
    }
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      val.length === 0 &&
      tags[cursorPos - 1]
    ) {
      // @ts-ignore
      const v = tags[cursorPos - 1].value;
      tags.splice(cursorPos - 1, 2, { type: "input" });
      tags = tags;
      val = v;
      pos = v.length;
      updateSize();
      focusInput(pos);
    }
  };

  const click =
    (tag, skip = false) =>
    (evt) => {
      evt.stopPropagation();
      let pos = 0;
      if (!skip) {
        const target = evt.target;
        const rect = target.getBoundingClientRect();
        let x = (evt.clientX - rect.left) / rect.width;
        if (target === evt.currentTarget && x > 0.1) {
          x = 1;
        } else if (target === evt.currentTarget) {
          x = 0;
        }
        pos = Math.round(target.innerText.length * x);
      }

      const cursorPos = tags.findIndex((e) => e.type === "input");
      if (val.length === 0) {
        tags.splice(cursorPos, 1);
      } else {
        tags.splice(cursorPos, 1, { type: "tag", value: val });
      }
      const tagIdx = tags.indexOf(tag);
      //@ts-ignore
      val = tags[tagIdx].value;
      tags.splice(tagIdx, 1, { type: "input" });
      tags = tags;
      updateSize();
      focusInput(pos);
    };

  const deleteTag = (tag) => (evt) => {
    evt.stopPropagation();
    const cursorPos = tags.findIndex((e) => e.type === "input");
    tags.splice(cursorPos, 1);
    const tagIdx = tags.indexOf(tag);
    tags.splice(tagIdx, 1, { type: "input" });
    tags = tags;
    focusInput(0);
  };

  const repositionInput = (evt) => {
    /**
     * @type {HTMLElement}
     */
    evt.preventDefault();

    const cursorPos = tags.findIndex((e) => e.type === "input");
    if (
      document.activeElement === ipt &&
      cursorPos === tags.length - 1 &&
      ipt.selectionStart !== val.length
    ) {
      focusInput(val.length);
      return;
    }
    if (val.length !== 0) {
      tags.splice(cursorPos, 1, { type: "tag", value: val });
    } else {
      tags.splice(cursorPos, 1);
    }

    const target = evt.currentTarget;
    const rect = target.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    const children = [...target.children];
    let smalestD = Infinity;
    let idx;

    for (let i = 0; i < children.length; i++) {
      const element = /**@type {HTMLElement}*/ (children[i]);
      const cx = element.getBoundingClientRect().left - rect.left;
      if (Math.abs(smalestD) > Math.abs(cx - x)) {
        smalestD = cx - x;
        idx = i;
      }
    }
    if (smalestD > 0) {
      tags.splice(idx, 0, { type: "input" });
    } else {
      tags.splice(idx + 1, 0, { type: "input" });
    }
    tags = tags;
    val = "";
    updateSize();
    focusInput(0);
  };

  const blur = () => {
    setTimeout(() => {
      if (!ctnr) return;
      if (ctnr.contains(document.activeElement)) return;
      const found = tags.findIndex((e) => "value" in e && e.value === val);
      const cursorPos = tags.findIndex((e) => e.type === "input");
      if (val.length === 0 || found !== -1) {
        if (val.length !== 0) {
          animate(ctnr.children[found]);
        }
        tags.splice(cursorPos, 1);
      } else {
        tags.splice(cursorPos, 1, { type: "tag", value: val });
      }
      tags.splice(tags.length, 0, { type: "input" });
      val = "";
      tags = tags;
      updateSize();
    }, 100);
  };
  let animation = "";
</script>

<div class="tag-input" class:disabled>
  {#if label !== ""}
    <div class="label">{label}</div>
  {/if}
  <slot name="iconLeft" />
  <div
    class="container"
    style="--w:{w}px;"
    bind:this={ctnr}
    on:click={repositionInput}
    on:mousedown={(e) => e.preventDefault()}
    role="button"
    tabindex="0"
    on:keypress={() => {}}
    on:focus={(e) => {
      e.preventDefault();
      focusInput(0);
    }}
  >
    {#if showPlaceholder}
      <div class="placeholder">
        {placeholder}
      </div>
    {/if}
    {#each tags as tag}
      {#if tag.type === "input"}
        <div class="input">
          <span class="sizer" bind:this={sizer}></span>
          <input
            bind:value={val}
            bind:this={ipt}
            {disabled}
            type="text"
            name="none"
            on:input={updateSize}
            on:blur={blur}
            on:keydown={handleSpecialKeys}
            on:mousedown={(e) => e.stopImmediatePropagation()}
            on:mouseup={(e) => e.stopImmediatePropagation()}
            on:click={(e) => e.stopImmediatePropagation()}
          />
        </div>
      {:else}
        <div
          class="tag {animation}"
          on:click={click(tag)}
          role="button"
          tabindex="0"
          on:keypress={() => {}}
          on:focus={click(tag, true)}
        >
          <span>{tag.value}</span>
          <button on:click={deleteTag(tag)}>
            <i class="ri-close-line"></i>
          </button>
        </div>
      {/if}
    {/each}
  </div>
  <slot name="iconRight" />
</div>

<style lang="scss">
  @use "/src/globals.scss";
  .tag-input {
    border: 1px solid var(--neutral-9);
    border-radius: 3px;
    padding-right: 0.5rem;
    padding-bottom: 0.1rem;
    padding-top: 0.6rem;
    padding-left: 1rem;
    min-height: 52px;
    position: relative;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.1rem;
    cursor: text;

    &.disabled {
      opacity: 0.3;
      cursor: default !important;
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
    .placeholder {
      position: absolute;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      color: var(--neutral-8);
    }
  }
  .container {
    min-width: 150px;
    overflow-x: auto;
    display: flex;
    position: relative;
    font-size: 1rem;
    align-items: center;
    outline: none;
    @include globals.hide-scrollbar;
    flex: 1;

    .input {
      padding: 5px 0;
      min-width: fit-content;
      span {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        white-space: pre;
      }
      input {
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;
        max-width: var(--w);
        min-width: max(var(--w), 1px);
        font-size: 1rem;
        color: var(--neutral-12);
        &::selection {
          background: var(--neutral-12);
        }
      }
    }
    .tag {
      padding: 5px;
      border-radius: 3px;
      background-color: var(--primary-6);
      margin-left: 0.25rem;
      margin-right: 0.25rem;
      min-width: unset;
      &:first-of-type {
        margin-left: 0;
      }
      gap: 0.3rem;
      cursor: text;
      outline: none;
      display: flex;
      flex-wrap: nowrap;
      button {
        background-color: transparent;
        border: none;
      }
      span {
        outline: none;
        white-space: pre;
      }
    }
  }

  .shake {
    animation: horizontal-shaking 0.25s infinite;
  }

  @keyframes horizontal-shaking {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(1px);
    }
    50% {
      transform: translateX(-1px);
    }
    75% {
      transform: translateX(1px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
