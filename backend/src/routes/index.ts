import { Router } from 'express'

import type { Request, Response } from 'express'

import authMiddleware from '../middleware/auth'

const routes = Router()

routes.post('/auth', (req: Request, res: Response) => {
  res.cookie('token', '1234', {
    expires: new Date(Date.now() + 9999999),
    httpOnly: false
  })

  res.send({ status: 'ok' })
})

routes.get('/', authMiddleware, (req: Request, res: Response) => {
  res.send('ok')
})

export default routes
