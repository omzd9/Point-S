import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  
  
const PrivateRoute = ({ component: Component, loading, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        loading || authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);
  
export default PrivateRoute