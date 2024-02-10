<script>
  import Media from "../Components/Media.svelte";
  import TagInput from "../Components/TagInput.svelte";
  import { getUid } from "../utils";

  function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0),
      i = arr.length,
      temp,
      index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }
  const tags = ["a", "b", "c", "d"];

  let images = Array.from({ length: 40 }, (_, i) => ({
    src: `https://picsum.photos/seed/${i * 30}/300/200`,
    tags: getRandomSubarray(tags, 3),
    uploadTime: Date.now() + Math.floor(i + Math.random() * 100),
    id: getUid(),
  }));
</script>

<div>
  <Media mediaImages={images} />
</div>

<style lang="scss">
  div {
    display: flex;
    align-items: center;
    min-height: 100vh;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
