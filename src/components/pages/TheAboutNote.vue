<template>
  <section class="container">
    <article class="edit-menu">
      <button @click="activeHomeBlock = true" class="edit-menu__btn">Отменить редактирование</button>
      <v-modal
        :activeBlock="activeHomeBlock"
        @update-activeBlock="updateStateHomeBackBlock"
        :func="backToHome"
      >Все изменения отменятся. Вы действительно хотите вернутся обратно?</v-modal>
      <button @click="activeDeleteBlock = true" class="edit-menu__btn">Удалить заметку</button>
      <v-modal
        :activeBlock="activeDeleteBlock"
        @update-activeBlock="updateStateDeleteBlock"
        :func="preRemoveTodoInStore"
      >Вы действительно хотите удалить заметку?</v-modal>
      <button
        @click="saveChanges({ idObj, changedNotes })"
        class="edit-menu__btn"
      >Сохранить изменения</button>
      <button @click="refresh()" class="edit-menu__btn">Отменить внесенное изменение</button>
      <button @click="rollback()" class="edit-menu__btn">Повторить отмененное изменение</button>
    </article>
    <article v-if="changedNotes">
      <div class="block-about-todo">
        <h2 class="block-about-todo__title">{{ defaultNotes.title }}</h2>
        <div>
          <div class="items-create-note">
            <input type="text" class="input-create-note" v-model="valueNote" />
            <button @click="createNote(valueNote)" class="edit-btn">Добавить пункт</button>
          </div>

          <div class="items-note" v-for="(note, index) in changedNotes.listText" :key="index">
            <input
              @change="updateCheck(index)"
              type="checkbox"
              :checked="note.checked"
              class="checkbox-note"
            />
            <p class="text-note" :class="{ 'checkbox-true': note.checked }">{{ note.textTodo }}</p>
            <button class="btn btn-delete" @click="removeNote(index)"></button>

            <button class="btn btn-pen" @click="hideBlockRewriteNote(index)"></button>
            <div
              class="change-text-note"
              :class="[activeNote === index ? 'active-flex' : 'none-active']"
            >
              <input type="text" class="input-rewrite-note" v-model="newValueNote" />
              <button
                @click="rewriteNote(newValueNote, index)"
                class="edit-btn rewrite-btn"
              >Перезаписать</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    "v-modal": () => import("../VModal.vue"),
  },
  data() {
    return {
      activeHomeBlock: false,
      activeDeleteBlock: false,
      activeNote: null,
      defaultNotes: null,
      changedNotes: null,
      localNotes: null,
      idObj: this.$route.params.id,
      valueNote: "",
      newValueNote: "",
    };
  },
  computed: {
    ...mapGetters(["getTodoById"]),
  },
  methods: {
    ...mapMutations(["saveChanges", "unSaveChanges", "removeTodoInStore"]),
    preRemoveTodoInStore() {
      this.$router.push({ path: "/" });
      this.removeTodoInStore(this.idObj);
    },
    updateStateHomeBackBlock() {
      this.activeHomeBlock = false;
    },
    updateStateDeleteBlock() {
      this.activeDeleteBlock = false;
    },
    createNote(valueNote) {
      if (!valueNote) {
        return;
      }
      let newNote = {
        checked: false,
        textTodo: valueNote,
      };
      this.changedNotes.listText.push(newNote);
      this.localNotes.listText = [...this.changedNotes.listText];
    },
    updateCheck(index) {
      let newCheckState = this.changedNotes.listText.find(
        (elem, id) => id === Number(index)
      );
      newCheckState.checked = !newCheckState.checked;
      this.localNotes.listText = [...this.changedNotes.listText];
    },
    removeNote(index) {
      let objNote = this.changedNotes.listText.findIndex(
        (note, indexNote) => indexNote === index
      );
      this.changedNotes.listText.splice(objNote, 1);
      this.localNotes.listText = [...this.changedNotes.listText];
    },
    remove(idObj) {
      this.removeTodoInStore(idObj);
      this.isActiveClassDeleteBlock = false;
      this.$router.push({ path: "/" });
    },
    rewriteNote(newValueNote, index) {
      if (!newValueNote) {
        this.activeNote = null;
        return;
      }
      let obj = this.changedNotes.listText.find(
        (elem, idNote) => idNote === Number(index)
      );
      obj.textTodo = newValueNote;
      this.activeNote = null;
      this.localNotes.listText = [...this.changedNotes.listText];
    },
    hideBlockRewriteNote(index) {
      this.newValueNote = "";
      this.activeNote = index;
    },
    backToHome() {
      this.unSaveChanges({
        idObj: this.idObj,
        defaultNotes: this.defaultNotes,
      });
      this.$router.push({ path: "/" });
    },
    refresh() {
      this.changedNotes = JSON.parse(
        JSON.stringify(this.getTodoById(this.idObj))
      );
    },
    rollback() {
      this.changedNotes = JSON.parse(JSON.stringify(this.localNotes));
    },
  },
  created() {
    this.defaultNotes = JSON.parse(
      JSON.stringify(this.getTodoById(this.idObj))
    );
    this.changedNotes = JSON.parse(
      JSON.stringify(this.getTodoById(this.idObj))
    );
    this.localNotes = JSON.parse(JSON.stringify(this.getTodoById(this.idObj)));
  },
};
</script>
