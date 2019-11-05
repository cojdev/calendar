<template>
  <div class="calendar-table-wrap">
    <table class="calendar-table">
      <thead>
        <tr class="calendar-weekdays">
          <td v-for="weekday in weekdayNames" :key="weekday">{{ weekday }}</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="week in getWeeks" :key="week">
          <!-- Single Day -->
          <td
            v-for="day in week"
            :class="{today: isToday(day.day), selected: isSelected(day.day)}"
            @click="selectDay(day.day)"
            :key="day.day"
          >
            {{ day.day }}
            <template v-if="day.day">
              <button class="day-button" @click="taskOpen = true" v-if="isState('full')">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>

              <ul
                :class="{'calendar-dots': isState('split'), 'calendar-list': isState('full')}"
                v-if="day.todos.length > 0 && day.day"
              >
                <div style="min-width: 7rem">
                  <li v-for="task in day.todos" :class="{'task-checked': task.checked === '1'}" :key="task.id">
                    <template v-if="isState('full')">{{ task.description }}</template>
                  </li>
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
  
}
</script>

<style lang="en">
  
</style>