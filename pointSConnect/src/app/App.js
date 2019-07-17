import React, { Component } from 'react';
import {
  Route,
  withRouter,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Login from '../views/Login';

import LoadingIndicator from '../components/LoadingIndicator';
import PrivateRoute from '../components/PrivateRoute';
import MainApp from './MainApp';


import { notification } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
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

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Polling App',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Polling App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading ) {
      return <LoadingIndicator />
    }
    return (
      <div className="app-container">
        <Switch> 
            <Route exact path="/login" 
              render={(props) => <Login authenticated={this.state.isAuthenticated} onLogin={this.handleLogin} {...props} />}></Route>
            <PrivateRoute loading={this.state.isLoading} authenticated={this.state.isAuthenticated} path="/" component={MainApp} currentUser={this.state.currentUser} handleLogout={this.handleLogout}></PrivateRoute>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);