import Vue from 'vue';

Vue.component('sidebar', {
  props: ['addNewTask', 'toggleState', 'getListDb', 'isState', 'open', 'toggleSidebar', 'taskList', 'database'],

  template: `
    <div class="sidebar" :class="{'sidebar-open' : open}">
      <ul class="sidebar__list">

        <li>
          <button class="sidebar__button" @click="toggleSidebar">
            <template v-if="!open">
              Menu <i class="fa fa-bars" aria-hidden="true"></i>
            </template>
            <template v-else>
              Close <i class="fa fa-times" aria-hidden="true"></i>
            </template>
          </button>
        </li>

        <li>
          <button class="sidebar__button">
            List view
          </button>
        </li>

        <li>
          <button class="sidebar__button">
            Calendar view
          </button>
        </li>

        <li>
          <button class="sidebar__button" @click="addNewTask">
            <i class="fa fa-plus"
              aria-hidden="true"></i> New Task
          </button>
        </li>
        
        <li>
          <button class="sidebar__button" @click="toggleState">
            <template v-if="isState('split')">
              <i class="fa fa-arrows-alt" aria-hidden="true"></i> Full View
            </template>
            <template v-else>
              <i class="fa fa-columns" aria-hidden="true"></i> Split View
            </template>
          </button>
        </li>

        <li>
          <button class="sidebar__button" @click="getListDb" v-if="database">
            <i class="fa fa-refresh" aria-hidden="true"></i> Refresh list
          </button>
        </li>

      </ul>


      <ul>
        <li v-for="task in taskList">
          {{ task.description }}
        </li>
      </ul>
    </div>
  </div>
  `,
});
