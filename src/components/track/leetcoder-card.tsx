'use client'

import { useCallback, useMemo, useState } from 'react'
import type { leetcoders } from '@prisma/client'
import { Calendar, Flame, TrendingUp } from 'lucide-react'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLogoGithub } from 'react-icons/io5'
import { IoLogoLinkedin } from 'react-icons/io'

import { cn } from '@/lib/utils'
import { extractUsername } from '@/utils/track/extractUsername'
import { getSocialLink } from '@/utils/track/getSocialLink'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LeetCoderCardSkeleton } from '@/components/track/leetcoder-card-skeleton'

type LeetcoderData = leetcoders & {
  max_steak: number
  max_streak_for_cur_year: number
}

const LeetcoderCard = ({
  leetcoderId,
  leetcoderUser,
  currentUser,
}: {
  leetcoderId: string
  leetcoderUser: string
  currentUser: boolean
}) => {
  const [leetcoder, setLeetcoder] = useState<LeetcoderData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLeetcoder = useCallback(async () => {
    if (leetcoder) return // Already fetched

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/user?id=${leetcoderId}`,
        {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        }
      )
      if (!response.ok) {
        setError(`HTTP error! status: ${response.status}`)
        return
      }

      const data = await response.json()
      setLeetcoder(data.data)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setError('Request timed out')
      } else {
        setError((error as Error).message || 'Failed to fetch user data')
      }
      console.error('Fetching leetcoder error:', error)
    } finally {
      setLoading(false)
    }
  }, [leetcoder, leetcoderId])

  const memoizedLeetcoder = useMemo(() => leetcoder, [leetcoder])

  return (
    <HoverCard
      onOpenChange={(open) => {
        if (open && !memoizedLeetcoder && !loading) fetchLeetcoder()
      }}
    >
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn('whitespace-nowrap px-0', currentUser && '!text-emerald-500')}
        >
          @{leetcoderUser}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-4">
        {loading ? (
          <LeetCoderCardSkeleton />
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          memoizedLeetcoder && (
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`https://github.com/${extractUsername(memoizedLeetcoder.gh_username || '', 'github')}.png`}
                  />
                  <AvatarFallback>{memoizedLeetcoder.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{memoizedLeetcoder.name}</h4>
                  <p className="text-muted-foreground text-sm">@{memoizedLeetcoder.lc_username}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 text-sm">
                <div className="flex items-center space-x-2 rounded-md p-2">
                  <Flame className="size-5 flex-shrink-0 text-orange-500" />
                  <div>
                    <span className="font-semibold">{memoizedLeetcoder.max_steak}</span>
                    <span className="text-muted-foreground block text-xs">Max Streak</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rounded-md p-2">
                  <TrendingUp className="size-5 flex-shrink-0 text-green-500" />
                  <div>
                    <span className="font-semibold">
                      {memoizedLeetcoder.max_streak_for_cur_year}
                    </span>
                    <span className="text-muted-foreground block text-xs">Year Max</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground flex items-center space-x-1">
                  <Calendar className="size-3" />
                  <span className="text-xs">
                    {new Date(memoizedLeetcoder.created_at!).toLocaleDateString('default', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {memoizedLeetcoder.gh_username && (
                    <a
                      href={getSocialLink(memoizedLeetcoder.gh_username, 'github')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <IoLogoGithub className="size-4" />
                    </a>
                  )}
                  {memoizedLeetcoder.x_username && (
                    <a
                      href={getSocialLink(memoizedLeetcoder.x_username, 'twitter')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FaXTwitter className="size-4" />
                    </a>
                  )}
                  {memoizedLeetcoder.li_username && (
                    <a
                      href={getSocialLink(memoizedLeetcoder.li_username, 'linkedin')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <IoLogoLinkedin className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </HoverCardContent>
    </HoverCard>
  )
}

export { LeetcoderCard }
