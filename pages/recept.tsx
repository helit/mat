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
import PageTitle from '../components/PageTitle';
import NewIngredientModal from '../components/Input/NewIngredientModal';
import NewRecipeModal from '../components/Input/NewRecipeModal';

Recept.getInitialProps = async () => {
  const recipieResp = await fetch('http://localhost:3000/api/recipes');
  const ingredientsResp = await fetch('http://localhost:3000/api/ingredients');
  const recipes = await recipieResp.json();
  const ingredients = await ingredientsResp.json();

  return {
    recipes: recipes,
    ingredients: ingredients
  };
}

export default function Recept({ recipes, ingredients }) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box my={4} display="flex" flexDirection="row-reverse">
          <NewIngredientModal title="Ny Ingrediens" buttonText="Ingrediens"/>
          <NewRecipeModal title="Nytt Recept" buttonText="Recept" ingredients={ingredients}/>
        </Box>
        <PageTitle text="Recept" />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Namn</TableCell>
                <TableCell>Url</TableCell>
                <TableCell>Kommentar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>{recipe.id}</TableCell>
                  <TableCell>{recipe.name}</TableCell>
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