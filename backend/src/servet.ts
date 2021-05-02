import express from 'express'
import cookieParser from 'cookie-parser'

import type { Express, Request, Response, NextFunction } from 'express'
import type { OptionsUrlencoded } from 'body-parser'

import { parseError } from './utils'
import routes from './routes'

const urlencodedConfig: OptionsUrlencoded = { extended: true }

class Server {
  public app: Express

  constructor() {
    this.app = express()
    this.middleware()
    this.routes()
    this.errorMiddleware()
  }

  private middleware(): void {
    this.app.use(cookieParser())
    this.app.use(express.urlencoded(urlencodedConfig))
    this.app.use(express.json())
  }

  private routes() {
    this.app.use('/api', routes)
  }

  private errorMiddleware(): void {
    this.app.use((
      error: Error,
      req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ) =>
      res
        .status(500)
        .json({ error: parseError(error) ?? 'A server error ocurred' })
    )
  }
}

const server = (): Express => new Server().app

export default server
