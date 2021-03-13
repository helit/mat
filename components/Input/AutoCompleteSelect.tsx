import React from 'react';

// Material UI
import {
  FormControl,
  TextField,
} from '@material-ui/core';

import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);
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

export default function AutoCompleteSelect ({label, options, value, id, variant, handleChange}: AutoCompleteSelectProps) {
  const classes = useStyles();

  return (
    <FormControl variant={variant ? variant : 'standard'} className={classes.formControl}>
      <Autocomplete
        id="auto-complete-select"
        options={options}
        onChange={(event, value) => handleChange(value, id)}
        value={value}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      />
    </FormControl>
  );
}