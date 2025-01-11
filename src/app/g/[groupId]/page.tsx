import { fetchGroupData } from '@/models/dao/groups.dao'
import { generateTableData } from '@/utils/generateTableData'
import { fetchRoadmap } from '@/models/dao/roadmap.dao'

const Page = async ({ params }: { params: Promise<{ groupId: string }> }) => {
  const groupId = Number((await params).groupId)

  const groupData = await fetchGroupData(groupId)
  const roadmap = await fetchRoadmap()
  if (!groupData) return null

  const tableData = generateTableData({
    group_no: groupData.group_no,
    submission: groupData.submissions,
    roadmap: roadmap,
    group_progress: groupData.group_progress,
  })

  console.log(tableData)

  return (
    <div>
      <h1>Group {groupId}</h1>
    </div>
  )
}

export default Page
