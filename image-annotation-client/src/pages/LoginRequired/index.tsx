import React from 'react';
import Login from '../Login';

const LoginRequired = ({
  loggedIn,
  children
}:{
  loggedIn: boolean,
  children: any
}) => {

  if (loggedIn){ return children }

  return <Login />
}

export default LoginRequired;