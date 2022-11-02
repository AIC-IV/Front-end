import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import ECard from '../../components/UI/ECard';
import Login from '../Login/Login';
import Register from '../Register/Register';

import classes from './Welcome.module.css';

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  }

  return (
    <ECard className={'dark-purple'}>
      <h1 className={`${classes.title} no-select`}>Guess the Drawing</h1>
      <div className={classes.container}>
        {isLogin && <Login changeForm={changeForm} />}
        {!isLogin && <Register changeForm={changeForm}/>}
        <Card color='offwhite'>
          <img src='/brush.png' alt='A brush' className={classes.image}/>
        </Card>
      </div>
      
      
        {/* <button className={classes.buttons} onClick={handleLogin}>
          Login
        </button>

        <button className={classes.buttons} onClick={handleRegister}>
          Cadastrar
        </button> */}
    </ECard>
  );
};

export default Welcome;
