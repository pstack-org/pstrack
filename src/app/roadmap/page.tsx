import { c } from '@/server/trpc/serverClient'

import RoadmapView from '@/components/views/roadmap-view'

const RoadmapPage = async () => {
  const roadmap = await c.getRoadmap()
  return <RoadmapView roadmap={roadmap} />
}

export default RoadmapPage
