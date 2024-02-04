<script>
  import { getContext } from "svelte";
  const t = getContext("t");

  export let value = new Date();
  let today = new Date();
  let firstDayW = 0;
  let isOpen = false;
  let daysOfMonth = (d) => {
    let start = new Date(d);
    start.setDate(1);
    const startMonth = start.getMonth();
    const days = [];
    while (start.getMonth() === startMonth) {
      days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return days;
  };
  const nextMonth = () => {
    value.setMonth(value.getMonth() + 1);
    value.setDate(1);
    value = value;
  };
  const prevMonth = () => {
    value.setMonth(value.getMonth() - 1);
    value.setDate(1);
    value = value;
  };
  const toToday = () => {
    value = new Date();
  };
  const getMargin = (w) => {
    if (w !== 0 && w !== 1) return w;
    if (w === 0) return 7;
    if (w === 1) return 8;
  };
  let days = daysOfMonth(value);
  $: days = daysOfMonth(value);
  $: firstDayW = getMargin(days[0].getDay());
</script>

<div class="date-picker">
  <div class="input">
    <slot name="value" {value}>
      {value}
    </slot>
  </div>
  {#if isOpen}
    <div class="picker">
      <div class="head">
        <slot name="navigation" {nextMonth} {prevMonth} {value}>
          <h2>
            {$t(`date.months.full.${value.getMonth()}`)}
            {value.getFullYear()}
          </h2>
          <button on:click={prevMonth}>
            <i class="ri-arrow-drop-left-line" />
          </button>
          <button on:click={toToday}>
            {$t(`date.today`)}
          </button>
          <button on:click={nextMonth}>
            <i class="ri-arrow-drop-right-line" />
          </button>
        </slot>
      </div>
      <div class="week-days">
        <slot name="week-days">
          {#each { length: 7 } as _, d}
            <div class="week-day">
              {$t(`date.weekDays.short`)[d]}
            </div>
          {/each}
        </slot>
      </div>

      <div class="days">
        <div class="first" style="--w:{firstDayW}" />
        {#each days as day}
          <slot name="days" {day} {today} {value}>
            <button>{day.getDate()}</button>
          </slot>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .date-picker {
    width: 300px;
    .head {
      display: flex;
      :global(h2) {
        margin-right: auto;
        font-size: 1.2rem;
      }
      :global(button) {
        background-color: transparent;
        align-self: flex-end;
        justify-self: flex-end;
      }
    }
    .week-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      font-size: 0.7rem;
      div {
        text-align: center;
      }
    }
    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      .first {
        grid-column-end: var(--w);
        display: flex;
      }
      :global(button) {
        background-color: transparent;
        aspect-ratio: 1;
        border: none;
      }
    }
  }
</style>
