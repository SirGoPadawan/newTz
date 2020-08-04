<template>
  <section class="block-add-todo">
    <button class="btn btn-show" @click="isActiveClass = true"></button>
    <div
      class="modal-block"
      :class="isActiveClass ? 'active-flex' : 'none-active'"
    >
      <div class="modal-block__items">
        <p>
          Заголовок заметки -
          <input class="input-add-text" type="text" v-model="newTitle" />
        </p>
        <p>
          Заметка -
          <input class="input-add-text" type="text" v-model="newTextTodo" />
        </p>
        <button
          class="btn btn-yes"
          @click="createTodo({ newTitle, newTextTodo })"
        ></button>
        <button class="btn btn-no" @click="isActiveClass = false"></button>
      </div>
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
  },
};
</script>
