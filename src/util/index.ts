import JSEncrypt from 'jsencrypt'

/**
 * @description RSA加密(支持长字符加密)
 * @param data
 * @returns {Promise<{param: PromiseLike<ArrayBuffer>}|*>}
 */
export function encryptedData(data: string) {
  if (!data) {
    return data
  }
  const publicKey =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7Nsa8do705Vvn1mLHxNNxaiY0HqhKv2+BHQbIzXUycf8I3XKvWbqa0Ids5xU8isp0wHbKKYV53w1kwUQUM/yU96b2cHovkxnN3OdrgLxaSpZE56tyQX+ToocCQJmrXUYJqvkqRklaDbQd9vuWW2wEkJ0mYJXcjMsJpi+z21CyduywVmVo/j0DQOX7KZdV1UOHjjzHPT+v/htlY1nfad2uhxcULWpLJLm11Ner+Gr/noA96Efg1ZDoC7NROMUIfXqIyl8UD0pxRCCPEg4gO9Aq6e0m8KOG5w9HwvfZ8R2WEjF3bUEBkQgOqI3ULEoZIBd0YfEsOgHOqwMsREO3bNr4wIDAQAB'
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`)
  const res = encrypt.encrypt(data)
  return res || '' // 对内容进行加密
}
