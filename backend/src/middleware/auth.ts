import { propOr } from 'ramda'

import type { Request, Response, NextFunction } from 'express'

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const token = propOr('', 'token', req.cookies)

  if (token) {
    return next()
  }

  return res.status(401).send({ message: 'user not authenticated' })
}

export default authMiddleware
