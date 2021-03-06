import format from 'date-fns/format'
import {
  CLEAR_REMINDERS_ON_DAY,
  CREATE_REMINDER,
  REMOVE_REMINDER,
  UPDATE_REMINDER
} from '@/store/reminders/mutation-types'

export async function create ({ commit }, payload) {
  try {
    const { reminder: reminderData } = payload
    const { date, text, city, color, forecast } = reminderData
    const day = format(date, 'yyyy-MM-dd')
    const time = format(date, 'HH:mm')
    const reminder = { date, text, city, day, time, color, forecast }
    commit(CREATE_REMINDER, { reminder })
  } catch (error) {
    // todo: replace here with logger call
    console.error('Failed to create reminder', payload, error.message, error)
  }
}

export async function update ({ commit }, payload) {
  try {
    const { id, reminder: reminderData } = payload
    const { date, text, city, color, forecast } = reminderData
    const day = format(date, 'yyyy-MM-dd')
    const time = format(date, 'HH:mm')
    const reminder = { id, date, text, city, day, time, color, forecast }
    commit(UPDATE_REMINDER, { id, reminder })
  } catch (error) {
    // todo: replace here with a proper logger call
    console.error('Failed to update reminder', payload, error.message, error)
  }
}

export function remove ({ commit }, payload) {
  try {
    const { id } = payload
    commit(REMOVE_REMINDER, { id })
  } catch (error) {
    // todo: replace here with a proper logger call
    console.error('Failed to remove reminder', error.message, error)
  }
}

export function clearDay ({ commit }, payload) {
  try {
    const { day } = payload
    commit(CLEAR_REMINDERS_ON_DAY, { day })
  } catch (error) {
    // todo: replace here with a proper logger call
    console.error('Failed to remove reminder', error.message, error)
  }
}
