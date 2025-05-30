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
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 1.8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            fullWidth
            type="text"
            id="phone"
            name="phone"
            label="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}

          <Button
            sx={{ width: '70%', alignSelf: 'center' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Send OTP
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogIn;
