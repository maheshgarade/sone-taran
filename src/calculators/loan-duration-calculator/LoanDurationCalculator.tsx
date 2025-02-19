import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box, Typography, Container, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DurationResult } from '../../models/DurationResult';
import { calculateMonthsAndDays, calculateRoundedMonthsAndDays } from '../../utils/CountDaysUtil';

const LoanDurationCalculator = () => {
  const [actualDuration, setActualDuration] = useState<DurationResult | null>(null);
  const [roundOffDuration, setRoundOffDuration] = useState<DurationResult | null>(null);

  const formik = useFormik({
    initialValues: {
      startDate: null as Date | null,
      endDate: null as Date | null,
      waiveOneDayInterest: false,
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .required('End date is required')
        .test('is-greater', 'End date must be greater than start date', function (value) {
          const { startDate } = this.parent;
          return value && startDate && new Date(value) > new Date(startDate);
        }),
    }),
    onSubmit: (values) => {
      const { startDate, endDate, waiveOneDayInterest } = values;

      const roundedDuration: DurationResult = calculateRoundedMonthsAndDays(startDate, endDate, waiveOneDayInterest);
      const actualDuration: DurationResult = calculateMonthsAndDays(startDate, endDate);

      setRoundOffDuration(roundedDuration);
      setActualDuration(actualDuration);
    },
  });

  const handleReset = () => {
    formik.resetForm(); 
    setRoundOffDuration(null);
    setActualDuration(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
              Loan Duration
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <DatePicker
              label="Start Date"
              value={formik.values.startDate}
              onChange={(newValue) => formik.setFieldValue('startDate', newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                  error: Boolean(formik.touched.startDate && formik.errors.startDate),
                  helperText: formik.touched.startDate && formik.errors.startDate,
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={formik.values.endDate}
              onChange={(newValue) => formik.setFieldValue('endDate', newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                  error: Boolean(formik.touched.endDate && formik.errors.endDate),
                  helperText: formik.touched.endDate && formik.errors.endDate,
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.waiveOneDayInterest}
                  onChange={formik.handleChange}
                  name="waiveOneDayInterest"
                />
              }
              label="1 Day Interest Free"
            />
            {/* एक दिवसाचा व्याज माफ */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 2 }}>
              <Button fullWidth color="primary" variant="contained" type="submit">
                Calculate
              </Button>
              <Button fullWidth color="secondary" variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </Box>
          {actualDuration && (
            <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6">Actual Loan Duration:</Typography>
              <Typography variant="body1">
                {actualDuration.totalMonths} month{actualDuration.totalMonths > 1 ? 's' : null}
              </Typography>
              <Typography variant="body1">
                {actualDuration.days} day{actualDuration.days > 1 ? 's' : null}
              </Typography>
            </Box>
          )}
          {roundOffDuration && (
            <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6">Round Off Loan Duration:</Typography>
              <Typography variant="body1">
                {roundOffDuration.totalMonths} month{roundOffDuration.totalMonths > 1 ? 's' : null}
              </Typography>
              <Typography variant="body1">
                {roundOffDuration.days} day{roundOffDuration.days > 1 ? 's' : null}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default LoanDurationCalculator;