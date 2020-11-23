// from: https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
export function getContrastYIQ (hex) {
  // If a leading # is provided, remove it
  if (hex.slice(0, 1) === '#') {
    hex = hex.slice(1)
  }

  // If a three-character hex code, make six-character
  if (hex.length === 3) {
    hex = hex.split('').map(function (hex) {
      return hex + hex
    }).join('')
  }

  // Convert to RGB value
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // Get YIQ ratio
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

  // Check contrast
  return (yiq >= 128) ? 'black' : 'white'
}
