import session from 'express-session'
import { Request, Response, NextFunction } from 'express'

export const sessions = (req: Request, res: Response, next: NextFunction): void => {
  session({
    secret: process.env.SECRET,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000
    },
    rolling: true,
    resave: false,
    saveUninitialized: true
  })
  next()
}
