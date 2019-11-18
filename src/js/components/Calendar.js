import Vue from 'vue';

Vue.component('calendar', {
  props: ['weeks', 'dayNames', 'isToday', 'isSelected', 'isState', 'selectDay', 'openTask', 'month', 'year'],
  data() {
    return {
      count: 0,
    };
  },
  template: `
  <!-- Calendar -->
  <div :class="{'calendar-split': isState('split'), 'calendar-full': isState('full')}">
    <!-- Calendar Head -->
    <calendar-head
      :month="month"
      :year="year"
      @next-month="$emit('next-month')"
      @next-year="$emit('next-year')"
      @prev-month="$emit('prev-month')"
      @prev-year="$emit('prev-year')"
      ></calendar-head>

    <!-- Calendar Table -->
    <calendar-table
      :weeks="weeks"
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
