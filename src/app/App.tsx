import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { store } from './store/store'

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
