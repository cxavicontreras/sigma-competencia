import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { activeVersion } from './config/versions'
import { VersionSelector } from './pages/VersionSelector'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {activeVersion ? <App /> : <VersionSelector />}
  </StrictMode>,
)
