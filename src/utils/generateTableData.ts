import { TableData, TableRow } from '@/types/tableRow.type'

export const generateTableData = (groupData: TableRow): TableData => {
  const { roadmap, submission, group_progress } = groupData

  // Find the group progress entry for the group
  // const groupProgress = group_progress.find((progress) => progress.group_no === group_no)

  // Format the created_at date to MM/DD/YYYY format
  const formattedDate = group_progress
    ? new Date(group_progress.created_at).toLocaleDateString('en-US', {
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
