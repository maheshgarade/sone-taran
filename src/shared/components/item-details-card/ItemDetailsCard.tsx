import { Card, CardContent, CardHeader } from '@mui/material';
import { Box, Typography, Divider, Paper } from '@mui/material';

const ItemDetailsCard = () => {
  return (
    <Card
      sx={{
        overflow: 'hidden',
        boxShadow: 3,
        border: 2,
        borderColor: 'teal.200',
        transition: '0.3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardHeader
        sx={{
          background: 'linear-gradient(to right, #14B8A6, #10B981)',
          pb: 2,
        }}
      >
        <CardHeader>
          <Typography variant="h6" align="center" color="white">
            Item Details
          </Typography>
        </CardHeader>
      </CardHeader>
      <CardContent sx={{ p: 3, bgcolor: 'white' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="caption" color="gray">
            Item Type
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="gray.800">
            Gold Necklace
          </Typography>
        </Box>

        <Paper sx={{ p: 2, bgcolor: 'teal.50', borderRadius: 2, mb: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box textAlign="center" flex={1}>
              <Typography variant="caption" color="teal.700">
                Weight
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="teal.900">
                35.670
              </Typography>
              <Typography variant="caption" color="teal.700">
                gms
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, bgcolor: 'teal.200' }}
            />
            <Box textAlign="center" flex={1}>
              <Typography variant="caption" color="teal.700">
                Purity
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="teal.900">
                91.6
              </Typography>
              <Typography variant="caption" color="teal.700">
                %
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: 'teal.50', borderRadius: 2, mb: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontWeight="medium" color="teal.800">
              Making Charges
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="teal.900">
              ₹ 3,500.00
            </Typography>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(to right, #14B8A6, #10B981)',
            color: 'white',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight="medium">Hallmark</Typography>
            <Box
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              <Typography fontWeight="semibold">BIS 916</Typography>
            </Box>
          </Box>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default ItemDetailsCard;
