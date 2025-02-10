import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

const AreaChartComponent: React.FC = () => {
  const [data, setData] = useState<{ name: string; cpu: number; memory: number; disk: number; network: number }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await (window as any).api.getSystemStats();
        const timestamp = new Date().toLocaleTimeString();

        setData((prev) => [
          ...prev.slice(-9), // Keep only the last 9 data points
          {
            name: timestamp,
            cpu: stats.cpu?.currentLoad || 0,
            memory: stats.memory
              ? ((stats.memory.total - stats.memory.free) / stats.memory.total * 100)
              : 0,
            disk: stats.disk?.[0]?.used
              ? ((stats.disk[0].used / stats.disk[0].size) * 100)
              : 0,
            network: stats.network?.[0]?.rx_bytes
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
      <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 700 }}>
        <Typography variant="h6" align="center">
          System Performance Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="cpu" stroke="#ff5722" fill="#ffccbc" name="CPU Load (%)" />
            <Area type="monotone" dataKey="memory" stroke="#4caf50" fill="#c8e6c9" name="Memory Usage (%)" />
            <Area type="monotone" dataKey="disk" stroke="#1976d2" fill="#bbdefb" name="Disk Usage (%)" />
            <Area type="monotone" dataKey="network" stroke="#9c27b0" fill="#e1bee7" name="Network Speed (MB/s)" />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default AreaChartComponent;
