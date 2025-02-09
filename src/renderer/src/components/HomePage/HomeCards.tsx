import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useTheme } from '@mui/material'
import FactCard from './FactCard'
import DevicesIcon from '@mui/icons-material/Devices'
import PeopleIcon from '@mui/icons-material/People'
import SpeedIcon from '@mui/icons-material/Speed'
import BuildIcon from '@mui/icons-material/Build'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

const defaultLayouts = {
  lg: [
    { i: 'dynamicScaling', x: 0, y: 0, w: 3, h: 2, minW: 2 }, // First row - half width
    { i: 'responsiveDesign', x: 3, y: 0, w: 3, h: 2, minW: 2 }, // First row - half width
    { i: 'performance', x: 0, y: 2, w: 6, h: 1, minW: 2 }, // Full width but only 1 block tall
    { i: 'customization', x: 0, y: 3, w: 6, h: 2, minW: 2 }, // Full width and 2 blocks tall
  ],
  md: [
    { i: 'dynamicScaling', x: 0, y: 0, w: 2, h: 2, minW: 2 },
    { i: 'responsiveDesign', x: 2, y: 0, w: 2, h: 2, minW: 2 },
    { i: 'performance', x: 0, y: 2, w: 4, h: 1, minW: 2 },
    { i: 'customization', x: 0, y: 3, w: 4, h: 2, minW: 2 },
  ],
  sm: [
    { i: 'dynamicScaling', x: 0, y: 0, w: 2, h: 2, minW: 2 },
    { i: 'responsiveDesign', x: 2, y: 0, w: 2, h: 2, minW: 2 },
    { i: 'performance', x: 0, y: 2, w: 4, h: 1, minW: 2 },
    { i: 'customization', x: 0, y: 3, w: 4, h: 2, minW: 2 },
  ],
  xs: [
    { i: 'dynamicScaling', x: 0, y: 0, w: 1, h: 2, minW: 1 }, // Each takes full width in XS
    { i: 'responsiveDesign', x: 0, y: 2, w: 1, h: 2, minW: 1 },
    { i: 'performance', x: 0, y: 4, w: 1, h: 1, minW: 1 },
    { i: 'customization', x: 0, y: 5, w: 1, h: 2, minW: 1 },
  ],
}

const HomeCards: React.FunctionComponent = () => {
  const [layouts, setLayouts] = useState(defaultLayouts)
  const theme = useTheme()

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1600, md: 996, sm: 768, xs: 480 }}
      cols={{ lg: 6, md: 4, sm: 4, xs: 1 }} // Adjusted to fit new layout
      rowHeight={140}
      isDraggable={true}
      isResizable={true}
    >
      {/* Dynamic Scaling - Top Left */}
      <div key="dynamicScaling">
        <FactCard
          icon={<DevicesIcon fontSize="large" />}
          title="Dynamic Scaling"
          fact="Try resizing the app! The layout adjusts dynamically."
          backgroundColor={theme.palette.primary.main}
        />
      </div>

      {/* Responsive Design - Top Right */}
      <div key="responsiveDesign">
        <FactCard
          icon={<PeopleIcon fontSize="large" />}
          title="Responsive Design"
          fact="Your app works on any screen size, from mobile to desktop."
          backgroundColor="#00838F" // Teal for contrast
        />
      </div>

      {/* Performance Optimization - Full Width, 1 Block Tall */}
      <div key="performance">
        <FactCard
          icon={<SpeedIcon fontSize="large" />}
          title="Performance Optimized"
          fact="This template is built with efficiency in mind."
          backgroundColor="#D84315" // Dark orange for an energetic feel
        />
      </div>

      {/* Customization - Full Width, 2 Blocks Tall */}
      <div key="customization">
        <FactCard
          icon={<BuildIcon fontSize="large" />}
          title="Easily Customizable"
          fact="Modify themes, layouts, and components with ease."
          backgroundColor="#6A1B9A" // Dark purple for customization/flexibility
        />
      </div>
    </ResponsiveGridLayout>
  )
}

export default HomeCards
