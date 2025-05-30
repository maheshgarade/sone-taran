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

interface OTP {
  OTP: number;
}

const LogIn: React.FC = () => {
  const [OTP, setOTP] = useState<OTP | null>(null);

  const formik = useFormik({
    initialValues: {
      OTP: '  ',
    },
    validationSchema: Yup.object({
      OTP: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{6}$/, 'Invalid OTP'),
    }),
    onSubmit: (values) => {
      const OTP = Number(values.OTP);
      setOTP({ OTP: OTP });

    },
  });

  const sendPhoneNo = async () => {
  };

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
          {/* Input Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
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
            </Box>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              sx={{ width: '70%' }}
              type="submit"
              variant="contained"
              color="primary"
            // onClick={() => {
            //   sendPhoneNo();
            // }}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogIn;
