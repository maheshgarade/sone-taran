import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Button,
  Dialog,
  DialogContent,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TailSpin } from 'react-loader-spinner';
import useCustomerData from '../../../hooks/useCustomersData';
import { useTranslation } from 'react-i18next';

const CustomerDetails: React.FC = () => {
  // For translation
  const { t } = useTranslation();

  // Id of the customer
  const { id } = useParams<{ id: string }>();

  // Data of the customer
  const { state: data } = useLocation() as { state: any };

  // For the edit modal
  const [editModal, setEditModal] = useState(false);

  const navigate = useNavigate();

  // Custom Hooks
  const { deleteCustomer, updateCustomer } = useCustomerData();

  if (!data) return <Typography>Loading…</Typography>;

  // Helper to render a label–value row
  const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Grid container spacing={1}>
      <Grid item xs={5} sm={4} md={3}>
        <Typography fontWeight={600}>{label}</Typography>
      </Grid>
      <Grid item xs={7} sm={8} md={9}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );

  // Section wrapper
  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <Box mb={4}>
      <Typography variant="h5" mb={2}>
        {title}
      </Typography>
      <Stack spacing={1}>{children}</Stack>
    </Box>
  );

  // For Loader
  const [loading, setLoading] = useState<boolean>(false);
  if (loading) {
    return (
      <Box>
        <Dialog
          open={loading}
          PaperProps={{
            sx: {
              background: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <DialogContent
            sx={{
              background: 'transparent !important',
              boxShadow: 'none',
              padding: 0,
            }}
          >
            <Box
              sx={{
                background: 'transparent',
                boxShadow: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#1976d2"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }

  // formik for editing customer
  const editFormik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      altPhone: '',
      street: '',
      city: '',
      zip: '',
    },
    enableReinitialize: true, // Important to allow patching
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
      console.log('Updating:', values);
      try {
        setLoading(true);
        // for updating the customer
        updateCustomer(data._id, {
          name: values.name,
          contact: [values.phone],
          address: {
            street: values.street,
            city: values.city,
            zip: Number(values.zip),
          },
        });
        navigate('/customers');
        setEditModal(false);
        setLoading(false);
        editFormik.resetForm();
      } catch (err) {
        console.error('Edit customer error:', err);
      }
    },
  });

  // input specification
  const formSections = [
    {
      title: 'Customer Information',
      fields: [
        {
          label: 'Customer Name',
          name: 'name',
          value: editFormik.values.name,
          onChange: editFormik.handleChange,
          onBlur: editFormik.handleBlur,
          error: editFormik.touched.name && Boolean(editFormik.errors.name),
          helperText: editFormik.touched.name && editFormik.errors.name,
        },
        {
          label: 'Phone',
          name: 'phone',
          value: editFormik.values.phone,
          onChange: editFormik.handleChange,
          onBlur: editFormik.handleBlur,
          error: editFormik.touched.phone && Boolean(editFormik.errors.phone),
          helperText: editFormik.touched.phone && editFormik.errors.phone,
        },
        {
          label: 'Alt Phone',
          name: 'altPhone',
          value: editFormik.values.altPhone,
        },
      ],
    },
    {
      title: 'Address',
      fields: [
        {
          label: 'Street',
          name: 'street',
          value: editFormik.values.street,
          onChange: editFormik.handleChange,
          onBlur: editFormik.handleBlur,
          error: editFormik.touched.street && Boolean(editFormik.errors.street),
          helperText: editFormik.touched.street && editFormik.errors.street,
        },
        {
          label: 'City',
          name: 'city',
          value: editFormik.values.city,
          onChange: editFormik.handleChange,
          onBlur: editFormik.handleBlur,
          error: editFormik.touched.city && Boolean(editFormik.errors.city),
          helperText: editFormik.touched.city && editFormik.errors.city,
        },
        {
          label: 'Zip Code',
          name: 'zip',
          value: editFormik.values.zip,
          onChange: editFormik.handleChange,
          onBlur: editFormik.handleBlur,
          error: editFormik.touched.zip && Boolean(editFormik.errors.zip),
          helperText: editFormik.touched.zip && editFormik.errors.zip,
        },
      ],
    },
  ];

  // for deleing the customer
  const deleteCust = async () => {
    try {
      deleteCustomer(data._id);
      navigate('/customers');
    } catch (error) {
      console.error('Add customer error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" mb={4}>
          Customer ID: {id}
        </Typography>

        {/* Customer details */}
        <Section title={t('customerDetailsPage.customerDetails')}>
          <Row
            label={t('customerDetailsPage.customer.name')}
            value={data.customer.name}
          />
          <Row
            label={t('customerDetailsPage.customer.contact')}
            value={data.customer.contact?.[0] ?? '—'}
          />
          <Row
            label={t('customerDetailsPage.customer.address')}
            value={
              <>
                {data.customer.address.street},&nbsp;
                {data.customer.address.city},&nbsp;
                {data.customer.address.zip}
              </>
            }
          />
        </Section>

        <Divider sx={{ my: 3 }} />

        {/* For showing the Kalam Deatails on customer name  */}
        <Section title={t('customerDetailsPage.loan')}>
          {/* Loan  Details*/}
          {data.LoanDetails.map((loan: any) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    {t('customerDetailsPage.loan')} {loan.loans.loanId}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Section title={t('customerDetailsPage.loans.itemDetails')}>
                    <Row
                      label={t('customerDetailsPage.loans.item.itemName')}
                      value={loan.loans.details.name}
                    />
                    <Row
                      label={t('customerDetailsPage.loans.item.materialType')}
                      value={loan.loans.details.materialType}
                    />
                    <Row
                      label={t('customerDetailsPage.loans.item.netWeight')}
                      value={loan.loans.details.netWeight}
                    />
                    <Row
                      label={t('customerDetailsPage.loans.item.grossWeight')}
                      value={loan.loans.details.grossWeight}
                    />
                    <Row
                      label={t('customerDetailsPage.loans.item.purity')}
                      value={loan.loans.details.purity}
                    />
                    <Row
                      label={t('customerDetailsPage.loans.item.goldRate')}
                      value={loan.loans.details.goldRateAtLoan}
                    />
                  </Section>
                  <Section title={t('customerDetailsPage.loans.loanDetails')}>
                    <Row
                      label={t('customerDetailsPage.loans.loan.loanStartDate')}
                      value={loan.loans.loanDetails.loanStartDate}
                    />
                    <Row
                      label={t('customerDetailsPage.loans.loan.customerAmt')}
                      value={loan.loans.loanDetails.customerAmt}
                    />
                    <Row
                      label={t('customerDetailsPage.loans.loan.customerROI')}
                      value={loan.loans.loanDetails.customerROI}
                    />
                  </Section>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Section>

        {/* for Edit an Delete button  */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: '8px', width: '30%' }}
            onClick={() => {
              editFormik.setValues({
                name: data.customer.name || '',
                phone: data.customer.contact[0] || '',
                altPhone: data.customer.contact[1] || '',
                street: data.customer.address.street || '',
                city: data.customer.address.city || '',
                zip: String(data.customer.address.zip) || '',
              });
              setEditModal(true);
            }}
          >
            {t('customerDetailsPage.edit')}
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ marginLeft: '8px', width: '30%' }}
            onClick={() => {
              deleteCust();
            }}
          >
            {t('customerDetailsPage.delete')}
          </Button>
        </Box>
      </Paper>

      {/* Modal For edit Customer */}
      <Dialog
        open={editModal}
        onClose={() => setEditModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {/* Customer Information */}
          <Box
            sx={{ mt: 2 }}
            component="form"
            onSubmit={editFormik.handleSubmit}
          >
            <Box sx={{ mt: 2 }}>
              {formSections.map((section, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    {section.title}
                  </Typography>
                  <Grid container spacing={2}>
                    {section.fields.map((field, idx) => {
                      const formikObj = {
                        ...field,
                        value:
                          editFormik.values[
                            field.name as keyof typeof editFormik.values
                          ],
                        onChange: editFormik.handleChange,
                        onBlur: editFormik.handleBlur,
                        error:
                          editFormik.touched[
                            field.name as keyof typeof editFormik.touched
                          ] &&
                          Boolean(
                            editFormik.errors[
                              field.name as keyof typeof editFormik.errors
                            ]
                          ),
                        helperText:
                          editFormik.touched[
                            field.name as keyof typeof editFormik.touched
                          ] &&
                          editFormik.errors[
                            field.name as keyof typeof editFormik.errors
                          ],
                      };
                      return (
                        <Grid
                          item
                          xl={6}
                          lg={6}
                          md={6}
                          sm={6}
                          xs={12}
                          key={idx}
                        >
                          <TextField fullWidth {...formikObj} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              ))}
            </Box>

            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                sx={{ width: '60%', mt: 4 }}
                type="submit"
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CustomerDetails;
