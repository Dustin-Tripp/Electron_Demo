import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Dashboard from '../components/HomePage/HomeCards';

const HomePage: React.FunctionComponent = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        System Performance Dashboard
      </Typography>

      {/* Explanation Text */}
      <Typography variant="h6" align="center" fontWeight="bold" sx={{ mt: 2 }}>
        About This Demo
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 1 }}>
        This React + Electron app provides real-time **system performance monitoring**.  
        The dashboard updates every **5 seconds** with:
      </Typography>

      {/* Properly formatted list */}
      <Box component="ul" sx={{ textAlign: 'left', maxWidth: 500, mx: 'auto', mt: 1 }}>
        <Typography component="li" variant="body1">
          **CPU Load** – Current processor usage
        </Typography>
        <Typography component="li" variant="body1">
          **Memory Usage** – Percentage of RAM in use
        </Typography>
        <Typography component="li" variant="body1">
          **Disk Usage** – Storage space used
        </Typography>
        <Typography component="li" variant="body1">
          **Network Speed** – Real-time download speed
        </Typography>
      </Box>

      <Typography variant="body1" align="center" sx={{ mt: 2, mb: 2 }}>
        The cards are **draggable and resizable**, allowing customization of the layout.
      </Typography>

      {/* System Dashboard */}
      <Dashboard />
    </Container>
  );
};

export default HomePage;
