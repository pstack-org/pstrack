import { initTRPC } from '@trpc/server'

import { Context } from '@/server/trpc/serverClient'

export const t = initTRPC.context<Context>().create()
export const router = t.router
export const publicProcedure = t.procedure
