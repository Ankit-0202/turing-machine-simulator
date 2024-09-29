// frontend/src/index.tsx

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css' // Ensure Tailwind directives are included here
import App from './App'

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
