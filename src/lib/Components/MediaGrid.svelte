<script>
  import Image from "./Image.svelte";

  /**@type {{src: string;tags: string[]; id:string}[]}*/
  export let images = [];
  export let commonTags = [];
  export let limit = Infinity;

  /**
   *
   * @param {{src: string;tags: string[]; id:string}} _
   */
  export let filter = (_) => true;

  export let sort = () => 0;

  export let selectedImages = new Set();

  let oldIntersection = [];

  const selectImage = (idx) => (evt) => {
    evt.preventDefault();
    if (!evt.shiftKey && !selectedImages.has(idx)) {
      selectedImages.clear();
      selectedImages.add(idx);
    } else if (!evt.shiftKey && selectedImages.size > 1) {
      selectedImages.clear();
      selectedImages.add(idx);
    } else if (selectedImages.has(idx)) {
      selectedImages.delete(idx);
    } else if (selectedImages.size < limit) {
      selectedImages.add(idx);
    } else {
      return;
    }
    selectedImages = selectedImages;
  };
  const updateDisplayedTags = () => {
    const fst = selectedImages.values().next().value;
    const intersection = new Set(images.find((i) => i.id === fst)?.tags || []);
    selectedImages.forEach((e) => {
      const img = images.find((i) => i.id === e);
      img.tags.forEach((t) => {
        if (!intersection.has(t)) {
          intersection.delete(t);
        }
      });
      intersection.forEach((t) => {
        if (!img.tags.includes(t)) {
          intersection.delete(t);
        }
      });
    });
    oldIntersection = [...intersection];
    commonTags = [...intersection];
  };
  const same = (a, b) => {
    if (a.length !== b.length) return false;
    return a.reduce((acc, c, i) => {
      return acc && c === b[i];
    }, true);
  };
  const updateImagesTags = () => {
    if (same(oldIntersection, commonTags)) return;
    const remove = oldIntersection.filter((e) => !commonTags.includes(e));
    const add = commonTags.filter((e) => !oldIntersection.includes(e));

    selectedImages.forEach((i) => {
      const img = images.find((e) => e.id === i);
      img.tags = [
        ...new Set([...img.tags.filter((e) => !remove.includes(e)), ...add]),
      ];
    });
    images = images;
    oldIntersection = commonTags;
  };
  $: commonTags && updateImagesTags();
  $: selectedImages && updateDisplayedTags();

  const showSellection = (target) => {
    const rect = target.getBoundingClientRect();
    const w = parseInt(target.style.getPropertyValue("--w"));
    const h = parseInt(target.style.getPropertyValue("--h"));
    const x = parseInt(target.style.getPropertyValue("--x"));
    const y = parseInt(target.style.getPropertyValue("--y"));

    [...target.children]
      .filter((e) => e.classList.contains("cell"))
      .map((e, i) => {
        const evt = e.getBoundingClientRect();
        let x = evt.left - rect.left;
        let y = evt.top - rect.top + target.scrollTop;
        e.classList.remove("selected");
        return {
          x,
          y,
          w: evt.width,
          h: evt.height,
          e,
        };
      })
      .filter((e) => {
        return (
          !(e.x > x + w || e.x + e.w < x) && !(e.y > y + h || e.y + e.h < y)
        );
      })
      .slice(0, limit)
      .forEach((d) => d.e.classList.add("selected"));
  };

  const multiselectionMove = (evt) => {
    /**
     * @type {HTMLElement}
     */
    const target = evt.currentTarget;
    const rect = target.getBoundingClientRect();
    let x = parseInt(target.style.getPropertyValue("--sx"));
    let y = parseInt(target.style.getPropertyValue("--sy"));
    if (isNaN(x)) return;

    let w = evt.clientX - rect.left;
    let h = evt.clientY - rect.top + target.scrollTop;

    target.style.setProperty("--w", `${Math.abs(w - x)}px`);
    target.style.setProperty("--h", `${Math.abs(h - y)}px`);
    target.style.setProperty("--x", `${Math.min(x, w)}px`);
    target.style.setProperty("--y", `${Math.min(y, h)}px`);

    if (evt.clientY - rect.top > rect.height - 20) {
      target.scrollTop += 10;
    }
    if (evt.clientY - rect.top < 10) {
      target.scrollTop -= 10;
    }

    showSellection(target);
  };

  const startSelection = (evt) => {
    /**
     * @type {HTMLElement}
     */
    const target = evt.currentTarget;
    const rect = target.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top + target.scrollTop;
    target.style.setProperty("--sx", `${x}px`);
    target.style.setProperty("--sy", `${y}px`);
  };

  const stopSelection = (evt) => {
    /**
     * @type {HTMLElement}
     */
    const target = evt.currentTarget;
    target.style.removeProperty("--x");
    target.style.removeProperty("--y");
    target.style.removeProperty("--w");
    target.style.removeProperty("--h");
    target.style.removeProperty("--sx");
    target.style.removeProperty("--sy");
    [...target.children].forEach((e) => {
      if (!selectedImages.has(e.getAttribute("data-id"))) {
        e.classList.remove("selected");
      }
    });
  };

  const endSelection = (evt) => {
    /**
     * @type {HTMLElement}
     */
    const target = evt.currentTarget;
    const rect = target.getBoundingClientRect();

    const w = parseInt(target.style.getPropertyValue("--w"));
    const h = parseInt(target.style.getPropertyValue("--h"));
    const x = parseInt(target.style.getPropertyValue("--x"));
    const y = parseInt(target.style.getPropertyValue("--y"));
    if (isNaN(w) || w * h < 20) {
      target.style.removeProperty("--x");
      target.style.removeProperty("--y");
      target.style.removeProperty("--w");
      target.style.removeProperty("--h");
      target.style.removeProperty("--sx");
      target.style.removeProperty("--sy");
      return;
    }

    const items = [...target.children]
      .filter((e) => e.classList.contains("cell"))
      .map((e) => {
        const evt = e.getBoundingClientRect();
        let x = evt.left - rect.left;
        let y = evt.top - rect.top + target.scrollTop;
        e.classList.remove("selected");
        return {
          x,
          y,
          w: evt.width,
          h: evt.height,
          e,
        };
      })
      .filter((e) => {
        return (
          !(e.x > x + w || e.x + e.w < x) && !(e.y > y + h || e.y + e.h < y)
        );
      })
      .slice(0, limit)
      .map((e) => e.e.getAttribute("data-id"));

    selectedImages = new Set(items);
    target.style.removeProperty("--x");
    target.style.removeProperty("--y");
    target.style.removeProperty("--w");
    target.style.removeProperty("--h");
    target.style.removeProperty("--sx");
    target.style.removeProperty("--sy");
  };

  const handleShortcuts = (evt) => {
    const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    if (evt.key === "a" && ((isApple && evt.ctrlKey) || evt.metaKey)) {
      evt.preventDefault();
      selectedImages = new Set(images.map((e) => e.id));
    }
  };

  $: show = [...images].sort(sort).filter(filter);
