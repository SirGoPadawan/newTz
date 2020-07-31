<template>
  <section class="container">
    <article>
      <button @click="activeClass = true">
        Отменить редактирование
      </button>
      <button @click="saveChanges()">Сохранить изменения</button>
      <div class="modal-block" :class="{ 'active-flex': isActiveClass }">
        <div class="block-remove-todo">
          <p>
            Все изменения отменятся. Вы действительно хотите вернутся обратно?
          </p>
          <button @click="backToHome()">Да</button>
          <button @click="isActiveClass = false">Нет</button>
        </div>
      </div>
    </article>
    <article v-if="notes">
      <div class="block-about-todo">
        <h2>{{ notes.title }}</h2>
        <div>
          <input type="text" class="input-create-note" v-model="valueNote" />
          <button @click="createNote(valueNote)">
            Добавить пункт
          </button>
          <div
            v-for="(note, index) in notes.listText"
            :key="index"
            class="text-note"
          >
            <input
              @change="updateCheck({ idObj, index })"
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
              <button @click="rewrite(newValueNote, index)">
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
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      isActiveClass: false,
      activeNote: null,
      notes: null,
      idObj: this.$route.params.id,
      valueNote: "",
      newValueNote: "",
    };
  },
  computed: {
    ...mapGetters(["getTodoById"]),
  },
  methods: {
    ...mapMutations(["updateCheck", "saveChanges"]),
    createNote(valueNote) {
      let newNote = {
        checked: false,
        textTodo: valueNote,
      };
      this.notes.listText.push(newNote);
    },
    removeNote(index) {
      let objNote = this.notes.listText.findIndex(
        (note, indexNote) => indexNote === index
      );
      return this.notes.listText.splice(objNote, 1);
    },
    rewriteNote(newValueNote, index) {
      let obj = this.notes.listText.find((idNote) => idNote === index);
      console.log(obj);
      /*  return (obj.textTodo = newValueNote); */
      this.activeNote = null;
    },
    hideBlockRewriteNote(index) {
      this.newValueNote = "";
      this.activeNote = index;
    },
    backToHome() {
      this.$router.push({ path: "/" });
    },
  },
  created() {
    this.notes = { ...this.getTodoById(this.idObj) };
  },
};
</script>
