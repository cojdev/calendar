<template>
  <div
    class="modal__overlay"
    :class="{'modal__overlay--open': modalOpen}"
    @click="closeModal"
    ref="overlay"
  >
    <div class="modal" v-if="newTask">
      <div class="row">
        <TaskList
          class="col"
          :is-state="isState"
          :is-past="isPast"
          @add-task="addTask"
          :list="list"
          :selected="selected"
          :remove-task="removeTask"
        />

        <TaskForm
          class="col"
          :add-task="addTask"
          :modal-open="modalOpen"
          :new-task="newTask"
          :selected="selected"
          :form-error="formError"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "modalOpen",
    "newTask",
    "formError",
    "isSelected",
    "isState",
    "close",
    "isState",
    "isPast",
    "list",
    "selected",
    "removeTask",
    "addTask"
  ],

  methods: {
    closeModal(e) {
      if ([this.$refs.overlay, this.$refs.close].includes(e.target)) {
        this.close(e);
      }
    }
  }
};
</script>