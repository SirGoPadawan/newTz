<template>
  <div v-if="todo">
    <h2>{{ todo.title }}</h2>
    <div v-for="note in todo.listText" :key="note.textTodo">
      <p>
        <input type="checkbox" :checked="note.checked" />{{ note.textTodo }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    console.log(this);
    return {
      todo: null,
    };
  },
  computed: {
    ...mapState({ todos: (state) => state.todos }),
  },
  created: function() {
    let todoId = this.$route.params.id;
    this.todo = this.todos.find((elem) => elem.id === Number(todoId));
  }, //переделать в геттер
};
</script>
