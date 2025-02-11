import { publicProcedure, router } from '@/server/trpc/trpc'

import prisma from '@/server/prisma'

export const appRouter = router({
  getRoadmap: publicProcedure.query(async () => {
    return prisma.roadmap.findMany({
      orderBy: {
        problem_order: 'asc',
      },
    })
  }),
})

export type AppRouter = typeof appRouter
