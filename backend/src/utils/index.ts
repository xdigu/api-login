import { pipe, toString, replace } from 'ramda'

const parseMsg = (msg: string) => (msg !== 'Error' ? msg : null)

export const parseError = pipe(toString, replace(/^[^:]*:/, ''), parseMsg)

export { parseError as default }
