import { group_progress, groups, leetcoders, roadmap, submissions } from '@prisma/client'

import prisma from '@/models/prisma/prisma'

export const checkGroupExists = async (group_no: number): Promise<boolean> => {
  try {
    const group = await prisma.groups.findUnique({
      where: {
        group_no,
      },
    })

    return !!group
  } catch (error) {
    console.error('catch checkGroupExists error:', error)
    return false
  }
}

export type GroupWithRelations = groups & {
  leetcoders: leetcoders[]
  group_progress: group_progress[]
  submissions: (submissions & {
    problem: roadmap
    user: leetcoders
  })[]
}

export const fetchGroupData = async (
  group_no: number
): Promise<GroupWithRelations | null> => {
  // Input validation
  if (!group_no || isNaN(group_no)) {
    console.error('Invalid group number provided:', group_no)
    return null
  }

  try {
    const groupData = await prisma.groups.findUnique({
      where: {
        group_no,
      },
      include: {
        leetcoders: true,
        group_progress: true,
        submissions: {
          include: {
            problem: true,
            user: true,
          },
        },
      },
    })

    if (!groupData) {
      console.log(`No group found with group_no: ${group_no}`)
      return null
    }

    return groupData
  } catch (error) {
    // Safe error logging
    console.error('Error fetching group data:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      groupNo: group_no,
    })

    return null
  }
}