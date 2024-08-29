import React from 'react';
import { Box, Stepper, Step, Typography, Grid, StepIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom Step Icon to use a Dot
const DotStepIcon = styled(StepIcon)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
}));

const VerticalStepperWithTypography = ({ restaurantDetails }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stepper orientation="vertical" activeStep={1}>
            {[1, 2].map((step, index) => (
              <Step key={index}>
                <DotStepIcon />
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          {[1, 2].map((step, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body1" style={{ marginBottom: '16px' }}>
                {index === 0
                  ? `Outlet ${restaurantDetails?.locality}`
                  : restaurantDetails?.sla.slaString}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VerticalStepperWithTypography;
