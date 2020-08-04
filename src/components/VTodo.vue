<template>
  <div class="todos-list">
    <article class="block-todo" v-for="(todo, index) in todos" :key="index">
      <div class="block-todo__top">
        <button @click="getIdBlockByChild(index)" class="remove-btn"></button>
        <button @click="goToNote(index)" class="change-btn"></button>
      </div>
      <div class="block-todo__bottom">
        <h2 class="title-todo">{{ todo.title }}</h2>
        <p
          v-for="(note, noteIndex) in getUncheckedNotes(index)"
          :key="noteIndex"
        >
          {{ note.textTodo }}
        </p>
      </div>
    </article>
  </div>
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
  mounted() {
    let localTodos = JSON.stringify(this.todos);
    localStorage.setItem("localTodos", localTodos);
  },
  destroyed() {
    let LT = localStorage.getItem("localTodos");
    JSON.parse(LT);
    console.log(LT);
  },
};
</script>
