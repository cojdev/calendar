import Vue from 'vue';
import { formatDateInput } from '../helpers';

Vue.component('task-form', {
  props: ['modalOpen', 'newTask', 'formError', 'isSelected', 'isState', 'close', 'addTask', 'selected'],

  data() {
    console.log(this.selected);
    return {
      date: formatDateInput(this.selected),
      task: '',
    };
  },

  methods: {
    handleInputTask(e) {
      this.task = e.target.value;
    },

    handleInputDate(e) {
      this.date = e.target.value;
    },

    handleSubmit(e) {
      e.preventDefault();
      const { date, task } = this;
      this.addTask({ date, task });
    },
  },

  template: `
    <form class="task-form" @submit="handleSubmit">
      <label for="task">New task</label>
      <input
        id="task"
        type="text"
        placeholder="What do you need to do?"
        :value="task"
        @input="handleInputTask"
        @keyup.enter="handleSubmit">
      
      <label for="date">Date</label>
      <input
        id="date"
        type="date"
        :value="date"
        @input="handleInputDate">
      
      <button
        type="submit"
        class="task-form__submit">Add</button>

      <div
        v-if="formError !== ''"
        class="error">{{formError}}</div>
    </div>
  </form>
  `,
});
