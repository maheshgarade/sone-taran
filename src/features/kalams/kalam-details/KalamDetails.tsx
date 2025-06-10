import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Typography, Box, Paper } from '@mui/material';

const KalamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <Box>
      {/* Kalam Details */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Kalam ID: {id}
        </Typography>
        <Box>
          <Typography variant="h5">Kalam Details</Typography>
          <Box sx={{ ml: 5 }}>
            <Typography variant="h6">
              Item name :- {data.kalam.details.name}
            </Typography>
            <Typography variant="h6">
              Material Type :- {data.kalam.details.materialType}
            </Typography>
            <Typography variant="h6">
              Gold Rate :- {data.kalam.details.goldRateAtLoan}
            </Typography>
            <Typography variant="h6">
              Gross weight :- {data.kalam.details.grossWeight}
            </Typography>
            <Typography variant="h6">
              Net Weight:- {data.kalam.details.netWeight}
            </Typography>
            <Typography variant="h6">
              Purity :- {data.kalam.details.purity}
            </Typography>
            <Typography variant="h6">
              Quantity :- {data.kalam.details.number}
            </Typography>
          </Box>
        </Box>

        <hr />
        <Box>
          <Typography variant="h5">Loan Details</Typography>
          <Box sx={{ ml: 5 }}>
            <Typography variant="h6">
              Loan Start Date :- {data.kalam.loanDetails.loanStartDate}
            </Typography>
            <Typography variant="h6">
              Customer Amount :- {data.kalam.loanDetails.customerAmt}
            </Typography>
            <Typography variant="h6">
              Customer ROI :- {data.kalam.loanDetails.customerROI}
            </Typography>
            <Typography variant="h6">
              Dukandar Amount :- {data.kalam.loanDetails.dukandarAmt}
            </Typography>
            <Typography variant="h6">
              Dukandar ROI:- {data.kalam.loanDetails.merchantROI}
            </Typography>
            <Typography variant="h6">
              Total Amount :- {data.kalam.loanDetails.totalAmt}
            </Typography>
            <Typography variant="h6">
              Validity :- {data.kalam.loanDetails.validity}
            </Typography>
          </Box>
        </Box>

        <hr />
        <Box>
          <Typography variant="h5">Customer Details</Typography>
          <Box sx={{ ml: 5 }}>
            <Typography variant="h6">
              name :- {data.customerDetails.name}
            </Typography>
            <Typography variant="h6">
              Contact :-
              {data.customerDetails.contact[0] === undefined
                ? ' '
                : data.customerDetails.contact[0]}
            </Typography>
            <Typography variant="h6">
              Address :- {data.customerDetails.address.street} ,
              {data.customerDetails.address.city},{' '}
              {data.customerDetails.address.zip}
            </Typography>
          </Box>
        </Box>

        <hr />
        <Box>
          <Typography variant="h5">Merchant Details</Typography>
          <Box sx={{ ml: 5 }}>
            <Typography variant="h6">
              name :- {data.merchantDetails.name}
            </Typography>
            <Typography variant="h6">
              Contact :-
              {data.merchantDetails.contact[0] === undefined
                ? ' '
                : data.merchantDetails.contact[0]}
            </Typography>
            <Typography variant="h6">
              Address :- {data.merchantDetails.address.street} ,
              {data.merchantDetails.address.city},{' '}
              {data.customerDetails.address.zip}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default KalamDetails;
