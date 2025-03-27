import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  Container,
} from '@mui/material';

interface CalculatedValues {
  netPureGold: number;
  wastageWeight: number;
  totalGoldWeight: number;
  moneyEquivalent: number;
}

const WholesaleValueCalculator: React.FC = () => {
  const [calculatedValues, setCalculatedValues] =
    useState<CalculatedValues | null>(null);
  const [calculated, setCalculated] = useState<boolean>(false);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      weight: '',
      purity: '',
      wastage: '',
      goldRate: '',
    },
    validationSchema: Yup.object({
      weight: Yup.number()
        .required('Weight is required')
        .positive('Weight must be positive'),
      purity: Yup.number()
        .required('Purity is required')
        .min(0, 'Purity must be greater than 0')
        .max(100, 'Purity cannot exceed 100'),
      wastage: Yup.number()
        .required('Wastage is required')
        .min(0, 'Wastage must be greater than or equal to 0')
        .max(100, 'Wastage cannot exceed 100'),
      goldRate: Yup.number()
        .required('Gold rate is required')
        .positive('Gold rate must be positive'),
    }),
    onSubmit: (values) => {
      const weight = Number(values.weight);
      const purity = Number(values.purity);
      const wastage = Number(values.wastage);
      const goldRate = Number(values.goldRate);

      // Ensure arithmetic operations are on numbers
      const netPureGold = (weight * purity) / 100;
      const wastageWeight = (weight * wastage) / 100;
      const totalGoldWeight = netPureGold + wastageWeight;
      const moneyEquivalent = totalGoldWeight * goldRate;

      setCalculatedValues({
        netPureGold,
        wastageWeight,
        totalGoldWeight,
        moneyEquivalent,
      });
      setCalculated(true);
    },
  });

  // Reset Handler
  const handleReset = () => {
    formik.resetForm();
    setCalculatedValues(null);
    setCalculated(false);
  };

  return (
    <Container maxWidth="md" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 1.8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Wholesale Value Calculator
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* Input Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <TextField
              fullWidth
              type="number"
              id="weight"
              name="weight"
              label="Weight (grams)"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
            <TextField
              fullWidth
              type="number"
              id="purity"
              name="purity"
              label="Purity (%)"
              value={formik.values.purity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.purity && Boolean(formik.errors.purity)}
              helperText={formik.touched.purity && formik.errors.purity}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <TextField
              fullWidth
              type="number"
              id="wastage"
              name="wastage"
              label="Wastage (%)"
              value={formik.values.wastage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.wastage && Boolean(formik.errors.wastage)}
              helperText={formik.touched.wastage && formik.errors.wastage}
            />
            <TextField
              fullWidth
              type="number"
              id="goldRate"
              name="goldRate"
              label="Gold Rate (₹/gram)"
              value={formik.values.goldRate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.goldRate && Boolean(formik.errors.goldRate)}
              helperText={formik.touched.goldRate && formik.errors.goldRate}
            />
          </Box>

          {/* Buttons */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
          >
            <Button fullWidth type="submit" variant="contained" color="primary">
              Calculate
            </Button>
            <Button
              fullWidth
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>

        {/* Results Section */}
        {calculated && calculatedValues && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography variant="h6">Results:</Typography>
            <Typography>
              Net Pure Gold: {calculatedValues.netPureGold.toFixed(2)} g
            </Typography>
            <Typography>
              Wastage Weight: {calculatedValues.wastageWeight.toFixed(2)} g
            </Typography>
            <Typography>
              Total Gold (22K): {calculatedValues.totalGoldWeight.toFixed(2)} g
            </Typography>
            <Typography>
              Money Equivalent: ₹{calculatedValues.moneyEquivalent.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default WholesaleValueCalculator;
