<template>
  <section class="block-add-todo">
    <button class="btn btn-show" @click="isActiveClass = true"></button>
    <div
      class="modal-block"
      :class="isActiveClass ? 'active-flex' : 'none-active'"
    >
      <div class="modal-block__items">
        <p>
          Заголовок заметки -
          <input class="input-add-text" type="text" v-model="newTitle" />
        </p>
        <p>
          Заметка -
          <input class="input-add-text" type="text" v-model="newTextTodo" />
        </p>
        <div class="buttons-box">
          <button class="btn btn-yes" @click="create()"></button>
          <button class="btn btn-no" @click="isActiveClass = false"></button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isActiveClass: false,
      newTitle: "",
      newTextTodo: "",
    };
  },
  methods: {
    ...mapMutations(["createTodo"]),
    create() {
      this.createTodo({
        newTitle: this.newTitle,
        newTextTodo: this.newTextTodo,
      });
      this.isActiveClass = false;
      this.newTitle = "";
      this.newTextTodo = "";
    },
  },
};
</script>
