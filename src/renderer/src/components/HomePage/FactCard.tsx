import { Card, CardContent, Typography, Box } from '@mui/material'
import { ReactNode } from 'react'

interface FactCardProps {
  icon: ReactNode
  title: string
  fact: string
  backgroundColor: string
}

const FactCard: React.FC<FactCardProps> = ({ icon, title, fact, backgroundColor }) => {
  return (
    <Card sx={{ background: backgroundColor, color: 'white', height: '100%', minWidth: 250 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="body1">{fact}</Typography>
      </CardContent>
    </Card>
  )
}

export default FactCard
