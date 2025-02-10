import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useTheme } from '@mui/material';
import FactCard from './FactCard';
import SpeedIcon from '@mui/icons-material/Speed';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayouts = {
  lg: [
    { i: 'cpuLoad', x: 0, y: 0, w: 6, h: 1, minW: 2 },
    { i: 'memoryUsage', x: 0, y: 1, w: 2, h: 2, minW: 2 },
    { i: 'diskUsage', x: 2, y: 1, w: 2, h: 2, minW: 2 },
    { i: 'networkUsage', x: 0, y: 3, w: 6, h: 1, minW: 2 }
  ],
  md: [
    { i: 'cpuLoad', x: 0, y: 0, w: 4, h: 1, minW: 2 },
    { i: 'memoryUsage', x: 0, y: 1, w: 2, h: 2, minW: 2 },
    { i: 'diskUsage', x: 2, y: 1, w: 2, h: 2, minW: 2 },
    { i: 'networkUsage', x: 0, y: 3, w: 4, h: 1, minW: 2 }
  ],
  sm: [
    { i: 'cpuLoad', x: 0, y: 0, w: 4, h: 1, minW: 2 },
    { i: 'memoryUsage', x: 0, y: 1, w: 2, h: 2, minW: 2 },
    { i: 'diskUsage', x: 2, y: 1, w: 2, h: 2, minW: 2 },
    { i: 'networkUsage', x: 0, y: 3, w: 4, h: 1, minW: 2 }
  ],
  xs: [
    { i: 'cpuLoad', x: 0, y: 0, w: 1, h: 1, minW: 1 },
    { i: 'memoryUsage', x: 0, y: 1, w: 1, h: 2, minW: 1 },
    { i: 'diskUsage', x: 0, y: 3, w: 1, h: 2, minW: 1 },
    { i: 'networkUsage', x: 0, y: 5, w: 1, h: 1, minW: 1 }
  ]
};

const HomeCards: React.FunctionComponent = () => {
  const layouts = (defaultLayouts);
  const theme = useTheme();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await (window as any).api.getSystemStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching system stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1600, md: 996, sm: 768, xs: 480 }}
      cols={{ lg: 6, md: 4, sm: 4, xs: 1 }}
      rowHeight={140}
      isDraggable={true}
      isResizable={true}
    >
      {/* CPU Load */}
      <div key="cpuLoad">
        <FactCard
          icon={<SpeedIcon fontSize="large" />}
          title="CPU Load"
          fact={stats?.cpu ? `${stats.cpu.currentLoad.toFixed(2)}%` : 'Loading...'}
          backgroundColor={theme.palette.primary.main}
        />
      </div>

      {/* Memory Usage */}
      <div key="memoryUsage">
        <FactCard
          icon={<MemoryIcon fontSize="large" />}
          title="Memory Usage"
          fact={
            stats?.memory
              ? `${((stats.memory.total - stats.memory.free) / stats.memory.total * 100).toFixed(2)}% Used`
              : 'Loading...'
          }
          backgroundColor="#00838F"
        />
      </div>

      {/* Disk Usage */}
      <div key="diskUsage">
        <FactCard
          icon={<StorageIcon fontSize="large" />}
          title="Disk Usage"
          fact={
            stats?.disk && stats.disk.length > 0
              ? `${((stats.disk[0].used / stats.disk[0].size) * 100).toFixed(2)}% Used`
              : 'Loading...'
          }
          backgroundColor="#D84315"
        />
      </div>

      {/* Network Speed */}
      <div key="networkUsage">
        <FactCard
          icon={<NetworkCheckIcon fontSize="large" />}
          title="Network Speed"
          fact={
            stats?.network
              ? `${(stats.network[0].rx_bytes / 1024 / 1024).toFixed(2)} MB/s Download`
              : 'Loading...'
          }
          backgroundColor="#6A1B9A"
        />
      </div>
    </ResponsiveGridLayout>
  );
};

export default HomeCards;
