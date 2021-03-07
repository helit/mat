import React from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';

type FormProps = {
  title: string,
  type: string,
  children?: React.ReactNode
};

export const Form = ({children, title, type}: FormProps) => {
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