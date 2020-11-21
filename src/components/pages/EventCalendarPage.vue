<template>
  <calendar
      :reminders="reminders"
      :reference-date="referenceDate"
      @date:update="updateReferenceDate"
      @reminder:create="createReminder"
      @reminder:update="updateReminder"
      @reminder:remove="removeReminder"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import isValid from 'date-fns/isValid'
import Calendar from '@/components/calendar/Calendar'

export default {
  name: 'EventCalendarPage',
  components: { Calendar },
  data () {
    return {
      referenceDate: new Date(),
      reminders: []
    }
  },
  computed: {
    ...mapGetters('reminders', { reminderList: 'list' })
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
    }
  }
}
</script>

<style scoped>

</style>
