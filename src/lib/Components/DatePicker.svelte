<script>
  import { getContext, tick } from "svelte";
  const t = getContext("t");
  /**
   * @type {'date'|'range'}
   */
  export let type = "date";
  const defaults = {
    date: null,
    range: [],
  };
  export let value = defaults[type];
  export let placeholder = "";

  let today = new Date();
  let firstDayW = 0;
  let isOpen = false;
  let hovered = null;
  let local = false;
  /**
   * @type {HTMLElement}
   */
  let ctnr;
  let showMonth = new Date();
  let days = daysOfMonth(showMonth);

  function daysOfMonth(d) {
    let start = new Date(d);
    start.setDate(1);
    const startMonth = start.getMonth();
    const days = [];
    while (start.getMonth() === startMonth) {
      days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return days;
  }
  function nextMonth() {
    showMonth.setMonth(showMonth.getMonth() + 1);
    showMonth.setDate(1);
    showMonth = showMonth;
  }
  function prevMonth() {
    showMonth.setMonth(showMonth.getMonth() - 1);
    showMonth.setDate(1);
    showMonth = showMonth;
  }
  function toToday() {
    showMonth = new Date();
  }

  function getMargin(w) {
    return [7, 8, 2, 3, 4, 5, 6][w];
  }

  /**
   *
   * @param {Date} date
   * @param {string} format
   */
  function formatDate(date, format) {
    const dateN = date.getDate();
    const yearN = date.getFullYear();
    const monthN = date.getMonth();
    const remap = [6, 0, 1, 2, 3, 4, 5];
    const weekDay = remap[date.getDay()];
    format = format
      .replaceAll("dd", dateN.toString().padStart(2, "0"))
      .replaceAll("d", dateN.toString())
      .replaceAll("mm", monthN.toString().padStart(2, "0"))
      .replaceAll("m", monthN.toString())
      .replaceAll("yyyy", yearN.toString())
      .replaceAll("yy", yearN.toString().slice(-2));
    const mp = {
      DD: $t("date.weekDays.l")[weekDay],
      D: $t("date.weekDays.s")[weekDay],
      MM: $t("date.months.l")[monthN],
      M: $t("date.months.s")[monthN],
    };
    const fullDays = [...format.matchAll(/DD/g)];
    const shortDays = [...format.matchAll(/(?!D)D(?!D)/g)];

    const fullMonts = [...format.matchAll(/MM/g)];
    const shortMonths = [...format.matchAll(/(?<!M)M(?!M)/g)];

    let scs = [...fullDays, ...shortDays, ...fullMonts, ...shortMonths]
      .filter((e) => e[0].length)
      .map((e) => {
        return [e.index, e.index + e[0].length];
      })
      .flat()
      .sort();
    scs = [0, ...scs, undefined];

    return scs
      .reduce((acc, c, i, arr) => {
        let prev = arr[i - 1] || 0;
        return [...acc, format.slice(prev, c)];
      }, [])
      .map((e) => {
        return mp[e] || e;
      })
      .join("");
  }

  const select = (d) => async () => {
    local = true;
    if (Array.isArray(value)) {
      if (value.length === 0 || value.length === 2) {
        value = [d];
      } else if (value.length === 1 && d >= value[0]) {
        value = [value[0], d];
      } else {
        value = [d];
      }
    } else {
      value = d;
    }
    await tick();
    local = false;
  };

  /**
   *
   * @param {Date} d1
   * @param {Date} d2
   */
  const sameDay = (d1, d2) => {
    if (d1 === d2) return true;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const between = (a, b) => (c) => {
    return c >= a && c <= b;
  };

  const isSelected = (day, ...t) => {
    if (Array.isArray(value)) {
      if (value.length === 0 && hovered) {
        return sameDay(day, hovered) ? "hovered" : "";
      }
      if (hovered && value[1] === undefined) {
        return sameDay(day, value[0])
          ? "selected"
          : hovered >= value[0] && between(value[0], hovered)(day)
            ? "hovered"
            : "";
      }
      return between(value[0], value[1])(day) ? "selected" : "";
    }
    return value && sameDay(day, value) ? "selected" : "";
  };

  const selectedDate = (..._) => {
    if (!value || value.length === 0) {
      return placeholder;
    }
    if (Array.isArray(value) && value.length === 2) {
      return `${formatDate(value[0], $t("date.format.xxs"))} - ${formatDate(
        value[1],
        $t("date.format.xxs")
      )}`;
    }
    if (Array.isArray(value) && value.length === 1) {
      return `${formatDate(value[0], $t("date.format.xxs"))} - `;
    }
    return formatDate(value, $t("date.format.xl"));
  };

  const hover = (day, _) => () => {
    hovered = day;
  };

  const valueUpdated = (_) => {
    if (local) return;
    value = value ?? defaults[type];
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (!ctnr) return;
      if (
        ctnr.contains(document.activeElement) ||
        document.activeElement === ctnr
      ) {
        isOpen = true;
      } else {
        isOpen = false;
      }
    }, 10);
  };

  $: days = daysOfMonth(showMonth);
  $: firstDayW = getMargin(days[0].getDay());

  $: valueUpdated(value);
