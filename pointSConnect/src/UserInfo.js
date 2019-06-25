import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles({
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

export default function UserInfo(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
    <Grid container alignItems="center" >
      <Avatar className={classes.purpleAvatar} onClick={handleClick}>{props.currentUser.name[0].toUpperCase()}</Avatar>
      <Typography variant="button" display="block" >
        {props.currentUser.name}
      </Typography>
    </Grid>

    <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    keepMounted
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={props.handleClose} component={Link} to={`/users/${props.currentUser.username}`} >
      Profile
    </MenuItem>
    <MenuItem onClick={props.handleLogout} >Logout</MenuItem>
  </Menu>
  </div>
  );
}
