import { hc } from 'hono/client'
import type { AppType } from '../../backend'

export const appClient = hc<AppType>(import.meta.env.VITE_BACKEND_URL as string)
