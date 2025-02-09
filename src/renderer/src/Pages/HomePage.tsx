import * as React from 'react'
import { Container, Typography } from '@mui/material'
import Dashboard from '../components/HomePage/HomeCards'

const HomePage: React.FunctionComponent = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Electron Template
      </Typography>
      <Dashboard />
    </Container>
  )
}

export default HomePage
