<script>
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";
  import { fileSelector, getUid } from "../utils";
  import TagInput from "./TagInput.svelte";
  import MediaGrid from "./MediaGrid.svelte";
  import { createEventDispatcher } from "svelte";

  export let limit = Infinity;
  export let tagsLabel = "Add tags";

  /**@type {ImageMedia[]}*/
  export let mediaImages = [
    {
      src: "https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3_/UI/Paint_StealthGrey.png",
      id: getUid(),
      tags: ["tesla color"],
      uploadTime: Date.now(),
    },
    {
      src: "https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_White.png?",
      id: getUid(),
      tags: ["tesla color"],
      uploadTime: Date.now(),
    },
    {
      src: "https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_Blue.png?",
      id: getUid(),
      tags: ["tesla color"],
      uploadTime: Date.now(),
    },
    {
      src: "https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_Black.png?",
      id: getUid(),
      tags: ["tesla color"],
      uploadTime: Date.now(),
    },
    {
      src: "https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_Red.png?",
      id: getUid(),
      tags: ["tesla color"],
      uploadTime: Date.now(),
    },
    {
      src: "https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODELY/UI/gemini_wheels.png?",
      id: getUid(),
      tags: ["tesla wheels"],
      uploadTime: Date.now(),
    },
    {
      src: "https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODELY/UI/induction_wheels.png?",
      id: getUid(),
      tags: ["tesla wheels"],
      uploadTime: Date.now(),
    },
    {
      src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-pro-finish-naturaltitanium-202309?wid=204&amp;hei=204&amp;fmt=jpeg&amp;qlt=90&amp;.v=1692895385156",
      id: getUid(),
      tags: ["apple color"],
      uploadTime: Date.now(),
    },
    {
      src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-pro-finish-bluetitanium-202309?wid=204&amp;hei=204&amp;fmt=jpeg&amp;qlt=90&amp;.v=1692895385157",
      id: getUid(),
      tags: ["apple color"],
      uploadTime: Date.now(),
    },
    {
      src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-pro-finish-whitetitanium-202309?wid=204&amp;hei=204&amp;fmt=jpeg&amp;qlt=90&amp;.v=1692895385155",
      id: getUid(),
      tags: ["apple color"],
      uploadTime: Date.now(),
    },
  ];

  /**
   *
   * @param {ImageMedia[]} images
   */
  export let upload = async (images) => true;

  /**
   * @type {"import"|"gallery"}
   */
  export let defaultPanel = "import";

  /**
   * @type {ImageMedia|ImageMedia[]}
   */
  export let value = null;

  /**
   * @typedef {({src: string;tags: string[]; uploadTime:number, id:string})} ImageMedia
   * **/

  let sort = 0;
  /**@type {ImageMedia[]}*/
  let toUpload = [];
  let selectedImages = new Set();
  let outputImages = new Set();
  let allTags = [];

  const sortFns = [
    (..._) => 0,
    /**
     * @param {ImageMedia} a
     * @param {ImageMedia} b
     */
    (a, b) => b.uploadTime - a.uploadTime,
    /**
     * @param {ImageMedia} a
     * @param {ImageMedia} b
     */
    (a, b) => a.uploadTime - b.uploadTime,
  ];

  let filterText = [];
  let drag = false;

  $: active = outputImages.size > 0;

  const dispatch = createEventDispatcher();

  const clearImages = () => {
    toUpload = [];
  };

  const handleFiles = async (files) => {
    selectedImages.clear();
    toUpload = (
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
    ).map((e) => {
      const img = {
        id: getUid(),
        src: e,
        tags: [],
        uploadTime: Date.now(),
      };
      selectedImages.add(img.id);
      return img;
    });
    selectedImages = selectedImages;
  };
  const uploadFiles = async () => {
    const files = await fileSelector(true);
    await handleFiles(files);
  };

  const dropFiles = async (ev) => {
    ev.preventDefault();
    drag = false;
    /**
     * @type {File[]}
     */
    let files = [];
    if (ev.dataTransfer.items) {
      files = [...ev.dataTransfer.items]
        .filter((item) => {
          return item.kind === "file";
        })
        .map((e) => e.getAsFile());
    } else {
      files = [...ev.dataTransfer.files];
    }
    files = files.filter((e) => e.type.startsWith("image/"));
    handleFiles(files);
  };

  const handleUpload = async () => {
    if (await upload(toUpload)) {
      mediaImages = [...toUpload, ...mediaImages];
      toUpload = [];
      defaultPanel = "gallery";
    }
  };

  const dragOver = (e) => {
    drag = true;
    e.preventDefault();
  };
  const dragLeave = (e) => {
    drag = false;
  };

  /**
   *
   * @param {string} s
   * @param {string} v
   */
  const fuzzySearch = (s, v) => {
    return s === v || v.toLowerCase().includes(s.toLowerCase());
  };

  const select = () => {
    const vl = [...outputImages.values()].map((id) => {
      return mediaImages.find((e) => e.id === id);
    });
    if (limit === 1) {
      value = vl[0];
    } else {
      value = vl;
    }
    dispatch("submit", value);
  };

  const valueChange = (_) => {
    const vl = [value || []].flat().slice(0, limit);
    outputImages = new Set(vl.map((e) => e.id));
  };

  $: valueChange(value);

  $: filter = (/** @type {ImageMedia} */ e) =>
    filterText.length === 0 ||
    e.tags.some((t) => filterText.some((s) => fuzzySearch(s, t)));
