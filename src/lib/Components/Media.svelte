<script>
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";
  import Input from "./Input.svelte";
  import { upload } from "../utils";
  import TagInput from "./TagInput.svelte";

  let sort = 0;
  /**@type {{src: string;tags: string[];}[]}*/
  let images = [];
  let selectedImages = new Set();
  let allTags = [];
  export let limit = 1;

  export let tagsLabel = undefined;
  const clearImages = () => {
    images = [];
    selectedImages = new Set();
  };
  const uploadFiles = async () => {
    const files = await upload(true);
    images = (
      await Promise.all(
        files.map((e) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(e);
            reader.onload = (evt) => {
              resolve(evt.target.result);
            };
          });
        })
      )
    ).map((e) => ({
      src: e,
      tags: [],
    }));
  };
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
    } else {
      selectedImages.add(idx);
    }
    selectedImages = selectedImages;
  };
  const updateDisplayedTags = () => {
    const fst = selectedImages.values().next().value;
    const intersection = new Set(images[fst]?.tags || []);
    selectedImages.forEach((e) => {
      images[e].tags.forEach((t) => {
        if (!intersection.has(t)) {
          intersection.delete(t);
        }
      });
      intersection.forEach((t) => {
        if (!images[e].tags.includes(t)) {
          intersection.delete(t);
        }
      });
    });
    oldIntersection = [...intersection];
    allTags = [...intersection];
  };
  const same = (a, b) => {
    if (a.length !== b.length) return false;
    return a.reduce((acc, c, i) => {
      return acc && c === b[i];
    }, true);
  };
  const updateImagesTags = () => {
    if (same(oldIntersection, allTags)) return;
    const remove = oldIntersection.filter((e) => !allTags.includes(e));
    const add = allTags.filter((e) => !oldIntersection.includes(e));

    selectedImages.forEach((i) => {
      images[i].tags = [
        ...new Set([
          ...images[i].tags.filter((e) => !remove.includes(e)),
          ...add,
        ]),
      ];
    });
    images = images;
    oldIntersection = allTags;
  };
  $: allTags && updateImagesTags();
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
      e.classList.remove("selected");
    });
    selectedImages = selectedImages;
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

    if (isNaN(w)) {
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
          i,
        };
      })
      .filter((e) => {
        return (
          !(e.x > x + w || e.x + e.w < x) && !(e.y > y + h || e.y + e.h < y)
        );
      })
      .map((e) => e.i);

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
      selectedImages = new Set(
        Array.from({ length: images.length }, (_, i) => i)
      );
    }
  };
</script>

