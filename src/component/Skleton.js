import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonUI({count}) {
    const slides = new Array(count).fill(0);

  return (
    <Grid container wrap="nowrap">
       { slides.map(()=> (
        <Box sx={{ width: 272, marginRight: 1, my: 5 }}>
            <Skeleton variant="rounded" width={272} height={200} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </Box>
        ))}
    </Grid>
  );
}
