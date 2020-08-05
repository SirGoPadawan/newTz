<template>
  <section class="todos-list">
    <article class="block-todo" v-for="(todo, index) in todos" :key="index">
      <div class="block-todo__top">
        <button @click="getIdBlockByChild(index)" class="btn btn-delete"></button>
        <button @click="goToNote(index)" class="btn btn-pen"></button>
      </div>
      <div class="block-todo__bottom">
        <h2 class="title-todo">{{ todo.title }}</h2>
        <ol>
          <li
            v-for="(note, noteIndex) in getUncheckedNotes(index)"
            :key="noteIndex"
          >{{ note.textTodo }}</li>
        </ol>
      </div>
    </article>
  </section>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: ["getIdBlockByChild"],
  computed: {
    ...mapState({ todos: (state) => state.todos }),
    ...mapGetters(["getUncheckedNotes"]),
  },
  methods: {
    goToNote(index) {
      this.$router.push({ path: "/note/" + index });
    },
  },
};
</script>
