import Vue from 'vue';

Vue.component('task-list', {
  props: ['isState', 'open', 'closeModal', 'isPast', 'enteredTask', 'addTask', 'list', 'formatDate', 'selected', 'removeTask'],

  template: `
    <div :class="{todo: isState('split'), 'todo-modal': isState('full')}" v-if="open || isState('split')">
      <button class="close-button" @click="closeModal" v-if="isState('full')"><i class="fa fa-times"
          aria-hidden="true"></i></button>
      <div class="todo-date">{{ formatDate(selected) }}</div>
      <label for=""></label>
      <input type="text" placeholder="Add a new task" v-if="!isPast(selected)" v-model="enteredTask"
        @keyup.enter="addTask">
      <button class="submit-button" @click="addTask" v-if="!isPast(selected)">Add task</button>
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
