<template>
  <section class="cart container" :class="{ opened: cartOpen }">
    <div class="wrapper">
      <!-- Cart items -->
      <div class="table__wrapper">
        <div class="table__row">
          <div class="table__column--first">Cart</div>
          <div class="table__column">Size</div>
          <div class="table__column">Quantity</div>
          <div class="table__column--last">
            <button class="close-button" @click="$emit('toggleCart')">
              &#x2715;
            </button>
          </div>
        </div>
        <transition-group name="remove">
          <div
            class="table__row"
            :class="{ loading: item === loadingItem }"
            v-for="item in cart"
            :key="item.sku"
          >
            <div class="table__column--first">{{ item.name }}</div>
            <div class="table__column">{{ item.size }}</div>
            <div class="table__column">
              <aesop-select
                class="mr-2"
                name="size"
                :options="sizes"
                :value="item.quantity"
                @input="updateQuantity($event, item)"
              />
              <button class="remove-button" @click="remove(item)">
                Remove
              </button>
            </div>
            <div class="table__column--last">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </transition-group>
      </div>
      <!-- Price breakdown -->
      <div class="price__wrapper">
        <p>Enjoy complimentary shipping on all orders.</p>
        <div class="price__subtotal">
          <span>Subtotal (Tax Incl.) </span>
          <span class="price__subtotal-value">
            {{ formatPrice(totalPrice) }}
          </span>
        </div>
        <aesop-button variant="secondary">Checkout</aesop-button>
      </div>
    </div>
  </section>
</template>

<script>
import AesopButton from "@/components/AesopButton";
import AesopSelect from "@/components/AesopSelect";
import { mapState, mapGetters } from "vuex";

export default {
  components: { AesopButton, AesopSelect },
  props: {
    cartOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loadingItem: null,
      sizes: [1, 2, 3, 4, 5]
    };
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["totalItems", "totalPrice"])
  },
  methods: {
    async remove(item) {
      this.loadingItem = item;
      await this.$store.dispatch("removeFromCart", item.sku);
      this.loadingItem = null;
      if (this.totalItems === 0) {
        this.$emit("toggleCart");
      }
    },
    async updateQuantity(quantity, item) {
      this.loadingItem = item;
      await this.$store.dispatch("updateCartQuantity", {
        sku: item.sku,
        quantity: parseInt(quantity)
      });
      this.loadingItem = null;
    },
    formatPrice(price) {
      return `£${price.toFixed(2)}`;
    }
  }
};
</script>

<style scoped lang="scss">
.cart {
  color: $background;
  max-height: 0;
  background-color: $primary;
  overflow: hidden;
  transition: all 600ms ease-in;

  &.opened {
    max-height: 100vh;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
}

.table {
  &__wrapper {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
  }

  &__row {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 254, 242, 0.1);
    transition: all 200ms ease-in;

    &:first-child {
      border-bottom: 2px solid rgba(255, 254, 242, 0.1);
    }

    &:hover {
      .remove-button {
        opacity: 1;
      }
    }

    &.loading {
      color: #666;

      .remove-button {
        cursor: default;
        pointer-events: none;
      }
    }
  }

  &__column {
    width: 25%;

    &--first {
      flex-grow: 1;
    }

    &--last {
      width: 5%;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.remove-button {
  opacity: 0;
  transition: all 200ms ease-in;
  color: #999;

  &:hover {
    color: $background;
    cursor: pointer;
  }
}

.price {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    width: 30%;
    padding: 1.5rem 0;
  }

  &__subtotal {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;

    &-value {
      font-size: 2rem;
    }
  }
}

.close-button {
  color: #999;
  font-size: 1.25rem;

  &:hover {
    color: $background;
  }
}

.remove-enter-active,
.remove-leave-active {
  transition: opacity 0.5s;
}
.remove-enter, .remove-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media only screen and (max-width: $md) {
  .price__wrapper {
    width: 100%
  }
}
</style>
