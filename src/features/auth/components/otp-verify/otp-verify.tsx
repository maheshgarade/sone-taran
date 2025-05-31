import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

const OtpVerify: React.FC = () => {
  const { verifyOtp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 1.8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Verify OTP
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* OTP Input Field */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '70%', alignSelf: 'center' }}
          >
            Verify
          </Button>

          {/* Success/Error Messages */}
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="body2" color="primary" align="center">
              {success}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default OtpVerify;
