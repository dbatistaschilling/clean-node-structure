import i18n from 'i18n'
import { Request, Response, NextFunction } from 'express'

export const locales = (req: Request, res: Response, next: NextFunction): void => {
  i18n.configure({
    locales: ['it','en'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'it'
  })

  i18n.init(req, res)
  next()
}
