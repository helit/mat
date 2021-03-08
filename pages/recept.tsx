import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
  Button,
  IconButton,
  Chip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import KitchenIcon from '@material-ui/icons/Kitchen';
import fetch from 'isomorphic-fetch';

// Components
import { PageTitle } from '../components/PageTitle';
import { AddButton } from '../components/AddButton';
import { Form } from '../components/Form';
import { AutoCompleteSelect } from '../components/Input/AutoCompleteSelect';
import TextInput from '../components/Input/TextInput';
import NumberInput from '../components/Input/NumberInput';
import SelectInput from '../components/Input/SelectInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(2),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

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

interface Chip {
  key: number,
  label: string
}

interface Ingredient {
  id: number,
  name: string,
  brand: string,
  category: string,
  subCategory: string,
  comment: string,
}

interface NewRecipe {
  name: string,
  url: string,
  comment: string
}

interface NewIngredient {
  key: number,
  label: string,
  ingredientId: number,
  recipeId: number,
  amount: number | string,
  unit: string
}

const newRecipeEmpty: NewRecipe = {
  name: '',
  url: '',
  comment: ''
}

const newIngredientEmpty: NewIngredient = {
  key: null,
  label: '',
  ingredientId: null,
  recipeId: null,
  amount: '',
  unit: ''
};

export default function Recept({ recipes, ingredients }) {
  const classes = useStyles();
  const [newIngredient, setNewIngredient] = useState<NewIngredient>(newIngredientEmpty);
  const [newIngredientList, setNewIngredientList] = useState<NewIngredient[]>([]);
  const [newRecipe, setNewRecipe] = useState<NewRecipe>(newRecipeEmpty);
  const [ingredient, setIngredient] = useState<Ingredient>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    validateIngredientInputs();
  }, [newIngredient]);

  const handleSaveRecipe = async () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newRecipe.name,
          url: newRecipe.url,
          comment: newRecipe.comment,
          ingredientList: newIngredientList
        })
    };

    const response = await fetch('http://localhost:3000/api/recipes', requestOptions);
    const data = await response.json();
  };

  const updateRecipe = (value, id) => {
    setNewRecipe({
      ...newRecipe,
      [id]: value
    });
  }

  const updateIngredient = (value, id) => {
    if (id === 'ingredient') {
      setIngredient(value);
      setNewIngredient({
        ...newIngredient,
        key: value.id,
        label: value.name,
        ingredientId: value.id,
      });
    } else {
      setNewIngredient({
        ...newIngredient,
        [id]: value
      });
    }
  }

  const validateIngredientInputs = () => {
    if (
      newIngredient.ingredientId !== null &&
      newIngredient.amount > 0 &&
      newIngredient.unit !== ''
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleAddIngredient = () => {
    newIngredient.label += ', ' + newIngredient.amount + ' ' + newIngredient.unit;
    setNewIngredientList([...newIngredientList, newIngredient]);
    setNewIngredient(newIngredientEmpty);
    setIngredient(null);
    setButtonDisabled(true);
  };

  const handleDelete = (ingredientToDelete: NewIngredient) => () => {
    setNewIngredientList(
      (ingredients) => ingredients.filter(
        (ingredient) => ingredient.key !== ingredientToDelete.key
      )
    );
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box my={4} display="flex" flexDirection="row-reverse">
          <AddButton buttonText={'Nytt recept'}>
            <Form title="Nytt Recept" type="recipe">
              <Box display="flex" flexDirection="column">
                <TextInput
                  label={'Namn'}
                  fullWidth={true}
                  id={'name'}
                  value={newRecipe.name}
                  handleChange={updateRecipe.bind(this)} />
                <TextInput
                  label={'Länk'}
                  fullWidth={true}
                  id={'url'}
                  value={newRecipe.url}
                  handleChange={updateRecipe.bind(this)} />
                <TextInput
                  label={'Kommentar'}
                  fullWidth={true}
                  id={'comment'}
                  value={newRecipe.comment}
                  handleChange={updateRecipe.bind(this)} />
              </Box>
              <Box
                mt={4}
                display="flex"
              >
                <AutoCompleteSelect
                  label={'Ingrediens'}
                  options={ingredients}
                  id={'ingredient'}
                  value={ingredient}
                  handleChange={updateIngredient.bind(this)} />
                <NumberInput
                  label={'Mängd'}
                  fullWidth={false}
                  variant={'outlined'}
                  id={'amount'}
                  value={newIngredient.amount}
                  handleChange={updateIngredient.bind(this)} />
                <SelectInput
                  label={'Enhet'}
                  options={[
                    {name: 'None', value: ''},
                    {name: 'St', value: 'st'},
                    {name: 'Kilo', value: 'kg'},
                    {name: 'Gram', value: 'g'},
                    {name: 'Liter', value: 'l'},
                    {name: 'Deciliter', value: 'dl'},
                  ]}
                  variant={'outlined'}
                  id={'unit'}
                  value={newIngredient.unit}
                  handleChange={updateIngredient.bind(this)} />
                <Box
                  alignSelf="center"
                >
                  <IconButton
                    color="primary"
                    aria-label="add to ingredients"
                    disabled={buttonDisabled}
                    onClick={handleAddIngredient}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box>
                <Paper elevation={0} component="ul" className={classes.root}>
                  {newIngredientList.map((data) => {
                    return (
                      <li key={data.key}>
                        <Chip
                          icon={<KitchenIcon />}
                          variant="outlined"
                          label={data.label}
                          onDelete={handleDelete(data)}
                          className={classes.chip}
                        />
                      </li>
                    );
                  })}
                </Paper>
              </Box>
              <Box
                mt={2}
                display="flex"
                flexDirection="row-reverse"
              >
                <Button variant="contained" color="primary" onClick={handleSaveRecipe}>
                  Spara Recept
                </Button>
              </Box>
            </Form>
          </AddButton>
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
                <TableRow key={recipe.name}>
                  <TableCell component="th" scope="row">
                    {recipe.id}
                  </TableCell>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>
                    <a href={recipe.url}>länk</a>
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