import { roadmap } from '@prisma/client'
import prisma from '@/server/prisma'
import { publicProcedure, router } from '@/trpc/server/trpc'

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
