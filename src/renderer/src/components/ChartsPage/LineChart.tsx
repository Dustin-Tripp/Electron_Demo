import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

const LineChartComponent: React.FC = () => {
  const [cpuData, setCpuData] = useState<{ name: string; value: number }[]>([]);
  const [memoryData, setMemoryData] = useState<{ name: string; value: number }[]>([]);
  const [diskData, setDiskData] = useState<{ name: string; value: number }[]>([]);
  const [networkData, setNetworkData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await (window as any).api.getSystemStats();
        const timestamp = new Date().toLocaleTimeString();

        setCpuData((prev) => [...prev.slice(-9), { name: timestamp, value: stats.cpu?.currentLoad || 0 }]);
        setMemoryData((prev) => [
          ...prev.slice(-9),
          { name: timestamp, value: stats.memory ? ((stats.memory.total - stats.memory.free) / stats.memory.total * 100) : 0 }
        ]);
        setDiskData((prev) => [
          ...prev.slice(-9),
          { name: timestamp, value: stats.disk?.[0]?.used ? ((stats.disk[0].used / stats.disk[0].size) * 100) : 0 }
        ]);
        setNetworkData((prev) => [
          ...prev.slice(-9),
          { name: timestamp, value: stats.network?.[0]?.rx_bytes ? (stats.network[0].rx_bytes / 1024 / 1024) : 0 }
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
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mt: 4 }}>
      {/* CPU Load Chart */}
      <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" align="center">
          CPU Load Over Time (%)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={cpuData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#ff5722" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Memory Usage Chart */}
      <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" align="center">
          Memory Usage Over Time (%)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={memoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4caf50" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Disk Usage Chart */}
      <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" align="center">
          Disk Usage Over Time (%)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={diskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Network Speed Chart */}
      <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" align="center">
          Network Speed Over Time (MB/s)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={networkData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#9c27b0" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default LineChartComponent;
