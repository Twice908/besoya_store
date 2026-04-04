import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './index.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { AppRoutes } from './router'
import './utils/apiInterceptors'

const RootLayout = () => (
  <AuthProvider>
    <GlobalStyles />
    <AppRoutes />
  </AuthProvider>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RootLayout />
    </BrowserRouter>
  </StrictMode>,
)
