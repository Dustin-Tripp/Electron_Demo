import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts'

const data = [
  { subject: 'Math', value: 120 },
  { subject: 'Science', value: 98 },
  { subject: 'English', value: 86 },
  { subject: 'History', value: 99 },
  { subject: 'Art', value: 85 },
]

const RadarChartComponent: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Tooltip />
      <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  </ResponsiveContainer>
)

export default RadarChartComponent
