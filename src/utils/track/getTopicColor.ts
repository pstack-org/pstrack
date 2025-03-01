import { Topic } from '@/types/topics.type'

export function getTopicColor(topic: Topic): string {
  switch (topic) {
    case 'arrays-hashing':
      return 'bg-green-200 text-green-900' // Darker green background, darker green text
    case 'strings':
      return 'bg-blue-200 text-blue-900' // Darker blue background, darker blue text
    case 'two-pointers':
      return 'bg-yellow-200 text-yellow-900' // Darker yellow background, darker yellow text
    case 'sliding-window':
      return 'bg-red-200 text-red-900' // Darker red background, darker red text
    case 'stack-queue':
      return 'bg-purple-200 text-purple-900' // Darker purple background, darker purple text
    case 'linked-list':
      return 'bg-orange-200 text-orange-900' // Darker orange background, darker orange text
    case 'recursion':
      return 'bg-pink-200 text-pink-900' // Darker pink background, darker pink text
    case 'trees':
      return 'bg-emerald-200 text-emerald-900' // Darker emerald background, darker emerald text
    case 'matrix':
      return 'bg-cyan-200 text-cyan-900' // Darker cyan background, darker cyan text
    case 'graphs':
      return 'bg-indigo-200 text-indigo-900' // Darker indigo background, darker indigo text
    case 'dynamic-programming':
      return 'bg-teal-200 text-teal-900' // Darker teal background, darker teal text
    case 'sorting-searching':
      return 'bg-amber-200 text-amber-900' // Darker amber background, darker amber text
    case 'heap-priority-queue':
      return 'bg-amber-200 text-amber-900' // Darker amber background, darker amber text
    case 'tries':
      return 'bg-rose-200 text-rose-900' // Darker rose background, darker rose text
    case 'bit-manipulation':
      return 'bg-gray-200 text-gray-900' // Darker gray background, darker gray text
    default:
      return 'bg-gray-200 text-gray-900' // Default fallback with darker colors
  }
}
