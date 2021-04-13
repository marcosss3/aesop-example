<template>
  <select
    v-bind="$attrs"
    :value="value"
    @change="$emit('input', $event.target.value)"
  >
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
select {
  padding: 0.75rem 1rem;
  background-color: transparent;
  color: $background;
  outline: none;
  cursor: pointer;

  &:hover {
    border: 1px solid #fff;
  }
}

.loading {
  & select {
    color: #666;
    border-color: #666;
    cursor: default;
    pointer-events: none;
  }
}
</style>
