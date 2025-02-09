import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 200 },
  { name: 'Group D', value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const PieChartComponent: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Tooltip />
      <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={100} fill="#8884d8" dataKey="value">
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)

export default PieChartComponent
