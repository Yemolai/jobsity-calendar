/* export function getter () {} */

export function map (state) {
  const tuples = state.list.map(reminder => [reminder.id, reminder])
  return new Map([...tuples])
}

export function list (state) {
  return [...state.list]
}
