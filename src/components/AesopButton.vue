<template>
  <button
    class="button"
    :class="`button--${variant} ${disabled ? 'disabled' : ''}`"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (variant) => ["primary", "secondary"].includes(variant)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  padding: 1.25rem;
  width: 100%;
  transition: background-color 300ms ease-in;

  &--primary {
    background-color: $primary;
    color: #fffef2;

    &:hover {
      background-color: #000;
    }

    &.disabled {
      background-color: #999;
      cursor: default;
      pointer-events: none;
    }
  }

  &--secondary {
    background-color: #eaeadf;
    color: $primary;

    &:hover {
      background-color: $background;
    }
  }
}
</style>
