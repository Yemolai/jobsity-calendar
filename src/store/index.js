import { Store } from 'vuex'
import reminders from './reminders/index.js'

export default function () {
  return new Store({
    modules: {
      reminders
    }
  })
}
