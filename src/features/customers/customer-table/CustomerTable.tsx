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
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomerProps } from '../models/CustomerProps';
import AddIcon from '@mui/icons-material/Add';
import { CustomerDetails } from '../models/Customers';

const CustomerTable: React.FC<CustomerProps> = (props) => {
  const { data } = props;
  console.log(data);
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetails | null>(null);

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name </TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Validity</TableCell>
              <TableCell>View Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((customers, index) => {
              return (
                <TableRow key={customers._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{customers.customer.customerId}</TableCell>

                  {/* Customer Name + Info Icon */}
                  <TableCell>{customers.customer.name}</TableCell>

                  <TableCell>
                    {customers.customer.contact[0] === undefined
                      ? '-'
                      : customers.customer.contact}
                  </TableCell>
                  <TableCell>
                    {customers.customer.address.city} -{' '}
                    {customers.customer.address.zip}
                    <IconButton
                      onClick={() => setSelectedCustomer(customers.customer)}
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
                        navigate(
                          `/customers/${customers.customer.customerId}`,
                          {
                            state: customers,
                          }
                        )
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

      <Dialog
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      >
        <DialogTitle>Address</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <List>
              <ListItem>
                <ListItemText
                  primary={`${selectedCustomer.address.street}, ${selectedCustomer.address.city} - ${selectedCustomer.address.zip}`}
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerTable;
