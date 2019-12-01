import Vue from 'vue';

Vue.component('calendar-table', {
  props: ['weeks', 'day-names', 'isToday', 'isSelected', 'selectDay', 'openTask'],

  data() {
    return {
      listClass: '',
    };
  },

  template: `
  <div class="calendar-table">
    <table class="calendar-table__inner">
      <thead class="calendar-table__head">
        <tr class="calendar-weekdays">
          <td class="calendar-table__cell calendar-table__cell--head" v-for="weekday in dayNames">{{ weekday.substr(0,3) }}</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="week in weeks">
          <td class="calendar-table__cell calendar-table__cell--body" v-for="day in week" :class="{today: isToday(day.day), selected: isSelected(day.day)}"
            @click="selectDay(day.day)">
            {{ day.day }}

            <template v-if="day.day">
              <button class="day-button" @click="$emit('open-task')">View</button>
              <ul class="calendar-table__list"
                v-if="day.tasks.length > 0 && day.day">
                <div style="min-width: 7rem">
                  <li v-for="task in day.tasks" :class="{'task-checked': task.completed !== null, 'task-starred': task.starred === '1'}">
                      {{ task.description }} ({{ task.starred }})
                  </li>
                </div>
              </ul>
            </template>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
});
