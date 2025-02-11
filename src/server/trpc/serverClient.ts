import { type PrismaClientSingleton } from '@/server/prisma'
import { appRouter } from '@/server/trpc/index'
import { t } from '@/server/trpc/trpc'

export const caller = t.createCallerFactory(appRouter)

const createServerClient = (
  context: {
    prisma?: PrismaClientSingleton
  } = {}
) => caller(context)

export const c = createServerClient()
