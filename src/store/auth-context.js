import React, { useState } from 'react';
import api from '../services/api';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  username: '',
  storeUsername: (username) => {},
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = JSON.parse(localStorage.getItem('drawing-token'));
  const initialUsername = localStorage.getItem('drawing-username');
  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);

  const userIsLoggedIn = !!token;
  
  if (userIsLoggedIn) {
    console.log(`Bearer ${token}`)
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const loginHandler = (token) => {
    localStorage.setItem('drawing-token', JSON.stringify(token));
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setToken(token);
  }

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('drawing-token');
    localStorage.removeItem('drawing-username');
  }

  const usernameHandler = (username) => {
    localStorage.setItem('drawing-username', username);
    setUsername(username);
    console.log('--- ', username)
  };

  const contextValue = {
    token,
    isLoggedIn: !!token,
    username,
    login: loginHandler,
    logout: logoutHandler,
    storeUsername: usernameHandler
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;