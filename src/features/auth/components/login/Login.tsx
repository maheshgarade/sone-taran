import { Typography, Box, TextField, Button, CssBaseline } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LogIn: React.FC = () => {
  const { requestOtp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  }),
    onSubmit: async (values) => {
      setError(null);

      try {
        await requestOtp({ phoneNo: Number(values.phone) });
        navigate('/otp-verify');
      } catch (err) {
        console.error(err);
        setError('Failed to send OTP. Please try again.');
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
              sx={{ fontWeight: 'Bold', marginTop: {xl:'-25%',lg:"-28%",md:"-25%",sm:"-30%",xs:"-35%"} }}
            >
              Sign in
            </Typography>
          </Box>

          {/* Input Box */}
          <Box>
            <TextField
              type="text"
              label="Phone Number"
              name="phone"
              id="phone"
              placeholder="Phone Numbers"
              focused
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ color: '#cbcbcb', marginTop: '-15%' }}
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
            <Button
              sx={{ width: '100%', alignSelf: 'center', mt: 1 }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={()=>{
                
              }}
            >
              Send OTP
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LogIn;
