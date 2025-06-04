import { CssBaseline, Typography, Box, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const OtpVerify: React.FC = () => {
  const { verifyOtp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      OTP: '',
    },
    validationSchema: Yup.object({
      OTP: Yup.string()
        .required('OTP is required')
        .matches(/^\d{6}$/, 'Invalid OTP'),
    }),
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);

      const success = await verifyOtp(values.OTP);
      console.log(success);

      if (!success) {
        setError('Invalid OTP. Please try again.');
      } else {
        setSuccess('OTP verified successfully!');
        navigate('/dashboard');
      }
    },
  });

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '95vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            width: { xl: '25%', lg: '30%', md: '50%', sm: '50%', xs: '100%' },
            height: '90vh',
            border: '1px solid #e1e1e1',
            backgroundColor: '#f7f8f9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'Bold',
                marginTop: {
                  xl: '-25%',
                  lg: '-28%',
                  md: '-25%',
                  sm: '-30%',
                  xs: '-35%',
                },
              }}
            >
              Sign in
            </Typography>
          </Box>

          {/* Input Box */}
          <Box>
            <TextField
              fullWidth
              type="text"
              id="OTP"
              name="OTP"
              label="OTP"
              value={formik.values.OTP}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.OTP && Boolean(formik.errors.OTP)}
              helperText={formik.touched.OTP && formik.errors.OTP}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ marginTop: '-1%' }}
              >
                {error}
              </Typography>
            )}

            {success && (
              <Typography variant="body2" color="primary" align="center">
                {success}
              </Typography>
            )}
            <Button
              sx={{ width: '100%', alignSelf: 'center', mt: 1 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OtpVerify;
