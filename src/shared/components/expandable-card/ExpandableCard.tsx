import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Avatar,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import StatusChip from '../status-chip/StatusChip';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';

const ExpandableCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Toggle the expanded state when the card is clicked
  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModalOpen(true);
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModalOpen(false);
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '2px',
        }}
      >
        <Avatar
          sx={{
            bgcolor: purple[500],
            height: 33,
            fontSize: '13px',
            fontWeight: 800,
          }}
          variant="square"
        >
          123
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '12px', fontWeight: '700' }}>
              Raghu Sathe
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>
              Ganthan
              <IconButton
                onClick={handleOpenModal}
                sx={{ marginLeft: '2px', padding: 0 }}
              >
                <InfoIcon
                  color="primary"
                  sx={{ width: '13px', height: '13px' }}
                />
              </IconButton>
            </Typography>
          </Box>
        </Box>
        <StatusChip status="active" />
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, padding: '0.5rem' }}>
        <Box>
          <Typography sx={{ fontSize: '12px' }} variant="body1" gutterBottom>
            <Typography
              sx={{ fontSize: '12px' }}
              component="span"
              fontWeight="bold"
            >
              Date:
            </Typography>
            {' 12 Dec 2024'}
          </Typography>
          <Typography sx={{ fontSize: '12px' }} variant="body1" gutterBottom>
            <Typography
              sx={{ fontSize: '12px' }}
              component="span"
              fontWeight="bold"
            >
              Valid Till:
            </Typography>
            {' 12 Dec 2024'}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography sx={{ fontSize: '12px' }} variant="body1" gutterBottom>
            <Typography
              sx={{ fontSize: '12px' }}
              component="span"
              fontWeight="bold"
            >
              Amt:
            </Typography>
            {' 12000'}
          </Typography>
          <Typography sx={{ fontSize: '12px' }} variant="body1" gutterBottom>
            <Typography
              sx={{ fontSize: '12px' }}
              component="span"
              fontWeight="bold"
            >
              ROI:
            </Typography>
            {' 3%'}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography sx={{ fontSize: '12px' }} variant="body1" gutterBottom>
            <Typography
              component="span"
              fontWeight="bold"
              sx={{ fontSize: '12px' }}
            >
              Merchant:
            </Typography>
            {' Swapnil'}
          </Typography>
          <Typography sx={{ fontSize: '12px' }} variant="body1" gutterBottom>
            <Typography
              sx={{ fontSize: '12px' }}
              component="span"
              fontWeight="bold"
            >
              Due:
            </Typography>
            {' 12000'}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            This is the expanded content of the card. You can add more details
            here.
          </Typography>
          <Button variant="contained" color="primary">
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: '8px' }}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" sx={{ marginLeft: '8px' }}>
            Delete
          </Button>
        </CardContent>
      </Collapse>

      {/* Modal for Info */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <Typography>
            Here is some important information related to Raghu Sathe. You can
            add more details here as needed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ExpandableCard;
