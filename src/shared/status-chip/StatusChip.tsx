import React from 'react';
import { Box } from '@mui/material';

interface StatusChipProps {
  status: 'active' | 'inactive';
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  // Define styles based on the status prop
  const styles = {
    active: {
      backgroundColor: '#d4edda', // Light green background
      color: '#28a745', // Green text
    },
    inactive: {
      backgroundColor: '#f8d7da', // Light red background
      color: '#dc3545', // Red text
    },
  };

  // Determine the style based on the status
  const currentStyle = status === 'active' ? styles.active : styles.inactive;

  return (
    <Box
      sx={{
        ...currentStyle,
        borderRadius: '5px',
        padding: '4px 14px',
        display: 'inline-block',
        fontWeight: 'bold',
        marginRight: '5px',
        fontSize: '12px,',
      }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}{' '}
      {/* Capitalize the first letter */}
    </Box>
  );
};

export default StatusChip;
