import React, {  useState } from 'react';

import ECard from '../../components/e-card';
import Card from '../../components/card';
import Login from '../../components/login';
import Register from '../../components/register';

import classes from './style.module.css';

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const changeForm = () => {
    setIsLogin(!isLogin);
  }
  
  return <ECard className={'dark-purple'}>
    <h1 className={`${classes.title} no-select`}>Guess the Drawing</h1>
    <div className={classes.container}>
      {isLogin && <Login changeForm={changeForm} />}
      {!isLogin && <Register changeForm={changeForm}/>}
      <Card color='offwhite'>
        <img src='/brush.png' alt='A brush' className={classes.image}/>
      </Card>
    </div>
  </ECard>;    
  
};

export default Welcome;
