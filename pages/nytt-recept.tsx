import React from 'react';
import {
  Container,
  TextField,
  Box
} from '@material-ui/core';
import { Form } from '../components/Form';
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


