<template>
  <section>
    <button
      title="Создать заметку"
      class="show-block-btn"
      @click="noneActiveBlock = !noneActiveBlock"
    ></button>
    <div
      :class="noneActiveBlock === true ? 'none-active' : 'active'"
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
      <button type="button" @click="createTodo({ newTitle, newTextTodo })">
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
      noneActiveBlock: true,
      newTitle: "",
      newTextTodo: "",
    };
  },
  methods: {
    ...mapMutations(["createTodo"]),
  },
};
</script>
