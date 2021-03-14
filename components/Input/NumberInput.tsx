import React from 'react';
import styled from 'styled-components';

// Material UI
import {
  FormControl,
  TextField,
} from '@material-ui/core';

const StyledFormControl = styled(FormControl)`
  margin: 8px;
  min-width: 120px;
`;

type TextInputProps = {
  label: string,
  fullWidth: boolean,
  value: string | number,
  id: string,
  variant?: 'filled' | 'outlined' | 'standard',
  handleChange?: (v1: any, v2: string) => any
};

export default function TextInput({ label, fullWidth, value, id, variant, handleChange }: TextInputProps) {
  return (
    <StyledFormControl variant={variant ? variant : 'standard'}>
      <TextField
        label={label}
        fullWidth={fullWidth}
        value={value}
        onChange={(event) => handleChange(event.target.value, id)}
        variant={variant ? variant : 'standard'} />
    </StyledFormControl>
  );
}