</script>

<div class="media">
  <Tabs bind:selected={defaultPanel}>
    <slot slot="head" let:selected let:select>
      {#if toUpload.length > 0}
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
        {#if toUpload.length === 0}
          <div
            class="drop"
            on:drop={dropFiles}
            on:dragover={dragOver}
            on:dragleave={dragLeave}
            class:drag
            aria-dropeffect="copy"
            role="group"
          >
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
            <MediaGrid
              images={toUpload}
              bind:commonTags={allTags}
              bind:selectedImages
            ></MediaGrid>
            <div class="tags">
              <TagInput
                label={tagsLabel}
                bind:value={allTags}
                disabled={selectedImages.size === 0}
              ></TagInput>
              <button class="validate" on:click={handleUpload}>Upload</button>
            </div>
          </div>
        {/if}
      </Tab>
      <Tab name="gallery" {selected}>
        <div class="filter">
          <TagInput
            placeholder="Search by tag"
            label="Search"
            bind:value={filterText}
          >
            <slot slot="iconRight">
              <i class="ri-search-line"></i>
            </slot>
          </TagInput>
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
        <MediaGrid
          {limit}
          images={mediaImages}
          bind:sort={sortFns[sort]}
          bind:selectedImages={outputImages}
          {filter}
        ></MediaGrid>
        <button class="submit" on:click={select} class:active
          >Confirm Selection</button
        >
      </Tab>
    </slot>
  </Tabs>
</div>

<style lang="scss">
  .media {
    display: flex;
    flex-direction: column;
    height: 360px;
    max-height: 380px;
    width: 100%;
    position: relative;
    z-index: 1;
    :global(.head) {
      padding: 0.5rem !important;
      border-bottom: none !important;
      background-color: transparent !important;
    }
    :global(.head .selected) {
      color: var(--primary-9);
    }
    :global(.tabs),
    :global(.tab) {
      display: contents;
      overflow: hidden;
    }

    .submit {
      align-self: center;
      background-color: var(--primary-4);
      border: 1px solid var(--primary-8);
      border-radius: 3px;
      padding: 1rem 2rem;
      opacity: 0.3;
      pointer-events: none;
      &.active {
        opacity: 1;
        pointer-events: all;
      }
    }
    :global(.tag-input) {
      flex: 1;
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

    .addTags {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      position: relative;

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
      &.drag {
        border-color: var(--primary-10);
      }
      h3 {
        font-size: smaller;
        text-align: center;
      }
      p {
        color: var(--neutral-8);
        font-size: smaller;
        text-align: center;
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
