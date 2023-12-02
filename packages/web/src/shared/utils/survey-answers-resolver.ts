import z from 'zod'
import { type Question } from '@prisma/client'
import { type FieldError, type FieldValues } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { QuestionType } from '../types'

interface SurveyAnswersContext {
  currentQuestion: number
  questions: Question[]
}

const schemaByQuestionType: Record<
  QuestionType,
  z.ZodString | z.ZodDate | z.ZodNumber | z.ZodArray<z.ZodString> | z.ZodEffects<z.ZodString>
> = {
  [QuestionType.TEXT]: z.string(),
  [QuestionType.LONG_TEXT]: z.string(),
  [QuestionType.DATE]: z.coerce.date({
    errorMap: () => ({ message: 'Informe uma data válida.' }),
  }),
  [QuestionType.TIME]: z.string(),
  [QuestionType.EMAIL]: z.string().email('Informe um e-mail válido.'),
  [QuestionType.PHONE]: z
    .string({ required_error: 'Informe um número de telefone.' })
    .refine((data) => isValidPhoneNumber(data), {
      message: 'Informe um número de telefone válido.',
    }),
  [QuestionType.NUMERIC]: z.number(),
  [QuestionType.SINGLE_CHOICE]: z.string(),
  [QuestionType.MULTIPLE_CHOICE]: z.array(z.string()),
}

function validateAnswer(question: Question, answer?: string | string[]) {
  let schema = schemaByQuestionType[question.type]
  if (!question.isRequired) {
    schema = schema.optional()
  }
  if (question.isRequired && question.type === QuestionType.MULTIPLE_CHOICE) {
    schema = schema.min(1, 'Ops! Você precisa selecionar pelo menos uma opção.')
  } else if (
    question.isRequired &&
    question.type !== QuestionType.DATE &&
    question.type !== QuestionType.PHONE
  ) {
    schema = schema.nonempty('Ops! Você precisa responder esta pergunta.')
  }
  return schema.safeParse(answer)
}

export async function surveyAnswersResolver(
  values: FieldValues,
  { currentQuestion, questions }: SurveyAnswersContext,
) {
  const value = values.answers[currentQuestion]
  if (!value) return { values, errors: {} }
  const question = questions.find((question) => question.id === value.questionId)
  if (!question) return { values, errors: {} }
  const { success, error } = validateAnswer(question, value.answer)
  if (success) return { values, errors: {} }
  const errors: Record<string, FieldError> = {}
  if (error.errors.length) {
    errors[`answers.${currentQuestion}.answer`] = {
      type: error.errors[0].code,
      message: error.errors[0].message,
    }
  }
  return { values, errors }
}
