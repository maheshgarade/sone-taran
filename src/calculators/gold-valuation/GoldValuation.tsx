import { useState } from "react";
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
import PercentageSlider from "../../shared/percentage-slider/PercentageSlider";
import { calculateMaxLoanTenure2 } from "../../utils/MaxLoanTenureUtil";

const GoldValuation = () => {
  // const [selectedPercentage, setSelectedPercentage] = useState<number>(0);
  const [metalValue, setMetalValue] = useState<number | null>(null);
  const [maxLoanTenure, setMaxLoanTenure] = useState<number>(0);

  const handlePercentageChange = (newPercentage: number) => {
    formik.setFieldValue('loanPercentage', newPercentage);
  
    // Calculate maxLoanTenure based on the current form values
    const { netWeight, purity, metalRate, roi } = formik.values;
  
    // Calculate gold value
    const pureGoldWeight = netWeight * purity / 100;
    const metalValue = pureGoldWeight * metalRate;
  
    // Calculate maxLoanTenure
    const calculatedMaxLoanTenure = calculateMaxLoanTenure2(
      Math.floor(metalValue * newPercentage / 100),
      pureGoldWeight * metalRate,
      roi * 12
    );
  
    // Update the state
    setMaxLoanTenure(calculatedMaxLoanTenure);
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      grossWeight: 0,
      netWeight: 0,
      purity: 0,
      metalRate: 0,
      roi: 0,
      loanAmount: 0,
      loanDuration: 0,
      loanPercentage: 0,
    },
    validationSchema: Yup.object({
      grossWeight: Yup.number()
        .required("Gross Weight is required")
        .positive("Gross Weight must be positive"),
      netWeight: Yup.number()
        .required("Net Weight is required")
        .positive("Net Weight must be positive")
        .test(
          "is-less-than-gross",
          "Net Weight must be less than or equal to Gross Weight",
          function (value) {
            const { grossWeight } = this.parent;
            return value <= grossWeight;
          }
        ),
      purity: Yup.number()
        .required("Purity is required")
        .min(0, "Purity must be greater than 0")
        .max(100, "Purity cannot exceed 100"),
      metalRate: Yup.number()
        .required("Gold Rate is required")
        .positive("Gold Rate must be positive"),
      roi: Yup.number()
        .required("ROI is required")
        .positive("ROI must be positive"),
    }),
    onSubmit: (values) => {
      const { netWeight, purity, metalRate, roi, loanAmount, loanDuration, loanPercentage } = values;

      // Calculate gold value
      const pureGoldWeight = netWeight * purity / 100;
      const metalValue = pureGoldWeight * metalRate;
      const maxLoanTenure = calculateMaxLoanTenure2(Math.floor(metalValue * loanPercentage / 100), pureGoldWeight * metalRate, roi * 12)

      setMetalValue(metalValue);
      setMaxLoanTenure(maxLoanTenure);
      console.log('maxLoanTenure ', maxLoanTenure)
      // console.log('pureGoldWeight ', pureGoldWeight)
      // console.log('metalValue ', metalValue)
      console.log('loanAmount ', loanAmount)
      console.log('loanDuration ', loanDuration)
      // console.log('roi ', roi)
      // console.log('loanPercentage ', loanPercentage);

    },
  });

  const handleReset = () => {
    formik.resetForm();
    setMetalValue(null);
    setMaxLoanTenure(0);
  };

  return (
    <Container maxWidth="md" sx={{pl: 0, pr: 0}}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 1.8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Gold Valuation
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <TextField
            fullWidth
            type="number"
            id="grossWeight"
            name="grossWeight"
            label="Gross Weight (grams)"
            value={formik.values.grossWeight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.grossWeight && Boolean(formik.errors.grossWeight)
            }
            helperText={formik.touched.grossWeight && formik.errors.grossWeight}
          />
          <TextField
            fullWidth
            type="number"
            id="netWeight"
            name="netWeight"
            label="Net Weight (grams)"
            value={formik.values.netWeight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.netWeight && Boolean(formik.errors.netWeight)}
            helperText={formik.touched.netWeight && formik.errors.netWeight}
          />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
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
          <TextField
            fullWidth
            type="number"
            id="metalRate"
            name="metalRate"
            label="Metal Rate (per gram)"
            value={formik.values.metalRate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.metalRate && Boolean(formik.errors.metalRate)}
            helperText={formik.touched.metalRate && formik.errors.metalRate}
          />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
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
          <TextField
            fullWidth
            type="number"
            id="loanAmount"
            name="loanAmount"
            label="Loan Amount"
            value={formik.values.loanAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
            helperText={formik.touched.loanAmount && formik.errors.loanAmount}
          />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <TextField
            fullWidth
            type="number"
            id="loanDuration"
            name="loanDuration"
            label="Loan Duration"
            value={formik.values.loanDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.loanDuration && Boolean(formik.errors.loanDuration)}
            helperText={formik.touched.loanDuration && formik.errors.loanDuration}
          />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <PercentageSlider 
              value={formik.values.loanPercentage}
              onPercentageChange={handlePercentageChange} 
            />
          </Box>
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
        {metalValue && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6">Loan Eligibility:</Typography>
            <Typography>Item Value:{metalValue}</Typography>
            <Typography>Loan Amount {formik.values.loanPercentage}%:{Math.floor(metalValue * formik.values.loanPercentage / 100)}</Typography>
            <Typography>Loan Duration:{maxLoanTenure}</Typography>
          </Box>
        )}
        {metalValue && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6">Customer Requirement:</Typography>
            <Typography>Loan Amount:{formik.values.loanAmount}</Typography>
            <Typography>Amount in percentage:{(formik.values.loanAmount / metalValue * 100).toFixed(2)}</Typography>
            <Typography>Loan Duration:{formik.values.loanDuration}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default GoldValuation;