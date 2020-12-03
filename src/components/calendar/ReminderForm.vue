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
        <v-btn elevation="0" color="transparent" size="small" @click="$emit('close')">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </div>
    </div>
    <v-form ref="form" @submit.stop="e => e.preventDefault()">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.lazy="text"
              :rules="[requiredFieldRule]"
              label="Reminder Message"
              maxlength="30"
              outlined
              placeholder="Go to the gym"
              type="text"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="clickable">
            <picker-input v-model="pickers.day" class="clickable">
              <template #popup>
                <v-date-picker
                  v-model.lazy="day"
                  label="Day"
                  outlined
                  @input="pickers.day = false"/>
              </template>
              <template #activator="{ on }">
                <v-text-field
                  class="clickable"
                  v-on="on"
                  :value="usaFormattedDate"
                  label="Day"
                  outlined
                  readonly
                  @click="pickers.day = !pickers.day"/>
              </template>
            </picker-input>
          </v-col>
          <v-col cols="6">
            <picker-input v-model="pickers.time">
              <template #popup>
                <v-time-picker
                  v-model.lazy="time"
                  label="Time"
                  outlined
                  @click:minute="pickers.time = false"/>
              </template>
              <template #activator="{ on }">
                <v-text-field
                  class="clickable"
                  v-model="time"
                  v-on="on"
                  label="Time"
                  outlined
                  readonly
                  @click="pickers.time = !pickers.time"/>
              </template>
            </picker-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="value.forecast ? 6 : 12">
            <v-text-field
              v-model.lazy="city"
              label="City"
              placeholder="Curitiba, PR, Brazil"
              outlined
              :rules="[requiredFieldRule]"
            >
            </v-text-field>
          </v-col>
          <v-col v-if="value.forecast" class="col forecast">
            <p class="label">
              Forecast:
            </p>
            <p class="text">
              {{ value.forecast }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <picker-input v-model="pickers.color">
              <template #activator="{ on }">
                <v-text-field
                  v-model="color"
                  v-on="on"
                  class="clickable"
                  hint="Click on the color field to toggle the color picker"
                  label="Color"
                  type="text"
                  outlined
                  readonly
                  @click="pickers.color = !pickers.color"
                  :rules="[requiredFieldRule]"
                />
              </template>
              <v-color-picker
                v-model.lazy="color"
                @update:color="pickers.color = false" />
            </picker-input>
          </v-col>
        </v-row>
      </v-container>
      <div class="col actions">
        <v-btn color="primary" @click="saveReminder">
          <v-icon class="mr-2" size="small">
            fas fa-save
          </v-icon>
          <span>Save</span>
        </v-btn>
        <v-btn
          v-if="mode === 'update'"
          color="red"
          dark
          @click="$emit('reminder-remove', value)"
        >
          <v-icon class="mr-2" size="small">
            fas fa-trash
          </v-icon>
          <span>Remove</span>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { requiredFieldRule } from '@/utils/validationRules'
import PickerInput from '@/components/picker-input/PickerInput'

export default {
  name: 'ReminderForm',
  components: { PickerInput },
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
  beforeMount () {
    this.$refs.form.reset()
  },
  data () {
    return {
      pickers: {
        color: false,
        day: false,
        time: false
      },
      showColorPicker: false
    }
  },
  computed: {
    usaFormattedDate () {
      const { date } = this.value
      return format(date, 'MM/dd/yyyy')
    },
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
    color: {
      get () {
        const { color = '#4560bb' } = this.value
        return color
      },
      set ({ hex }) {
        const color = hex
        this.$emit('input', { ...this.value, color })
      }
    },
    day: {
      get () {
        const { date } = this.value
        return format(date, 'yyyy-MM-dd')
      },
      set (val) {
        const { date } = this.value
        const formatString = 'yyyy-MM-dd'
        const parsed = parse(val, formatString, date)
        this.$emit('input', { ...this.value, date: parsed })
      }
    },
    time: {
      get () {
        const { date } = this.value
        return format(date, 'HH:mm')
      },
      set (val) {
        const { date } = this.value
        const formatString = 'HH:mm'
        const parsed = parse(val, formatString, date)
        this.$emit('input', { ...this.value, date: parsed })
      }
    }
  },
  methods: {
    requiredFieldRule,
    async saveReminder () {
      const valid = await this.$refs.form.validate()
      if (valid) {
        this.$emit('reminder-save')
      }
    }
  }
}
</script>

<style scoped>
.reminder-form {
  display: flex;
  flex-flow: column nowrap;
  max-width: calc(100% - 8px)
}

.reminder-form > *,
.reminder-form > form > * {
  margin-left: 8px;
  margin-bottom: 8px;
}

.title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.actions {
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: space-around;
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

.reminder-form .forecast {
  text-align: left;
}

.reminder-form .forecast > .text {
  font-style: oblique;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.clickable {
  cursor: pointer;
}

p {
  margin: 0;
}
</style>
<style>
.clickable * {
  cursor: pointer;
}
</style>
