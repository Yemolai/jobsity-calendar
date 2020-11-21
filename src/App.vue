<template>
  <div id="app">
    <event-calendar-page />
  </div>
</template>

<script>
import EventCalendarPage from '@/components/pages/EventCalendarPage'

export default {
  name: 'App',
  components: {
    EventCalendarPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
