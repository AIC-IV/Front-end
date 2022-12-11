import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi';

import Button from '../../components/button';
import Card from '../../components/card';
import GDInput from '../../components/gd-input';

import { getRandomNumber } from '../../utils/numbers';

import roomService from '../../services/room.service';
import userService from '../../services/user.service';

import AuthContext from '../../store/auth-context';

import styles from './style.module.css';

const CreateRoom = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    roomName: { value: '', isValid: true },
    isRoomPrivate: { value: false, isValid: true },
  });

  const [roomNameErrorMessage, setErrorMessage] = useState('');

  const validateRoomName = (input) => {
    const reg = /^[a-zA-Z0-9_-]*$/;

    if (reg.test(input) === false) {
      setErrorMessage(
        'O nome da sala deve conter apenas letras, números, underscore ou traço.'
      );
      return false;
    }

    if (input.length < 5) {
      setErrorMessage('O nome da sala deve conter pelo menos 5 caracteres');
      return false;
    }

    return true;
  }

  const validateIsRoomPrivate = (input) => {
    return true;
  }

  const validationFunctionsMap = new Map([
    ['roomName', validateRoomName],
    ['isRoomPrivate', validateIsRoomPrivate],
  ]);
  
  const inputChangedHandler = (inputIdentifier, event, override) => {
    
    let validationState = false;
    let enteredValue;

    if (!override) {
      enteredValue = event.target.value;
      const validationFn = validationFunctionsMap.get(inputIdentifier);
      validationState = validationFn(enteredValue);
    } else {
      enteredValue = event;
    }

    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: validationState },
      };
    });
  };

  const isFormValid = () => {
    const roomNameValid = validateRoomName(inputs.roomName.value);
    return roomNameValid;
  }

  const submitForm = async () => {
    if (!isFormValid()) {
      return;
    }
    
    const response = await roomService.doesRoomExist(inputs.roomName.value);

    if (response.exists) {
      inputChangedHandler('roomName', inputs.roomName.value, true);
      setErrorMessage('Já existe uma sala com esse nome');
      return;
    }

    const formData = {
      roomName: inputs.roomName.value,
      isRoomPrivate: inputs.isRoomPrivate.value,
      owner: authCtx.username
    };

    try {
      const data = await roomService.createRoom(formData);
      if (data.success) {
        history.replace(`/main-game/${inputs.roomName.value}`);
      }       
    } catch (error) {
      alert(error);
    }
  };

  const saveImage = async () => {
    try {
      const randomImage = getRandomNumber();
      await userService.update({ id: user.id, photoId: randomImage });
      dispatch({ type: 'photoId', payload: { photoId: randomImage }});
    } catch (e) {
      console.log('Could not save image');
    }
  }


  return (
    <div className={styles.createRoomContainer}>
      <Card color='purple'>
        <h1 className='card-title'>Guess the Drawing</h1>
        <div className={styles.crContent}>
          <div className={styles.crImageContainer}>
            { user.photoId && <img className={styles.crImage} alt='profile' src={`/images/${user.photoId}.png`}></img> }
            { !user.photoId && <img className={styles.crImage} alt='profile' src={`/a1.png`}></img> }
            <GiPerspectiveDiceSixFacesThree onClick={saveImage} className={styles.crDiceIcon} />
          </div>
          <div className={styles.crForm}>
            <p className={styles.crText}>Escolha um nome para a sua sala</p>
            <GDInput
              isValid={inputs.roomName.isValid}
              errorMessage={roomNameErrorMessage}
              inputConfig={{
                placeholder: 'Nome da sala',
                onChange: inputChangedHandler.bind(this, 'roomName'),
              }}
            />
            <div className={styles.crCheckbox}>
              <input
                type='checkbox'
                id='is_private'
                onChange={inputChangedHandler.bind(this, 'isRoomPrivate')}
                className='css-checkbox'
              />
              <label className={styles.crCheckboxLabel} htmlFor='is_private'>
                Sala privada?
              </label>
            </div>
            <Button onClick={submitForm} type='secondary'>
              Criar sala
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateRoom;
