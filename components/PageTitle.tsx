import React from 'react';
import {
  Typography
} from '@material-ui/core';

type PageTitleProps = {
  text: string,
};

export const PageTitle = ({text}: PageTitleProps) => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
      {text}
      </Typography>
    </div>
  );
};