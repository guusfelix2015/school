import { type Question } from '@prisma/client'

export function formatAnswer(question: Question, answer?: string) {
  if (!answer) return ''
  if (question.type === 'DATE') return new Date(answer).toLocaleDateString()
  return answer
}