</script>

<div
  class="gallery"
  on:mousemove={multiselectionMove}
  on:mousedown={startSelection}
  on:mouseup={endSelection}
  on:keydown={handleShortcuts}
  on:mouseleave={stopSelection}
  on:blur={() => {}}
  role="grid"
  tabindex="0"
>
  <div class="rect"></div>
  {#each show as img (img)}
    <div
      class="cell"
      class:selected={selectedImages.has(img.id)}
      on:click={selectImage(img.id)}
      tabindex="0"
      role="button"
      on:keydown={() => {}}
      data-id={img.id}
    >
      <div class="wpr">
        <Image src={img.src}></Image>
        <!-- <img src={img.src} loading="lazy" alt="" /> -->
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .gallery {
    display: grid;
    flex: 1;
    overflow-y: auto;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 2px;
    align-content: start;
    border-radius: 5px;
    padding: 0.5rem;
    position: relative;
    .rect {
      position: absolute;
      left: var(--x);
      top: var(--y);
      width: var(--w, 0px);
      height: var(--h, 0px);
      background-color: var(--primary-7);
      opacity: 0.5;
      border: 1px solid var(--primary-6);
      z-index: 3;
      pointer-events: none;
    }

    user-select: none; /* CSS3 (little to no support) */
    -ms-user-select: none; /* IE 10+ */
    -moz-user-select: none; /* Gecko (Firefox) */
    -webkit-user-select: none;

    .cell {
      aspect-ratio: 1/1;
      border: 1px solid transparent;
      border-radius: 3px;
      cursor: pointer;
      outline: none;
      .wpr {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        &::after {
          width: 100%;
          height: 100%;
          position: absolute;
          background-color: var(--neutral-1);
          opacity: 0.5;
          content: "";
          z-index: 1;
          transition: background-color 100ms ease-in-out;
        }
      }
      &:hover {
        .wpr {
          &::after {
            opacity: 0;
          }
        }
        :global(img) {
          transform: scale(1.1);
        }
      }
      :global(img) {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        object-position: center center;
        transition: transform 100ms ease-in-out;
      }
      &.selected {
        border: 1px solid var(--primary-11);
        .wpr {
          &::after {
            opacity: 0;
          }
        }
      }
    }
  }
</style>
