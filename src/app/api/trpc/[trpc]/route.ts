import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/server/trpc/index'

const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc/',
    router: appRouter,
    req: req,
    createContext: () => ({}),
  })
}

export { handler as GET, handler as POST }
