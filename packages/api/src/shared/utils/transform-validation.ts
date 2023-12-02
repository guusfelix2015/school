import { type TransformFnParams } from 'class-transformer'
import { isNil } from 'lodash'

export const transformToInt = ({ value }: TransformFnParams): number | undefined => {
  if (isNil(value)) return
  return parseInt(value)
}

export const transformToBool = ({ value }: TransformFnParams): boolean | undefined => {
  if (isNil(value)) return
  return JSON.parse(value)
}

export const transformToDate = ({ value }: TransformFnParams): Date | undefined => {
  if (isNil(value)) return
  return new Date(value)
}
