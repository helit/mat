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

export default function Recept({list}) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box my={4} display="flex" flexDirection="row-reverse">
          <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}>
            Nytt recept
          </Button>
        </Box>
        <PageTitle text="Recept"/>
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
              {list.map((list) => (
                <TableRow key={list.name}>
                  <TableCell component="th" scope="row">
                    {list.id}
                  </TableCell>
                  <TableCell>{list.name}</TableCell>
                  <TableCell>
                    <a href={list.url}>länk</a>
                  </TableCell>
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

Recept.getInitialProps = async () => {
  const resp = await fetch('http://localhost:3000/api/recipes');
  const json = await resp.json();
  return {list: json};
}