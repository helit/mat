import React from 'react';

// Material UI
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  Paper
} from '@material-ui/core';

import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

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
  }),
);

type AddButtonProps = {
  buttonText: any,
  children?: React.ReactNode
};

export default function AddButton ({buttonText, children}: AddButtonProps) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box ml={3}>
      <Button
        onClick={handleOpen}
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            {children}
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
}