import { propOr } from 'ramda'
import jwt from 'jsonwebtoken'

import type { Request, Response, NextFunction } from 'express'
import { User } from '../db/users'

const secret = process.env.SECRET || ''

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const cookieToken: string = propOr('', 'token', req.cookies)
  const [atuhMethod, bearerToken] = req.headers?.authorization?.split(' ') || [
    '',
    ''
  ]

  if (!cookieToken && !bearerToken)
    return res
      .status(400)
      .send({ message: 'You must send bearer token on heeaders' })

  if (!cookieToken && bearerToken && atuhMethod !== 'Bearer')
    return res.send({ message: 'Authentication type must be Bearer' })

  const token = bearerToken || cookieToken

  try {
    const user = jwt.verify(token, secret) as User

    if (user) {
      req.user = user
      return next()
    }
  } catch (err) {
    return next(err)
  }

  return res.status(401).send({ message: 'user not authenticated' })
}

export default authMiddleware
