import React from 'react';

// Material UI
import {
  Typography
} from '@material-ui/core';

type PageTitleProps = {
  text: string,
};

export default function PageTitle ({text}: PageTitleProps) {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        {text}
      </Typography>
    </div>
  );
};