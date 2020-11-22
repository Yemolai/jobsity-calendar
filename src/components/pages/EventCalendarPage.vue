<template>
  <div class="container">
    <p class="calendar-title">
      {{ currentMonth }}
    </p>
    <div class="calendar-wrapper">
      <calendar
        :reminders="reminders"
        :reference-date="referenceDate"
        @date:update="updateReferenceDate"
        @reminder:remove="removeReminder"
      />
    </div>
    <div class="action-buttons-wrapper" v-if="!showReminderForm">
      <button @click="triggerCreateReminderForm">
        Add new reminder
      </button>
    </div>
    <div class="reminder-form-wrapper" v-else-if="showReminderForm">
      <reminder-form
        v-model="reminder"
        :mode="reminderFormMode"
        @reminder-save="upsertReminder"
        @close="closeReminderForm"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import Calendar from '@/components/calendar/Calendar'
import ReminderForm from '@/components/calendar/ReminderForm'

// using function to return new object without referencing the previous object
const createEmptyReminderObject = () => ({
  text: '',
  date: new Date(),
  city: '',
  color: '#4560bb'
})

export default {
  name: 'EventCalendarPage',
  components: { ReminderForm, Calendar },
  data () {
    return {
      referenceDate: new Date(),
      showReminderForm: false,
      reminderFormMode: 'add',
      reminder: createEmptyReminderObject()
    }
  },
  computed: {
    ...mapGetters('reminders', { reminderList: 'list' }),
    reminders () {
      return this.reminderList
    },
    currentMonth () {
      return format(this.referenceDate, 'MMMM')
    }
  },
  methods: {
    ...mapActions('reminders', {
      createReminder: 'create',
      updateReminder: 'update',
      removeReminder: 'remove'
    }),
    updateReferenceDate (date) {
      if (isValid(new Date(date))) {
        this.referenceDate = date
      }
    },
    closeReminderForm () {
      this.reminder = createEmptyReminderObject()
      this.showReminderForm = false
    },
    upsertReminder () {
      const { reminder } = this
      let promise
      if (typeof reminder === 'object' && 'id' in reminder) {
        promise = this.updateReminder({ id: reminder.id, reminder })
      } else {
        promise = this.createReminder({ reminder })
      }
      promise.then(() => {
        this.showReminderForm = false
        this.reminderFormMode = 'add'
        this.reminder = {}
      })
        .catch(() => {
        // todo: use a modal dialog here instead of alert
          alert('failed to save')
        })
    },
    triggerCreateReminderForm () {
      this.reminder = createEmptyReminderObject()
      this.reminderFormMode = 'add'
      this.showReminderForm = true
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0.2em 1em;
}
.calendar-wrapper {
  padding: 0.2em 1em;
}
.action-buttons-wrapper {
  padding: 1em;
  display: flex;
  justify-content: center;
}
.reminder-form-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.reminder-form-wrapper > * {
  min-width: 25em;
  max-width: min(32em, 100%);
}
[class$="-wrapper"] > * {
  margin-left: 8px;
  margin-bottom: 8px;
}
</style>
