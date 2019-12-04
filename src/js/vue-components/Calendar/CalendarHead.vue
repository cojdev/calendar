<template>
  <div class="calendar-head">
    {{ month }} {{ year }}
    <button class="arrow-button" @click="$emit('prev-year')">
      <i class="fa fa-angle-double-left" aria-hidden="true"></i>
    </button>
    <button class="arrow-button" @click="$emit('prev-month')">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
    </button>
    <button class="arrow-button" @click="$emit('next-month')">
      <i class="fa fa-angle-right" aria-hidden="true"></i>
    </button>
    <button class="arrow-button" @click="$emit('next-year')">
      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ['month', 'year'],
}
</script>