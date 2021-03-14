import React from 'react';
import styled from 'styled-components';

// Material UI
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@material-ui/core';

import MenuBookIcon from '@material-ui/icons/MenuBook';

const StyledCard = styled(Card)`
  min-width: 275px;
`;

const StyledTypography = styled(Typography)`
  font-size: 14px;
`;

type OverviewCardProps = {
  preTitle?: string,
  secondaryPreTitle?: string,
  title: string,
  comment?: string
};

export default function OverviewCard({ preTitle, secondaryPreTitle, title, comment }: OverviewCardProps) {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography color="textSecondary" gutterBottom>
            {preTitle}
          </StyledTypography>
          <StyledTypography color="textSecondary" gutterBottom>
            {secondaryPreTitle}
          </StyledTypography>
        </Box>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {comment}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary" aria-label="Link to recipe">
          <MenuBookIcon />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};