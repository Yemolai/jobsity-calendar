export const requiredFieldRule = v => `${v}`
  .trim()
  .replace(/\s+/mg, ' ')
  .length > 0 ||
  'This field is required'
