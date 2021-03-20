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
  Box
} from '@material-ui/core';

// Components
import PageTitle from '../components/PageTitle';
import NewIngredientModal from '../components/Input/NewIngredientModal';
import NewRecipeModal from '../components/Input/NewRecipeModal';

export async function getServerSideProps(context) {
  let recipes = await axios.get(`${host}/api/recipes`)
    .then(response => response.data.recipesData);
  let ingredients = await axios.get(`${host}/api/ingredients`)
    .then(response => response.data.ingredientsData);

  if (!recipes) {
    recipes = [];
  }

  if (!ingredients) {
    ingredients = [];
  }

  return {
    props: {
      recipes: recipes,
      ingredients: ingredients
    }
  }
}

export default function Recept({ recipes, ingredients }) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box my={4} display="flex" flexDirection="row-reverse">
          <NewIngredientModal title="Ny Ingrediens" buttonText="Ingrediens" />
          <NewRecipeModal title="Nytt Recept" buttonText="Recept" ingredients={ingredients} />
        </Box>
        <PageTitle text="Recept" />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titel</TableCell>
                <TableCell>Url</TableCell>
                <TableCell>Kommentar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>{recipe.title}</TableCell>
                  <TableCell>
                    <a href={recipe.url}>Recept</a>
                  </TableCell>
                  <TableCell>{recipe.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}