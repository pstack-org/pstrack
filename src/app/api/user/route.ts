import { leetcoders } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { UpdateProfileSchema } from '@/types/schema/updateProfile.schema'
import { checkLeetCodeUserExists } from '@/utils/checkLeetCoderExist'
import { checkGitHubUserExists } from '@/utils/checkGitHubUserExists'
import { fetchLeetcoder, updateLeetcoder } from '@/prisma/dao/leetcoders.dao'
import { LEETCODE_GQL_BASE_URL } from '@/data/CONSTANTS'
import { calcMaxStreak } from '@/utils/calculateMaxStreak'
import { userProfileQuery } from '@/lib/graphql/userProfile.gql'

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData()

    // Check if the user id is present
    const userId = String(formData.get('id'))
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing user id',
        },
        { status: 400 }
      )
    }

    const rawData: Partial<leetcoders> = {
      name: String(formData.get('name')),
      username: String(formData.get('username')),
      lc_username: String(formData.get('lc_username')),
      gh_username: String(formData.get('gh_username')),
      x_username: String(formData.get('x_username')),
      li_username: String(formData.get('li_username')),
    }

    const validatedData = UpdateProfileSchema.safeParse(rawData)
    if (!validatedData.success) {
      // Format validation errors into a single string
      const errorMessages = Object.entries(validatedData.error.flatten().fieldErrors)
        .map(([, errors]) => `${errors?.join(', ')}`)
        .join('\n')

      return NextResponse.json(
        {
          message: 'Validation failed',
          error: errorMessages,
        },
        { status: 400 }
      )
    }

    if (validatedData.data.lc_username) {
      const leetcoderExists = await checkLeetCodeUserExists(validatedData.data.lc_username)
      if (!leetcoderExists) {
        return NextResponse.json(
          {
            success: false,
            error: 'LeetCode user does not exist.',
          },
          { status: 400 }
        )
      }
    }

    if (validatedData.data.gh_username) {
      const githubUerExists = await checkGitHubUserExists(validatedData.data.gh_username)
      if (!githubUerExists) {
        return NextResponse.json(
          {
            success: false,
            error: 'GitHub username does not exist',
          },
          { status: 400 }
        )
      }
    }

    const updatedLeetcoder = await updateLeetcoder({
      id: userId,
      data: validatedData.data,
    })
    console.log('updatedLeetcoder', updatedLeetcoder)
    return NextResponse.json(
      {
        success: true,
        data: validatedData.data,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong',
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('id') as string
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing user id',
        },
        { status: 400 }
      )
    }

    const leetcoder = await fetchLeetcoder(userId)
    if (!leetcoder) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      )
    }

    const payload = {
      query: userProfileQuery,
      variables: {
        username: leetcoder.lc_username,
      },
    }
    const response = await fetch(LEETCODE_GQL_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      console.error('Error fetching user profile:', response)
      return NextResponse.json(
        {
          success: false,
          error: 'Something went wrong',
        },
        { status: 500 }
      )
    }
    const data = await response.json()
    const maxSteak = data.data.matchedUser.userCalendar.streak
    const maxStreakForCurYear = calcMaxStreak(data.data.matchedUser.userCalendar.submissionCalendar)

    return NextResponse.json({
      success: true,
      data: {
        ...leetcoder,
        max_steak: maxSteak,
        max_streak_for_cur_year: maxStreakForCurYear,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong',
      },
      { status: 500 }
    )
  }
}
