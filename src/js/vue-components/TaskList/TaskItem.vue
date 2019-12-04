<template>
  <div class="task-list">
    <div class="todo-date">Welcome back, {{ formatDate(selected) }}</div>
    <select></select>
    <button>Add task</button>
    <template v-if="list.length">
      <ul class="task-list__list">
        <!-- Task Item -->
        <task-item
          v-for="task in list"
          :key="task.id"
          :task="task"
          :removeTask="removeTask"
          :completeTask="completeTask"
          :editTask="editTask"
        ></task-item>
      </ul>
    </template>
    <template v-else>
      <p>You have no tasks</p>
    </template>
  </div>
</template>

<script>
import { formatDate, parseDate } from "../helpers";

export default {
  props: [
    "isPast",
    "list",
    "selected",
    "removeTask",
    "completeTask",
    "editTask"
  ],

  methods: {
    formatDate(obj) {
      return formatDate(obj);
    },

    parseDate(obj) {
      return parseDate(obj);
    }
  }
};
</script>