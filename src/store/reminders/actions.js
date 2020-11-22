import format from 'date-fns/format'
import { CREATE_REMINDER, REMOVE_REMINDER, UPDATE_REMINDER } from '@/store/reminders/mutation-types'

export function create ({ commit }, payload) {
  try {
    const { reminder: reminderData } = payload
    const { date, text, city, color } = reminderData
    const day = format(date, 'yyyy-MM-dd')
    const time = format(date, 'HH:mm')
    const reminder = { date, text, city, day, time, color }
    commit(CREATE_REMINDER, { reminder })
  } catch (error) {
    // todo: replace here with logger call
    console.error('Failed to create reminder', payload, error.message, error)
  }
}

export function update ({ commit }, payload) {
  try {
    const { id, reminder: { text, city, day, time, color } } = payload
    const reminder = { text, city, day, time, color }
    commit(UPDATE_REMINDER, { id, reminder })
  } catch (error) {
    // todo: replace here with logger call
    console.error('Failed to update reminder', payload, error.message, error)
  }
}

export function remove ({ commit }, payload) {
  try {
    const { id } = payload
    commit(REMOVE_REMINDER, { id })
  } catch (error) {
    // todo: replace here with logger call
    console.error('Failed to remove reminder', error.message, error)
  }
}
