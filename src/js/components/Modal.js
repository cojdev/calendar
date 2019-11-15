import Vue from 'vue';

Vue.component('modal', {
  props: ['modalOpen', 'newTask', 'formError', 'isSelected', 'isState', 'enteredTask', 'enteredDate'],

  template: `
  <div class="modal-overlay" :class="{'modal-overlay-open': modalOpen}" @click="$emit('close-modal')">
    <div class="new-task" v-if="newTask">
      <button class="close-button" @click="$emit('close-modal')"><i class="fa fa-times" aria-hidden="true"></i></button>
      
      <label for="">New Task</label>
      <input type="text" placeholder="Add a new task" :value="enteredTask" @input="$emit('input', $event.target.value)" @keyup.enter="$emit('add-task')">
      
      <label for="">Date</label>
      <input type="date" :value="enteredDate" @input="$emit('input', $event.target.value)">
      
      <button class="submit-button" @click="$emit('add-task')">Add task</button>
      <div v-if="formError !== ''" class="error">{{formError}}</div>
    </div>
  </div>
`,
});
