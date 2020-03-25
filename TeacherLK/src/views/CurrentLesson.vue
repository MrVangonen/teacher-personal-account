<template>
  <div>
    <div v-if="lesson">
      <div>
        <v-card elevation="0">
          <v-card-title class="text-center justify-space-between align-start py-6 grey lighten-5">
            <div class="d-flex flex-column align-center">
              <h1 class="font-weight-bold display-3 primary--text pb-2">{{ lesson.title }}</h1>
              <span class="mb-2">
                {{
                lesson.date.toLocaleDateString("rus", {
                day: "numeric",
                month: "long",
                year: "numeric"
                })
                }}
                ,
                <b>
                  {{ lesson.startTime }} -
                  {{ lesson.endTime }}
                </b>
              </span>
              <v-btn color="info" max-width="280" :to="'/disciplines/' + lesson.disciplineId">
                Перейти к дисциплине
                <v-icon class="ml-auto">mdi-key-variant</v-icon>
              </v-btn>
            </div>
            <div>
              <div class="d-flex flex-column text-left">
                <span class="caption">Вид занятия:</span>
                <span class="font-weight-bold">{{ lesson.type }}</span>
              </div>
              <div class="text-left">
                <span class="caption">Статус:</span>
                <v-overflow-btn
                  class="status-btn mt-0"
                  v-model="lesson.status"
                  :items="statusEnum"
                  :background-color="currentLessonStatusObject.color"
                  :disabled="currentLessonStatusObject.disabled"
                  @click="changeLessonStatus"
                  dark
                  label="Статус занятия"
                ></v-overflow-btn>
              </div>
            </div>
          </v-card-title>
          <div class="secondary lighten-1">
            <v-tabs v-model="tab" background-color="transparent" color="primary darken-2">
              <v-tab class="font-weight-bold">Оценки и посещаемость</v-tab>
              <v-tab class="font-weight-bold">Материалы занятия</v-tab>
            </v-tabs>
          </div>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-text class="tab-content-card">
                  <v-text-field
                    v-model="studentsTableSearch"
                    append-icon="mdi-account-search"
                    class="mb-2"
                    label="Поиск"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-data-table
                    :headers="studentsTableHeaders"
                    :items="studentsTableData"
                    :search="studentsTableSearch"
                    item-key="id"
                    no-data-text="Ничего не найдено"
                    no-results-text="Ничего не найдено"
                    :items-per-page="studentsTableitemsPerPage"
                    :value="[]"
                  >
                    <template v-slot:item.isSelected="{ item }">
                      <v-checkbox
                        v-model="item.isSelected"
                        @change="changeTable(); item.marks=[]"
                      ></v-checkbox>
                    </template>
                    <template v-slot:item.studentName="{ item }">
                      <StudentAvatar
                        :studentName="item.studentName"
                        :studentAvatar="item.studentAvatar"
                      />
                    </template>
                    <template v-slot:item.marks="{ item }">
                      <MarkPicker
                        :marks.sync="item.marks"
                        :onClick="changeTable"
                        :disabled="!item.isSelected"
                      />
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-card-actions>
                  <div class="ml-2 mb-4">
                    <v-btn
                      color="success"
                      x-large
                      :disabled="!isStudentsTableHasChanges"
                      @click="sendLessonResults()"
                    >Сохранить результаты</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-card class="mb-2">
                    <v-card-text>
                      <b>Тема</b>
                      <v-text-field
                        v-model="lesson.theme"
                        :disabled="themeFieldDisabled"
                        single-line
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        dark
                        color="black accent-4 mx-auto"
                        @click="themeFieldDisabled = !themeFieldDisabled"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-card class="mb-2">
                    <v-card-text>
                      <b>Домашнее задание</b>
                      <v-textarea
                        v-model="lesson.homeWork"
                        :disabled="homeWorkFieldDisabled"
                        counter
                        rows="4"
                        maxlength="120"
                        full-width
                        single-line
                      ></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        dark
                        color="black accent-4 mx-auto"
                        @click="homeWorkFieldDisabled = !homeWorkFieldDisabled"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-card>
                    <v-card-text>
                      <div class="font-weight-bold mb-4">Файлы</div>
                      <div class="files-container">
                        <div v-if="lesson.files.length">
                          <div
                            class="d-flex align-center mb-1"
                            v-for="(file, index) in lesson.files"
                            :key="index"
                          >
                            <img width="40px" :src="getFileFormatImage(file)" alt="file" />
                            <span>{{ file }}</span>
                            <v-btn class="ml-auto" icon @click="deleteFile(index)">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </div>
                        </div>
                        <div class="d-flex justify-center align-center no-files" v-else>
                          <span>Нет загруженных файлов</span>
                        </div>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn dark color="black accent-4 mx-auto" @click="$refs.inputUpload.click()">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <input
                        v-show="false"
                        ref="inputUpload"
                        type="file"
                        @change="onFileChange"
                        multiple
                      />
                    </v-card-actions>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>
    <div class="progress-container" v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import statusEnum from "@/assets/js/enums/statusEnum.js";
import fileFormatEnum from "@/assets/js/enums/fileFormatEnum.js";
import StudentAvatar from "@/components/shared/StudentAvatar";
import MarkPicker from "@/components/shared/MarkPicker";

