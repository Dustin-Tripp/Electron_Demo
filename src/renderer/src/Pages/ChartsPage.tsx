import React, { useState } from 'react'
import { Container, Button, Box, Typography } from '@mui/material'
import LineChartComponent from '../components/ChartsPage/LineChart'
import BarChartComponent from '../components/ChartsPage/BarChart'
import PieChartComponent from '../components/ChartsPage/PieChart'
import RadarChartComponent from '../components/ChartsPage/RadarChart'
import AreaChartComponent from '../components/ChartsPage/AreaChart'

const GraphsPage: React.FC = () => {
  const [selectedGraph, setSelectedGraph] = useState<'line' | 'bar' | 'pie' | 'radar' | 'area'>('line')

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Graphing Dashboard
      </Typography>

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
  )
}

export default GraphsPage
