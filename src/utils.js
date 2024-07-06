const uint8arrayToHex = (uint8Array) => {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

const hexToUint8 = (hexString) => {
  if (hexString.length % 2 !== 0) {
    hexString = '0' + hexString
  }
  const bytes = new Uint8Array(hexString.length / 2)
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substr(i, 2), 16)
  }
  return bytes
}

module.exports = {
  uint8arrayToHex,
  hexToUint8,
}
