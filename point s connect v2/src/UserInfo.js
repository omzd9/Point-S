import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

export default function LetterAvatars() {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Avatar className={classes.purpleAvatar}>YS</Avatar>
      <Typography variant="button" display="block" >
        Yassine Settai
      </Typography>
    </Grid>
  );
}