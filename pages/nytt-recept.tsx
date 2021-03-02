import React from 'react';
import Container from '@material-ui/core/Container';
import {
  Button,
  TextField,
  Box
} from '@material-ui/core';
import Link from '../src/Link';
import { Form } from '../components/form';
import { PageTitle } from '../components/PageTitle';

export default function NyttRecept() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <PageTitle text="Nytt Recept"/>
        <Form>
          <TextField id="standard-basic" label="Namn" fullWidth margin="normal" />
          <TextField id="standard-basic" label="Länk" fullWidth margin="normal" />
          <TextField id="standard-basic" label="Ingrediens" fullWidth margin="normal" />
        </Form>
      </Box>
    </Container>
  )
}
