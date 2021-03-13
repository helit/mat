import React from 'react';

// Material UI
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

export default function SelectInput({label, options, value, id, variant, handleChange}: SelectInputProps) {
  const classes = useStyles();

  return (
    <FormControl variant={variant ? variant : 'standard'} className={classes.formControl}>
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
    </FormControl>
  );
}