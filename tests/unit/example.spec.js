/* globals describe, it */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Reminder from '../../src/components/calendar/Reminder'

describe('Reminder.vue', () => {
  it('renders passed reminder basic props', () => {
    const date = new Date()
    const value = {
      date,
      text: 'remind me to write more tests',
      day: '2011-08-10',
      time: [date.getHours(), date.getMinutes()].join(':'),
      forecast: 'A lovely day'
    }
    const wrapper = shallowMount(Reminder, {
      propsData: { value }
    })
    expect(wrapper.text()).to.include(value.time)
    expect(wrapper.text()).to.include(value.text)
    expect(wrapper.text()).to.include(value.forecast)
  })
})
