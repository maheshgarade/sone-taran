import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material';

const PaymentDetailsCard = () => {
  return (
    <Card
      sx={{
        overflow: 'hidden',
        boxShadow: 3,
        border: '2px solid',
        borderColor: '#FCD34D', // Amber-200 equivalent
        transition: 'all 0.3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardHeader
        sx={{
          background: 'linear-gradient(to right, #F59E0B, #FDE047)', // Amber-500 to Yellow-500 equivalent
          paddingBottom: 2,
          textAlign: 'center',
        }}
        title={
          <Typography variant="h6" color="white">
            Payment Details
          </Typography>
        }
      />
      <CardContent sx={{ padding: 3, backgroundColor: 'white' }}>
        <Box display="flex" flexDirection="column" gap={2}>
          {[
            { label: 'Gold 99.9', amount: '6,500.00' },
            { label: 'Gold 99.5', amount: '6,200.00' },
            { label: 'Cash', amount: '15,840.00' },
          ].map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={500} color="gray.700">
                {item.label}
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#FEF3C7', // Amber-100 equivalent
                  px: 2,
                  py: 0.5,
                  borderRadius: '999px',
                  color: '#B45309', // Amber-800 equivalent
                  fontWeight: 600,
                }}
              >
                &#8377; {item.amount}
              </Box>
            </Box>
          ))}
          <Box pt={3} mt={3} borderTop={1} borderColor="gray.200">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={700} color="gray.800">
                Total
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#F59E0B', // Amber-500 equivalent
                  px: 2,
                  py: 0.5,
                  borderRadius: '999px',
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                &#8377; 28,540.00
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentDetailsCard;
