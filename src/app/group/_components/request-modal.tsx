'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useCallback, useState } from 'react'
import useMeasure from 'react-use-measure'
import { toast } from 'sonner'

import { errorToastStyle, infoToastStyle, loadingToastStyle, successToastStyle } from '@/app/_components/toast-styles'
import { type FormDataType, RequestForm } from '@/app/group/_components/request-form'
import { RequestRules } from '@/app/group/_components/request-rules'
import { api } from '@/trpc/react'
import { Button } from '@/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { cn } from '@/utils/cn'

const createVariants = (heightContent: number): Variants => ({
  initial: (direction: number) => ({
    opacity: 0,
    height: heightContent > 0 ? heightContent : 'auto',
    position: 'absolute',
    x: direction > 0 ? 370 : -370,
  }),
  animate: {
    opacity: 1,
    height: heightContent > 0 ? heightContent : 'auto',
    position: 'relative',
    x: 0,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    opacity: 0,
    x: direction < 0 ? 370 : -370,
    top: 0,
    width: '100%',
  }),
})

export const RequestModal = ({ groupId }: { groupId: string }) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [ref, { height: heightContent }] = useMeasure()
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    username: '',
    lc_username: '',
    gh_username: '',
  })
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const { data: user } = api.auth.getUser.useQuery()
  const { mutate: requestToJoin, isPending } = api.leetcoders.RequestToJoin.useMutation()

  const variants = createVariants(heightContent)
  const isLastStep = activeIdx === 1 // Only 2 steps now

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleRequest = useCallback(
    async (data: { name: string; username: string; lc_username: string; gh_username?: string }) => {
      if (!user) {
        toast.error('You must be logged in to request to join a group', {
          style: errorToastStyle,
          duration: 10000,
          closeButton: true,
        })
        return
      }

      const loadingToastId = toast.loading('Checking, please wait...', {
        style: loadingToastStyle,
        closeButton: true,
      })

      // Process LeetCode username if it's a profile URL
      let lc_username = data.lc_username
      if (lc_username.includes('leetcode.com')) {
        // Check if it's a valid LeetCode URL format
        const leetcodeRegex = /leetcode\.com\/u\/([a-zA-Z0-9_-]+)/
        const match = lc_username.match(leetcodeRegex)

        if (match?.at?.(1)) {
          lc_username = match[1] // Extract just the username
        } else {
          toast.dismiss(loadingToastId)
          toast.error('Invalid LeetCode profile URL. Please provide a valid URL or just the username.', {
            style: errorToastStyle,
            duration: 5000,
            closeButton: true,
          })
          return
        }
      }

      requestToJoin(
        {
          name: data.name,
          username: data.username,
          lc_username: lc_username, // Use the processed username
          gh_username: data.gh_username,
          group_no: groupId,
        },
        {
          onSuccess: async () => {
            router.refresh()
            toast.dismiss(loadingToastId)
            toast.success(
              `Awesome! Your request to join Group ${groupId.padStart(2, '0')} has been received. We'll notify you once you're accepted!`,
              {
                style: successToastStyle,
                duration: 5000,
                closeButton: true,
              }
            )

            setFormData({
              name: '',
              username: '',
              lc_username: '',
              gh_username: '',
            })

            setActiveIdx(0) // Reset to first step
            setOpen(false) // Close the dialog
          },

          onError: (e) => {
            console.error('Mutation error:', e)
            toast.dismiss(loadingToastId)

            if (e.message.includes('already submitted and waiting for approval')) {
              toast.info(e.message, {
                style: infoToastStyle,
                duration: 5000,
                closeButton: true,
              })
            } else {
              toast.error(e.message, {
                style: errorToastStyle,
                duration: 5000,
                closeButton: true,
              })
            }
          },
        }
      )
    },
    [groupId, requestToJoin, router, user]
  )

  const handleSetActiveIdx = useCallback(
    (idx: number) => {
      const newIdx = Math.max(0, Math.min(idx, 1)) // Only 2 steps (0 and 1)
      const newDirection = idx > activeIdx ? 1 : -1
      setDirection(newDirection)
      setActiveIdx(newIdx)
    },
    [activeIdx]
  )

  const isSubmitDisabled = isPending || !formData.name || !formData.username || !formData.lc_username

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <div className="flex items-center justify-center">
          <div
            className={cn(
              'group rounded-full border border-black/5 bg-neutral-100 text-base text-neutral-800 transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800'
            )}
          >
            <div className="inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="hidden sm:inline">✨ Request to join</span>
              <span className="sm:hidden">✨ Join</span>
              <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex w-full items-center justify-center gap-0 border-none bg-black/20 p-0"
      >
        <div className="w-full max-w-sm overflow-hidden rounded-xl border border-[#dddddd] bg-white dark:border-[#222222] dark:bg-[#111111]">
          <DialogTitle className="sr-only">Request to join form</DialogTitle>
          <div className="relative">
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <div
                  ref={ref}
                  className="p-5"
                >
                  {isLastStep ? (
                    <RequestForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleRequest={handleRequest}
                      isPending={isPending}
                      groupId={groupId}
                    />
                  ) : (
                    <RequestRules />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="relative z-10 border-t border-[#dddddd] bg-neutral-100 dark:border-[#222222] dark:bg-[#0f0f0f]">
              <div className="flex items-center justify-between px-4 py-2">
                <button
                  type="button"
                  disabled={activeIdx === 0}
                  onClick={() => handleSetActiveIdx(activeIdx - 1)}
                  className={cn(
                    'h-8 w-24 rounded-full border border-neutral-300 bg-neutral-100 px-3 text-[13px] font-medium text-black dark:text-white',
                    'disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-[#171717]'
                  )}
                >
                  Back
                </button>
                {isLastStep ? (
                  <Button
                    type="submit"
                    form="request-to-join-form"
                    disabled={isSubmitDisabled}
                    className={cn(
                      'h-8 w-24 rounded-full border border-neutral-300 bg-neutral-100 px-3 text-[13px] font-medium text-black dark:text-white',
                      'disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-[#171717]'
                    )}
                  >
                    {isPending ? 'Submitting' : 'Submit'}
                  </Button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetActiveIdx(activeIdx + 1)}
                    className={cn(
                      'h-8 w-24 rounded-full border border-neutral-300 bg-neutral-100 px-3 text-[13px] font-medium text-black dark:text-white',
                      'disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-[#171717]'
                    )}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
