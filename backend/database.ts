import { createClient } from '@libsql/client'

export const DB = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const runOptimizations = async () => {
  await DB.execute('PRAGMA journal_mode = wal;')

  await DB.execute(`
  CREATE TABLE 
  IF NOT EXISTS messages(
    content text,
    color text
  );
`)
}
