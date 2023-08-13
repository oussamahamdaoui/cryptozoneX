<script>
    import ToolTip from "../ToolTip.svelte";

    export let id;
    export let name = "Section";
</script>

<div class="params">
    <div class="id">
        <span class="name">{name}</span>
        <span class="tag-id">
            <i class="ri-hashtag" />
            {id}
        </span>
        <ToolTip text="Identifies the section to track it's performance">
            <i class="ri-information-line" />
        </ToolTip>
    </div>
    <slot />
</div>

<style lang="scss">
    .params {
        --bg: var(--neutral-2);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .name {
            font-size: 1.1rem;
        }
        .id {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }
        .tag-id {
            padding: 0.5rem;
            background-color: var(--neutral-3);
            border: 1px solid var(--neutral-7);
            border-radius: 3px;
            font-size: 0.7rem;
            display: inline-flex;
            margin-left: auto;
            justify-content: center;
            align-items: center;
            color: var(--neutral-9);
        }
    }
</style>
