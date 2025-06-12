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
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Fab,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { KalamProps } from '../models/KalamProps';
import { CustomerDetails, KalamDetails } from '../models/Kalam';
import { calculateMonthsAndDays } from '../../../utils/CountDaysUtil';
import { calculateAnnualCompoundInterest } from '../../../utils/InterestCalculatorUtil';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useKalamsData from '../../../hooks/useKalamsData';
import apiService from '../../../services/apiService';

const KalamsTable: React.FC<KalamProps> = (props) => {
  const { data } = props;
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetails | null>(null);
  const [selectedKalam, setSelectedKalam] = useState<KalamDetails | null>(null);
  const navigate = useNavigate();
  const [addModal, setAddModal] = useState(false);
  const { addData } = useKalamsData();
  const num = 0;

  const calculateTodaysValue = () => '-';
  const formik = useFormik({
    initialValues: {
      name: '',
      itemQuantity: '',
      phone: '',
      altPhone: '',
      street: '',
      city: '',
      zip: '',
      itemName: '',
      itemMaterial: '',
      netWeight: '',
      grossWeight: '',
      purity: '',
      goldRate: '',
      totalAmount: '',
      customerAmount: '',
      merchantROI: '',
      customerROI: '',
      loanStartDate: '',
      merchantName: '',
      shopName: '',
      merchantPhone: '',
      merchantStreet: '',
      merchantCity: '',
      merchantZip: '',
      dukandarAmount: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      itemQuantity: Yup.string().required('Quantity is required'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      zip: Yup.string()
        .required('Pin code is required')
        .matches(/^\d{6}$/, 'Invalid Pin code'),
      itemName: Yup.string().required('Item Name is required'),
      itemMaterial: Yup.string().required('Item Type is required'),
      netWeight: Yup.number().required('Net Weight is required').positive(),
      grossWeight: Yup.number().required('Gross Weight is required').positive(),
      purity: Yup.number().required('Purity is required').positive(),
      goldRate: Yup.number().required('Gold Rate is required').positive(),
      totalAmount: Yup.number().required('Total Amount is required').positive(),
      customerAmount: Yup.number()
        .required('Customer Amount is required')
        .positive(),
      merchantROI: Yup.number().required('Merchant ROI is required').positive(),
      customerROI: Yup.number().required('Customer ROI is required').positive(),
      loanStartDate: Yup.date()
        .required('Loan Start Date is required')
        .nullable(),
      merchantName: Yup.string().required('Merchant Name is required'),
      shopName: Yup.string().required('Shop Name is required'),
      merchantPhone: Yup.string()
        .required('Merchant Phone is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      merchantStreet: Yup.string().required('Merchant Address is required'),
      merchantCity: Yup.string().required('Merchant Address is required'),
      merchantZip: Yup.string().required('Merchant Address is required'),
      dukandarAmount: Yup.string().required('Dukandar Amount is required'),
    }),
    onSubmit: async (values) => {
      console.log('Submitting:', values);
      try {
        const custName = values.name;
        const contact = [values.phone, values.altPhone];
        const { street, city, zip } = values;

        const searchResult = await apiService.searchCustomer(custName, contact);

        let customerId = '';

        if (searchResult.customer) {
          customerId = searchResult.customer.customerId;
        } else {
          const newCustomerId = String(
            parseInt(searchResult.lastCustomerId || '100', 10) + 1
          );

          const newCustomer = await apiService.AddCustomerData({
            customerId: newCustomerId,
            name: custName,
            contact: contact,
            address: {
              street: street,
              city: city,
              zip: Number(zip),
            },
          });

          customerId = newCustomer.customerId;
        }

        let merchantId = '';
        const {
          merchantName,
          shopName,
          merchantStreet,
          merchantCity,
          merchantZip,
        } = values;
        const contactMerchant = [values.merchantPhone];

        const serachMerchantResult = await apiService.searchMerchant(
          merchantName,
          contactMerchant
        );

        if (serachMerchantResult.merchant) {
          merchantId = serachMerchantResult.merchant.merchantId;
        } else {
          const newmerchantId = String(
            parseInt(serachMerchantResult.lastmerchantId || '100', 10) + 1
          );

          const newMerchant = await apiService.AddMerchantData({
            merchantId: newmerchantId,
            name: custName,
            shopName: shopName,
            contact: contact,
            address: {
              street: merchantStreet,
              city: merchantCity,
              zip: Number(merchantZip),
            },
          });

          merchantId = newMerchant.merchantId;
        }

        // Assuming addData is a function that handles the submission
        addData({
          customerId: customerId,
          loans: {
            loanId: `${num + 1}`,
            details: {
              name: values.itemName,
              number: Number(values.itemQuantity),
              materialType: values.itemMaterial,
              netWeight: Number(values.netWeight),
              grossWeight: Number(values.grossWeight),
              purity: Number(values.purity),
              goldRateAtLoan: Number(values.goldRate),
            },

            loanDetails: {
              totalAmt: Number(values.totalAmount),
              customerAmt: Number(values.customerAmount),
              dukandarAmt: Number(values.dukandarAmount),
              merchantROI: Number(values.merchantROI),
              customerROI: Number(values.customerROI),
              loanStartDate: values.loanStartDate,
              validity: 'valid',
            },
          },
          merchantId: merchantId,
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

      {/* for adding th Kalam  */}
      <Dialog
        open={addModal}
        onClose={() => setAddModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Kalam (Copy from Closed Kalam)</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            {/* Customer Information */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Customer Information
              </Typography>
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
                    helperText={
                      formik.touched.altPhone && formik.errors.altPhone
                    }
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
                    error={
                      formik.touched.street && Boolean(formik.errors.street)
                    }
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
            </Box>

            {/* Item Information */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Item Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Item Name"
                    fullWidth
                    name="itemName"
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.itemName && Boolean(formik.errors.itemName)
                    }
                    helperText={
                      formik.touched.itemName && formik.errors.itemName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Item Quantity"
                    name="itemQuantity"
                    fullWidth
                    value={formik.values.itemQuantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.itemQuantity &&
                      Boolean(formik.errors.itemQuantity)
                    }
                    helperText={
                      formik.touched.itemQuantity && formik.errors.itemQuantity
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Item Type (Material)"
                    name="itemMaterial"
                    fullWidth
                    value={formik.values.itemMaterial}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.itemMaterial &&
                      Boolean(formik.errors.itemMaterial)
                    }
                    helperText={
                      formik.touched.itemMaterial && formik.errors.itemMaterial
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Net Weight (gm)"
                    type="number"
                    name="netWeight"
                    fullWidth
                    value={formik.values.netWeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.netWeight &&
                      Boolean(formik.errors.netWeight)
                    }
                    helperText={
                      formik.touched.netWeight && formik.errors.netWeight
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Gross Weight (gm)"
                    type="number"
                    name="grossWeight"
                    fullWidth
                    value={formik.values.grossWeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.grossWeight &&
                      Boolean(formik.errors.grossWeight)
                    }
                    helperText={
                      formik.touched.grossWeight && formik.errors.grossWeight
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Purity (%)"
                    type="number"
                    name="purity"
                    fullWidth
                    value={formik.values.purity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.purity && Boolean(formik.errors.purity)
                    }
                    helperText={formik.touched.purity && formik.errors.purity}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Gold Rate"
                    type="number"
                    name="goldRate"
                    fullWidth
                    value={formik.values.goldRate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.goldRate && Boolean(formik.errors.goldRate)
                    }
                    helperText={
                      formik.touched.goldRate && formik.errors.goldRate
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Mortgage Information */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Mortgage Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Total Amount"
                    type="number"
                    name="totalAmount"
                    fullWidth
                    value={formik.values.totalAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.totalAmount &&
                      Boolean(formik.errors.totalAmount)
                    }
                    helperText={
                      formik.touched.totalAmount && formik.errors.totalAmount
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Customer Amount"
                    type="number"
                    name="customerAmount"
                    fullWidth
                    value={formik.values.customerAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.customerAmount &&
                      Boolean(formik.errors.customerAmount)
                    }
                    helperText={
                      formik.touched.customerAmount &&
                      formik.errors.customerAmount
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Dukandar Amount"
                    type="number"
                    name="dukandarAmount"
                    fullWidth
                    value={formik.values.dukandarAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.dukandarAmount &&
                      Boolean(formik.errors.dukandarAmount)
                    }
                    helperText={
                      formik.touched.dukandarAmount &&
                      formik.errors.dukandarAmount
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Merchant ROI (pm)"
                    type="number"
                    name="merchantROI"
                    fullWidth
                    value={formik.values.merchantROI}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.merchantROI &&
                      Boolean(formik.errors.merchantROI)
                    }
                    helperText={
                      formik.touched.merchantROI && formik.errors.merchantROI
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Customer ROI (pm)"
                    type="number"
                    name="customerROI"
                    fullWidth
                    value={formik.values.customerROI}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.customerROI &&
                      Boolean(formik.errors.customerROI)
                    }
                    helperText={
                      formik.touched.customerROI && formik.errors.customerROI
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Loan Start Date"
                    type="date"
                    name="loanStartDate"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.loanStartDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.loanStartDate &&
                      Boolean(formik.errors.loanStartDate)
                    }
                    helperText={
                      formik.touched.loanStartDate &&
                      formik.errors.loanStartDate
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Merchant Information */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Merchant Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Merchant Name"
                    name="merchantName"
                    fullWidth
                    value={formik.values.merchantName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.merchantName &&
                      Boolean(formik.errors.merchantName)
                    }
                    helperText={
                      formik.touched.merchantName && formik.errors.merchantName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Shop Name"
                    name="shopName"
                    fullWidth
                    value={formik.values.shopName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.shopName && Boolean(formik.errors.shopName)
                    }
                    helperText={
                      formik.touched.shopName && formik.errors.shopName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Phone"
                    name="merchantPhone"
                    fullWidth
                    value={formik.values.merchantPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.merchantPhone &&
                      Boolean(formik.errors.merchantPhone)
                    }
                    helperText={
                      formik.touched.merchantPhone &&
                      formik.errors.merchantPhone
                    }
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
                    name="merchantStreet"
                    value={formik.values.merchantStreet}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.merchantStreet &&
                      Boolean(formik.errors.merchantStreet)
                    }
                    helperText={
                      formik.touched.merchantStreet &&
                      formik.errors.merchantStreet
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    fullWidth
                    name="merchantCity"
                    value={formik.values.merchantCity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.merchantCity &&
                      Boolean(formik.errors.merchantCity)
                    }
                    helperText={
                      formik.touched.merchantCity && formik.errors.merchantCity
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Zip Code"
                    fullWidth
                    name="merchantZip"
                    value={formik.values.merchantZip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.merchantZip &&
                      Boolean(formik.errors.merchantZip)
                    }
                    helperText={
                      formik.touched.merchantZip && formik.errors.merchantZip
                    }
                  />
                </Grid>
              </Grid>
            </Box>
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

export default KalamsTable;
