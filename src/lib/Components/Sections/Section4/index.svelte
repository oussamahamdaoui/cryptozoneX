<script>
  import { getContext } from "svelte";
  const t = getContext("t");
</script>

<div class="section4">
  <div class="row">
    <div class="img fst" />
    <div class="img snd" />
  </div>
  <div class="row">
    <h1 class="fst">
      {$t("homePage.title")}
    </h1>
    <div class="snd">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
        doloribus est corrupti nihil provident nam ipsam voluptas nemo
        voluptatum porro, inventore delectus asperiores consectetur
        reprehenderit omnis accusantium atque itaque autem.
      </p>
      <button class="button secondary">{$t("homePage.shopNow")}</button>
    </div>
  </div>
</div>

<style lang="scss">
  @use "/src/globals.scss";
  .section4 {
    padding: 2rem;
  }
  .row {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    h1 {
      font-size: 3rem;
      text-transform: capitalize;
    }
    p {
      font-size: 0.8rem;
      line-height: 1.5rem;
    }
    .fst {
      flex: 5;
    }
    .snd {
      flex: 4;
    }
    .img {
      width: 100%;
      height: 500px;
      background-color: var(--neutral-5);
    }
    .button.secondary {
      @include globals.button;
      background-color: transparent;
      margin-top: 1rem;
    }
  }
  @media (min-width: 300px) and (max-width: 801px) {
    .section4 {
      h1 {
        font-size: 2.5rem;
      }
      .row:last-of-type {
        flex-direction: column;
      }
      .img.fst {
        display: none;
      }
    }
  }
</style>
