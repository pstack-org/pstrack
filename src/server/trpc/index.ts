import { publicProcedure, router } from '@/server/trpc/trpc'

import prisma from '@/server/prisma'
import { roadmap } from '@prisma/client'

export const appRouter = router({
  getRoadmap: publicProcedure.query(async (): Promise<roadmap[]> => {
    return prisma.roadmap.findMany({
      orderBy: {
        problem_order: 'asc',
      },
    })
  }),
})

export type AppRouter = typeof appRouter
