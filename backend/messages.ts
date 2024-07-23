import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { DB } from './database'

export type Message = z.infer<typeof messagesSchema>

const messagesSchema = z.object({
  content: z
    .string()
    .min(1, 'Content must not be empty')
    .transform(Bun.escapeHTML),
  color: z
    .string()
    .min(1, 'Color must not be empty')
    .max(7, 'Color is too long')
    .transform(Bun.escapeHTML),
})

const messagesRouter = new Hono()
  .get('/', async c => {
    const result = await DB.execute('SELECT color, content FROM messages')
    return c.json({ messages: result.rows })
  })
  .post('/', zValidator('form', messagesSchema), async c => {
    const { content, color } = c.req.valid('form')

    await DB.execute({
      sql: 'INSERT INTO messages VALUES(?, ?)',
      args: [content, color],
    })

    return c.json({ message: 'Success!' })
  })

export default messagesRouter
