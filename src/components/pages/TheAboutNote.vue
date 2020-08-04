<template>
  <section class="container">
    <article>
      <button @click="isActiveClassHomeBackBlock = true">
        Отменить редактирование
      </button>
      <div
        class="modal-block"
        :class="{ 'active-flex': isActiveClassHomeBackBlock }"
      >
        <div class="block-remove-todo">
          <p>
            Все изменения отменятся. Вы действительно хотите вернутся обратно?
          </p>
          <button @click="backToHome({ idObj, defaultNotes })">Да</button>
          <button @click="isActiveClassHomeBackBlock = false">Нет</button>
        </div>
      </div>
      <button @click="isActiveClassDeleteBlock = true">Удалить заметку</button>
      <div
        class="modal-block"
        :class="{ 'active-flex': isActiveClassDeleteBlock }"
      >
        <div class="block-remove-todo">
          <p>Вы действительно хотите удалить заметку?</p>
          <button @click="remove(idObj)">Да</button>
          <button @click="isActiveClassDeleteBlock = false">Нет</button>
        </div>
      </div>
      <button @click="saveChanges({ idObj, changedNotes })">
        Сохранить изменения
      </button>
      <button @click="refresh()">Отменить внесенное изменение</button>
      <button @click="rollback()">Повторить отмененное изменение</button>
    </article>
    <article v-if="changedNotes">
      <div class="block-about-todo">
        <h2>{{ defaultNotes.title }}</h2>
        <div>
          <input type="text" class="input-create-note" v-model="valueNote" />
          <button @click="createNote(valueNote)">Добавить пункт</button>
          <div
            v-for="(note, index) in changedNotes.listText"
            :key="index"
            class="text-note"
          >
            <input
              @change="updateCheck(index)"
              type="checkbox"
              :checked="note.checked"
              class="checkbox-note"
            />
            <p :class="{ 'checkbox-true': note.checked }">
              {{ note.textTodo }}
            </p>
            <button class="remove-btn" @click="removeNote(index)"></button>

            <button
              class="change-btn"
              @click="hideBlockRewriteNote(index)"
            ></button>
            <div
              :class="[activeNote === index ? 'active-block' : 'none-active']"
            >
              <input type="text" v-model="newValueNote" />
              <button @click="rewriteNote(newValueNote, index)">
                Записать
              </button>
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
  data() {
    return {
      isActiveClassDeleteBlock: false,
      isActiveClassHomeBackBlock: false,
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
    createNote(valueNote) {
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
    backToHome({ idObj, defaultNotes }) {
      this.unSaveChanges({ idObj, defaultNotes });
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
