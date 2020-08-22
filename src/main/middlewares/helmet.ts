import helmet from 'helmet'
import { Request, Response, NextFunction } from 'express'

export const helmetFrameguard = (req: Request, res: Response, next: NextFunction): void => {
  helmet.frameguard({ action: 'deny' })
  next()
}