<div class="media">
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <Tabs selected="import">
    <slot slot="head" let:selected let:select>
      {#if images.length > 0}
        <button on:click={clearImages}>
          <i class="ri-arrow-left-line"></i>
        </button>
      {/if}
      <button
        class:selected={selected === "import"}
        on:click={select("import")}
      >
        Import
      </button>
      <button
        class:selected={selected === "gallery"}
        on:click={select("gallery")}
      >
        Gallery
      </button>
    </slot>
    <slot slot="tabs" let:selected>
      <Tab name="import" {selected}>
        {#if images.length === 0}
          <div class="drop">
            <i class="ri-upload-line"></i>
            <h3>
              Drag & Drop or <button class="upload" on:click={uploadFiles}
                >Choose Image</button
              >
            </h3>
            <p>Max size is 2400x2400, max 10MB per image</p>
          </div>
        {:else}
          <div class="addTags">
            <div
              class="gallery"
              on:mousemove={multiselectionMove}
              on:mousedown={startSelection}
              on:mouseup={endSelection}
              on:keydown={handleShortcuts}
              on:mouseleave={stopSelection}
              on:blur={() => {}}
              role="group"
            >
              <div class="rect"></div>
              {#each images as img, i}
                <div
                  class="cell"
                  class:selected={selectedImages.has(i)}
                  on:click={selectImage(i)}
                  tabindex="0"
                  role="button"
                  on:keydown={() => {}}
                >
                  <div class="wpr">
                    <img src={img.src} alt="" />
                  </div>
                </div>
              {/each}
            </div>
            <div class="tags">
              <TagInput label={tagsLabel || "Add tags"} bind:value={allTags}
              ></TagInput>
              <button class="validate">Upload</button>
            </div>
          </div>
        {/if}
      </Tab>
      <Tab name="gallery" {selected}>
        <div class="filter">
          <Input placeholder="Search by tag">
            <slot slot="label">Search</slot>
            <slot slot="iconRight">
              <i class="ri-search-line"></i>
            </slot>
          </Input>
          <button
            class="sort"
            class:active={sort > 0}
            on:click={() => (sort = (sort + 1) % 3)}
          >
            {#if sort === 0}
              <span>Sort</span>
            {:else if sort === 1}
              <i class="ri-sort-desc"></i>
            {:else}
              <i class="ri-sort-asc"></i>
            {/if}
          </button>
        </div>
        <div class="gallery">
          <div class="rect"></div>
          {#each { length: 40 } as _, i}
            <div class="cell">
              <div class="wpr">
                <img src="https://picsum.photos/seed/{i * 30}/300/200" alt="" />
              </div>
            </div>
          {/each}
        </div>
      </Tab>
    </slot>
  </Tabs>
</div>

<style lang="scss">
  .media {
    display: flex;
    flex-direction: column;
    height: 360px;
    max-height: 360px;
    width: 100%;
    :global(.head) {
      padding: 0.5rem !important;
      border-bottom: none !important;
      background-color: transparent !important;
    }
    :global(.tabs),
    :global(.tab) {
      display: contents;
      overflow: hidden;
    }
    .selected {
      background-color: var(--neutral-3);
    }
    .filter {
      padding-bottom: 0.5rem;
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
      :global(.input) {
        flex: 1;
      }
      .ri-search-line {
        align-self: center;
        justify-self: center;
        margin-right: 0.5rem;
        color: var(--neutral-10);
      }
      button {
        background-color: var(--neutral-3);
        border: 1px solid var(--neutral-5);
        width: 120px;
        border-radius: 3px;
        color: var(--neutral-11);
        &:hover {
          border: 1px solid var(--neutral-7);
          background-color: var(--neutral-5);
          color: var(--neutral-12);
        }
        &.active {
          color: var(--primary-12);
          background-color: var(--primary-3);
          border: 1px solid var(--primary-5);
          &:hover {
            border: 1px solid var(--primary-7);
            background-color: var(--primary-5);
          }
        }
      }
    }
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
          border: 1px solid var(--primary-10);
          img {
            transform: scale(1.1);
          }
        }
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          object-fit: cover;
          object-position: center center;
          transition: transform 100ms ease-in-out;
        }
      }
    }
    .addTags {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      position: relative;
      .gallery {
        margin-bottom: 1rem;
      }

      .selected {
        border: 1px solid var(--primary-11);
        .wpr {
          &::after {
            opacity: 0;
          }
        }
      }
      .validate {
        background-color: var(--primary-6);
        padding: 0 1rem;
        border: 1px solid var(--primary-8);
        border-radius: 3px;
      }
      .tags {
        display: flex;
        gap: 0.5rem;
        :global(.tag-input) {
          flex: 1;
        }
      }
    }
    .drop {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
      gap: 1rem;
      border: 1px dashed var(--neutral-8);
      border-radius: 5px;
      h3 {
        font-size: smaller;
      }
      p {
        color: var(--neutral-8);
        font-size: smaller;
      }
      button {
        background-color: transparent;
        border: none;
        font-size: 1em;
        color: var(--primary-10);
      }
      i {
        font-weight: bold;
        font-size: larger;
      }
    }
  }
</style>
