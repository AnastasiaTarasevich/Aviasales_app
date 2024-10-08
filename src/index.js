import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.module.scss'

import App from './components/app'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
