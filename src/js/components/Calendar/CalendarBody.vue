
<template>
  <div class="calendar-body">
    <table class="calendar-body__inner">
      <thead class="calendar-body__head">
        <tr class="calendar-weekdays">
          <td
            class="calendar-body__cell calendar-body__cell--head"
            v-for="(weekday, index) in dayNames"
            :key="index"
          >{{ weekday.substr(0,3) }}</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(week, index) in weeks" :key="index">
          <td
            class="calendar-body__cell calendar-body__cell--body"
            v-for="(day, index) in week"
            :key="index"
            :class="{today: isToday(day.day), selected: isSelected(day.day)}"
            @click="selectDay(day.day)"
          >
            {{ day.day }}
            <template v-if="day.day">
              <button class="day-button" @click="$emit('open-task')">View</button>
              <ul class="calendar-body__list" v-if="day.tasks.length > 0 && day.day">
                <div style="min-width: 7rem">
                  <li
                    v-for="task in day.tasks"
                    :key="task.id"
                    :class="{'task-checked': task.completed !== null, 'task-starred': task.starred === '1'}"
                  >{{ task.description }} ({{ task.starred }})</li>
                </div>
              </ul>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["month", "year"]
};
</script>