<template>
  <div
    :class="{todo: isState('split'), 'todo-modal': isState('full')}"
    v-if="taskOpen || isState('split')"
  >
    <button class="close-button" @click="closeModal" v-if="isState('full')">
      <i class="fa fa-times" aria-hidden="true"></i>
    </button>
    <div class="todo-date">{{ formatDate(selected) }}</div>
    <label for></label>
    <input
      type="text"
      placeholder="Add a new task"
      v-if="!isPast(selected)"
      v-model="enteredTask"
      @keyup.enter="addTask"
    />
    <button class="submit-button" @click="addTask" v-if="!isPast(selected)">Add task</button>
    <template v-if="currentList.length !== 0">
      <ul>
        <li v-for="task in currentList" :key="task.id">
          <input type="checkbox" v-model="task.checked" true-value="1" false-value="0" />
          <span :class="{checked: task.checked === '1'}">{{ task.description }}</span>
          <div class="task-buttons">
            <button class="delete-button" @click="removeTask(task)">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <p>You have no tasks</p>
    </template>
  </div>
</template>