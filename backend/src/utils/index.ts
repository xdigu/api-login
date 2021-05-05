import { pipe, toString, replace } from 'ramda'

const parseMsg = (msg: string) => (msg !== 'Error' ? msg : null)

const parseError = pipe(toString, replace(/^[^:]*:/, ''), parseMsg)

const validateName = new RegExp(/^[a-zà-ú][a-zà-ú\s]*$/, 'i')

const validateNickName = new RegExp(/^[a-z][a-z\w-]*$/, 'i')

const validatePassword = new RegExp(/^[\S]*$/, 'i')

const validateUserInput = (
  userName: string,
  userNick: string,
  password: string
): boolean => {
  return (
    validateName.test(userName) &&
    validateNickName.test(userNick) &&
    validatePassword.test(password)
  )
}

export { parseError, validateUserInput }
