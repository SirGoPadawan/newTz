<template>
  <section class="container">
    <the-add-note />
    <v-modal
      :idBlock="idBlock"
      :activeBlock="activeBlock"
      @update-activeBlock="update"
    />
    <v-todo :getIdBlockByChild="getIdBlockByChild" />
  </section>
</template>
<script>
export default {
  components: {
    "the-add-note": () => import("../TheAddNote.vue"),
    "v-todo": () => import("../VTodo.vue"),
    "v-modal": () => import("../VModal.vue"),
  },
  data() {
    return {
      activeBlock: false,
      idBlock: null,
    };
  },
  methods: {
    update(copyActiveBlock) {
      this.activeBlock = copyActiveBlock;
    },
    getIdBlockByChild(index) {
      this.idBlock = index;
      this.activeBlock = true;
    },
  },
};
</script>
