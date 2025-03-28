import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Divider,
  Chip,
} from '@mui/material';

const ItemDetailsCard = () => {
  return (
    <Card
      sx={{
        overflow: 'hidden',
        boxShadow: 3,
        border: '2px solid',
        borderColor: 'rgb(153 246 228 / 1)',
        borderRadius: '0.5rem',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-5px)',
        },
      }}
    >
      {/* Header */}
      <CardHeader
        sx={{
          background: 'linear-gradient(135deg, #18A558, #35D07F)',
          paddingBottom: 2,
          textAlign: 'center',
        }}
        title={
          <Typography variant="h6" color="white">
            Item Details
          </Typography>
        }
      />

      <CardContent sx={{ textAlign: 'center', padding: 3 }}>
        {/* Item Type */}
        <Typography variant="body2" color="textSecondary">
          Item Type
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Gold Necklace
        </Typography>

        {/* Weight & Purity Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            backgroundColor: 'rgb(240 253 250 / 1)',
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Box>
            <Typography variant="body2" color="textSecondary">
              Weight
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              35.670 <span style={{ fontSize: '0.8rem' }}>gms</span>
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Box>
            <Typography variant="body2" color="textSecondary">
              Purity
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              91.6 <span style={{ fontSize: '0.8rem' }}>%</span>
            </Typography>
          </Box>
        </Box>

        {/* Making Charges */}
        <Box
          sx={{
            mt: 2,
            backgroundColor: 'rgb(240 253 250 / 1)',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Making Charges
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ₹ 3,500.00
          </Typography>
        </Box>

        {/* Hallmark Section */}
        <Box
          sx={{
            mt: 2,
            backgroundColor: '#17A864',
            borderRadius: 2,
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Hallmark
          </Typography>
          <Chip
            label="BIS 916"
            sx={{
              backgroundColor: 'rgb(240 253 250 / 1)',
              color: '#17A864',
              fontWeight: 'bold',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemDetailsCard;
