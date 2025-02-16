import { Suspense } from 'react'
import { groups } from '@prisma/client'
import { notFound } from 'next/navigation'

import { getUser } from '@/hooks/get-user'
import { checkGroupExists, getAllGroups } from '@/prisma/dao/groups.dao'
import { isGroupFull, isLeetcoderApproved } from '@/prisma/dao/leetcoders.dao'

import { TrackHeader } from '@/components/track/track-header'
import { TableSkeleton } from '@/components/track/table-skeleton'
import { TrackFooter } from '@/components/track/track-footer'

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ groupId: string }>
}) => {
  const groupId = Number((await params).groupId)

  // check if group exists before rendering the layout
  const groupExists = await checkGroupExists(groupId)
  if (!groupExists) notFound()

  const user = await getUser()
  const isApproved = await isLeetcoderApproved(user?.id)
  const isFull = await isGroupFull(groupId)
  const groups: groups[] = await getAllGroups()

  return (
    <div className="relative flex h-svh flex-col overflow-x-hidden">
      <TrackHeader
        groupId={groupId}
        user={user!}
        isApproved={isApproved}
        isFull={isFull}
        groups={groups}
      />

      <Suspense fallback={<TableSkeleton />}>{children}</Suspense>

      <TrackFooter />
    </div>
  )
}

export default Layout
