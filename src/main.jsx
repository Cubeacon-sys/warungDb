/**
 * Pusat Inventaris Warung
 * Copyright (c) 2026 Wisam Yassar Mahardika
 * Licensed under the MIT License
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
