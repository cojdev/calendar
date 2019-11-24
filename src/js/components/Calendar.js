import Vue from 'vue';
import cal from '../cal';

Vue.component('calendar', {
  props: ['getTasks', 'isToday', 'isSelected', 'isState', 'selectDay', 'openTask', 'month', 'year'],

  data() {
    return {
      monthName: cal.months[this.month],
      dayNames: cal.days,
    };
  },

  computed: {
    /**
     * @returns {[string, number]} 2d array of days and weeks in the current month
     */
    getWeeks() {
      console.log('getweeks');
      const { year, month, getTasks } = this;
      const weeks = [];

      // 0-6 numerical value of the first day of the month
      const firstWeekday = new Date(year, month, 1).getDay();

      // Get the month length dynamically to account for leap years
      const monthLength = new Date(year, month + 1, 0).getDate();

      let currentDay = 1;

      // Loop through weeks in a month
      for (let i = 0; i < 6 && currentDay < monthLength + 1; i++) {
        weeks.push([]);

        if (i === 0) {
          // first week
          for (let j = 0; j < 7; j++) {
            if (j < firstWeekday) {
              // add an empty day to the start of the month
              weeks[i].push('');
            } else {
              const elem = {
                day: currentDay,
                month,
                year,
              };
              elem.tasks = getTasks(elem);
              weeks[i].push(elem);
              currentDay++;
            }
          }
        } else {
          // remaining weeks
          for (let j = 0; j < 7; j++) {
            if (currentDay <= monthLength) {
              const elem = {
                day: currentDay,
                month,
                year,
              };
              elem.tasks = getTasks(elem);
              weeks[i].push(elem);
              currentDay++;
            } else {
              // add an empty day to the end of the month
              weeks[i].push('');
            }
          }
        }
      }

      console.log(weeks);
      return weeks;
    },
  },

  template: `
  <!-- Calendar -->
  <div :class="{'calendar-split': isState('split'), 'calendar-full': isState('full')}">
    <!-- Calendar Head -->
    <calendar-head
      :month="monthName"
      :year="year"
      @next-month="$emit('next-month')"
      @next-year="$emit('next-year')"
      @prev-month="$emit('prev-month')"
      @prev-year="$emit('prev-year')"
      ></calendar-head>

    <!-- Calendar Table -->
    <calendar-table
      :weeks="getWeeks"
      :day-names="dayNames"
      :is-today="isToday"
      :is-selected="isSelected"
      :is-state="isState"
      :select-day="selectDay"
      @open-task="$emit('open-task')"
      ></calendar-table>
  </div>
  `,
});
