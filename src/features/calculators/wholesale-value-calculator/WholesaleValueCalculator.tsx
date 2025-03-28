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
  wastageWeight: number;
  netPureGold99_9: number;
  netPureGold99_5: number;
  cashEquivalent99_5: number;
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
      goldRate99_5: '',
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
      goldRate99_5: Yup.number()
        .required('Gold rate (99.5%) is required')
        .positive('Gold rate must be positive'),
    }),
    onSubmit: (values) => {
      const weight = Number(values.weight);
      const purity = Number(values.purity);
      const wastage = Number(values.wastage);
      const goldRate99_5 = Number(values.goldRate99_5);

      // Step 1: Calculate net pure gold based on purity
      const netPureGold = (weight * purity) / 100;

      // Step 2: Calculate total weight (22K 99.9%) with wastage
      const netPureGold99_9 = netPureGold + (weight * wastage) / 100;

      // Step 3: Calculate wastage weight
      const wastageWeight = weight - netPureGold99_9;

      // Step 4: Calculate total weight (22K 99.5%)
      const netPureGold99_5 = (netPureGold99_9 * 99.5) / 99.9;

      // Step 5: Calculate cash payment (22K 99.5%)
      const cashEquivalent99_5 = netPureGold99_5 * goldRate99_5;

      // Save calculated values
      setCalculatedValues({
        wastageWeight: parseFloat(wastageWeight.toFixed(3)), // Preserve precision
        netPureGold99_9: parseFloat(netPureGold99_9.toFixed(3)),
        netPureGold99_5: parseFloat(netPureGold99_5.toFixed(3)),
        cashEquivalent99_5: parseFloat(cashEquivalent99_5.toFixed(2)),
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
                id="weight"
                name="weight"
                label="Weight (grams)"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
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
              {formik.values.purity && (
                <Typography
                  sx={{ mt: 1 }}
                  variant="body2"
                  color="text.secondary"
                >
                  {`${(parseFloat(formik.values.purity) - 0.4).toFixed(
                    1
                  )}% + 0.4% = ${formik.values.purity}%`}
                </Typography>
              )}
            </Box>
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
              id="goldRate99_5"
              name="goldRate99_5"
              label="Gold Rate (₹/gram for 99.5%)"
              value={formik.values.goldRate99_5}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.goldRate99_5 &&
                Boolean(formik.errors.goldRate99_5)
              }
              helperText={
                formik.touched.goldRate99_5 && formik.errors.goldRate99_5
              }
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
              Wastage Weight: {calculatedValues.wastageWeight.toFixed(2)} gms
            </Typography>
            <Typography>
              Total Payment in 22K (99.9%):{' '}
              {calculatedValues.netPureGold99_9.toFixed(3)} gms
            </Typography>
            <Typography>
              Total Payment in 22K (99.5%):{' '}
              {calculatedValues.netPureGold99_5.toFixed(3)} gms
            </Typography>
            <Typography>
              Cash Payment for 22K (99.5%): ₹
              {calculatedValues.cashEquivalent99_5.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default WholesaleValueCalculator;
