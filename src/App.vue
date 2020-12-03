<template>
  <v-app class="app">
    <v-main>
      <event-calendar-page/>
    </v-main>
  </v-app>
</template>

<script>
import EventCalendarPage from '@/pages/EventCalendarPage'

export default {
  name: 'App',

  components: {
    EventCalendarPage
  },

  data: () => ({
    //
  })
}
</script>
