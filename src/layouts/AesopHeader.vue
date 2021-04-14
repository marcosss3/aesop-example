<template>
  <header>
    <div class="container header">
      <nav>
        <ul class="nav__list">
          <li class="nav__list-item">
            <button>Shop</button>
          </li>
          <li class="nav__list-item">
            <button>Read</button>
          </li>
          <li class="nav__list-item">
            <button>Stores</button>
          </li>
          <li class="nav__list-item">
            <button>Search</button>
          </li>
        </ul>
      </nav>
      <div>
        <ul class="nav__list">
          <li class="nav__list-item">
            <button>Login</button>
          </li>
          <li class="nav__list-item">
            <button @click="toggleCart">
              Cart
              <span v-if="totalItems > 0" class="ml-1">
                {{ totalItems }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["totalItems"])
  },
  methods: {
    toggleCart() {
      if (this.totalItems > 0) {
        this.$emit("toggleCart");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav {
  &__list {
    display: flex;

    &-item {
      margin-right: 1.5rem;
      position: relative;

      &:last-child {
        margin-right: 0;
      }

      &::after {
        content: "";
        background-color: $primary;
        height: 1px;
        width: 0;
        position: absolute;
        left: 0;
        bottom: -2px;
        transition: width 200ms ease-in;
      }

      &:hover::after {
        width: 100%;
      }

      & > button {
        color: $primary;
      }
    }
  }
}
</style>
