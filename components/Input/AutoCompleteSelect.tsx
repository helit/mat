import React from 'react';
import styled from 'styled-components';
import { Ingredient } from '../../models';

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

type AutoCompleteSelectProps = {
  label: string,
  options: Ingredient[],
  value: Ingredient,
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
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      />
    </StyledFormControl>
  );
}