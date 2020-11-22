<template>
  <div :class="{ day: true, ...dynamicClasses }">
    <div class="contents">
      <span class="date">
        {{ formattedDate }}
      </span>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import isWeekend from 'date-fns/isWeekend'

export default {
  name: 'CalendarDay',
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.4em;
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
.day:not(.weekend),
.day:not(.other-month) {
  font-weight: 600;
}
.day.today {
  background-color: rgba(180, 210, 255, 0.6);
}
</style>
