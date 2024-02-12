<script>
  import Image from "./Image.svelte";
  export let images = Array.from({ length: 10 }, (_, i) => ({
    src: `https://picsum.photos/seed/${i * 30}/900/800`,
  }));
  let selected = 0;
  /**
   *@type {HTMLElement}
   */
  let previewEl;
  const selectImage = (idx) => () => {
    selected = idx;
  };
  const next = () => {
    selected += 1;
    selected = selected % images.length;
  };

  const prev = () => {
    selected -= 1;
    selected = selected < 0 ? images.length - 1 : selected;
  };

  const scrollToSelected = (_) => {
    if (!previewEl) return;
    const img = /**@type {HTMLElement}*/ (previewEl.children[selected]);
    const parent = previewEl.parentElement;
    parent.scrollTo({
      behavior: "smooth",
      top: img.offsetTop,
      left: img.offsetLeft,
    });
    setTimeout(() => {
      img.focus();
    }, 10);
  };

  const handleKeys = (e) => {
    if (e.key.startsWith("Arrow")) {
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      prev();
    } else if (e.key === "ArrowRight") {
      next();
    } else if (e.key === "ArrowUp") {
      prev();
    } else if (e.key === "ArrowDown") {
      next();
    }
  };

  $: scrollToSelected(selected);
</script>

<div class="player" on:keydown={handleKeys} tabindex="0" role="listbox">
  <div class="preview">
    <div class="wrapper" bind:this={previewEl}>
      {#each images as img, i}
        <div
          class="img"
          class:selected={i === selected}
          tabindex="0"
          role="button"
          on:click={selectImage(i)}
          on:keydown={(e) => {
            if (e.key === "Enter") {
              selectImage(i)();
            }
          }}
        >
          <Image src={img.src}></Image>
        </div>
      {/each}
    </div>
  </div>
  <div class="slider">
    <div class="controls">
      <button on:click={prev}>
        <i class="ri-arrow-left-s-line" />
      </button>
      <button on:click={next}>
        <i class="ri-arrow-right-s-line" />
      </button>
    </div>
    <div class="images">
      <Image src={images[selected].src}></Image>
    </div>
  </div>
</div>

<style lang="scss">
  @use "../../globals.scss";
  .player {
    flex: 6;
    display: flex;
    gap: 1rem;
    height: 700px;
    grid-row-start: auto;
    position: sticky;
    top: 1rem;
    outline: none;
    .preview {
      flex: 1;
      overflow: auto;
      height: 700px;
      @include globals.hide-scrollbar;
      .wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .img {
        width: 100%;
        aspect-ratio: 1/1;
        background-color: var(--neutral-4);
        border: 1.5px solid transparent;
        min-width: fit-content;
        position: relative;
        outline: none;
        &:focus {
          border-color: var(--neutral-12);
        }
        :global(img) {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }
        &.selected {
          border-color: var(--neutral-12);
        }
      }
    }
    .slider {
      height: 700px;
      flex: 6;
      position: relative;
      .images {
        width: 100%;
        height: 100%;
        background-color: var(--neutral-4);
        position: relative;
        :global(img) {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }
      }
      .controls {
        position: absolute;
        width: 100%;
        padding: 2rem;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        top: 50%;
        z-index: 2;
        button {
          width: 30px;
          height: 30px;
          border-radius: 50px;
          border: none;
          background-color: var(--neutral-1);
          font-size: 1.2rem;
        }
      }
    }
  }

  @media (min-width: 300px) and (max-width: 1001px) {
    .player {
      position: relative;
      top: 0;
    }
  }
  @media (min-width: 300px) and (max-width: 601px) {
    .player {
      flex-direction: column-reverse;
      position: relative;
      top: 0;
      .preview {
        width: 100%;
        height: 90px;
        overflow-x: auto;
        flex: unset;
        .wrapper {
          flex-direction: row;
          height: 100%;
          .img {
            height: 100%;
            width: auto;
          }
        }
      }
      .slider {
        height: 500px;
        flex: unset;
        .controls {
          padding: 1rem;
        }
      }
    }
  }
</style>
