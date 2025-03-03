<template>
  <button :type="type" :disabled="disabled" @click="handleClick" :class="[
    'px-4 py-4 w-fit rounded-lg focus:outline-none focus:ring-2 font-semibold mt-2 transition-all',
    disabled
      ? 'bg-neutral-300 cursor-not-allowed text-white'
      : variant === 'outline'
        ? 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-[0.875rem] py-[0.875rem]'
        : variant === 'ghost'
          ? 'bg-transparent text-primary hover:text-neutral-white hover:bg-primary-600'
          : 'bg-primary hover:bg-primary-900 text-white focus:ring-blue-400',
  ]">
    <slot />
  </button>
</template>


<script>
export default {
  name: "ButtonComponent",
  props: {
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "default",
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
};
</script>
