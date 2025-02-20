import { Slider, Typography, Box } from '@mui/material';

interface PercentageSliderProps {
  value: number; 
  onPercentageChange: (value: number) => void;
}

const PercentageSlider: React.FC<PercentageSliderProps> = ({ value, onPercentageChange }) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newValueNumber = Array.isArray(newValue) ? newValue[0] : newValue;
    onPercentageChange(newValueNumber); // Call the parent function to pass the value
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h6">Choose loan Percentage</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Slider
          value={value}
          onChange={handleSliderChange}
          aria-labelledby="percentage-slider"
          min={0}
          max={100}
          valueLabelDisplay="off"
        />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>{value}%</Typography>
      </Box>
    </Box>
  );
};

export default PercentageSlider;