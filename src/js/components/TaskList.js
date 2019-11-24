import Vue from 'vue';
import { formatDate } from '../helpers';

Vue.component('task-list', {
  props: ['isPast', 'list', 'selected', 'removeTask'],

  methods: {
    formatDate(obj) {
      return formatDate(obj);
    },
  },

  template: `
    <div class="task-list">
      <div class="todo-date">{{ formatDate(selected) }}</div>
      <input type="text" placeholder="Add a new task" v-if="!isPast(selected)" @keyup.enter="$emit('add-task')">
      <button class="submit-button" @click="$emit('add-task')" v-if="!isPast(selected)">Add task</button>

      <template v-if="list.length">
        <ul>
          <li v-for="task in list">
            <input type="checkbox" :checked="task.completed !== null" @input="completeTask(task)">
            <span :class="{'task-checked': task.completed !== null, 'task-starred': task.starred === '1'}">{{ task.description }} ({{ task.starred }})</span>
            <div class="task-buttons">
              <button class="delete-button" @click="removeTask(task)"><i class="fa fa-times"
                  aria-hidden="true"></i></button>
            </div>
          </li>
        </ul>
      </template>
      
      <template v-else>
        <p>You have no tasks</p>
      </template>
    </div>
`,
});
