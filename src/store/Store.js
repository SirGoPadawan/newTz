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
    removeTodo(state, index) {
      state.todos = state.todos.filter((obj, id) => id !== index);
    },
    createTodo(state, { newTitle, newTextTodo }) {
      if (!newTitle || !newTextTodo) return;
      let newObj = {
        title: newTitle,
        listText: [{ checked: false, textTodo: newTextTodo }],
      };
      state.todos.push(newObj);
    },
    /*  rewriteNote(state, { newValueNote, idObj, index }) {
      let obj = this.getters.getTodoById(idObj);
      let newNote = obj.listText.find((elem, id) => id === Number(index));
      newNote.textTodo = newValueNote;
    }, */
    updateCheck(state, { idObj, index }) {
      let obj = this.getters.getTodoById(idObj);
      let newCheckState = obj.listText.find((elem, id) => id === Number(index));
      newCheckState.checked = !newCheckState.checked;
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
