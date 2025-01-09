import { TableData, TableRow } from '@/types/trackTable.type'

export const generateTableData = ({
  group_no,
  roadmap,
  submission,
  group_progress,
}: TableRow): TableData => {
  // Find the group progress entry for the group (assuming group_no is 1)
  const groupProgress = group_progress.find((progress) => progress.group_no === group_no)

  console.log('group_no', group_no)

  // Format the created_at date to MM/DD/YYYY format
  const formattedDate = groupProgress
    ? new Date(groupProgress.created_at).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
    : null

  return roadmap.map((problem) => {
    const problemSubmissions = submission.filter(
      (submission) => submission.problem_id === problem.id
    )

    const uniqueUserIds = new Set(
      problemSubmissions.map((submission) => submission.user_id)
    )

    return {
      problemOrder: problem.problem_order,
      problem: problem,
      totalSolved: problemSubmissions.filter((submission) => submission.solved).length,
      totalSubmissions: uniqueUserIds.size,
      userSubmissions: problemSubmissions,
      groupProgressDate: formattedDate,
    }
  })
}
