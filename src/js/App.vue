<template>
  <!-- Vue App -->
  <div class="app">
    <div v-if="loaded">
      <div class="wrap" v-cloak>=
        <!-- Window -->
        <div class="window">
          <div class="row">
            <!-- Calendar -->
            <Calendar
              v-if="view === 'calendar'"
              :month="activeMonth"
              :year="activeYear"
              :get-tasks="getTasks"
              :is-today="isToday"
              :is-selected="isSelected"
              :select-day="selectDay"
              @next-month="nextMonth"
              @next-year="nextYear"
              @prev-month="prevMonth"
              @prev-year="prevYear"
              @open-task="addNewTask"
            ></Calendar>

            <!-- To Do List -->
            <TaskList
              v-if="view === 'list'"
              :open="taskOpen"
              :close-modal="closeModal"
              :is-past="isPast"
              :add-task="addTask"
              :list="taskList"
              :selected="selected"
              :remove-task="removeTask"
              :complete-task="completeTask"
              :edit-task="editTask"
            ></TaskList>
          </div>
        </div>
        <!-- Sidebar -->
        <Sidebar
          :add-new-task="addNewTask"
          :get-list-db="getListDB"
          :open="sidebar"
          :toggle-sidebar="toggleSidebar"
          :database="database"
          :set-view="setView"
        ></Sidebar>
        <!-- Modals -->
        <Modal
          :close="closeModal"
          :add-task="addTask"
          :modal-open="(taskOpen && isState('full')) || newTask"
          :new-task="newTask"
          :form-error="formError"
          :is-state="isState"
          :is-past="isPast"
          :list="currentList"
          :format-date="formatDate"
          :selected="selected"
          :remove-task="removeTask"
        ></Modal>
      </div>
    </div>
    <div class="loader" v-else></div>
  </div>
</template>

<script>
// Components
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';

import {
  formatDateInput, parseDate, formatDate, ajax, isPast,
} from './helpers';
import config from './config';

const date = new Date();

export default {
  components: {
    Calendar,
    Modal,
    Sidebar,
    TaskList,
  },

  data() {
    return {
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      today: date.getDate(),
      todayObj: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      },
      activeYear: date.getFullYear(),
      activeMonth: date.getMonth(),
      currentList: [],
      database: false,
      taskList: [],
      state: "split",
      view: "list",
      taskOpen: false,
      loaded: false,
      newTask: false,
      sidebar: false,
      formError: "",
      selected: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    };
  },

  created() {
    this.getListDB();
    if (localStorage.getItem("savedView")) {
      this.state = localStorage.getItem("savedView");
      console.log("local storage loaded");
    }
  },

  watch: {
    selected: {
      handler() {
        const { selected } = this;
        this.currentList = this.taskList.filter(
          a =>
            parseDate(a.due).day === selected.day &&
            parseDate(a.due).month === selected.month &&
            parseDate(a.due).year === selected.year
        );
      },
      deep: true
    },

    taskList: {
      handler() {
        const { selected } = this;
        this.currentList = this.taskList.filter(
          a =>
            parseDate(a.due).day === selected.day &&
            parseDate(a.due).month === selected.month &&
            parseDate(a.due).year === selected.year
        );
      },
      deep: true
    },

    state: {
      handler() {
        localStorage.setItem("savedView", this.state);
        console.log("View state saved to local storage");
      },
      deep: true
    }
  },

  methods: {
    addNewTask() {
      this.newTask = true;
      if (this.sidebar) this.sidebar = false;
    },

    setView(key) {
      this.view = key;
    },

    addTask(formData) {
      console.log(formData);
      const task = formData.task.trim();
      this.formError = "";

      if (!isPast(parseDate(formData.date))) {
        console.log(task);
        if (task) {
          ajax(`${config.API_URL}/task`, "POST", {
            description: task,
            due: formData.date
          })
            .then(res => {
              console.log(res);
              this.getListDB();
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.formError = "Please select a date in the future.";
      }
    },

    editTask() {},

    completeTask(task) {
      task.completed =
        task.completed !== null ? null : formatDateInput(this.todayObj);

      ajax(
        `${config.API_URL}/task/${task.id}`,
        "PATCH",
        Object.assign(task, {
          completed: task.completed
        })
      )
        .then(res => {
          console.log(res);
          this.getListDB();
        })
        .catch(err => {
          console.log(err);
        });
    },

    removeTask(task) {
      ajax(`${config.API_URL}/task/${task.id}`, "DELETE")
        .then(res => {
          console.log(res);
          this.getListDB();
        })
        .catch(err => {
          console.log(err);
        });
    },

    getListDB() {
      ajax(`${config.API_URL}/task`, "GET")
        .then(res => {
          this.taskList = res.parsed.data;
          this.loaded = true;
          console.log("GOT LIST");
          this.database = true;
        })
        .catch(() => {
          console.log("Database List Not Found");
          this.database = false;
          this.loaded = true;
        });
    },

    isPast(obj) {
      const objTime = new Date(obj.year, obj.month, obj.day).getTime();
      return objTime + 8.64e7 - 1 < Date.now();
    },

    isState(str) {
      return this.state === str;
    },

    closeModal(e) {
      console.log(e);
      if (this.taskOpen) this.taskOpen = false;
      if (this.newTask) this.newTask = false;
    },

    closeSidebar() {
      if (this.sidebar) this.sidebar = false;
    },

    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },

    getTasks(obj) {
      return this.taskList.filter(
        a =>
          parseDate(a.due).day === obj.day &&
          parseDate(a.due).month === obj.month &&
          parseDate(a.due).year === obj.year
      );
    },

    selectDay(elem) {
      if (elem > 0) {
        this.selected.day = elem;
        this.selected.month = this.activeMonth;
        this.selected.year = this.activeYear;
      }
    },

    deselect() {
      this.selected.keys().forEach(key => {
        this.selected[key] = false;
      });
    },

    isToday(value) {
      return (
        this.today === value &&
        this.activeMonth === this.currentMonth &&
        this.activeYear === this.currentYear
      );
    },

    isSelected(value) {
      return (
        this.selected.day === value &&
        this.activeMonth === this.selected.month &&
        this.activeYear === this.selected.year
      );
    },

    formatDate(obj) {
      return formatDate(obj);
    },

    prevMonth() {
      // jan to dec
      if (this.activeMonth === 0) {
        this.activeMonth = 11;
        this.activeYear--;
      } else {
        this.activeMonth--;
      }
    },

    nextMonth() {
      // dec to jan
      if (this.activeMonth === 11) {
        this.activeMonth = 0;
        this.activeYear++;
      } else {
        this.activeMonth++;
      }
    },

    prevYear() {
      this.activeYear--;
    },

    nextYear() {
      this.activeYear++;
    }
  },
};
</script>