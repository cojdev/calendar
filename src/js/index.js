/* eslint-disable max-len */
import Vue from 'vue';

// Components
import './components/CalendarHead';
import './components/CalendarTable';
import './components/Modal';

import cal from './cal';
import {
  formatDateInput, parseDate, formatDate, ajax, isPast,
} from './helpers';
import config from './config';

const date = new Date();

/**
 * Main Vue instance
 */
// eslint-disable-next-line no-unused-vars
const todo = new Vue({

  el: '#app',

  data: {
    weekdayNames: cal.days.map(a => a.slice(0, 3)),
    monthNames: cal.months,
    currentYear: date.getFullYear(),
    currentMonth: date.getMonth(),
    today: date.getDate(),
    todayObj: {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    },
    activeYear: date.getFullYear(),
    activeMonth: date.getMonth(),
    currentList: [],
    database: false,
    taskList: [],
    state: 'split',
    taskOpen: false,
    loaded: false,
    newTask: false,
    enteredTask: '',
    enteredDate: '',
    sidebar: false,
    formError: '',
    selected: {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    },
  },

  created() {
    this.activeMonth = this.currentMonth;
    this.enteredDate = formatDateInput(this.todayObj);
    this.getListDB();
    if (localStorage.getItem('savedState')) {
      this.state = localStorage.getItem('savedState');
      console.log('local storage loaded');
    }
  },

  watch: {
    selected: {
      handler() {
        const self = this;
        this.enteredDate = formatDateInput(this.selected);
        self.currentList = this.taskList.filter(a => (
          parseDate(a.due).day === self.selected.day
          && parseDate(a.due).month === self.selected.month
          && parseDate(a.due).year === self.selected.year));
      },
      deep: true,
    },
    taskList: {
      handler() {
        const self = this;
        self.currentList = this.taskList.filter(a => (
          parseDate(a.due).day === self.selected.day
            && parseDate(a.due).month === self.selected.month
            && parseDate(a.due).year === self.selected.year));
      },
      deep: true,
    },
    state: {
      handler() {
        localStorage.setItem('savedState', this.state);
        console.log('STATE SAVED');
      },
      deep: true,
    },
  },

  computed: {
    // Returns a matrix of days and weeks of the month [[1,2,...],[8,9,...],...]
    getWeeks() {
      // Empty array
      const weeks = []; // Date object of the first day of the active month
      const dateObject = new Date(this.activeYear, this.activeMonth, 1); // 0-6 numerical value of the first day of the month
      const firstWeekday = dateObject.getDay(); // Get the month length dynamically so leap years are accounted for
      const monthLength = new Date(this.activeYear, this.activeMonth + 1, 0).getDate(); // Set current day to 1 each time this function is called
      let currentDay = 1;

      // Loop through weeks in a month
      for (let i = 0; i < 6 && currentDay < monthLength + 1; i++) {
        weeks.push([]);
        if (i === 0) {
          // Loop through days in the first week of the month
          for (let j = 0; j < 7; j++) {
            if (j < firstWeekday) {
              weeks[i].push('');
            } else {
              weeks[i].push({
                day: currentDay,
                month: this.activeMonth,
                year: this.activeYear,
              });
              const elem = weeks[i][weeks[i].length - 1];
              elem.todos = this.getTodos(elem);

              currentDay++;
            }
          }
        } else {
          // Loop through days in each other week
          for (let j = 0; j < 7; j++) {
            if (currentDay < monthLength + 1) {
              weeks[i].push({
                day: currentDay,
                month: this.activeMonth,
                year: this.activeYear,
              });
              const elem = weeks[i][weeks[i].length - 1];
              elem.todos = this.getTodos(elem);
              currentDay++;
            } else {
              weeks[i].push('');
            }
          }
        }
      }

      return weeks;
    },
  },

  methods: {
    addNewTask() {
      this.newTask = true;
      if (this.sidebar) this.sidebar = false;
    },

    getListLS() {

    },

    addTask() {
      const task = this.enteredTask.trim();
      this.formError = '';

      if (!isPast(parseDate(this.enteredDate))) {
        console.log(task);
        if (task) {
          ajax(`${config.API_URL}/task`, 'POST', {
            description: task,
            due: this.enteredDate,
          }).then((res) => {
            console.log(res);
            this.enteredTask = '';
            this.getListDB();
          }).catch((err) => {
            console.log(err);
          });
        }
      } else {
        this.formError = 'Please select a date in the future.';
      }
    },

    completeTask(task) {
      task.completed = task.completed !== null ? null : formatDateInput(this.todayObj);

      ajax(`${config.API_URL}/task/${task.id}`, 'PATCH', Object.assign(task, {
        completed: task.completed,
      })).then((res) => {
        console.log(res);
        this.getListDB();
      }).catch((err) => {
        console.log(err);
      });
    },

    removeTask(task) {
      ajax(`${config.API_URL}/task/${task.id}`, 'DELETE')
        .then((res) => {
          console.log(res);
          this.getListDB();
        }).catch((err) => {
          console.log(err);
        });
    },

    getListDB() {
      ajax(`${config.API_URL}/task`, 'GET')
        .then((res) => {
          this.taskList = res.parsed.data;
          // this.taskList.forEach((item) => {
          // });
          this.loaded = true;
          console.log('GOT LIST');
          this.database = true;
        }).catch(() => {
          console.log('Database List Not Found');
          this.database = false;
          this.loaded = true;
        });
    },

    isPast(obj) {
      const objTime = (new Date(obj.year, obj.month, obj.day)).getTime();
      return objTime + 8.64e+7 - 1 < Date.now();
    },

    isState(str) {
      return this.state === str;
    },

    closeModal() {
      if (this.taskOpen) this.taskOpen = false;
      if (this.newTask) this.newTask = false;
    },

    closeSidebar() {
      if (this.sidebar) this.sidebar = false;
    },

    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },

    toggleState() {
      this.state = this.state === 'split' ? 'full' : 'split';
    },

    getTodos(obj) {
      return this.taskList.filter(a => parseDate(a.due).day === obj.day
          && parseDate(a.due).month === obj.month
          && parseDate(a.due).year === obj.year);
    },

    selectDay(elem) {
      if (elem > 0) {
        this.selected.day = elem;
        this.selected.month = this.activeMonth;
        this.selected.year = this.activeYear;
      }
    },

    deselect() {
      this.selected.keys().forEach((key) => {
        this.selected[key] = false;
      });
    },

    isToday(value) {
      return this.today === value
        && this.activeMonth === this.currentMonth
        && this.activeYear === this.currentYear;
    },

    isSelected(value) {
      return this.selected.day === value
        && this.activeMonth === this.selected.month
        && this.activeYear === this.selected.year;
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
    },
  },

});
