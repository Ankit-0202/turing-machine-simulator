// frontend/src/index.tsx

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles/globals.css'

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
