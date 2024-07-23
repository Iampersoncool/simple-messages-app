import { Hono } from 'hono'
import { cors } from 'hono/cors'

import messagesRouter from './messages'

import { runMigrations } from './database'

await runMigrations()

const app = new Hono()
  .use(cors())
  .get('/', c => c.text('up'))
  .route('/messages', messagesRouter)

export type AppType = typeof app

export default {
  port: 3000,
  fetch: app.fetch,
}
