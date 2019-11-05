<template>
  <div class="calendar-head">
    {{ monthNames[activeMonth] }} {{ activeYear }}
    <button class="arrow-button" @click="prevYear()">
      <i class="fa fa-angle-double-left" aria-hidden="true"></i>
    </button>
    <button class="arrow-button" @click="prevMonth()">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
    </button>
    <button class="arrow-button" @click="nextMonth()">
      <i class="fa fa-angle-right" aria-hidden="true"></i>
    </button>
    <button class="arrow-button" @click="nextYear()">
      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
    </button>
  </div>
</template>