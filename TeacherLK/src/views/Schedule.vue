<template>
  <div>
    <div v-if="loading" class="progress-container">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="home">
      <div class="o-grid align-baseline justify-space-between align-start">
        <div class="col fit-content">
          <div class="text-left text-sm-left">
            <v-btn :to="'/schedule/timetable'" color="primary">
              График учебного процесса
              <v-icon right dark>mdi-calendar</v-icon>
            </v-btn>
          </div>
        </div>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="datePickerMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="240px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="outputDatesForDatePicker"
                label="Выберите дату"
                append-icon="mdi-calendar"
                outlined
                color="primary"
                shaped
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="datesForDatePicker"
              locale="ru"
              no-title
              show-week
              dark
              :first-day-of-week="1"
              @input="datePickerMenu = false"
              range
            ></v-date-picker>
          </v-menu>
        </v-col>
      </div>
      <v-row dense>
        <v-col class="d-flex align-center">
          <v-btn
            x-large
            text
            icon
            color="accent"
            @click="sendRequestForSchedule($moment(currentDate, 'DD.MM.YYYY').subtract(7, 'days'))"
          >
            <v-icon>mdi-arrow-left-bold-box</v-icon>
          </v-btn>
          <div class="d-flex flex-wrap justify-center mr-2">
            <span class="time-range">
              {{ scheduleData.range.start }}
              -
              {{ scheduleData.range.end }}
            </span>
            <span class="time-range">
              ,
              <b>{{ scheduleData.range.weekName }}</b>
            </span>
          </div>
          <v-btn
            x-large
            text
            icon
            color="accent"
            @click="sendRequestForSchedule($moment(currentDate, 'DD.MM.YYYY').add(7, 'days'))"
          >
            <v-icon>mdi-arrow-right-bold-box</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" dense>
        <v-col>
          <v-expansion-panels focusable hover accordion multiple v-model="currentDay">
            <v-expansion-panel
              v-for="day in scheduleData.schedule"
              :key="day.value"
              :disabled="day.disabled"
            >
              <v-expansion-panel-header class="primary lighten-1 white--text text-uppercase">
                <span>
                  {{ day.date }}
                  {{ day.dayOfWeek }}
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content :class="'white clear-fix'">
                <div v-if="day.lessons && day.lessons.length">
                  <TheScheduleCard v-for="(lesson, i) in day.lessons" :key="i" :lesson="lesson" />
                </div>
                <div class="text-center py-2" v-else>
                  <span>Занятий нет</span>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TheScheduleCard from "../components/TheScheduleCard";

export default {
  name: "home",
  components: { TheScheduleCard },
  data() {
    return {
      teacherId: 1,
      loading: true,
      datesForDatePicker: Array,
      datePickerMenu: false,
      scheduleData: Object
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: "fetchData"
  },
  computed: {
    currentDate: {
      get() {
        return this.$route.query.date;
      },
      set(value) {
        return value;
      }
    },
    currentDay: {
      get() {
        return [this.$moment().day() - 1];
      },
      set(value) {
        return value;
      }
    },
    outputDatesForDatePicker() {
      if (Array.isArray(this.datesForDatePicker)) {
        if (this.datesForDatePicker.length === 2) {
          return this.convertDatesForDatePickerTextField(
            this.datesForDatePicker[0],
            this.datesForDatePicker[1]
          );
        } else if (this.datesForDatePicker.length === 1) {
          //запрос на бакенд при выборе даты
          this.sendRequestForSchedule(this.$moment(this.datesForDatePicker[0]));
        }
      }
    }
  },
  methods: {
    fetchData() {
      
      if (!this.$route.query.teacher_id || !this.$route.query.date) {
        this.$router.push({
          query: { teacher_id: this.teacherId, date: "25.03.2020" }
        }); //set default parameters if needed
        this.loading = true;
      }

      this.$http
        .get(this.$route.fullPath)
        .then(response => {
          this.loading = false;
          this.scheduleData = response.data;
          this.datesForDatePicker = [
            this.convertDateForDatePicker(this.scheduleData.range.start),
            this.convertDateForDatePicker(this.scheduleData.range.end)
          ];
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendRequestForSchedule(momentDate) {
      this.$router.push({
        query: {
          teacher_id: this.teacherId,
          date: momentDate.format("DD.MM.YYYY")
        }
      });
    },
    convertDatesForDatePickerTextField(dateStart, dateEnd) {
      return `${this.$moment(dateStart).format("DD.MM.YYYY")} ~ ${this.$moment(
        dateEnd
      ).format("DD.MM.YYYY")}`;
    },
    convertDateForDatePicker(date) {
      return this.$moment(date, "DD.MM.YYYY")
        .format()
        .substr(0, 10);
    }
  }
};
</script>

<style lang="scss">
.v-text-field__details {
  //fix select
  display: none !important;
}

.time-range {
  white-space: nowrap;
}

.clear-fix {
  & > :first-child {
    padding: 5px 5px 0;
  }
}
</style>
