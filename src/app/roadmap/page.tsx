'use client'

import RoadmapView from '@/components/views/roadmap-view'
import { trpc } from '@/trpc/client'

const RoadmapPage = () => {
  const { data: roadmap, isLoading } = trpc.getRoadmap.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <RoadmapView roadmap={roadmap || []} />
}

export default RoadmapPage
