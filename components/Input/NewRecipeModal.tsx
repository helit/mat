import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

// Models
import { Ingredient, Recipe, RecipeIngredient } from '../../models';

// Helpers
import { stringToSlug, getChipLabel } from '../../helpers';

// Material UI
import {
  Box,
  Button,
  Fade,
  Backdrop,
  Modal,
  Snackbar,
  Paper,
  IconButton,
  Chip
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import AddIcon from '@material-ui/icons/Add';
import KitchenIcon from '@material-ui/icons/Kitchen';

// Components
import Form from '../Form';
import TextInput from './TextInput';
import AutoCompleteSelect from './AutoCompleteSelect';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModalPaper = styled(Paper)`
  max-width: 800px;
  padding: 16px 32px 24px;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%),
    0px 1px 14px 0px rgb(0 0 0 / 12%);
`;

const StyledChipWrapper = styled(Paper)`
  margin: 0;
  display: flex;
  padding: 16px;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
`;

const StyledChip = styled(Chip)`
  margin: 4px;
`;

interface Chip {
  key: string,
  label: string
}

const recipeIngredienEmpty: RecipeIngredient = {
  ingredient: null,
  amount: '',
  unit: ''
};

const recipeEmpty: Recipe = {
  title: '',
  slug: '',
  url: '',
  comment: '',
  ingredients: []
};

type NewRecipeModalProps = {
  title: string,
  buttonText: string,
  ingredients: []
};

export default function NewRecipeModal({ title, buttonText, ingredients }: NewRecipeModalProps) {
  const router = useRouter();

  const [
    modalOpen,
    setModalOpen
  ] = useState(false);
  const [
    snackbarOpen,
    setSnackbarOpen
  ] = useState(false);
  const [
    snackMsg,
    setSnackMsg
  ] = useState('');
  const [
    alertSeverity,
    setAlertSeverity
  ] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const [
    buttonDisabled,
    setButtonDisabled
  ] = useState<boolean>(true);
  const [
    recipe,
    setRecipe
  ] = useState<Recipe>(recipeEmpty);
  const [
    ingredient,
    setIngredient
  ] = useState<Ingredient>(null);
  const [
    newRecipeIngredient,
    setNewRecipeIngredient
  ] = useState<RecipeIngredient>(recipeIngredienEmpty);
  const [
    newRecipeIngredients,
    setNewRecipeIngredients
  ] = useState<RecipeIngredient[]>([]);

  useEffect(() => {
    validateIngredientInputs();
  }, [newRecipeIngredient]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const updateRecipe = (value, id) => {
    setRecipe({
      ...recipe,
      [id]: value
    });
  }

  const handleSave = () => {
    axios.post('/api/recipes', {
      title: recipe.title,
      slug: stringToSlug(recipe.title),
      url: recipe.url,
      comment: recipe.comment,
      ingredients: newRecipeIngredients
    })
      .then(function (response) {
        setRecipe(recipeEmpty);
        setSnackMsg('Sparade receptet ' + recipe.title + '!');
        setAlertSeverity('success');
        setSnackbarOpen(true);
        setModalOpen(false);
        router.push(router.pathname);
      })
      .catch(function (error) {
        console.log(error);
        setSnackMsg('Kunde inte spara!');
        setAlertSeverity('error');
        setSnackbarOpen(true);
      });
  }

  const updateIngredient = (value, id) => {
    console.log(value);
    if (id === 'ingredient') {
      setIngredient(value);
      setNewRecipeIngredient({
        ...newRecipeIngredient,
        ingredient: value
      });
    } else {
      setNewRecipeIngredient({
        ...newRecipeIngredient,
        [id]: value
      });
    }
  }

  const validateIngredientInputs = () => {
    if (
      newRecipeIngredient.ingredient !== null &&
      newRecipeIngredient.amount > 0 &&
      newRecipeIngredient.unit !== ''
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleAddIngredient = () => {
    setNewRecipeIngredients([...newRecipeIngredients, newRecipeIngredient]);
    setNewRecipeIngredient(recipeIngredienEmpty);
    setIngredient(null);
    setButtonDisabled(true);
  };

  const handleDelete = (ingredientToDelete: RecipeIngredient) => () => {
    setNewRecipeIngredients(
      (ingredients) => ingredients.filter(
        (ingredient) => ingredient.ingredient.id !== ingredientToDelete.ingredient.id
      )
    );
  };

  return (
    <Box ml={3}>
      <Button
        onClick={handleModalOpen}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        {buttonText}
      </Button>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <StyledModalPaper>
            <Form title={title}>
              <Box display="flex" flexDirection="column">
                <TextInput
                  label={'Titel'}
                  fullWidth
                  required
                  id={'title'}
                  value={recipe.title}
                  handleChange={updateRecipe.bind(this)} />
                <TextInput
                  label={'Receptlänk'}
                  fullWidth
                  id={'url'}
                  value={recipe.url}
                  handleChange={updateRecipe.bind(this)} />
                <TextInput
                  label={'Kommentar'}
                  fullWidth
                  id={'comment'}
                  value={recipe.comment}
                  handleChange={updateRecipe.bind(this)} />
              </Box>
              <Box
                mt={2}
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
                  value={newRecipeIngredient.amount}
                  handleChange={updateIngredient.bind(this)} />
                <SelectInput
                  label={'Enhet'}
                  options={[
                    { name: 'None', value: '' },
                    { name: 'St', value: 'st' },
                    { name: 'Kilo', value: 'kg' },
                    { name: 'Gram', value: 'g' },
                    { name: 'Liter', value: 'l' },
                    { name: 'Deciliter', value: 'dl' },
                    { name: 'Matsked', value: 'msk' },
                    { name: 'Tesked', value: 'tsk' },
                    { name: 'Kryddmått', value: 'krm' },
                    { name: 'Klyfta', value: 'klyfta' },
                  ]}
                  variant={'outlined'}
                  id={'unit'}
                  value={newRecipeIngredient.unit}
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
                <StyledChipWrapper elevation={0} component="ul">
                  {newRecipeIngredients.map((recipeIngredient) => {
                    return (
                      <li key={recipeIngredient.ingredient.id}>
                        <StyledChip
                          icon={<KitchenIcon />}
                          color="primary"
                          variant="outlined"
                          label={getChipLabel(recipeIngredient)}
                          onDelete={handleDelete(recipeIngredient)}
                        />
                      </li>
                    );
                  })}
                </StyledChipWrapper>
              </Box>
              <Box
                mt={2}
                display="flex"
                flexDirection="row-reverse"
              >
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Spara
                </Button>
              </Box>
            </Form>
          </StyledModalPaper>
        </Fade>
      </StyledModal>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={alertSeverity}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}