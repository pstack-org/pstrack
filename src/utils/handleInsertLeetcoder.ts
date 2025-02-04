import { User } from '@supabase/auth-js'

import { fetcher } from '@/utils/fetcher'
import { toast } from '@/hooks/use-toast'

export const handleInsertLeetcoder = async (
  formData: FormData,
  user: User,
  groupId: number
): Promise<boolean> => {
  const data = {
    name: formData.get('name') as string,
    username: formData.get('username') as string,
    email: user.email as string,
    group_no: groupId,
    id: user.id,
    gh_username: formData.get('gh_username') as string,
    lc_username: formData.get('lc_username') as string,
  }

  try {
    await fetcher('/api/request', 'POST', data)
    toast({
      title: 'Request submitted!',
      description: 'Your request is under review. You will be notified once it is APPROVED.',
      variant: 'success',
    })
    return true
  } catch (error) {
    console.error('Error submitting request:', error)

    if (error instanceof Error) {
      if (error.message === 'You are already registered.') {
        toast({
          title: 'Registration Error',
          description: error.message,
          variant: 'destructive',
        })
      } else if (error.message === 'LeetCode user does not exist.') {
        toast({
          title: 'LeetCode User Error',
          description: error.message,
          variant: 'destructive',
        })
      } else if (error.message === 'Username already exist.') {
        toast({
          title: 'Username Error',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive',
        })
      }

      return false
    }

    toast({
      title: 'Submission failed',
      description:
        error instanceof Error ? error.message : 'An error occurred while submitting your request.',
      variant: 'destructive',
    })
    return false
  }
}
