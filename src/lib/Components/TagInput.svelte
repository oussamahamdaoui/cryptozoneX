<script>
    import { swap, getTextWidth } from "../utils";

    let cursorContent = "";

    let value = [
        {
            type: "cursor",
        },
    ];
    /**
     * @type {HTMLInputElement}
     */
    let input;
    const update = (e) => {};
    /**
     *
     * @param {KeyboardEvent} e
     */
    const movecursor = (e) => {
        let cursorIdx = value.findIndex((e) => e.type === "cursor");
        let v = "";
        if (
            e.key === "ArrowLeft" &&
            input.selectionStart === 0 &&
            cursorIdx !== 0
        ) {
            w = 0;
            if (value[cursorIdx - 1].type === "tag") {
                if (value[cursorIdx - 2]?.type === "text") {
                    v = value[cursorIdx - 2].value;
                    swap(value, cursorIdx, cursorIdx - 1);
                    value.splice(cursorIdx - 2, 1);
                } else {
                    v = "";
                    swap(value, cursorIdx, cursorIdx - 1);
                }
            } else {
                v = value[cursorIdx - 1].value;
                value.splice(cursorIdx - 1, 1);
            }
            if (input.value.length !== 0) {
                value.splice(cursorIdx, 0, {
                    type: "text",
                    value: input.value,
                });
            }
            value = value;
        } else if (
            e.key === "ArrowRight" &&
            input.selectionStart === input.value.length &&
            cursorIdx !== value.length - 1
        ) {
            w = 0;
            if (value[cursorIdx + 1].type === "tag") {
                if (value[cursorIdx + 2]?.type === "text") {
                    v = value[cursorIdx + 2].value;
                    swap(value, cursorIdx, cursorIdx + 1);
                    value.splice(cursorIdx + 2, 1);
                } else {
                    v = "";
                    swap(value, cursorIdx, cursorIdx + 1);
                }
            } else {
                v = value[cursorIdx + 1].value;
                value.splice(cursorIdx + 1, 1);
            }
            if (input.value.length !== 0) {
                value.splice(cursorIdx, 0, {
                    type: "text",
                    value: input.value,
                });
            }
            value = value;
        } else {
            return;
        }
        setTimeout(() => {
            input.value = v;
            cursorContent = v;
            input.focus();
        });
    };
    const up = () => {
        cursorContent = input.value;
    };
    const addTag = (tag) => () => {
        const cursorIdx = value.findIndex((e) => e.type === "cursor");
        if (input.selectionStart !== input.value.length) {
            let left = input.value.slice(0, input.selectionStart);
            let right = input.value.slice(input.selectionStart);
            value.splice(cursorIdx, 0, {
                type: "text",
                value: right,
            });
            value.splice(cursorIdx, 0, {
                type: "tag",
                value: tag,
            });
            value.splice(cursorIdx, 0, {
                type: "text",
                value: left,
            });
        } else {
            value.splice(cursorIdx, 0, {
                type: "text",
                value: input.value,
            });
            value.splice(cursorIdx + 1, 0, {
                type: "tag",
                value: tag,
            });
            cursorContent = "";
        }
        value = value;
    };
    let w = 0;
    $: {
        w = Math.ceil(getTextWidth(cursorContent, "1rem"));
    }
</script>

<div
    class="tag-input"
    tabindex="0"
    on:keydown={movecursor}
    role="button"
    style="--w:{w}"
    on:click={() => input.focus()}
>
    {#each value as element}
        {#if element.type === "cursor"}
            <input type="text" class="cursor" bind:this={input} on:input={up} />
        {:else if element.type === "text"}
            <span>{element.value}</span>
        {:else if element.type === "tag"}
            <span class="tag">{element.value}</span>
        {/if}
    {/each}

    <div class="tags">
        <button on:click={addTag("color")}>color</button>
    </div>
</div>

<style lang="scss">
    .tag-input {
        display: flex;
        gap: 0.5em;
        font-size: 1rem;
        input {
            max-width: calc(var(--w) * 1px);
            outline: none;
            border: none;
            background-color: transparent;
            color: white;
            font-size: 1rem;
        }
        span {
            &.tag {
                background-color: red;
            }
        }
    }
</style>
