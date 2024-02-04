<script>
  import { getContext } from "svelte";
  const t = getContext("t");
</script>

<div class="section1">
  <div class="img"></div>
  <div class="content">
    <h2>Title</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic
      reprehenderit possimus repudiandae. Repudiandae minima neque harum.
    </p>
    <button>{$t("globals.shopNow")}</button>
  </div>
</div>

<style lang="scss">
  @use "/src/globals.scss";

  .section1 {
    padding: 2rem;
    position: relative;
    .img {
      height: 500px;
      background-color: var(--neutral-5);
    }
    .content {
      position: absolute;
      top: calc(100% - 5rem);
      right: 5rem;
      width: 25%;
      transform: translateY(-100%);
      min-width: 200px;
      p {
        font-size: 0.8rem;
      }
      h2 {
        font-size: 3rem;
        margin-bottom: 0.1rem;
      }
      button {
        @include globals.button;
        margin-top: 1rem;
        background-color: transparent;
      }
    }
  }
  @media (min-width: 300px) and (max-width: 801px) {
    .section1 {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      .content {
        position: relative;
        transform: none;
        right: auto;
        top: auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-end;
        h2 {
          margin-top: 1rem;
        }
        p {
          text-align: end;
        }
      }
    }
  }
</style>
