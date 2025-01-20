import React from 'react';
import { Grid, Skeleton, styled } from '@mui/material';

const CenteredGrid = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledSkeleton = styled(Skeleton)({
  width: '100%',
  height: '120px',
  borderRadius: '8px',
});

const PostTypeSelectorSkeleton = () => {
  return (
    <CenteredGrid container spacing={1}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={6} key={index}>
          <StyledSkeleton variant="rectangular" animation="wave" />
        </Grid>
      ))}
    </CenteredGrid>
  );
};

export default PostTypeSelectorSkeleton;
