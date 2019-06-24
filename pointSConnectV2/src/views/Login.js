import React, { Component } from 'react';
import { Redirect }from 'react-router-dom';
import { login } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import backgroundImage from '../assets/background_login.jpg'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: backgroundImage,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm(props) {
  const classes = useStyles();
        return (
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address or Username"
                    name="usernameOrEmail"
                    autoComplete="email"
                    onChange={props.onChange}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={props.onChange}
                    autoComplete="current-password"
                  />
                  <Grid container>
                    <Grid item xs>
                      <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me" />
                    </Grid>
                    
                    <Grid item>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={props.handleSubmit}
                  >
                    Sign In
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        );
}


class Login extends Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange= this.handleChange.bind(this);
      this.state = {
        username: "",
        password: "",
      }
  }
  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  handleSubmit(event) {
    const loginRequest =  {
      username: this.state.username,
      password: this.state.password
    };
    login(loginRequest)
    .then(response => {
        localStorage.setItem(ACCESS_TOKEN,response.accessToken);
        this.props.onLogin();
    }).catch(error => {
      
    });
          
  }

  render() {
    const {authenticated, ...props} = this.props;
        if(authenticated)
            return <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }} 
          /> 
      return (
          <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      );
  }
}

export default Login;