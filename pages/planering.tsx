import React from 'react';
import {
  Paper
} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // flexWrap: 'wrap',
      // justifyContent: 'space-around',
      overflow: 'hidden',
      // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 'auto',
    },
    paper: {
      height: '200px',
      width: '300px',
      margin: '10px',
    }
  }),
);

const tileData = [
  {
    key: 1,
    title: 'Måndag',
    cols: 1,
  },
  {
    key: 2,
    title: 'Tisdag',
    cols: 1,
  },
  {
    key: 3,
    title: 'Onsdag',
    cols: 1,
  },
  {
    key: 4,
    title: 'Torsdag',
    cols: 1,
  },
  {
    key: 5,
    title: 'Fredag',
    cols: 1,
  },
  {
    key: 6,
    title: 'Lördag',
    cols: 1,
  },
  {
    key: 7,
    title: 'Söndag',
    cols: 1,
  },
];

export default function Planering() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={'auto'} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.key} cols={tile.cols}>
            <Paper className={classes.paper}>{tile.title}</Paper>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}