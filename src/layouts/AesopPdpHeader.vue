<template>
  <form class="container pdp-header" @submit.prevent="addToCart">
    <!-- Image -->
    <div class="product-image__container">
      <div class="product-image__wrapper">
        <div
          class="product-image__img-container"
          :style="{ height: `${imageHeight}` }"
        >
          <transition name="fade">
            <img
              key="100mL"
              v-if="currentProduct.size === '100mL'"
              src="@/assets/img/product-01.png"
              class="product-image__img"
            />
            <img
              key="200mL"
              v-if="currentProduct.size === '200mL'"
              src="@/assets/img/product-02.png"
              class="product-image__img"
            />
          </transition>
        </div>
        <div class="product-image__radios">
          <aesop-radios
            :options="products"
            name="currentProduct"
            v-model="currentProduct"
            @input="currentProduct = $event"
          >
            <template v-slot:default="{ option }">
              {{ option.size }}
            </template>
          </aesop-radios>
        </div>
      </div>
    </div>
    <!-- Information -->
    <div class="product-info__wrapper">
      <h1 class="product-info__title">{{ currentProduct.name }}</h1>
      <p class="mb-2">
        A gentle gel-based formulation that cleanses thoroughly without drying
        the skin or stripping its natural oils.
      </p>
      <ul class="product-info__details-list mb-2">
        <li class="product-info__details-item">
          <p class="product-info__details-item-title">Suited to</p>
          <p class="product-info__details-item-value">Combination skin</p>
        </li>
        <li class="product-info__details-item">
          <p class="product-info__details-item-title">Skin feel</p>
          <p class="product-info__details-item-value">
            Purified, soft, refreshed
          </p>
        </li>
        <li class="product-info__details-item">
          <p class="product-info__details-item-title">Key ingredients</p>
          <p class="product-info__details-item-value">
            Witch Hazel, Salicylic Acid, Sage Leaf
          </p>
        </li>
      </ul>
      <aesop-button
        type="submit"
        :class="{ loading: loading }"
        :disabled="loading"
      >
        {{ loading ? "..." : "Add to your cart — £23.00" }}
      </aesop-button>
    </div>
  </form>
</template>

<script>
import AesopRadios from "@/components/AesopRadios";
import AesopButton from "@/components/AesopButton";

export default {
  components: { AesopRadios, AesopButton },
  data() {
    return {
      windowWidth: window.innerWidth,
      products: [
        { sku: 101, name: "In Two Minds Facial Cleanser", size: "100mL", price: 23 },
        { sku: 102, name: "In Two Minds Facial Cleanser", size: "200mL", price: 35 }
      ],
      currentProduct: null,
      loading: false
    };
  },
  created() {
    this.currentProduct = this.products[0];
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    imageHeight() {
      return `${this.windowWidth / 3}px`;
    }
  },
  methods: {
    async addToCart() {
      this.loading = true;
      await this.$store.dispatch("addToCart", {
        ...this.currentProduct,
        quantity: 1
      });
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position: absolute;
}

.pdp-header {
  display: flex;
  margin: 6rem 0;
}

.product-image {
  &__container {
    width: 66.66%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  &__wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    position: relative;
  }

  &__img {
    width: 100%;
    height: auto;
  }

  &__img-container {
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
}

.product-info {
  &__wrapper {
    width: 33.33%;
    padding-right: 4.5%;
    position: relative;
  }

  &__title {
    font-weight: 400;
  }

  &__details {
    &-list {
      border-top: 2px solid $primary;
    }

    &-item {
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-bottom: none;
      }

      &-title {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      &-value {
        margin-top: 0;
        color: $secondary;
      }
    }
  }
}

@media only screen and (max-width: $md) {
  .container {
    flex-direction: column;
  }

  .product-image {
    &__container {
      width: 100%;
      justify-content: center;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

    &__wrapper {
      width: 50%;
      height: auto;
    }
  }

  .product-info {
    &__wrapper {
      width: 100%;
    }
  }
}
</style>
