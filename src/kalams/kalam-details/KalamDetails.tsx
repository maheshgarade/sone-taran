import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Paper } from "@mui/material";

const KalamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      {/* Kalam Details */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Kalam ID: {id}</Typography>
        <Typography variant="body1">More details about this kalam...</Typography>
      </Paper>
    </Box>
  );
};

export default KalamDetails;
