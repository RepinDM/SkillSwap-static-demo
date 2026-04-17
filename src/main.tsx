import { StrictMode } from 'react'
import * as ReactDOMClient from 'react-dom/client';
import { App } from './app/App.tsx'
import '@/styles/global.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './services/store.ts'

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);