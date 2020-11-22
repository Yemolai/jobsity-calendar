<template>
  <div class="reminder-form">
    <div class="col title">
      <p>
        <span>
          Create new
        </span>
        <span>
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
        <input type="text" maxlength="30" v-model="text">
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
        <color-picker
          v-model="color"
        />
      </label>
      <div class="col actions justify-end">
        <button @click="save">
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import getISODatetime from 'date-fns/getISODay'
export default {
  name: 'ReminderForm',
  data () {
    return {
      value: {
        date: new Date(),
        text: '',
        city: '',
        color: '#fbfbfb'
      }
    }
  },
  computed: {
    text: {
      get () {
        return this.value.text
      },
      set (val) {
        this.value.text = `${val}`.slice(30)
      }
    },
    city: {
      get () {
        return this.value.city
      },
      set (val) {
        this.value.city = `${val}`
      }
    },
    date: {
      get () {
        const { date = new Date() } = this.value || {}
        return getISODatetime(date)
      },
      set (val) {
        this.value.date = new Date(val)
      }
    },
    day: {
      get () {
        const { date = new Date() } = this.value
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        return `${year}-${month}-${day}`
      },
      set (val) {
        console.log({ date: val })
        this.value.day = new Date(val)
      }
    },
    time: {
      get () {
        const { date = new Date() } = this.value
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return [hours, minutes]
          .map(v => v.toString().padStart(2, '0'))
          .join(':')
      },
      set (val) {
        const [hours, minutes] = val.split(':')
          .map(v => Number(v))
        if (Number.isNaN(hours) || Number.isNaN(minutes)) {
          throw new Error('time is not a number')
        }
        if (hours >= 24 || minutes >= 60) {
          throw new Error('invalid time')
        }
        this.value.date.setHours(hours, minutes)
      }
    }
  },
  methods: {
    save () {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped>
.reminder-form {
  display: flex;
  flex-flow: column nowrap;
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
.justify-end {
  display: flex;
  justify-content: flex-end;
}
</style>
