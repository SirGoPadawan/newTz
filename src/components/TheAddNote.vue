<template>
  <section class="block-add">
    <button class="btn btn-show" @click="isActiveClass = !isActiveClass"></button>
    <div class="block-add-todo" :class="isActiveClass ? 'active-flex' : 'none-active'">
      <article class="block-add-todo__text">
        <p>Заголовок заметки -</p>
        <input class="input-add-note" type="text" v-model="newTitle" />
        <p>Заметка -</p>
        <input class="input-add-note" type="text" v-model="newTextTodo" />
      </article>
      <article class="buttons-box">
        <button class="btn btn-yes" @click="create()"></button>
        <button class="btn btn-no" @click="isActiveClass = false"></button>
      </article>
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
