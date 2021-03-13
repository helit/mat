import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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

import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

import { Alert } from '@material-ui/lab';

import AddIcon from '@material-ui/icons/Add';
import KitchenIcon from '@material-ui/icons/Kitchen';

// Components
import { Form } from '../Form';
import TextInput from './TextInput';
import { AutoCompleteSelect } from './AutoCompleteSelect';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
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

interface Chip {
  key: number,
  label: string
}

interface Recipe {
  name: string,
  url: string,
  comment: string,
}

interface Ingredient {
  id: number,
  name: string,
  brand: string,
  category: string,
  subCategory: string,
  comment: string,
}

interface NewIngredient {
  key: number,
  label: string,
  ingredientId: number,
  recipeId: number,
  amount: number | string,
  unit: string
}

const newIngredientEmpty: NewIngredient = {
  key: null,
  label: '',
  ingredientId: null,
  recipeId: null,
  amount: '',
  unit: ''
};

const recipeEmpty: Recipe = {
  name: '',
  url: '',
  comment: '',
};

type NewRecipeModalProps = {
  title: string,
  buttonText: string,
  ingredients: {}
};

export default function NewRecipeModal({ title, buttonText, ingredients }: NewRecipeModalProps) {
  const classes = useStyles();
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<Recipe>(recipeEmpty);
  const [ingredient, setIngredient] = useState<Ingredient>(null);
  const [newIngredient, setNewIngredient] = useState<NewIngredient>(newIngredientEmpty);
  const [newIngredientList, setNewIngredientList] = useState<NewIngredient[]>([]);

  useEffect(() => {
    validateIngredientInputs();
  }, [newIngredient]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
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
    axios.post(`http://localhost:3000/api/recipes`, {
      name: recipe.name,
      url: recipe.url,
      comment: recipe.comment,
      ingredientList: newIngredientList
    })
    .then(function (response) {
      setRecipe(recipeEmpty);
      setSnackMsg('Sparade receptet ' + recipe.name + '!');
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
    if (id === 'ingredient') {
      value.id = value.id ? value.id : 0;
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
    <Box ml={3}>
      <Button
        onClick={handleModalOpen}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        {buttonText}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Paper className={classes.paper}>
            <Form title={title} type="ingredient">
              <Box display="flex" flexDirection="column">
                <TextInput
                  label={'Namn'}
                  fullWidth
                  required
                  id={'name'}
                  value={recipe.name}
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
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Spara
                </Button>
              </Box>
            </Form>
          </Paper>
        </Fade>
      </Modal>
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