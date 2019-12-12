<template>
  <div class="task-list">
    <div class="todo-date">Welcome back, {{ formatDate(selected) }}</div>
    <select></select>
    <button>Add task</button>
    <template v-if="list.length">
      <ul class="task-list__list">
        <!-- Task Item -->
        <TaskItem
          v-for="task in list"
          :key="task.id"
          :task="task"
          :removeTask="removeTask"
          :completeTask="completeTask"
          :editTask="editTask"
          :selected="selected"
        />
      </ul>
    </template>
    <template v-else>
      <p>You have no tasks</p>
    </template>
  </div>
</template>

<script>
import TaskItem from "./TaskItem";
import { formatDate, parseDate } from '../../helpers';

export default {
  components: {
    TaskItem
  },

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