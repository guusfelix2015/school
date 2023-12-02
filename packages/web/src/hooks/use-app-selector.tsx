import { type RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useAppSelector = <T = unknown,>(selector: (state: RootState) => T) => {
  return useSelector(selector)
}
