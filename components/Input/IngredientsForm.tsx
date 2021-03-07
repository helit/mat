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
import Autocomplete from '@material-ui/lab/Autocomplete';

interface AutoCompleteOptions {
  id: number,
  name: string,
  brand: string,
  category: string,
  subCategory: string,
  comment: string,
}

type IngredientsFormProps = {
  label: string,
  options: optionsData[],
  value: optionsData,
  variant?: 'filled' | 'outlined' | 'standard',
  handleChange?: (v: any) => any
};

export const AutoCompleteSelect = ({}: IngredientsFormProps) => {
  const classes = useStyles();

  return (

  );
}