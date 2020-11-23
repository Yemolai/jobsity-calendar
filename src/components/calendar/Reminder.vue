<template>
  <div
    :class="dynamicClasses"
    :style="dynamicStyles"
    @click="$emit('click', value)"
  >
    <p>
      <span class="time">
        {{ value.time }}
      </span>
      <span class="text">
        {{ value.text }}
      </span>
    </p>
    <p v-if="value.forecast" class="forecast">
      {{ value.forecast }}
    </p>
  </div>
</template>

<script>
import { getContrastYIQ } from '@/utils/getContrastYIQ'

export default {
  name: 'Reminder',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    color () {
      const { color = '#3040bb' } = this.value
      return color
    },
    textColorClass () {
      const textColor = getContrastYIQ(this.color)
      return textColor === 'white'
        ? 'text-light'
        : 'text-dark'
    },
    dynamicClasses () {
      return [
        'reminder',
        this.textColorClass
      ]
    },
    dynamicStyles () {
      return {
        backgroundColor: this.color
      }
    }
  }
}
</script>

<style scoped>
.reminder {
  cursor: pointer;
  font-size: 0.85em;
  font-weight: 400;
  text-align: left;
  padding: 0.25em 0.55em;
  border-radius: 0.2em;
}
.reminder p {
  margin: 0;
}
.reminder > .time {
  font-weight: 600;
}
.reminder .forecast {
  text-align: right;
  font-style: oblique;
  font-size: 0.8em;
  opacity: 0.75;
}
.text-light {
  color: var(--color-light, #eee)
}
.text-dark {
  color: var(--color-dark, #222)
}
</style>
