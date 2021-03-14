import React from 'react';
import styled from 'styled-components';

// Material UI
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const StyledFormControl = styled(FormControl)`
  margin: 8px;
  min-width: 120px;
`;

interface optionsData {
  name: string,
  value: string
};

type SelectInputProps = {
  label: string,
  options: optionsData[],
  value: string,
  id: string,
  variant?: 'filled' | 'outlined' | 'standard',
  handleChange?: (v1: any, v2: string) => any
};

export default function SelectInput({ label, options, value, id, variant, handleChange }: SelectInputProps) {
  return (
    <StyledFormControl variant={variant ? variant : 'standard'}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        labelId="selectInput"
        value={value}
        onChange={(event) => handleChange(event.target.value, id)}
        variant={variant ? variant : 'standard'}
      >
        {options.map((option, key) => {
          return (
            <MenuItem key={key} value={option.value}>
              {option.name === 'None' ? <em>{option.name}</em> : option.name}
            </MenuItem>
          );
        })}
      </Select>
    </StyledFormControl>
  );
}