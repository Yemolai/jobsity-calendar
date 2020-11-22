/* export function getter () {} */

export function map (state) {
  const { list = [] } = state
  const tuples = list.map(reminder => [reminder.id, reminder])
  return new Map([...tuples])
}

export function list (state) {
  return [...state.list]
}
