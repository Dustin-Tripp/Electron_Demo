import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
    primary: {
      main: '#1976D2', // Blue for accents
    },
    secondary: {
      main: '#FF9800', // Orange highlights
    },
    background: {
      default: '#1E1E2F', // Dark gray background
      paper: '#25273E', // Slightly lighter for contrast
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#B0B0B0', // Gray for less emphasis
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Uses MUI's default clean font
    h6: {
      fontWeight: 600, // Makes headers stand out
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#25273E', // Match the theme
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#25273E', // Consistent paper background
        },
      },
    },
  },
})

export default theme
