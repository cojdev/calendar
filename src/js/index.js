import Vue from 'vue';
import Calendar from './Calendar';
import { formatDateInput } from './helpers';
/**
 * Application
 */

// var cal = new Calendar();
var date = new Date();

/**
 * Main Vue instance
 */
var todo = new Vue({

  el: '#app',

  data: {
    weekdayNames: Calendar.days.map(function (a) {
      return a.slice(0, 3);
    }),
    monthNames: Calendar.months,
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
    taskOpen: false,
    loaded: false,
    newTask: false,
    enteredTask: '',
    enteredDate: '',
    sidebar: false,
    selected: {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    }
  },

  created: function () {
    this.activeMonth = this.currentMonth;
    this.enteredDate = formatDateInput(this.todayObj);
    this.getListDB();
    if (localStorage.getItem("savedState")) {
      this.state = localStorage.getItem("savedState");
      console.log("STATE LOADED");
    }
  },

  watch: {
    selected: {
      handler: function () {
        var self = this;
        this.enteredDate = formatDateInput(this.selected);
        self.currentList = this.taskList.filter(function (a) {
          //console.log(self.selected.day);
          return _parseDate(a.date).day === self.selected.day &&
            _parseDate(a.date).month === self.selected.month &&
            _parseDate(a.date).year === self.selected.year;
        })
      },
      deep: true
    },
    taskList: {
      handler: function () {
        var self = this;
        self.currentList = this.taskList.filter(function (a) {
          //console.log(self.selected.day);
          return _parseDate(a.date).day === self.selected.day &&
            _parseDate(a.date).month === self.selected.month &&
            _parseDate(a.date).year === self.selected.year;
        })
      },
      deep: true
    },
    state: {
      handler: function () {
        localStorage.setItem('savedState', this.state);
        console.log("STATE SAVED");
      },
      deep: true
    }
  },

  computed: {
    // Returns a matrix of days and weeks of the month [[1,2,3,...],[8,9,10,...],...]
    getWeeks: function () {
      // Empty array
      var weeks = [];
      // Date object of the first day of the active month
      var dateObject = new Date(this.activeYear, this.activeMonth, 1);
      // 0-6 numerical value of the first day of the month
      var firstWeekday = dateObject.getDay();
      // Get the month length dynamically so leap years are accounted for
      var monthLength = new Date(this.activeYear, this.activeMonth + 1, 0).getDate();
      // Set current day to 1 each time this function is called
      var currentDay = 1;

      // Loop through weeks in a month
      for (var i = 0; i < 6 && currentDay < monthLength + 1; i++) {
        weeks.push([]);
        if (i === 0) {
          // Loop through days in the first week of the month
          for (var j = 0; j < 7; j++) {
            if (j < firstWeekday) {
              weeks[i].push('');
            }
            else {
              weeks[i].push({
                day: currentDay,
                month: this.activeMonth,
                year: this.activeYear,
              });
              var elem = weeks[i][weeks[i].length - 1];
              elem.todos = this.getTodos(elem);

              currentDay++;
            }
          }
        }
        else {
          // Loop through days in each other week
          for (var j = 0; j < 7; j++) {
            if (currentDay < monthLength + 1) {
              weeks[i].push({
                day: currentDay,
                month: this.activeMonth,
                year: this.activeYear
              });
              var elem = weeks[i][weeks[i].length - 1];
              elem.todos = this.getTodos(elem);
              currentDay++;
            }
            else {
              weeks[i].push('');
            }

          }
        }
      }

      return weeks;
    }
  },

  methods: {
    addNewTask: function () {
      this.newTask = true;
      if (this.sidebar) this.sidebar = false;
    },

    removeTask: function (task) {
      var index = this.taskList.indexOf(task);
      this.taskList.splice(index, 1);
    },

    getListDB: function () {
      var self = this;
      var request = new XMLHttpRequest();
      request.open("GET", "todolist.php", true);
      console.log("GET LIST");
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          self.taskList = JSON.parse(this.response);
          self.loaded = true;
          console.log("GOT LIST");
          self.database = true;
        }
        else {
          console.log("Database List Not Found");
          self.database = false;
          self.loaded = true;
        }

      };
      request.send();
    },
    saveListDB: function () {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.response === "SUCCESS") {
            alert("Task List Saved");
          }
          else {
            alert(this.response);
          }

        }
      };
      console.log(JSON.stringify(this.taskList));
      request.open("POST", "savelist.php", true);
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send("data=" + JSON.stringify(this.taskList));
    },
    addTask: function () {
      //Remove whitespace from start and end
      var task = this.enteredTask.trim();

      var self = this;

      if (_isPast(_parseDate(self.enteredDate)) === false) {
        if (task) {
          //Add new a task to the start of the task list
          this.taskList.push({
            text: task,
            checked: false,
            date: self.enteredDate,
            id: Date.now()
          });

          console.log(this.taskList[this.taskList.length - 1])

          this.enteredTask = "";
        }
      }
      else {
        alert("Please pick today or a day in the future.");
      }
    },

    isPast: function (obj) {
      return (new Date(obj.year, obj.month, obj.day)).getTime() < (new Date(this.currentYear, this.currentMonth, this.today)).getTime() ? true : false;
    },

    isState: function (str) {
      return this.state === str;
    },

    closeModal: function () {
      if (this.taskOpen) this.taskOpen = false;
      if (this.newTask) this.newTask = false;
    },

    closeSidebar: function () {
      if (this.sidebar) this.sidebar = false;
    },

    toggleSidebar: function () {
      this.sidebar = !this.sidebar;
    },

    toggleState: function () {
      this.state = this.state === "split" ? "full" : "split";
    },

    getTodos: function (obj) {
      return this.taskList.filter(function (a) {
        return _parseDate(a.date).day === obj.day &&
          _parseDate(a.date).month === obj.month &&
          _parseDate(a.date).year === obj.year;
      });
    },

    selectDay: function (elem) {
      if (elem > 0) {
        this.selected.day = elem;
        this.selected.month = this.activeMonth;
        this.selected.year = this.activeYear;
      }
    },

    deselect: function () {
      for (var key in this.selected) {
        this.selected[key] = false;
      }
    },

    isToday: function (value) {
      return this.today === value && this.activeMonth === this.currentMonth && this.activeYear === this.currentYear;
    },

    isSelected: function (value) {
      return this.selected.day === value && this.activeMonth === this.selected.month && this.activeYear === this.selected.year;
    },

    formatDate: function (obj) {
      return _formatDate(obj);
    },

    prevMonth: function () {
      // jan to dec
      if (this.activeMonth === 0) {
        this.activeMonth = 11;
        this.activeYear--;
      } else {
        this.activeMonth--;
      }
    },

    nextMonth: function () {
      // dec to jan
      if (this.activeMonth === 11) {
        this.activeMonth = 0;
        this.activeYear++;
      } else {
        this.activeMonth++;
      }
    },

    prevYear: function () {
      this.activeYear--;
    },

    nextYear: function () {
      this.activeYear++;
    }
  }

});

