import format from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'
import { CREATE_REMINDER, REMOVE_REMINDER, UPDATE_REMINDER } from '@/store/reminders/mutation-types'
import { getWeatherFor } from '@/services/weather.service'

const getForecast = async (city, date) => {
  const daysDifference = Math.abs(differenceInDays(date, new Date()))
  if (daysDifference <= 10) {
    return getWeatherFor(city, date)
      .catch(err => {
        console.error(err.message, err)
        return null
      })
  }
  return null
}

export async function create ({ commit }, payload) {
  try {
    const { reminder: reminderData } = payload
    const { date, text, city, color } = reminderData
    const day = format(date, 'yyyy-MM-dd')
    const time = format(date, 'HH:mm')
    const forecast = city.length ? await getForecast(city, date) : null
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
    const { date, text, city, color } = reminderData
    const day = format(date, 'yyyy-MM-dd')
    const time = format(date, 'HH:mm')
    const forecast = city.length ? await getForecast(city, date) : null
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
