import isSameDay from 'date-fns/isSameDay'
import {
  CLEAR_REMINDERS_ON_DAY,
  CREATE_REMINDER,
  REMOVE_REMINDER,
  UPDATE_REMINDER
} from '@/store/reminders/mutation-types'

export default {
  [CREATE_REMINDER] (state, payload) {
    const { reminder: reminderDataObject } = payload

    const timestamp = new Date().getTime()

    const randomNumber = Math.random()
      .toString(36)
      .slice(2)

    const newReminder = {
      id: `${timestamp}${randomNumber}`,
      ...reminderDataObject
    }
    state.list = [
      ...state.list,
      newReminder
    ]
  },
  [UPDATE_REMINDER] (state, payload) {
    const { id: reminderId, reminder: reminderDataObject } = payload
    state.list = [
      ...state.list.filter(({ id }) => id !== reminderId),
      reminderDataObject
    ]
  },
  [REMOVE_REMINDER] (state, payload) {
    const { id: reminderId } = payload
    state.list = state.list.filter(({ id }) => id !== reminderId)
  },
  [CLEAR_REMINDERS_ON_DAY] (state, payload) {
    const { day } = payload
    state.list = state.list.filter(({ date }) => !isSameDay(date, day))
  }
}
