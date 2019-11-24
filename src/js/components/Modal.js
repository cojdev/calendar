import Vue from 'vue';

Vue.component('modal', {
  props: ['modalOpen', 'newTask', 'formError', 'isSelected', 'isState', 'close', 'isState', 'isPast', 'list', 'selected', 'removeTask', 'addTask'],

  methods: {
    closeModal(e) {
      if ([this.$refs.overlay, this.$refs.close].includes(e.target)) {
        this.close(e);
      }
    },
  },

  template: `
  <div class="modal__overlay" :class="{'modal__overlay--open': modalOpen}" @click="closeModal" ref="overlay">
    <div class="modal" v-if="newTask">
      <div class="row">
        <task-list
          class="col"
          :is-state="isState"
          :is-past="isPast"
          @add-task="addTask"
          :list="list"
          :selected="selected"
          :remove-task="removeTask"></task-list>

        <task-form
          class="col"
          :add-task="addTask"
          :modal-open="modalOpen"
          :new-task="newTask"
          :selected="selected"
          :form-error="formError"></task-form>
      </div>
      
    </div>
  </div>
`,
});
