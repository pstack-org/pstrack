import { Difficulty } from '@/types/difficulty.type'

/*
 * Get the color for the difficulty based on the difficulty level
 **/
export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-[#2cbb5d40] text-[rgb(0,184,163)]'
    case 'Medium':
      return 'bg-[#ffc01e40] text-[rgb(255,192,30)]'
    case 'Hard':
      return 'bg-[#ef474340] text-[rgb(255,55,95)]'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}