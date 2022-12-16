import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '../card';
import Button from '../button';
import classes from '../../styles/Form.module.css';
import GDInput from '../gd-input';

import sessionService from '../../services/session.service';
import userService from '../../services/user.service';

import AuthContext from '../../store/auth-context';

const Login = ({ changeForm }) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(false);


  const inputChangedHandler = (inputIdentifier, event) => {
    const enteredValue = event.target.value;
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  };


  const submitForm = async () => {

    if (!inputs.email || !inputs.password) {
      setError(true);
      return;
    }

    const formData = {
      email: inputs.email,
      password: inputs.password,
    };

    try {
      const { token } = await sessionService.login(
        formData.email,
        formData.password
      );
      
      authCtx.login(token);
      
      const response = await userService.whoami();
      const user = await userService.getUser(response.id);
      dispatch({ type: 'user', payload: user });
      
      authCtx.storeUsername(user.username);

      history.replace('/choose-room');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card color='white'>
      <h2 className={classes['form-title']}>Login</h2>

      <GDInput
        isValid={true}
        inputConfig={{
          placeholder: 'E-mail',
          onChange: inputChangedHandler.bind(this, 'email'),
        }}
      />
      <GDInput
        isValid={true}
        inputConfig={{
          placeholder: 'Password',
          type: 'password',
          onChange: inputChangedHandler.bind(this, 'password'),
        }}
      />

      <Button onClick={submitForm} type='secondary'>
        Login
      </Button>

      <span className={classes.spacer}></span>
      {error && (
        <span className={classes.error}>
          Verifique suas informações de login e tente novamente.
        </span>
      )}
      <span className={classes.spacer}></span>

      <p className={classes.footer}>
        Ou então{' '}
        <span onClick={changeForm} className={classes.highlight}>
          crie uma conta
        </span>
      </p>
    </Card>
  );
};

export default Login;