</script>

<svelte:window on:focusin={handleBlur} on:focusout={handleBlur} />

<div
  class="date-picker"
  bind:this={ctnr}
  role="button"
  tabindex="0"
  class:isOpen
>
  <div class="input">
    <i class="ri-calendar-2-line"></i>
    <div class="label">
      <slot name="label" />
    </div>
    <div class="value" class:placeholder={!value || value.length === 0}>
      <slot name="value" {value}>
        {selectedDate(value, $t)}
      </slot>
    </div>
  </div>
  {#if isOpen}
    <div class="picker">
      <div class="head">
        <slot name="navigation" {nextMonth} {prevMonth} {value}>
          <h2>
            {$t(`date.months.l.${showMonth.getMonth()}`)}
            {"\n"}
            {showMonth.getFullYear()}
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
              {$t(`date.weekDays.s`)[d]}
            </div>
          {/each}
        </slot>
      </div>

      <div class="days">
        <div class="first" style="--w:{firstDayW}" />
        {#each days as day}
          <slot name="days" {day} {today} {value} {select}>
            <button
              on:click={select(day)}
              on:mouseover={hover(day, value)}
              on:focus={() => {}}
              class:today={sameDay(day, today)}
              class={isSelected(day, value, hovered)}>{day.getDate()}</button
            >
          </slot>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .date-picker {
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;

    outline: none;
    &.isOpen {
      z-index: 2;
    }

    &:focus,
    &:focus-within {
      .input {
        border: 1px solid var(--primary-8);
        .label {
          color: var(--primary-8);
        }
      }
    }

    .input {
      border: 1px solid var(--neutral-9);
      border-radius: 3px;
      min-height: 52px;
      display: flex;
      align-items: center;
      min-width: 250px;
      padding: 0.5rem;
      gap: 0.5rem;

      .value.placeholder {
        color: var(--neutral-8);
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
    }
    .picker {
      width: 250px;
      position: absolute;
      background-color: var(--neutral-3);
      border: 1px solid var(--neutral-7);
      border-radius: 5px;
      padding: 0.5rem;
      top: calc(100% + 0.5rem);
      .head {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        :global(h2) {
          margin-right: auto;
          font-size: 1.2rem;
        }
        :global(button) {
          background-color: transparent;
          align-self: flex-end;
          justify-self: flex-end;
          border: none;
          padding: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          &:nth-of-type(2) {
            padding: 0.3rem 0.5rem;
          }
          &:hover {
            background-color: var(--neutral-6);
          }
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
          position: relative;

          &.selected {
            background-color: var(--primary-9);
          }
          &.hovered {
            background-color: var(--primary-11);
          }
          &.today {
            &::after {
              background-color: var(--neutral-12);
              width: 3px;
              height: 3px;
              content: "";
              position: absolute;
              border-radius: 3px;
              left: calc(50% - 1.5px);
              top: calc(100% - 8px);
            }
          }
        }
      }
    }
  }
</style>
