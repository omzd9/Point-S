import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from 'react-router-dom';


import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Login from '../views/Login.js';

import LoadingIndicator from '../components/LoadingIndicator';
import PrivateRoute from '../components/PrivateRoute';
import MainApp from './MainApp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);   
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/login", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
  
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
      <div className="app-container">
        <Switch> 
            <Route path="/login" 
              render={(props) => <Login authenticated={this.state.isAuthenticated} onLogin={this.handleLogin} {...props} />}></Route>
            <PrivateRoute authenticated={this.state.isAuthenticated} path="/" component={MainApp} handleLogout={this.handleLogout}></PrivateRoute>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
