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
  Fab,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomerProps } from '../models/CustomerProps';
import AddIcon from '@mui/icons-material/Add';
import { CustomerDetails } from '../models/Customers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useCustomerData from '../../../hooks/useCustomersData';

const CustomerTable: React.FC<CustomerProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetails | null>(null);
  const [addModal, setAddModal] = useState(false);
  const { addData } = useCustomerData();
  const num = 0;

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      altPhone: '',
      street: '',
      city: '',
      zip: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      zip: Yup.string()
        .required(' Pin code is required')
        .matches(/^\d{6}$/, 'Invalid Pin code'),
    }),
    onSubmit: async (values) => {
      console.log('Submitting:', values);
      try {
        await addData({
          customerId: `${num + 1}`,
          name: values.name,
          contact: [values.phone, values.altPhone],
          address: {
            street: values.street,
            city: values.city,
            zip: Number(values.zip),
          },
        });

        formik.resetForm();
        setAddModal(false);
      } catch (err) {
        console.error('Add customer error:', err);
      }
    },
  });
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
                      : customers.customer.contact[1] === undefined
                      ? customers.customer.contact[0]
                      : `${customers.customer.contact[0]} / ${customers.customer.contact[1]}`}
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
        <BottomNavigation sx={{ height: '0' }}>
          <BottomNavigationAction
            label="Add"
            icon={
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                  setAddModal(true);
                }}
              >
                <AddIcon />
              </Fab>
            }
          />
        </BottomNavigation>
      </Paper>

      {/* For Showing address of the customer */}
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

      <Dialog
        open={addModal}
        onClose={() => setAddModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          {/* Customer Information */}
          <Box sx={{ mt: 2 }} component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h6">Customer Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Customer Name"
                  fullWidth
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Alt Phone"
                  fullWidth
                  name="altPhone"
                  value={formik.values.altPhone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.altPhone && Boolean(formik.errors.altPhone)
                  }
                  helperText={formik.touched.altPhone && formik.errors.altPhone}
                />
              </Grid>

              {/* Address Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Street"
                  fullWidth
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.street && Boolean(formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  fullWidth
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Zip Code"
                  fullWidth
                  name="zip"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.zip && Boolean(formik.errors.zip)}
                  helperText={formik.touched.zip && formik.errors.zip}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{ width: '60%', mt: 4, mx: 'auto' }}
              type="submit"
            >
              Add Kalam
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerTable;
