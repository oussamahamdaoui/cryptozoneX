<script>
  import Image from "../../../Components/Image.svelte";
  import Link from "../../../Components/Routing/Link.svelte";
  export let id = "some-id";
</script>

<Link href="/products/{id}/edit">
  <div class="preview">
    <div class="imgContainer">
      <Image src="https://picsum.photos/seed/{id}/300/300"></Image>
    </div>
    <div class="title">Some verry long long ass name</div>
    <div class="data"></div>
  </div>
</Link>

<style lang="scss">
  .preview {
    width: 100%;
    aspect-ratio: 5/6;
    background-color: var(--neutral-2);
    border: 1px solid var(--neutral-4);
    border-radius: 3px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    :global(img) {
      width: 100%;
      aspect-ratio: 7/5;
      object-fit: cover;
      border-radius: 2px;
    }

    .imgContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      :global(i) {
        position: absolute;
      }
    }

    .title {
      color: var(--neutral-12);
      text-wrap: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
    }
  }
</style>
