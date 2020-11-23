<template>
  <div class="calendar">
    <calendar-week-days/>
    <calendar-week
      v-for="(week, idx) of weeks"
      :key="`week-${idx + 1}`"
      :days="week"
      @reminder-click="payload => $emit('reminder-click', payload)"
      @reminders-clear="payload => $emit('reminders-clear', payload)"
    />
  </div>
</template>

<script>
import getWeek from 'date-fns/getWeek'
import setWeek from 'date-fns/setWeek'
import setWeekDay from 'date-fns/setDay'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import startOfMonth from 'date-fns/startOfMonth'
import getWeeksInMonth from 'date-fns/getWeeksInMonth'
import CalendarWeek from '@/components/calendar/CalendarWeek'
import CalendarWeekDays from '@/components/calendar/CalendarWeekDays'

export default {
  name: 'Calendar',
  components: { CalendarWeekDays, CalendarWeek },
  props: {
    referenceDate: {
      type: Date,
      required: true
    },
    reminders: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    monthFirstDay () {
      return startOfMonth(this.referenceDate)
    },
    firstWeekDayOfFirstMonthWeek () {
      return setWeekDay(this.monthFirstDay, 0)
    },
    weeksInCurrentMonth () {
      return getWeeksInMonth(this.referenceDate)
    },
    weeks () {
      const {
        firstWeekDayOfFirstMonthWeek: firstWeekDay,
        monthFirstDay,
        weeksInCurrentMonth: weekCount
      } = this

      const daysInAWeek = 7

      const firstWeekIndex = getWeek(firstWeekDay)

      const weeksList = new Array(weekCount)
        .fill(firstWeekDay)
        .map((firstDay, monthWeekIndex) => {
          const weekIndex = monthWeekIndex + firstWeekIndex

          const weekFirstDate = setWeek(firstDay, weekIndex)

          return new Array(daysInAWeek)
            .fill(weekFirstDate)
            .map((firstWeekDay, weekDayIndex) => {
              return setWeekDay(firstWeekDay, weekDayIndex)
            })
        })

      return weeksList
        .map(week => week
          .map(day => {
            const reminders = this.reminders
              .filter(reminder => isSameDay(reminder.date, day))

            const today = isSameDay(day, new Date())

            const otherMonth = !isSameMonth(day, monthFirstDay)

            return [day, { reminders, today, otherMonth }]
          }))
    }
  }
}
</script>
<style scoped>
.calendar {
  border-right: 1px solid var(--color-dark, #333);
}
</style>
