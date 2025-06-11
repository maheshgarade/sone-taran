import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const KalamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state: data } = useLocation() as { state: any };

  if (!data) return <Typography>Loading…</Typography>;

  /** Helper to render a label–value row */
  const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Grid container spacing={1}>
      <Grid item xs={5} sm={4} md={3}>
        <Typography fontWeight={600}>{label}</Typography>
      </Grid>
      <Grid item xs={7} sm={8} md={9}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );

  /** Section wrapper */
  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <Box mb={4}>
      <Typography variant="h5" mb={2}>
        {title}
      </Typography>
      <Stack spacing={1}>{children}</Stack>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" mb={4}>
          Customer ID: {id}
        </Typography>

        {/* Kalam details */}
        <Section title="Customer Details">
          <Row label="Name:" value={data.customer.name} />
          <Row label="Contact:" value={data.customer.contact?.[0] ?? '—'} />
          <Row
            label="Address:"
            value={
              <>
                {data.customer.address.street},&nbsp;
                {data.customer.address.city},&nbsp;
                {data.customer.address.zip}
              </>
            }
          />
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="Loan Details">
          {/* Loan  Details*/}
          {data.LoanDetails.map((loan: any) => {
            console.log(loan);
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    Loan {loan.loans.loanId}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Section title="Item Detail">
                    <Row label="Item name:" value={loan.loans.details.name} />
                    <Row
                      label="Material type:"
                      value={loan.loans.details.materialType}
                    />
                    <Row
                      label="Net weight:"
                      value={loan.loans.details.netWeight}
                    />
                    <Row
                      label="Gross weight:"
                      value={loan.loans.details.grossWeight}
                    />
                    <Row label="Purity:" value={loan.loans.details.purity} />
                    <Row
                      label="Gold rate(At the time of loan):"
                      value={loan.loans.details.goldRateAtLoan}
                    />
                  </Section>
                  <Section title="Loan Detail">
                    <Row
                      label="Loan start date:"
                      value={loan.loans.loanDetails.loanStartDate}
                    />
                    <Row
                      label="Loan amount:"
                      value={loan.loans.loanDetails.customerAmt}
                    />
                    <Row
                      label="Loan ROI:"
                      value={loan.loans.loanDetails.customerROI}
                    />
                  </Section>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Section>
      </Paper>
    </Box>
  );
};

export default KalamDetails;
