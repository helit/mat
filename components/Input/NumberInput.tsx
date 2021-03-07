import React, { useState } from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
  FormControl,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

type TextInputProps = {
  label: string,
  fullWidth: boolean,
  value: string | number,
  id: string,
  variant?: 'filled' | 'outlined' | 'standard',
  handleChange?: (v1: any, v2: string) => any
};

export default function TextInput({label, fullWidth, value, id, variant, handleChange}: TextInputProps) {
  const classes = useStyles();

  return (
    <FormControl variant={variant ? variant : 'standard'} className={classes.formControl}>
      <TextField
        label={label}
        fullWidth={fullWidth}
        value={value}
        onChange={(event) => handleChange(event.target.value, id)}
        variant={variant ? variant : 'standard'}/>
    </FormControl>
  );
}