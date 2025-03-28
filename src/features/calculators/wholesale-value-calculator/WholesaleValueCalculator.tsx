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
import PaymentDetailsCard from '../../../shared/components/payment-details-card/PaymentDetailsCard';
import WastageDetailsCard from '../../../shared/components/wastage-details-card/WastageDetailsCard';
import ItemDetailsCard from '../../../shared/components/item-details-card/ItemDetailsCard';

interface CalculatedValues {
  itemWeight: number;
  wastageWeight: number;
  netPureGold99_9: number;
  netPureGold99_5: number;
  cashEquivalent99_5: number;
  goldRate99_5: number;
  purity: number;
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
      const totalPurity = Number(values.purity);
      const purity = Number(values.purity) - 0.4;
      const wastage = Number(values.wastage);
      const goldRate99_5 = Number(values.goldRate99_5);

      // Step 1: Calculate net pure gold based on purity
      const netPureGold = (weight * totalPurity) / 100;

      // Step 2: Calculate total weight (22K 99.9%) with wastage
      const netPureGold99_9 = netPureGold + (weight * wastage) / 100;

      const diffBtwn22K = (netPureGold99_9 * 0.5) / 100;

      // Step 4: Calculate total weight (22K 99.5%)
      const netPureGold99_5 = netPureGold99_9 + diffBtwn22K;

      // Step 3: Calculate wastage weight
      const wastageWeight = weight - netPureGold99_5;

      // Step 5: Calculate cash payment (22K 99.5%)
      const cashEquivalent99_5 = netPureGold99_5 * goldRate99_5;

      // Save calculated values
      setCalculatedValues({
        itemWeight: weight,
        wastageWeight: parseFloat(wastageWeight.toFixed(3)), // Preserve precision
        netPureGold99_9: parseFloat(netPureGold99_9.toFixed(3)),
        netPureGold99_5: parseFloat(netPureGold99_5.toFixed(3)),
        cashEquivalent99_5: parseFloat(cashEquivalent99_5.toFixed(2)),
        goldRate99_5: goldRate99_5,
        purity: purity,
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
    <>
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
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
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
        </Paper>
      </Container>
      <Box sx={{ maxWidth: '80%', margin: 'auto' }}>
        {/* Results Section */}
        {calculated && calculatedValues && (
          <Box sx={{ marginTop: '1rem' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 2, md: 3 },
              }}
            >
              <PaymentDetailsCard
                netPureGold99_9={calculatedValues.netPureGold99_9}
                netPureGold99_5={calculatedValues.netPureGold99_5}
                cashEquivalent99_5={Number(
                  calculatedValues.cashEquivalent99_5.toFixed(0)
                )}
              />
              <WastageDetailsCard
                wastageWeight={calculatedValues.wastageWeight}
                goldRate99_5={calculatedValues.goldRate99_5}
                itemWeight={calculatedValues.itemWeight}
              />
              <ItemDetailsCard
                itemWeight={calculatedValues.itemWeight}
                purity={calculatedValues.purity}
                netPureGold99_5={calculatedValues.netPureGold99_5}
                cashEquivalent99_5={Number(
                  calculatedValues.cashEquivalent99_5.toFixed(0)
                )}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default WholesaleValueCalculator;
