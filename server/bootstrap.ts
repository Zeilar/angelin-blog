import { Container } from 'inversify'
import knex from 'knex'
import { Model } from 'objection'
import cors from 'cors'
import { Request, Response, NextFunction } from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import { json, urlencoded } from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import rateLimit from 'express-rate-limit'
import cron from 'node-cron'

import errorlog from './utils/errorlog'
import * as services from './services'
import { User } from './db/models'
import { development } from '../knexfile'
import { PasswordResetRepository, UserRepository } from './repositories'
import { DateHelpers, ErrorMessages } from './api/utils'
import { milliseconds } from 'date-fns'

type GitHubProfile = Profile & { _json: any }

import { Strategy as GitHubStrategy, Profile } from 'passport-github2'

const { GITHUB_CLIENT, GITHUB_SECRET } = process.env
const userRepository = new UserRepository()

import cookieParser from 'cookie-parser'

import './api/controllers'

function bootstrap() {
  Model.knex(knex(development))
  const container = new Container()

  // Repositories
  container.bind(UserRepository).toSelf()
  container.bind(PasswordResetRepository).toSelf()

  // Services
  container.bind(services.PostService).toSelf()
  container.bind(services.UserService).toSelf()
  container.bind(services.CommentService).toSelf()
  container.bind(services.AuthService).toSelf()
  container.bind(services.ValidateService).toSelf()
  container.bind(services.MailService).toSelf()

  const server = new InversifyExpressServer(container)

  server.setConfig((app) => {
    app.use(
      cookieParser(),
      urlencoded({ extended: true }),
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }),
      json(),
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: milliseconds({ days: 7 }),
          httpOnly: true,
          secure: false, // TODO: setup env variable for is prod
          sameSite: 'strict',
        },
      }),
      rateLimit({
        windowMs: 1000 * 60 * 10, // 10 minutes
        max: 1000,
        handler: (req, res) => {
          res.status(429).send({ error: 'Too many requests, try again later.' })
        },
      }),
      passport.initialize(),
      passport.session()
    )
  })

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser<User>(async ({ id }, done) => {
    const repo = container.get(UserRepository)
    const user = await repo.findById(id)

    done(null, user)
  })

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT,
        clientSecret: GITHUB_SECRET,
        callbackURL: 'http://localhost:3030/api/oauth/github/callback',
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: GitHubProfile,
        done: (err: Error | null, profile: GitHubProfile | User | null) => void
      ) => {
        if (!profile) return done(new Error(ErrorMessages.DEFAULT), null)

        let user = await userRepository.findOne('github_id', profile.id)

        if (!user) {
          if (
            (await userRepository.countWhere('email', profile._json.email)) > 0
          ) {
            return done(new Error(ErrorMessages.EMAIL_TAKEN), null)
          }

          const email = profile._json.email || 'nomail@mail.com'
          user = await userRepository.create({
            email,
            avatar: profile._json.avatar_url,
            github_id: profile.id,
          })
        }

        done(null, user)
      }
    )
  )

  server.setErrorConfig((app) => {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      errorlog(error)
      res.status(500).json({ error: ErrorMessages.DEFAULT })
    })
  })

  // Runs Monday-Saturday 00:00
  cron.schedule('0 0 * * 1-6', async () => {
    await new PasswordResetRepository().deleteInactive()
  })

  return server.build()
}

export const app = bootstrap()
