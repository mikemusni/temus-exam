import { StatusCode } from './enums'

export const getKeyStatusName = (value: number): string | undefined => {
  const key = Object.keys(StatusCode).find((k) => (StatusCode as unknown as Record<string, number>)[k] === value)

  return key
}

export const getRandomString = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let randomString = ''
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    randomString += characters.charAt(randomIndex)
  }
  return randomString
}
