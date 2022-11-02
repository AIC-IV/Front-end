import React from 'react';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import GDInput from '../../components/UI/GDInput';
import { GiPerspectiveDiceSixFacesThree } from "react-icons/gi";


import './CreateRoom.css';

const CreateRoom = () => {
  return (
    <div className='create-room-container'>
      <Card color='purple'>
        <h1 className='card-title'>Guess the Drawing</h1>
        <div className='cr-content'>
          <div className='cr-image-container'>
            <img className='cr-image' src='/a1.png'></img>
            <GiPerspectiveDiceSixFacesThree className='cr-dice-icon'/>
          </div>
          <div className='cr-form'>
            <p className='cr-text'>Escolha um nome para a sua sala</p>
            <GDInput
              isValid={true}
              inputConfig={{
                placeholder: 'Nome da sala',
                // onChange: inputChangedHandler.bind(this, 'email'),
              }}
            />
            <div className='cr-checkbox'>
              <input type='checkbox' id='is_private' className='css-checkbox'/>
              <label className='cr-checkbox-label' for='is_private'>Sala privada?</label>
            </div>
            <Button type='secondary'>Criar sala</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CreateRoom;