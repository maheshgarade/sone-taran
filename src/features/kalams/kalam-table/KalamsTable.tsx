import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { KalamProps } from '../models/KalamProps';
import { CustomerDetails, KalamDetails } from '../models/Kalam';
import { calculateMonthsAndDays } from '../../../utils/CountDaysUtil';
import { calculateAnnualCompoundInterest } from '../../../utils/InterestCalculatorUtil';
import AddIcon from '@mui/icons-material/Add';

const KalamsTable: React.FC<KalamProps> = (props) => {
  const { data } = props;
  console.log(data);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetails | null>(null);
  const [selectedKalam, setSelectedKalam] = useState<KalamDetails | null>(null);
  const navigate = useNavigate();

  const calculateTodaysValue = () => '-';

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Kalam</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Loan Amt</TableCell>
              <TableCell>Amt Due</TableCell>
              <TableCell>Customer ROI</TableCell>
              <TableCell>Merchant</TableCell>

              <TableCell>Today's Value</TableCell>
              <TableCell>Validity</TableCell>
              <TableCell>View Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((kalam, index) => {
              const loanStartDate = new Date(
                kalam.kalam.loanDetails.loanStartDate
              );
              const { totalMonths, days } =
                calculateMonthsAndDays(loanStartDate);
              return (
                <TableRow key={kalam._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{kalam.kalam.loanId}</TableCell>

                  {/* Customer Name + Info Icon */}
                  <TableCell>
                    {kalam.customerDetails.name}
                    <IconButton
                      disableRipple
                      onClick={() => setSelectedCustomer(kalam.customerDetails)}
                      sx={{
                        outline: 'none',
                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                    >
                      <InfoIcon fontSize="small" color="primary" />
                    </IconButton>
                  </TableCell>

                  {/* Kalam Name + Info Icon */}
                  <TableCell>
                    {kalam.kalam.details.name}
                    <IconButton
                      onClick={() => setSelectedKalam(kalam.kalam)}
                      sx={{
                        outline: 'none',
                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                    >
                      <InfoIcon fontSize="small" color="primary" />
                    </IconButton>
                  </TableCell>

                  <TableCell>{kalam.kalam.loanDetails.loanStartDate}</TableCell>
                  <TableCell>₹{kalam.kalam.loanDetails.customerAmt}</TableCell>
                  <TableCell>
                    ₹
                    {calculateAnnualCompoundInterest(
                      kalam.kalam.loanDetails.customerAmt,
                      kalam.kalam.loanDetails.customerROI * 12,
                      totalMonths,
                      days
                    )}
                  </TableCell>
                  <TableCell>{kalam.kalam.loanDetails.customerROI}%</TableCell>
                  <TableCell>{kalam.merchantDetails.name}</TableCell>
                  <TableCell>{calculateTodaysValue()}</TableCell>
                  <TableCell>-</TableCell>

                  <TableCell>
                    <IconButton
                      sx={{
                        outline: 'none',
                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                      onClick={() =>
                        navigate(`/kalams/${kalam.kalam.loanId}`, {
                          state: kalam,
                        })
                      }
                    >
                      <Visibility fontSize="small" color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'none',
          boxShadow: 'none',

          display: 'flex',
          justifyContent: 'flex-end',
          pr: 4,
          mb: 2,
        }}
        elevation={3}
      >
        <BottomNavigation>
          <BottomNavigationAction
            label="Archive"
            icon={
              <IconButton
                color="primary"
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  },
                }}
                aria-label="add to shopping cart"
              >
                <AddIcon />
              </IconButton>
            }
          />
        </BottomNavigation>
      </Paper>
      {/* Customer Info Dialog */}
      <Dialog
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      >
        <DialogTitle>Customer Info</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <List>
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={`${selectedCustomer.address.street}, ${selectedCustomer.address.city} - ${selectedCustomer.address.zip}`}
                />
              </ListItem>
              {selectedCustomer.contact.map((phone, index) => (
                <ListItem key={index} component="a" href={`tel:${phone}`}>
                  <ListItemText primary="Phone" secondary={phone} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* Kalam Info Dialog */}
      <Dialog open={!!selectedKalam} onClose={() => setSelectedKalam(null)}>
        <DialogTitle>Kalam Details</DialogTitle>
        <DialogContent>
          {selectedKalam && (
            <List>
              <ListItem>
                <ListItemText
                  primary="Type"
                  secondary={selectedKalam.details.materialType}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Net Weight"
                  secondary={`${selectedKalam.details.netWeight}g`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gross Weight"
                  secondary={`${selectedKalam.details.grossWeight}g`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Purity"
                  secondary={`${selectedKalam.details.purity}%`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gold Rate at Loan"
                  secondary={`₹${selectedKalam.details.goldRateAtLoan}`}
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KalamsTable;
