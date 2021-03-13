import React from 'react';
import fetch from 'isomorphic-fetch';

// Material UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box
} from '@material-ui/core';

// Components
import NewIngredientModal from '../components/Input/NewIngredientModal';
import PageTitle from '../components/PageTitle';

Ingredienser.getInitialProps = async () => {
  const resp = await fetch('http://localhost:3000/api/ingredients');
  const json = await resp.json();
  return {list: json};
}

export default function Ingredienser({list}) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box my={4} display="flex" flexDirection="row-reverse">
          <NewIngredientModal title="Ny Ingrediens" buttonText="Ingrediens"/>
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
                <TableRow key={list.id}>
                  <TableCell>{list.id}</TableCell>
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