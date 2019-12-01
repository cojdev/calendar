import Vue from 'vue';
import { formatDate, parseDate } from '../helpers';

Vue.component('task-item', {
  props: ['removeTask', 'completeTask', 'editTask', 'task'],

  methods: {
    formatDate(obj) {
      return formatDate(obj);
    },

    parseDate(obj) {
      return parseDate(obj);
    },
  },

  template: `
    <li class="task-item">
      <input :id="'task' + task.id" class="checkbox" type="checkbox" :checked="task.completed !== null" @input="completeTask(task)">
      <label class="task-item__label" :class="{'task-item__label--strike': task.completed !== null, 'task-starred': task.starred === '1'}" :for="'task' + task.id" :style="{fontWeight: task.starred === '1' ? 700 : 400}">{{ task.description }}
        <span class="task-item__strike" :class="{'task-item__strike--show': task.completed !== null}"></span>
      </label>
      <div class="task-item__toolbar">
        Due: {{ formatDate(parseDate(task.due)) }}
        <div class="task-item__controls">
          <button class="edit-button" @click="editTask(task)"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
          <button class="delete-button" @click="removeTask(task)"><i class="fa fa-times" aria-hidden="true"></i> Delete</button>
        </div>
      </div>
    </li>
`,
});
