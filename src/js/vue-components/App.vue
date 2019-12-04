<template>
  <!-- Vue App -->
  <div id="app" class="app">
    <template v-if="loaded">

      <div class="wrap" v-cloak>
        <div class="sidebar-clear" :class="{'sidebar-clear-open': sidebar || newTask}" @click="closeSidebar">
        </div>

        <!-- Window -->
        <div class="window">
          <div class="row">

            <!-- Calendar -->
            <calendar
              v-if="view === 'calendar'"
              :month="activeMonth"
              :year="activeYear"
              :get-tasks="getTasks"
              :is-today="isToday"
              :is-selected="isSelected"
              :select-day="selectDay"
              @next-month="nextMonth"
              @next-year="nextYear"
              @prev-month="prevMonth"
              @prev-year="prevYear"
              @open-task="addNewTask"
              ></calendar>

            <!-- To Do List -->
            <task-list
              v-if="view === 'list'"
              :open="taskOpen"
              :close-modal="closeModal"
              :is-past="isPast"
              :add-task="addTask"
              :list="taskList"
              :selected="selected"
              :remove-task="removeTask"
              :complete-task="completeTask"
              :edit-task="editTask"
              ></task-list>
          </div>
        </div>

        <!-- Sidebar -->
        <sidebar
          :add-new-task="addNewTask"
          :get-list-db="getListDB"
          :open="sidebar"
          :toggle-sidebar="toggleSidebar"
          :database="database"
          :set-view="setView"
          ></sidebar>

      <!-- Modals -->
      <modal
        :close="closeModal"
        :add-task="addTask"
        :modal-open="(taskOpen && isState('full')) || newTask"
        :new-task="newTask"
        :form-error="formError"
        :is-state="isState"
        :is-past="isPast"
        :list="currentList"
        :format-date="formatDate"
        :selected="selected"
        :remove-task="removeTask"
        ></modal>
    </template>
    <template v-else>
      <div class="loader"></div>
    </template>

  </div>
</template>