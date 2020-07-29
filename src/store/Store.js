import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        title: "1 todo",
        listText: [
          { checked: true, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: true, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
      {
        id: 2,
        title: "2 todo",
        listText: [
          { checked: false, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: false, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
      {
        id: 3,
        title: "3 todo",
        listText: [
          { checked: false, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: false, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
      {
        id: 4,
        title: "4 todo",
        listText: [
          { checked: false, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: false, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
      {
        id: 5,
        title: "5 todo",
        listText: [
          { checked: false, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: false, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
      {
        id: 6,
        title: "6 todo",
        listText: [
          { checked: false, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: false, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
    ],
  },
  mutations: {
    removeTodo(state, id) {
      let index = state.todos.findIndex((arrTodos) => arrTodos.id === id);
      state.todos.splice(index, 1);
    },
    createTodo(state, { newTitle, newTextTodo }) {
      if (newTitle !== "" && newTextTodo !== "") {
        let newObj = {
          id: state.todos.length + 1,
          title: newTitle,
          listText: [{ checked: false, textTodo: newTextTodo }],
        };
        state.todos.push(newObj);
      }
    },
  },
});
