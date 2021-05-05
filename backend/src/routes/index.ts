import { Router } from 'express'
import jwt from 'jsonwebtoken'

import type { Request, Response } from 'express'

import authMiddleware from '../middleware/authMiddleware'
import Users from '../db/users'

const routes = Router()

const TEN_DAYS = 1000 * 60 * 60 * 24 * 10

const secret = process.env.SECRET || ''

routes.post(
  '/auth',
  async (req, res): Promise<Response> => {
    const { user, pass } = req.body

    if (!user || !pass)
      return res.send({ message: 'You must provide user and pass.' })

    const registredUser = Users.find((User) => User.user === user)

    if (!registredUser) return res.send({ message: `You must sign up first.` })

    if (registredUser.pass !== pass)
      return res.send({ message: `Wrong password.` })

    const token = jwt.sign(registredUser, secret, { expiresIn: TEN_DAYS })

    res.cookie('token', token, {
      maxAge: TEN_DAYS,
      httpOnly: false
    })

    return res.json({ token })
  }
)

routes.post(
  '/user',
  async (req, res): Promise<Response> => {
    const { name, user, pass } = req.body

    if (!user || !pass || !name)
      return res.send({ message: 'You must provide user and pass.' })

    const isUserAlreadyRegistred = Users.some((User) => User.name === name)

    if (isUserAlreadyRegistred)
      return res.send({ message: 'User already registred.' })

    Users.push({ name, user, pass })

    return res.json({ message: 'User registred' })
  }
)

routes.get(
  '/user',
  authMiddleware,
  (req: Request, res: Response): Response => {
    const { name, user } = req.user || {}

    return res.json({ name, user })
  }
)

export default routes
