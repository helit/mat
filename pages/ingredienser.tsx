import React from 'react';
import axios from 'axios';
import { host } from '../config';

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
  Box,
} from '@material-ui/core';

// Components
import NewIngredientModal from '../components/Input/NewIngredientModal';
import PageTitle from '../components/PageTitle';

export async function getStaticProps(context) {
  let ingredients = await axios.get(`${host}/api/ingredients`)
    .then(response => response.data.ingredientsData);

  if (!ingredients) {
    ingredients = []
  }

  return {
    props: {
      ingredients: ingredients
    }
  }
}

export default function Ingredienser({ ingredients }) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box my={4} display="flex" flexDirection="row-reverse">
          <NewIngredientModal title="Ny Ingrediens" buttonText="Ingrediens" />
        </Box>
        <PageTitle text="Ingredienser" />
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
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.id}</TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.category}</TableCell>
                  <TableCell>{ingredient.subCategory}</TableCell>
                  <TableCell>{ingredient.brand}</TableCell>
                  <TableCell>{ingredient.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}