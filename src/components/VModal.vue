<template>
  <div class="modal-block" :class="{ 'active-flex': activeBlock }">
    <div class="modal-block__items">
      <p>{{ title }}</p>
      <div>
        <button @click.prevent="func()">Да</button>
        <button @click.prevent="hide()">Нет</button>
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
