<script>
    import { getUid, swap } from "../../../utils";
    import Drag from "../../Drag.svelte";
    import Draggable from "../../Draggable.svelte";
    import Input from "../../Input.svelte";

    export let props;
    $: props = props ?? {
        options: [],
    };

    const addOption = () => {
        props.options.push({
            label: "",
            id: getUid(),
        });
        props = props;
    };
    const removeOption = (id) => () => {
        props.options = props.options.filter((o) => o.id !== id);
        props = props;
    };
    const swapOption = (a, b) => {
        swap(props.options, a, b);
        props = props;
    };
</script>

<div class="option">
    <Drag let:swap onSwap={swapOption}>
        {#each props.options as option (option.id)}
            <Draggable {swap} let:dragger let:moving>
                <div class="wrap">
                    <button use:dragger class:moving>
                        <i class="ri-draggable" />
                    </button>
                    <Input bind:value={option.label}>
                        <slot slot="label">Option label</slot>
                    </Input>
                    <button on:click={removeOption(option.id)}>
                        <i class="ri-close-line" />
                    </button>
                </div>
            </Draggable>
        {/each}
    </Drag>
    <button class="addOption" on:click={addOption}>
        <i class="ri-add-line" />
        New option
    </button>
</div>

<style lang="scss">
    .wrap {
        display: flex;
        background-color: var(--neutral-2);
        gap: 0.5rem;
        padding: 0.5rem 0;
        :global(.input) {
            flex: 1;
        }
        button {
            background-color: transparent;
            border: none;
            color: var(--neutral-9);
            &:first-of-type {
                cursor: grab;
                &.moving {
                    cursor: grabbing;
                }
            }
            &:last-of-type {
                &:hover {
                    color: var(--red-11);
                }
            }
        }
    }
</style>
