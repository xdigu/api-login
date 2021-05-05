import 'express'

import type { User } from '../../src/db/users'

declare module 'express' {
  export interface Request {
    user?: User
  }
}
