<template>
  <section class="container">
    <the-add-note />
    <div class="modal-block" :class="{ 'active-flex': activeBlock }">
      <div class="block-remove-todo">
        <p>Вы действительно хотите удалить заметку?</p>
        <div>
          <button @click="removeTodo(idBlock)" v-on:click="hide()">Да</button
          ><button @click="hide()">Нет</button>
        </div>
      </div>
    </div>
    <div class="todos-list">
      <article class="block-todo" v-for="todo in todos" :key="todo.id">
        <div class="block-todo__top">
          <button
            @click="getId(todo.id)"
            v-on:click="hide()"
            class="remove-btn"
          ></button>
          <router-link
            class="change-btn"
            :to="'/note/' + todo.id"
          ></router-link>
        </div>
        <div class="block-todo__bottom">
          <h2 class="title-todo">{{ todo.title }}</h2>
          <p
            class="text-note"
            v-for="text in todo.listText"
            :key="text.textTodo"
          >
            <input
              class="checkbox-note"
              type="checkbox"
              :checked="text.checked"
              disabled
            />{{ text.textTodo }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      activeBlock: false,
      idBlock: null,
    };
  },
  components: {
    "the-add-note": () => import("../TheAddNote.vue"),
  },
  computed: {
    ...mapState({ todos: (state) => state.todos }),
  },
  methods: {
    ...mapMutations(["removeTodo"]),
    getId(index) {
      this.idBlock = index;
    },
    hide() {
      this.activeBlock = !this.activeBlock;
    },
  },
};
</script>
