<template>
  <div class="sidebar" :class="{'sidebar-open' : open}">
    <ul class="sidebar__list">
      <li>
        <button class="sidebar__button" @click="toggleSidebar">
          <template v-if="!open">
            Menu
            <i class="fa fa-bars" aria-hidden="true"></i>
          </template>
          <template v-else>
            Close
            <i class="fa fa-times" aria-hidden="true"></i>
          </template>
        </button>
      </li>

      <li>
        <button class="sidebar__button" @click="setView('list')">List view</button>
      </li>

      <li>
        <button class="sidebar__button" @click="setView('calendar')">Calendar view</button>
      </li>

      <li>
        <button class="sidebar__button" @click="addNewTask">
          <i class="fa fa-plus" aria-hidden="true"></i> New Task
        </button>
      </li>

      <li>
        <button class="sidebar__button" @click="getListDb" v-if="database">
          <i class="fa fa-refresh" aria-hidden="true"></i> Refresh list
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    "addNewTask",
    "getListDb",
    "open",
    "toggleSidebar",
    "database",
    "setView"
  ]
};
</script>