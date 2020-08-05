<template>
  <section class="container">
    <the-add-note />
    <v-modal
      :activeBlock="activeBlock"
      @update-activeBlock="update"
      :func="removeComplete"
    >Вы действительно хотите удалить заметку?</v-modal>
    <v-todo :getIdBlockByChild="getIdBlockByChild" />
  </section>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  components: {
    "the-add-note": () => import("../TheAddNote.vue"),
    "v-todo": () => import("../VTodo.vue"),
    "v-modal": () => import("../VModal.vue"),
  },
  data() {
    return {
      activeBlock: false,
      idObj: null,
    };
  },
  methods: {
    ...mapMutations(["removeTodo"]),
    update() {
      this.activeBlock = false;
    },
    getIdBlockByChild(index) {
      this.idObj = index;
      this.activeBlock = true;
    },
    removeComplete() {
      this.removeTodo(this.idObj);
      this.activeBlock = false;
    },
  },
};
</script>
