<template>
  <div class="radios">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="radios__wrapper"
    >
      <label>
        <input
          type="radio"
          :id="index"
          :name="name"
          :value="option"
          :checked="value === option"
          v-bind="$attrs"
          class="radios__input"
          @change="$emit('input', option)"
        />
        <slot :option="option">
          {{ option }}
        </slot>
      </label>
    </div>
  </div>
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
      type: [Object, Boolean, String],
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
.radios {
  &__wrapper {
    display: inline;
    margin: 0 1rem;
  }

  & input {
    margin-right: 0.5rem;
  }

  & label {
    cursor: pointer;
  }
}
</style>
