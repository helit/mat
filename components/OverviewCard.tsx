import React from 'react';

// Material UI
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  preTitle: {
    fontSize: 14,
  }
});

type OverviewCardProps = {
  preTitle?: string,
  secondaryPreTitle?: string,
  title: string,
  comment?: string
};

export default function OverviewCard ({preTitle, secondaryPreTitle, title, comment}: OverviewCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.preTitle} color="textSecondary" gutterBottom>
            {preTitle}
          </Typography>
          <Typography className={classes.preTitle} color="textSecondary" gutterBottom>
            {secondaryPreTitle}
          </Typography>
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
    </Card>
  );
};