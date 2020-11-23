import format from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'

export const WEATHER_API_BASE_URL = 'http://api.weatherapi.com/v1'
const apiKeyEnvVarName = 'VUE_APP_WEATHER_API_KEY'
const { [apiKeyEnvVarName]: apiKey } = process.env

export async function getForecast (city, date) {
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

export async function getWeatherFor (city, date) {
  if (!apiKey || apiKey.length < 1) {
    const message = `no WeatherAPI API key provided in env variable ${apiKeyEnvVarName}`

    throw new Error(message)
  }

  const dt = format(date, 'yyyy-MM-dd')

  const hour = format(date, 'H')

  const searchParams = new URLSearchParams({
    q: city,
    key: apiKey,
    days: 1,
    dt,
    hour
  })

  const url = `${WEATHER_API_BASE_URL}/forecast.json?${searchParams}`

  return fetch(url)
    .then(response => response.json())
    .then(response => {
      const {
        forecast: {
          forecastday: [{
            hour: [{
              condition: {
                text: forecastText
              }
            }]
          }]
        }
      } = response
      return forecastText
    })
    .catch(error => {
      const { message } = error
      // todo: replace with a proper logger
      console.error('Failed to fetch weather data', message, error)
      return null
    })
}
