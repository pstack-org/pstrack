import { PrismaClientSingleton } from '@/server/prisma'
import { appRouter } from '@/trpc/server/index'
import { t } from '@/trpc/server/trpc'

export type Context = {
  prisma?: PrismaClientSingleton
}

export const caller = t.createCallerFactory(appRouter)

const createServerClient = (context: Context = {}) => caller(context)

export const c = createServerClient()
