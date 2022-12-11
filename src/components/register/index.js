import React, { useState } from 'react';

import Button from '../../components/button';
import Card from '../../components/card';
import GDInput from '../../components/gd-input';

import userService from '../../services/user.service';

import classes from '../../styles/Form.module.css';

const Register = ({ changeForm }) => {
  const [inputs, setInputs] = useState({
    email: { value: '', isValid: true },
    username: { value: '', isValid: true },
    password: { value: '', isValid: true },
    password2: { value: '', isValid: true },
  });

  const [usernameErrorMessage, setErrorMessage] = useState('');

  const validateEmail = (input) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    return input.length > 0 && reg.test(input);
  };

  const validatePassword = (input) => {
    return input.length >= 10;
  };

  const matchPasswords = (input) => {
    return input === inputs.password.value;
  };

  const validateUsername = (username) => {
    const reg = /^\w+(\.\w+)?$/;

    if (reg.test(username) === false) {
      setErrorMessage('Username deve conter apenas letras, números e um ponto');
      return false;
    }

    if (username.length < 5) {
      setErrorMessage('Username deve conter pelo menos 5 caracteres');
      return false;
    }

    if (username.length > 25) {
      setErrorMessage('Username deve conter no máximo 25 caracteres');
      return false;
    }

    return true;
  };

  const validationFunctionsMap = new Map([
    ['email', validateEmail],
    ['username', validateUsername],
    ['password', validatePassword],
    ['password2', matchPasswords],
  ]);

  const inputChangedHandler = (inputIdentifier, event) => {
    const enteredValue = event.target.value;
    const validationFn = validationFunctionsMap.get(inputIdentifier);
    const validationState = validationFn(enteredValue);
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: validationState },
      };
    });
  };

  const isFormValid = () => {
    const emailValid = validateEmail(inputs.email.value);
    const usernameValid = validateUsername(inputs.username.value);
    const passwordValid = validatePassword(inputs.password.value);
    const password2Valid = matchPasswords(inputs.password2.value);

    if (!emailValid || !passwordValid || !password2Valid || !usernameValid) {
      setInputs((curInputs) => {
        return {
          email: { value: curInputs.email.value, isValid: emailValid },
          username: { value: curInputs.username.value, isValid: usernameValid },
          password: { value: curInputs.password.value, isValid: passwordValid },
          password2: {
            value: curInputs.password2.value,
            isValid: password2Valid,
          },
        };
      });

      return false;
    }

    return true;
  };

  const submitForm = async () => {
    if (!isFormValid()) {
      return;
    }

    const formData = {
      email: inputs.email.value,
      username: inputs.username.value,
      password: inputs.password.value,
    };

    try {
      await userService.create(formData);
      changeForm();
    } catch (error) {
      alert(
        error + ' ocorreu algum erro no cadastro, tente novamente mais tarde'
      );
    }
  };

  return (
    <Card color='white'>
      <h2 className={classes['form-title']}>Cadastro</h2>
      <GDInput
        isValid={inputs.email.isValid}
        errorMessage='Informe um e-mail válido'
        inputConfig={{
          placeholder: 'E-mail',
          onChange: inputChangedHandler.bind(this, 'email'),
        }}
      />

      <GDInput
        isValid={inputs.username.isValid}
        errorMessage={usernameErrorMessage}
        inputConfig={{
          placeholder: 'Username',
          onChange: inputChangedHandler.bind(this, 'username'),
        }}
      />

      <GDInput
        isValid={inputs.password.isValid}
        errorMessage='A senha deve ter no mínimo 10 caracteres'
        inputConfig={{
          placeholder: 'Senha',
          type: 'password',

          onChange: inputChangedHandler.bind(this, 'password'),
        }}
      />

      <GDInput
        isValid={inputs.password2.isValid}
        errorMessage='As senhas não batem'
        inputConfig={{
          placeholder: 'Confirme sua senha',
          type: 'password',
          onChange: inputChangedHandler.bind(this, 'password2'),
        }}
      />

      <Button onClick={submitForm} type='secondary'>
        Criar conta
      </Button>

      <span className={classes.spacer}></span>

      <p className={classes.footer}>
        Ou então{' '}
        <span onClick={changeForm} className={classes.highlight}>
          faça login
        </span>
      </p>
    </Card>
  );
};

export default Register;
