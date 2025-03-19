import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const WithStepper = ({ activeStep, steps, children }) => {
  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {children}
    </Box>
  );
};

export default WithStepper; 