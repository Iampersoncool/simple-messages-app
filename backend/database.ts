import { createClient } from '@libsql/client'

export const DB = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const runMigrations = async () => {
  await DB.execute(`
  CREATE TABLE 
  IF NOT EXISTS messages(
    content text,
    color text
  );
`)
}
