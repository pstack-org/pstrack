import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@/trpc/server'

export const trpc = createTRPCReact<AppRouter>({})
