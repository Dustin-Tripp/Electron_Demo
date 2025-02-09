import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './Styling/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets styles for a clean look */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
