const nacl = require('./nacl')
const { uint8arrayToHex, hexToUint8 } = require('./utils.js')
const crypto = require('crypto')
const { crypto_hash } = require('./sha512kamosirenaiyaty.js')

const data = {
  privateKey: 'ABF4CF55A2B3F742D7543D9CC17F50447B969E6E06F5EA9195D428AB12B7318D',
  publicKey: '4DB881D07086498C3626F1F84EF89D7E08E5D8293298400F27CA98C92AB2D271',
  data: '8CE03CD60514233B86789729102EA09E867FC6D964DEA8C2018EF7D0A2E0E24BF7E348E917116690B9',
  signature:
    '31D272F0662915CAC43AB7D721CAF65D8601F52B2E793EA1533E7BC20E04EA97B74859D9209A7B18DFECFD2C4A42D6957628F5357E3FB8B87CF6A888BAB4280E',
}

const privateKey = hexToUint8(data.privateKey)
const keyPair = nacl.sign.keyPair.fromSeed(privateKey)
const signature = nacl.sign.detached(hexToUint8(data.data), keyPair.secretKey)
console.assert(uint8arrayToHex(keyPair.publicKey) === data.publicKey, 'not equal')
console.log(`publicKey: ${uint8arrayToHex(keyPair.publicKey)}`)
// 4DB881D07086498C3626F1F84EF89D7E08E5D8293298400F27CA98C92AB2D271
console.assert(uint8arrayToHex(keyPair.secretKey) === data.privateKey + data.publicKey, 'not equal')
console.log(`secretKey: ${uint8arrayToHex(keyPair.secretKey)}`)
// private key + public key
// ABF4CF55A2B3F742D7543D9CC17F50447B969E6E06F5EA9195D428AB12B7318D4DB881D07086498C3626F1F84EF89D7E08E5D8293298400F27CA98C92AB2D271
console.assert(uint8arrayToHex(signature) === data.signature, 'not equal')
console.log(`signature: ${uint8arrayToHex(signature)}`)
// 31D272F0662915CAC43AB7D721CAF65D8601F52B2E793EA1533E7BC20E04EA97B74859D9209A7B18DFECFD2C4A42D6957628F5357E3FB8B87CF6A888BAB4280E

const { sha512 } = require('@noble/hashes/sha512')
console.log('a')
function crypto_hash_sha512(out, m, n, hasher) {
  const hashBuilder = hasher.create()
  hashBuilder.update(m.subarray(0, n))
  const hash = hashBuilder.digest()

  for (let i = 0; i < out.length; ++i) out[i] = hash[i]

  return 0
}
const random = crypto.randomBytes(32)
const out1 = new Uint8Array(32)
crypto_hash_sha512(out1, random, 32, sha512)
console.log(`SHA512: ${uint8arrayToHex(out1)}`)

const out2 = new Uint8Array(32)
crypto_hash(out2, random, 32)
console.log(uint8arrayToHex(out2))
console.log(`SHA512っぽいやつ: ${uint8arrayToHex(out2)}`)

console.assert(uint8arrayToHex(out1), uint8arrayToHex(out2))
