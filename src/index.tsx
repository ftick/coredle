import React from 'react'
import ReactDOM from 'react-dom'
import './infinite.css'
import AppInf from './AppInf'
import reportWebVitals from './reportWebVitals'
import { AlertProvider } from './context/AlertContext'
import { getURLFirst } from './lib/words'
import App from './App'

const IS_INFINITE = getURLFirst().includes('infinite')
if (IS_INFINITE) {
  ReactDOM.render(
    <React.StrictMode>
      <AlertProvider>
        <AppInf />
      </AlertProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
} else {
  ReactDOM.render(
    <React.StrictMode>
      <AlertProvider>
        <App />
      </AlertProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
