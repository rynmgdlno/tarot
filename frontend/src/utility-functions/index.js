import ColorLib from 'color'


// * Detects the luminosity of the passed color and returns the correct foreground color. Takes an array ['r', 'g', 'b']
export const luminosityTest = color => {
  const { red, green, blue} = color
  const formatColor = ColorLib.rgb(parseInt(red), parseInt(green), parseInt(blue))
  return formatColor.isLight() ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)'
}


// * Converts RGB values to Hexadecimal. Takes an array ['r', 'g', 'b']
export const makeHex = colors => {
  let hex = '#'
  colors.forEach(color => {
    let channelHex = Number.parseInt(color).toString(16)
    if (channelHex.length === 1) channelHex = ('0' + channelHex)
    hex = (hex + channelHex).toUpperCase()
  });
  return hex
}