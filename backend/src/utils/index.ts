import { pipe, toString, replace } from 'ramda'

// const parseError = (error: Error): string | null => {
//   const message = error.toString().replace(/^[^:]*:/, '')

//   return message !== 'Error' ? message : null
// }

const parseMsg = (msg: string) => (msg !== 'Error' ? msg : null)

export const parseError = pipe(toString, replace(/^[^:]*:/, ''), parseMsg)

export { parseError as default }
