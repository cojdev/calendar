import Vue from 'vue';

Vue.component('calendar-table', {
  props: ['weeks', 'day-names', 'isToday', 'isSelected', 'isState', 'selectDay', 'openTask'],

  template: `
  <div class="calendar-table-wrap">
    <table class="calendar-table">
      <thead>
        <tr class="calendar-weekdays">
          <td v-for="weekday in dayNames">{{ weekday }}</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="week in weeks">

          <!-- Single Day -->
          <td v-for="day in week" :class="{today: isToday(day.day), selected: isSelected(day.day)}"
            @click="selectDay(day.day)">
            {{ day.day }}
            <template v-if="day.day">
              <button class="day-button" @click="$emit('open-task')" v-if="isState('full')"><i
                  class="fa fa-plus" aria-hidden="true"></i></button>

              <ul :class="{'calendar-dots': isState('split'), 'calendar-list': isState('full')}"
                v-if="day.todos.length > 0 && day.day">
                <div style="min-width: 7rem">
                  <li v-for="task in day.todos" :class="{'task-checked': task.completed !== null, 'task-starred': task.starred === '1'}">
                    <template v-if="isState('full')">
                      {{ task.description }} ({{ task.starred }})
                    </template>
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
