import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
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
  Color
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import AddIcon from '@material-ui/icons/Add';

// Components
import Form from '../Form';
import TextInput from './TextInput';

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

interface Ingredient {
  name: string,
  category: string,
  subCategory: string,
  brand: string,
  comment: string,
}

const ingredientEmpty: Ingredient = {
  name: '',
  category: '',
  subCategory: '',
  brand: '',
  comment: ''
};

type NewIngredientModalProps = {
  title: string,
  buttonText: string,
};

export default function NewIngredientModal({ title, buttonText }: NewIngredientModalProps) {
  const theme = useTheme();
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const [ingredient, setIngredient] = useState<Ingredient>(ingredientEmpty)

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

  const updateIngredient = (value, id) => {
    setIngredient({
      ...ingredient,
      [id]: value
    });
  }

  const handleSave = () => {
    axios.post('/api/ingredients', {
      name: ingredient.name,
      category: ingredient.category,
      subCategory: ingredient.subCategory,
      brand: ingredient.brand,
      comment: ingredient.comment
    })
      .then(function (response) {
        setIngredient(ingredientEmpty);
        setSnackMsg('Sparade ingrediensen ' + ingredient.name + '!');
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
                  label={'Namn'}
                  fullWidth
                  required
                  value={ingredient.name}
                  id={'name'}
                  handleChange={updateIngredient.bind(this)} />
                <TextInput
                  label={'Kategori'}
                  fullWidth
                  required
                  value={ingredient.category}
                  id={'category'}
                  handleChange={updateIngredient.bind(this)} />
                <TextInput
                  label={'Underkategori'}
                  fullWidth
                  value={ingredient.subCategory}
                  id={'subCategory'}
                  handleChange={updateIngredient.bind(this)} />
                <TextInput
                  label={'Märke'}
                  fullWidth={true}
                  value={ingredient.brand}
                  id={'brand'}
                  handleChange={updateIngredient.bind(this)} />
                <TextInput
                  label={'Kommentar'}
                  fullWidth={true}
                  value={ingredient.comment}
                  id={'comment'}
                  handleChange={updateIngredient.bind(this)} />
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