export default {
  data() {
    return {
      lesson: null,
      statusEnum: Object.values(statusEnum),
      fileFormatEnum,
      tab: 0,
      studentsTableitemsPerPage: 5,
      studentsTableSearch: "",
      themeFieldDisabled: true,
      homeWorkFieldDisabled: true,
      isStudentsTableHasChanges: false,
      studentsTableHeaders: [
        {
          value: "isSelected",
          filterable: false,
          sortable: false
        },
        {
          text: "Студент",
          align: "left",
          value: "studentName"
        },
        { text: "Институт", value: "institute", sortable: false },
        { text: "Группа", value: "groop", sortable: false },
        {
          text: "Цифровой след",
          value: "cyberTrack",
          sortable: false,
          filterable: false
        },
        {
          text: "Оценки",
          value: "marks",
          align: "center",
          sortable: false,
          filterable: false
        }
      ],
      studentsTableData: [
        {
          studentName: "Иванов И.И.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          institute: "ИМИТ",
          groop: 6,
          cyberTrack: "+ 2 файла",
          isSelected: true,
          marks: []
        },
        {
          studentName: "Борисов О.И.",
          studentAvatar: "",
          institute: "ИМИТ",
          groop: 9,
          cyberTrack: "+ 1 файла",
          isSelected: true,
          marks: []
        },
        {
          studentName: "Петрова И.Д.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          institute: "ИМИТ",
          groop: 16,
          cyberTrack: "+ 3 файла",
          isSelected: true,
          marks: []
        },
        {
          studentName: "Сидоров К.И.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          institute: "ИМИТ",
          groop: 3,
          cyberTrack: "",

          isSelected: true,
          marks: []
        },
        {
          studentName: "Круг Ш.О.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          institute: "ИМИТ",
          groop: 16,
          cyberTrack: "",

          isSelected: true,
          marks: []
        },
        {
          studentName: "Квадрат Т.Т.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          institute: 375,
          groop: 0.0,
          cyberTrack: "+ 2 файла",

          isSelected: true,
          marks: []
        },
        {
          studentName: "Сажин Ф.И.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          institute: 392,
          groop: 0.2,
          cyberTrack: "",

          isSelected: true,
          marks: []
        },
        {
          studentName: "Пажин С.И.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          institute: 408,
          groop: 3.2,
          cyberTrack: "",

          isSelected: true,
          marks: []
        },
        {
          studentName: "Важин В.И.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          institute: 452,
          groop: 25.0,
          cyberTrack: "+ 2 файла",

          isSelected: true,
          marks: []
        },
        {
          studentName: "Квадро И.В.",
          studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          institute: 518,
          groop: 26.0,
          cyberTrack: "",
          isSelected: true,
          marks: []
        }
      ],
      studentsTableSelected: []
    };
  },
  components: {
    StudentAvatar,
    MarkPicker
  },
  created() {
    this.getCurrentLessonData(this.$route.params.id);
    this.studentsTableSelected = this.studentsTableData; // Select all students
  },
  watch: {},
  computed: {
    currentLessonStatusObject() {
      return this.statusEnum.find(status => {
        return this.lesson.status === status.value;
      });
    },
    indexedStudentsTableData() {
      if (this.studentsTableData[0].id) {
        return this.studentsTableData;
      } else {
        return this.studentsTableData.map((item, index) => ({
          id: index,
          ...item
        }));
      }
    }
  },
  methods: {
    getCurrentLessonData(id) {
      let promise = new Promise((res, rej) => {
        setTimeout(() => {
          this.lesson = {
            id: 90909,
            disciplineId: 1,
            number: 1,
            startTime: "8:00",
            endTime: "9:35",
            title: "Теория игр",
            theme: "Теория игр и экономическое моделирование",
            homeWork:
              "1. Сделать задание из прикреплённого файла\n2. Сравнить с расчётами",
            files: [
              "file1.pdf",
              "расчеты.pdf",
              "расчеты2.txt",
              "image.png",
              "document.doc"
            ],
            type: "Лекция",
            date: new Date(2020, 1, 9),
            existingPeriod: "19.01.19 - 01.01.22",
            status: 0,
            cabinet: "102",
            corps: "ГК"
          };
          res("ok");
        }, 100);
      });
    },
    changeTable() {
      !this.isStudentsTableHasChanges
        ? (this.isStudentsTableHasChanges = true)
        : false;
    },
    changeSelectedItemState(item) {
      debugger
      item.isSelected = !item.isSelected;
      item.marks = [];
    },
    sendLessonResults() {
      this.isStudentsTableHasChanges = false;
      console.log("send data about lesson");
    },
    changeLessonStatus() {
      console.log("change lesson status");
    },
    getFileFormatImage(file) {
      let dotIndex = file.lastIndexOf(".");
      let extension = file.slice(dotIndex + 1);

      let findedFormat = this.fileFormatEnum.find(fmt => {
        return fmt.extensions.find(ext => {
          return ext === extension;
        });
      });

      if (findedFormat) {
        return require(`@/assets/img/file-formats/${findedFormat.src}`);
      } else {
        return require("@/assets/img/file-formats/default-file.svg");
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      Array.from(files).forEach(file => {
        this.lesson.files.push(file.name);
      });
    },
    deleteFile(index) {
      this.lesson.files.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
/* fix tabs slider on mobile */
.v-slide-group__prev {
  display: none !important;
}

.box-card {
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: black;
}

.progress-container {
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-btn {
  min-width: 195px;
}

.tab-content-card {
  min-height: 700px;
}

.files-container {
  height: 200px;
  overflow-y: auto;

  & .no-files {
    height: 100%;
  }
}
</style>
