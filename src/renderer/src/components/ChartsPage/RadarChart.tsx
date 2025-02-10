import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

const RadarChartComponent: React.FC = () => {
  const [data, setData] = useState([
    { category: 'CPU Load', value: 0 },
    { category: 'Memory Usage', value: 0 },
    { category: 'Disk Usage', value: 0 },
    { category: 'Network Speed', value: 0 }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await (window as any).api.getSystemStats();

        setData([
          { category: 'CPU Load', value: stats.cpu?.currentLoad || 0 },
          {
            category: 'Memory Usage',
            value: stats.memory
              ? ((stats.memory.total - stats.memory.free) / stats.memory.total * 100)
              : 0
          },
          {
            category: 'Disk Usage',
            value: stats.disk?.[0]?.used
              ? ((stats.disk[0].used / stats.disk[0].size) * 100)
              : 0
          },
          {
            category: 'Network Speed',
            value: stats.network?.[0]?.rx_bytes
              ? (stats.network[0].rx_bytes / 1024 / 1024)
              : 0
          }
        ]);
      } catch (error) {
        console.error('Error fetching system stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" align="center">
          System Performance Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <Tooltip />
            <Radar dataKey="value" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default RadarChartComponent;
