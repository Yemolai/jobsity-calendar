<template>
  <div class="container">
    <p class="calendar-title">
      {{ currentMonth }}
    </p>
    <div class="calendar-wrapper">
      <calendar
        :reminders="reminders"
        :reference-date="referenceDate"
        @date-update="updateReferenceDate"
        @reminder-click="editReminder"
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
        @reminder-remove="confirmRemoveReminder"
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
      this.reminderFormMode = 'add'
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
    },
    editReminder (reminder) {
      this.reminder = reminder
      this.reminderFormMode = 'update'
      this.showReminderForm = true
    },
    confirmRemoveReminder (reminder) {
      const formattedDate = `${reminder.day} ${reminder.time}`
      const message = `Are you sure you want to remove the "${reminder.text}" at ${formattedDate}`
      const confirmation = confirm(message)
      if (confirmation === true) {
        this.removeReminder({ id: reminder.id })
          .then(this.closeReminderForm)
          .catch((error) => {
            const { message } = error
            // todo: replace by a logger to handle unexpected errors
            console.error('Failed to remove reminder', message, error)
            alert('Sorry, an error occurred while trying to remove this reminder')
            this.closeReminderForm()
          })
      }
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
