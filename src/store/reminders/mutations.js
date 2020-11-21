/* export function mutation () {} */
import { CREATE_REMINDER, REMOVE_REMINDER, UPDATE_REMINDER } from '@/store/reminders/mutation-types'

export default {
  [CREATE_REMINDER] (state, payload) {
    const { reminder: reminderDataObject } = payload
    const timestamp = new Date().getTime()
    const randomNumber = Math.random().slice(2).toString(36)
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
  }
}
