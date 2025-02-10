import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface FactCardProps {
  icon: ReactNode;
  title: string;
  fact: string;
  backgroundColor: string;
}

const FactCard: React.FC<FactCardProps> = ({ icon, title, fact, backgroundColor }) => {
  return (
    <Card
      sx={{
        background: backgroundColor,
        color: 'white',
        height: '100%',
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: 3, // Soft shadow effect
        transition: 'transform 0.2s ease-in-out', // Subtle hover animation
        '&:hover': {
          transform: 'scale(1.03)', // Slight scale-up effect on hover
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={1} gap={1}>
          {icon}
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight="bold">
          {fact}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FactCard;
