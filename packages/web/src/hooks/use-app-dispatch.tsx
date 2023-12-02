import { type AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'

export const useAppDispatch = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return useDispatch() as AppDispatch
}
