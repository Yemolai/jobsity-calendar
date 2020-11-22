/* globals describe, afterEach, beforeEach, it */
import { expect } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import createStore from '../../src/store'

describe('create reminder', () => {
  Vue.use(Vuex)
  let store
  beforeEach(() => {
    store = createStore()
  })
  afterEach(() => {
    store = null
  })

  it('should create a simple reminder', async () => {
    const reminder = {
      date: new Date(),
      text: 'Reminder test',
      city: 'Curitiba, PR, Brazil',
      forecast: 'A lovely day',
      color: '#101010'
    }
    await store.dispatch('reminders/create', { reminder })
    const { state: { reminders } } = store
    expect(Array.isArray(reminders.list)).to.be.equal(true)
    expect(reminders.list.length).to.be.equal(1)
    const [registeredReminder] = reminders.list
    expect(registeredReminder.text).to.be.equal(reminder.text)
    expect(registeredReminder.city).to.be.equal(reminder.city)
    expect(registeredReminder.forecast).to.be.equal(reminder.forecast)
    expect(registeredReminder.color).to.be.equal(reminder.color)
    expect(registeredReminder.date).to.be.equal(reminder.date)
  })
})
