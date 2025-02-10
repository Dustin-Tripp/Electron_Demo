import React, { useState } from 'react';
import { Container, Button, Box, Typography, Paper } from '@mui/material';
import LineChartComponent from '../components/ChartsPage/LineChart';
import BarChartComponent from '../components/ChartsPage/BarChart';
import PieChartComponent from '../components/ChartsPage/PieChart';
import RadarChartComponent from '../components/ChartsPage/RadarChart';
import AreaChartComponent from '../components/ChartsPage/AreaChart';

const GraphsPage: React.FC = () => {
  const [selectedGraph, setSelectedGraph] = useState<'line' | 'bar' | 'pie' | 'radar' | 'area'>('line');

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Graphing Dashboard
      </Typography>

      {/* Explanation Section */}
      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1">
          This dashboard provides **real-time system performance visualizations**.  
          Each chart presents a different way to interpret system statistics:
        </Typography>
        <Typography component="ul" sx={{ textAlign: 'left', mt: 1, pl: 2 }}>
          <Typography component="li">**Line Chart** – Tracks system stats over time.</Typography>
          <Typography component="li">**Bar Chart** – Compares different system metrics at specific points.</Typography>
          <Typography component="li">**Pie Chart** – Shows resource distribution between used and available.</Typography>
          <Typography component="li">**Radar Chart** – Provides an overall comparison of system stats.</Typography>
          <Typography component="li">**Area Chart** – Displays trends in resource usage with smooth visualization.</Typography>
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Use the buttons below to switch between different graph types.
        </Typography>
      </Paper>

      {/* Graph Selection Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setSelectedGraph('line')}>
          Line Chart
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setSelectedGraph('bar')}>
          Bar Chart
        </Button>
        <Button variant="contained" color="success" onClick={() => setSelectedGraph('pie')}>
          Pie Chart
        </Button>
        <Button variant="contained" color="warning" onClick={() => setSelectedGraph('radar')}>
          Radar Chart
        </Button>
        <Button variant="contained" color="info" onClick={() => setSelectedGraph('area')}>
          Area Chart
        </Button>
      </Box>

      {/* Render Selected Chart */}
      {selectedGraph === 'line' && <LineChartComponent />}
      {selectedGraph === 'bar' && <BarChartComponent />}
      {selectedGraph === 'pie' && <PieChartComponent />}
      {selectedGraph === 'radar' && <RadarChartComponent />}
      {selectedGraph === 'area' && <AreaChartComponent />}
    </Container>
  );
};

export default GraphsPage;
