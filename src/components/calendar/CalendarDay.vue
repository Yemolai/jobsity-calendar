<template>
  <div :class="{ day: true, ...dynamicClasses }">
    <div class="contents">
      <span class="date">
        {{ formattedDate }}
      </span>
      <div class="reminder-list">
        <reminder
          v-for="reminder in reminderList"
          :key="reminder.key"
          :value="reminder"
          @click="payload => $emit('reminder-click', payload)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import isWeekend from 'date-fns/isWeekend'
import Reminder from '@/components/calendar/Reminder'

export default {
  name: 'CalendarDay',
  components: { Reminder },
  props: {
    today: Boolean,
    otherMonth: Boolean,
    date: {
      type: Date,
      required: true
    },
    reminders: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    dynamicClasses () {
      return {
        today: this.today === true,
        weekend: isWeekend(this.date),
        'other-month': this.otherMonth === true
      }
    },
    formattedDate () {
      return format(this.date, 'd')
    },
    reminderList () {
      const { reminders = [] } = this
      return reminders
        .slice(0)
        .sort(({ date: a }, { date: b }) => {
          return a.getTime() - b.getTime()
        })
    }
  }
}
</script>

<style scoped>
.day {
  width: 100%;
  height: 100%;
  max-height: 100%;
  border: none;
  border-left: 1px solid var(--color-dark);
  border-bottom: 1px solid var(--color-dark);
}
.day > .contents {
  width: calc(100% - 0.8em);
  min-height: calc(100% - 0.8em);
  max-height: calc(100% - 0.6em);
  display: flex;
  flex-direction: column;
  padding: 0.4em;
}
.day > .contents > .reminder-list {
  max-height: calc(100% - 2em);
  overflow-y: auto;
}
.day > .contents > .reminder-list > * {
  margin-bottom: 0.1em;
}
.day > .contents > span.date {
  text-align: left;
  padding: 0.2em;
}
.day.other-month {
  color: rgba(0, 0, 0, 0.25);
}
.day.weekend {
  background-color: rgba(240, 240, 240, 0.8);
  color: var(--color-primary);
}
.day.weekend,
.day.other-month {
  font-weight: 400;
}
.day {
  font-weight: 600;
}
.day.today {
  background-color: rgba(180, 210, 255, 0.6);
}
.reminder-list {
  width: calc(100% - 0.6em);
  display: flex;
  flex-direction: column;
  padding: 0.2em;
}
</style>
