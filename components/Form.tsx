import React from 'react';

// Material UI
import {
  Box,
  Typography
} from '@material-ui/core';

type FormProps = {
  title: string,
  children?: React.ReactNode
};

export default function Form ({children, title}: FormProps) {
  return (
    <div>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </div>
  );
};