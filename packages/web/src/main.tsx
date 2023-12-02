import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { LoadingIndicator } from '@/shared/components'
import { App } from './App'
import './shared/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from './store'

const SuspenseFallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingIndicator className="h-[48px] w-[48px]" />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Suspense fallback={<SuspenseFallback />}>
      <Provider store={store}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Provider>
    </Suspense>
  </>,
)
