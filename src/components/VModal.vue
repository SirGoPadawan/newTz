<template>
  <div class="modal-block" :class="{ 'active-flex': activeBlock }">
    <div class="block-remove-todo">
      <p>Вы действительно хотите удалить заметку?</p>
      <div>
        <button @click.prevent="removeComplete()">Да</button>
        <button @click.prevent="hide()">Нет</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["idBlock", "activeBlock"],
  methods: {
    ...mapMutations(["removeTodo"]),
    hide() {
      this.$emit("update-activeBlock");
    },
    removeComplete() {
      this.removeTodo(this.idBlock);
      this.hide();
    },
  },
};
</script>
