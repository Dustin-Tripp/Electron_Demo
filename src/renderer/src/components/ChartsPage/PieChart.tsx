import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

const COLORS = ['#0088FE', '#FF8042']; // Used (blue) vs Available (orange)

const PieChartComponent: React.FC = () => {
  const [cpuData, setCpuData] = useState<{ name: string; value: number }[]>([]);
  const [memoryData, setMemoryData] = useState<{ name: string; value: number }[]>([]);
  const [diskData, setDiskData] = useState<{ name: string; value: number }[]>([]);
  const [networkData, setNetworkData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await (window as any).api.getSystemStats();

        setCpuData([
          { name: 'Used', value: stats.cpu?.currentLoad || 0 },
          { name: 'Available', value: 100 - (stats.cpu?.currentLoad || 0) }
        ]);

        setMemoryData([
          {
            name: 'Used',
            value: stats.memory ? ((stats.memory.total - stats.memory.free) / stats.memory.total * 100) : 0
          },
          { name: 'Available', value: stats.memory ? (stats.memory.free / stats.memory.total * 100) : 0 }
        ]);

        setDiskData([
          {
            name: 'Used',
            value: stats.disk?.[0]?.used ? ((stats.disk[0].used / stats.disk[0].size) * 100) : 0
          },
          {
            name: 'Available',
            value: stats.disk?.[0]?.used ? (100 - ((stats.disk[0].used / stats.disk[0].size) * 100)) : 0
          }
        ]);

        setNetworkData([
          {
            name: 'Used',
            value: stats.network?.[0]?.rx_bytes ? (stats.network[0].rx_bytes / 1024 / 1024) : 0
          },
          { name: 'Available', value: 100 } // Network usage is continuous, so this is arbitrary
        ]);
      } catch (error) {
        console.error('Error fetching system stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderPieChart = (title: string, data: { name: string; value: number }[]) => (
    <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 300 }}>
      <Typography variant="h6" align="center">{title}</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={100} dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mt: 4 }}>
      {renderPieChart('CPU Usage (%)', cpuData)}
      {renderPieChart('Memory Usage (%)', memoryData)}
      {renderPieChart('Disk Usage (%)', diskData)}
      {renderPieChart('Network Usage (MB/s)', networkData)}
    </Box>
  );
};

export default PieChartComponent;
