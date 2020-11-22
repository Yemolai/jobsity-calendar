<template>
  <div class="reminder-form">
    <div class="col title">
      <p>
        <span v-if="mode === 'add'">
          Create new
        </span>
        <span v-else-if="mode === 'update'">
          Update
        </span>
        reminder
      </p>
      <div class="actions">
        <button @click="$emit('close')">
          &times;
        </button>
      </div>
    </div>
    <form @submit="e => e.preventDefault()">
      <label class="col">
        <span class="label">Text:&nbsp;</span>
        <input type="text" maxlength="30" v-model.lazy="text">
      </label>
      <label class="col">
        <span class="label">Day and time:&nbsp;</span>
        <input type="datetime-local" v-model="date">
      </label>
      <label class="col">
        <span class="label">City:&nbsp;</span>
        <input type="text" v-model="city">
      </label>
      <label class="col">
        <span class="label">Color:&nbsp;</span>
        <input
          readonly
          type="text"
          v-model="color"
          @click="showColorPicker = !showColorPicker"
        >
      </label>
      <div class="col justify-center">
        <color-picker
          v-if="showColorPicker"
          v-model.lazy="color"
        />
      </div>
      <div class="col actions justify-end">
        <button @click="saveReminder">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Chrome as ColorPicker } from 'vue-color'

export default {
  name: 'ReminderForm',
  components: { ColorPicker },
  props: {
    mode: {
      type: String,
      enum: ['add', 'update'],
      default: 'add'
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showColorPicker: false
    }
  },
  computed: {
    text: {
      get () {
        const { text = '' } = this.value
        return text
      },
      set (val) {
        const text = `${val}`.slice(0, 30)
        this.$emit('input', { ...this.value, text })
      }
    },
    city: {
      get () {
        const { city = '' } = this.value
        return city
      },
      set (val) {
        const city = `${val}`
        this.$emit('input', { ...this.value, city })
      }
    },
    date: {
      get () {
        const { date: rawTimestamp = new Date() } = this.value || {}
        const timestamp = rawTimestamp instanceof Date
          ? rawTimestamp
          : new Date(rawTimestamp)
        const date = [
          timestamp.getFullYear(),
          timestamp.getMonth() + 1,
          timestamp.getDate()
        ].join('-')
        const time = [
          timestamp.getHours(),
          timestamp.getMinutes()
        ]
          .map(v => v.toString().padStart(2, '0'))
          .join(':')
        return [date, time].join('T')
      },
      set (val) {
        const date = new Date(val)
        this.$emit('input', { ...this.value, date })
      }
    },
    color: {
      get () {
        const { color = '#4560bb' } = this.value
        return color
      },
      set ({ hex }) {
        const color = hex
        this.$emit('input', { ...this.value, color })
      }
    }
  },
  methods: {
    saveReminder () {
      this.$emit('reminder-save')
    }
  }
}
</script>

<style scoped>
.reminder-form {
  display: flex;
  flex-flow: column nowrap;
  padding: 1em;
  margin: 0.8em;
  border: 1px solid var(--color-dark);
}
.reminder-form > *,
.reminder-form > form > * {
  margin-left: 8px;
  margin-bottom: 8px;
}
.col {
  width: 100%;
}
.title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.actions {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
}
label {
  display: inline-grid;
}
label > .label {
  text-align: left;
  color: var(--color-dark, #111);
  opacity: 0.85;
  font-size: 0.8em;
  font-weight: 600;
}
label > input {
  color: var(--color-dark, #111);
  font-size: 1.2em;
}
.reminder-form > form {
  margin: 0 1em;
}
.justify-center {
  display: flex;
  justify-content: center;
}
.justify-end {
  display: flex;
  justify-content: flex-end;
}
.clickable {
  cursor: pointer;
}
</style>
