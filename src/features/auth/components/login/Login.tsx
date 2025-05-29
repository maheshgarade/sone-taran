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

interface phoneNumber {
  phoneNo: number;
}

const LogIn: React.FC = () => {
  const [phoneNo, setPhoneno] = useState<phoneNumber | null>(null);
  const { requestOtp } = useAuth();

  const formik = useFormik({
    initialValues: {
      phone: '  ',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    }),
    onSubmit: (values) => {
      const phone = Number(values.phone);
      setPhoneno({ phoneNo: phone });
    },
  });

  const sendPhoneNo = async () => {
    await requestOtp(phoneNo);
  };

  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 1.8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Wholesale Value
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* Input Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                type="number"
                id="phone"
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Box>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              sx={{ width: '70%' }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                sendPhoneNo();
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogIn;
