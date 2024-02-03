<script>
    /**
     * @type {"text"|"password"|"textarea"}
     */
    export let type = "text";
    export let value = "";
    export let placeholder = "";
    let className = "";
    export { className as class };
    const handleInput = (e) => {
        value = type.match(/^(number|range)$/)
            ? +e.target.value
            : e.target.value;
    };
</script>

<label class="input {className}">
    <div class="label">
        <slot name="label" />
    </div>
    <div class="content">
        <slot name="iconLeft" />
        {#if type === "textarea"}
            <textarea {placeholder} on:input={handleInput}>{value}</textarea>
        {:else}
            <input {type} {placeholder} {value} on:input={handleInput} />
        {/if}
        <slot name="iconRight" />
    </div>
    <div class="error">
        <slot name="error" />
    </div>
</label>

<style lang="scss">
    @use "/src/globals.scss";
    .input {
        display: flex;
        flex-direction: column;
        position: relative;
        min-height: 52px;
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
        .error {
            font-size: 0.5rem;
            padding-left: 2rem;
            margin-bottom: 0.2rem;
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
