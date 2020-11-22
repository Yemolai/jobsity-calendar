<template>
  <div class="week">
    <calendar-day
      v-bind="contents"
      v-for="[date, contents] in daysList"
      :key="`day-${date.getTime()}`"
      :date="date"
      @reminder-click="payload => $emit('reminder-click', payload)"
    />
  </div>
</template>

<script>
import CalendarDay from './CalendarDay'

export default {
  name: 'CalendarWeek',
  components: { CalendarDay },
  props: {
    days: {
      type: Array,
      required: true
    }
  },
  computed: {
    daysList () {
      return this.days.slice(0, 7)
    }
  }
}
</script>
<style scoped>
.week {
  width: 100%;
  height: 6em;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  border: none;
}
</style>
