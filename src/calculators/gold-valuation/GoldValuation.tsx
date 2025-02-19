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

const GoldValuation = () => {
  const [goldValue, setGoldValue] = useState<number | null>(null);
  const [selectedPercentage, setSelectedPercentage] = useState<number>(0);

  const handlePercentageChange = (newPercentage: number) => {
    setSelectedPercentage(newPercentage);
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      grossWeight: "",
      netWeight: "",
      purity: "",
      metalRate: "",
      roi: "",
      loanAmount: "",
      loanDuration: "",
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
      const { netWeight, purity, metalRate, roi } = values;

      // Calculate gold value
      const pureGoldWeight = (parseFloat(netWeight) * (parseFloat(purity) / 100));
      const goldValueWithoutROI = pureGoldWeight * parseFloat(metalRate);
      const goldValueWithROI = goldValueWithoutROI * (1 + parseFloat(roi) / 100);

      setGoldValue(goldValueWithROI);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setGoldValue(null);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
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
            value={formik.values.roi}
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
            <PercentageSlider onPercentageChange={handlePercentageChange} />
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
        {goldValue !== null && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6">Gold Valuation Result:</Typography>
            <Typography variant="body1">
              {goldValue.toFixed(2)} (including ROI)
            </Typography>
            <Typography>{selectedPercentage}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default GoldValuation;