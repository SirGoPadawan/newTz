import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        title: "1 todo",
        listText: [
          { checked: true, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: true, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
      {
        title: "2 todo",
        listText: [
          { checked: false, textTodo: "замечание 1" },
          { checked: false, textTodo: "замечание 2" },
          { checked: false, textTodo: "замечание 3" },
          { checked: false, textTodo: "замечание 4" },
        ],
      },
      {
        title: "3 todo",
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
    saveChanges(state, { idObj, changedNotes }) {
      state.todos.splice(idObj, 1, changedNotes);
    },
    unSaveChanges(state, { idObj, defaultNotes }) {
      state.todos.splice(idObj, 1, defaultNotes);
    },
    removeTodo(state, index) {
      state.todos = state.todos.filter((obj, id) => id !== index);
    },
    removeTodoInStore(state, idObj) {
      state.todos.splice(idObj, 1);
    },
    createTodo(state, { newTitle, newTextTodo }) {
      if (!newTitle || !newTextTodo) return;
      let newObj = {
        title: newTitle,
        listText: [{ checked: false, textTodo: newTextTodo }],
      };
      state.todos.push(newObj);
    },
  },
  getters: {
    getTodoById: (state) => (id) =>
      state.todos.find((elem, index) => index === Number(id)),
    getUncheckedNotes: (state, getters) => (id) => {
      let filteredNotes = getters.getTodoById(id);
      let UncheckedNotes = filteredNotes.listText.filter((arr) => !arr.checked);
      if (UncheckedNotes.length > 3) {
        UncheckedNotes.length = 3;
      }
      return UncheckedNotes;
    },
  },
});
