import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import router from './routers/index'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
