import { useState } from 'react';
import { Slider, Typography, Box } from '@mui/material';

interface PercentageSliderProps {
  onPercentageChange: (value: number) => void; // Define the type for the onPercentageChange function
}

const PercentageSlider: React.FC<PercentageSliderProps> = ({ onPercentageChange }) => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    console.log('event ', event);
    const newValueNumber = Array.isArray(newValue) ? newValue[0] : newValue;
    setValue(newValueNumber);
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
          valueLabelDisplay="off" // This will show the value on the slider
        />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>{value}%</Typography>
      </Box>
    </Box>
  );
};

export default PercentageSlider;