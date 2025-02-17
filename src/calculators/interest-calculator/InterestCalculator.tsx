import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  Container,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

const InterestCalculator = () => {
  const [interestResult, setInterestResult] = useState<number | null>(null);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      startDate: null as Date | null,
      endDate: null as Date | null,
      loanAmount: "",
      roi: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date()
        .required("End Date is required")
        .test(
          "is-greater",
          "End Date must be greater than Start Date",
          function (value) {
            const { startDate } = this.parent;
            return value && startDate && new Date(value) > new Date(startDate);
          }
        ),
      loanAmount: Yup.number()
        .required("Loan Amount is required")
        .positive("Loan Amount must be positive"),
      roi: Yup.number()
        .required("ROI is required")
        .positive("ROI must be positive"),
    }),
    onSubmit: (values) => {
      const { startDate, endDate, loanAmount, roi } = values;

      // Calculate the time difference in years
      const start = new Date(startDate!);
      const end = new Date(endDate!);
      const timeDiff = end.getTime() - start.getTime();
      const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365);

      // Calculate compound interest
      const compoundInterest =
        parseFloat(loanAmount) * Math.pow(1 + parseFloat(roi) / 100, yearsDiff) -
        parseFloat(loanAmount);

      setInterestResult(compoundInterest);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setInterestResult(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Interest Calculator
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <DatePicker
              label="Start Date"
              value={formik.values.startDate}
              onChange={(newValue) => formik.setFieldValue("startDate", newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(
                    formik.touched.startDate && formik.errors.startDate
                  ),
                  helperText:
                    formik.touched.startDate && formik.errors.startDate,
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={formik.values.endDate}
              onChange={(newValue) => formik.setFieldValue("endDate", newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(
                    formik.touched.endDate && formik.errors.endDate
                  ),
                  helperText: formik.touched.endDate && formik.errors.endDate,
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              id="loanAmount"
              name="loanAmount"
              label="Loan Amount"
              value={formik.values.loanAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.loanAmount && Boolean(formik.errors.loanAmount)
              }
              helperText={formik.touched.loanAmount && formik.errors.loanAmount}
            />
            <TextField
              fullWidth
              type="number"
              id="roi"
              name="roi"
              label="Rate of Interest (ROI)"
              value={formik.values.roi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.roi && Boolean(formik.errors.roi)}
              helperText={formik.touched.roi && formik.errors.roi}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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
          {interestResult !== null && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6">Compound Interest Result:</Typography>
              <Typography variant="body1">
                {interestResult.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default InterestCalculator;