import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Paper } from "@mui/material";
import { KalamProps } from "../models/KalamProps";

const KalamDetails: React.FC<KalamProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  const { data } = props;
  console.log(data)
  return (
    <Box>
      {/* Kalam Details */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Kalam ID: {id}</Typography>
        {data.map((item) => {
          return (
            <Typography>{item.kalam.loanId}</Typography>
          )
        })}
        <Typography variant="body1">More details about this kalam...</Typography>
      </Paper>
    </Box>
  );
};

export default KalamDetails;
