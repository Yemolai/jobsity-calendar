<template>
  <div class="calendar-header">
    <span
      class="weekday"
      v-for="(weekday, idx) in weekdays"
      :key="`weekday-${idx}`">
      {{ weekday }}
    </span>
  </div>
</template>

<script>
import format from 'date-fns/format'
import setWeekDay from 'date-fns/setDay'

export default {
  name: 'CalendarWeekDays',
  computed: {
    weekdays () {
      const daysInAWeek = 7
      return new Array(daysInAWeek)
        .fill(new Date())
        .map((date, idx) => setWeekDay(date, idx))
        .map(date => format(date, 'EEEE'))
    }
  }
}
</script>

<style scoped>
.calendar-header {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2em;
  justify-content: space-between;
  background-color: #4060fe;
  color: #ddd;
}
span.weekday {
  width: 100%;
  height: 100%;
  padding: 0.4em;
  text-align: center;
}
</style>
