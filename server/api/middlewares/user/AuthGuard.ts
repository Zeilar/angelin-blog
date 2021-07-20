import { Request, Response, NextFunction } from 'express'
import { ErrorMessages } from '../../utils'

export class AuthGuard {
  public static async user(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: ErrorMessages.UNAUTHORIZED })
      return
    }
    next()
  }

  public static async guest(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      res.status(403).json({ error: ErrorMessages.LOGGED_IN })
      return
    }
    next()
  }

  public static async admin(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.is_admin) {
      res.status(403).json({ error: ErrorMessages.FORBIDDEN })
      return
    }
    next()
  }
}
