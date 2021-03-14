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

import Autocomplete from '@material-ui/lab/Autocomplete';

interface optionsData {
  id: number,
  name: string,
  brand: string,
  category: string,
  subCategory: string,
  comment: string,
}

type AutoCompleteSelectProps = {
  label: string,
  options: optionsData[],
  value: optionsData,
  id: string,
  variant?: 'filled' | 'outlined' | 'standard',
  handleChange?: (v1: any, v2: string) => any
};

export default function AutoCompleteSelect({ label, options, value, id, variant, handleChange }: AutoCompleteSelectProps) {
  return (
    <StyledFormControl variant={variant ? variant : 'standard'}>
      <Autocomplete
        id="auto-complete-select"
        options={options}
        onChange={(event, value) => handleChange(value, id)}
        value={value}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      />
    </StyledFormControl>
  );
}