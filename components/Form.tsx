import React from 'react';
import {
  Box,
  Button
} from '@material-ui/core';

type FormProps = {
  children?: React.ReactNode
};

export const Form = ({children}: FormProps) => {
  return (
    <div>
      <Box>
        {children}
        <Box
          mt={2}
          display="flex"
          flexDirection="row-reverse"
        >
          <Button variant="contained" color="primary" >
            Spara
          </Button>
        </Box>
      </Box>
    </div>
  );
};