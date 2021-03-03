import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import {
  Container,
  Box,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PageTitle } from '../components/PageTitle';
import fetch from 'isomorphic-fetch';

export default function Ingredienser({list}) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box my={4} display="flex" flexDirection="row-reverse">
          <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}>
            Ny ingrediens
          </Button>
        </Box>
        <PageTitle text="Ingredienser"/>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Namn</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell>Underkategori</TableCell>
                <TableCell>Märke</TableCell>
                <TableCell>Kommentar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((list) => (
                <TableRow key={list.name}>
                  <TableCell component="th" scope="row">
                    {list.id}
                  </TableCell>
                  <TableCell>{list.name}</TableCell>
                  <TableCell>{list.category}</TableCell>
                  <TableCell>{list.subCategory}</TableCell>
                  <TableCell>{list.brand}</TableCell>
                  <TableCell>{list.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}

Ingredienser.getInitialProps = async () => {
  const resp = await fetch('http://localhost:3000/api/ingredients');
  const json = await resp.json();
  return {list: json};
}