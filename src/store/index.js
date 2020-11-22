import { Store } from 'vuex'
import reminders from './reminders/index.js'

export default function () {
  console.log({ reminders })
  const store = new Store({
    modules: {
      reminders
    }
  })
  console.log({ store })
  return store
}
