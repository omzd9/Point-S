import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddOrderStepper from './AddOrderStepper'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  }
}));

export default function AddOrders() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h2" component="h1">
            Passer une commande
        </Typography>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center">
            <AddOrderStepper />
        </Grid>
      </Paper>
    </div>
  );
}