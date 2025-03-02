import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Avatar,
  Box,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import StatusChip from '../status-chip/StatusChip';

const ExpandableCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  // Toggle the expanded state when the card is clicked
  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Avatar sx={{ bgcolor: purple[500], height: 38 }} variant='square'>123</Avatar>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Raghu Sathe
            </Typography>
          <StatusChip status="active" />
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            This is the expanded content of the card. You can add more details here.
          </Typography>
          <Button variant="contained" color="primary">
            View
          </Button>
          <Button variant="contained" color="secondary" sx={{ marginLeft: '8px' }}>
            Edit
          </Button>
          <Button variant="contained" color="error" sx={{ marginLeft: '8px' }}>
            Delete
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ExpandableCard;