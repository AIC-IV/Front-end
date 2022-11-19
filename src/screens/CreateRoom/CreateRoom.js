import React, { useState, useContext } from 'react';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import GDInput from '../../components/UI/GDInput';
import { useHistory } from 'react-router-dom';
import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi';
import roomService from '../../services/room.service';
import AuthContext from '../../store/auth-context';

import './CreateRoom.css';

const CreateRoom = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

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
    const enteredValue = event.target.value;
    let validationState = false;

    if (!override) {
      const validationFn = validationFunctionsMap.get(inputIdentifier);
      validationState = validationFn(enteredValue);
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

  return (
    <div className='create-room-container'>
      <Card color='purple'>
        <h1 className='card-title'>Guess the Drawing</h1>
        <div className='cr-content'>
          <div className='cr-image-container'>
            <img className='cr-image' alt='profile' src='/a1.png'></img>
            <GiPerspectiveDiceSixFacesThree className='cr-dice-icon' />
          </div>
          <div className='cr-form'>
            <p className='cr-text'>Escolha um nome para a sua sala</p>
            <GDInput
              isValid={inputs.roomName.isValid}
              errorMessage={roomNameErrorMessage}
              inputConfig={{
                placeholder: 'Nome da sala',
                onChange: inputChangedHandler.bind(this, 'roomName'),
              }}
            />
            <div className='cr-checkbox'>
              <input
                type='checkbox'
                id='is_private'
                onChange={inputChangedHandler.bind(this, 'isRoomPrivate')}
                className='css-checkbox'
              />
              <label className='cr-checkbox-label' htmlFor='is_private'>
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
