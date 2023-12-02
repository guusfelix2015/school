import z from 'zod'
import { type GenericOption } from '../components'

export enum QuestionType {
  TEXT = 'TEXT',
  LONG_TEXT = 'LONG_TEXT',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  NUMERIC = 'NUMERIC',
  DATE = 'DATE',
  TIME = 'TIME',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export const questionTypeOptions: GenericOption[] = [
  { label: 'Texto', value: QuestionType.TEXT },
  { label: 'Texto longo', value: QuestionType.LONG_TEXT },
  { label: 'Número', value: QuestionType.NUMERIC },
  { label: 'Telefone', value: QuestionType.PHONE },
  { label: 'Data', value: QuestionType.DATE },
  { label: 'Hora', value: QuestionType.TIME },
  { label: 'E-mail', value: QuestionType.EMAIL },
  { label: 'Única escolha', value: QuestionType.SINGLE_CHOICE },
  { label: 'Múltipla escolha', value: QuestionType.MULTIPLE_CHOICE },
]

export const getQuestionTypeLabel = (questionType: QuestionType | string) => {
  const questionTypeOption = questionTypeOptions.find((option) => option.value === questionType)
  return questionTypeOption?.label ?? ''
}

export const metadataQuestionDto = z.object({
  choices: z.array(z.object({ choice: z.string().min(1, 'Informe o nome da opção') })).optional(),
})
