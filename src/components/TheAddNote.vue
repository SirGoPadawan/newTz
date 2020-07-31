<template>
  <section>
    <button
      class="show-block-btn"
      @click="isActiveClass = !isActiveClass"
    ></button>
    <div
      :class="isActiveClass ? 'none-active' : 'active'"
      class="block-add-todo"
    >
      <p>
        Заголовок заметки -
        <input class="input-add-text" type="text" v-model="newTitle" />
      </p>
      <p>
        Заметка -
        <input class="input-add-text" type="text" v-model="newTextTodo" />
      </p>
      <button @click="createTodo({ newTitle, newTextTodo })">
        Создать заметку
      </button>
    </div>
  </section>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isActiveClass: true,
      newTitle: "",
      newTextTodo: "",
    };
  },
  methods: {
    ...mapMutations(["createTodo"]),
  },
};
</script>
