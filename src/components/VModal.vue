<template>
  <div class="modal-block" :class="{ 'active-flex': activeBlock }">
    <div class="modal-block__items">
      <p>
        <slot></slot>
      </p>
      <div>
        <button @click.prevent="func()" class="btn btn-yes"></button>
        <button @click.prevent="hide()" class="btn btn-no"></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["activeBlock", "title", "func"],
  methods: {
    hide() {
      this.$emit("update-activeBlock");
    },
  },
};
</script>
