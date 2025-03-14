import { z } from 'zod'

export const LeetcoderInsertSchema = z.object({
  email: z.string().email(),
  gh_username: z.string().nullable().optional(),
  group_no: z.number().nullable().optional(),
  lc_username: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  user_id: z.string().uuid().nullable().optional(),
  username: z.string().min(1, { message: 'Username is required' }).max(12, {
    message: 'Username must be less than 10 characters',
  }),
})
