import React from 'react';
import {
  Container,
  Box,
  Grid
} from '@material-ui/core';
import Link from '../src/Link';
import { PageTitle } from '../components/PageTitle';
import { OverviewCard } from '../components/OverviewCard';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <PageTitle text="Matsedel"/>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={5}
        >
          <Grid item>
            <OverviewCard
              preTitle="Måndag"
              secondaryPreTitle="1 Mars 2021"
              title="Idag"
              comment="Den vanliga lasagnen vi brukar göra."
            />
          </Grid>
          <Grid item>
            <OverviewCard
              preTitle="2 Mars 2021"
              secondaryPreTitle="1 Mars 2021"
              title="Imorgon"
              comment="Pannkakor, ej veganska."
            />
          </Grid>
        </Grid>
        <Link href="/nytt-recept" color="primary">
          Lägg till nytt recept
        </Link>
      </Box>
    </Container>
  );
}