import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import MainGame from './screens/MainGame/MainGame';
import Welcome from './screens/Welcome/Welcome';
import AuthContext from './store/auth-context';

const App = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);
  
  if (!authCtx.isLoggedIn) {
    return (
      <div>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/welcome' />
          </Route>
          <Route path='/welcome'>
            <Welcome />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/main-game' />
        </Route>
        <Route path='/main-game'>
          <MainGame />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
