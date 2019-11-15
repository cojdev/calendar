import Vue from 'vue';

Vue.component('calendar-table', {
  props: ['addNewTask', 'toggleState', 'getListDB', 'isState', 'open', 'openTask'],

  template: `
    <div class="sidebar" :class="{'sidebar-open' : open}">
      <ul>

        <li>
          <button class="sidebar-button" @click="addNewTask">
            New Task <i class="fa fa-plus"
              aria-hidden="true"></i>
          </button>
        </li>
        
        <li>
          <button class="sidebar-button" @click="toggleState">
            <template v-if="isState('split')">
              <i class="fa fa-arrows-alt" aria-hidden="true"></i> Full View
            </template>
            <template v-else>
              <i class="fa fa-columns" aria-hidden="true"></i> Split View
            </template>
          </button>
        </li>

        <li>
          <button class="sidebar-button" @click="getListDB" v-if="database">
            <i class="fa fa-refresh" aria-hidden="true"></i> Refresh list
          </button>
        </li>
        
      </ul>
    </div>
  </div>
  `,
});
