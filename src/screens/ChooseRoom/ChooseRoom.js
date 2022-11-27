import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../components/UI/Card';

import './ChooseRoom.css';
import RoomSelector from '../../components/RoomSelector/RoomSelector';

const ChooseRoom = () => {
  const history = useHistory();
  const params = useParams();
  const error = params.error;

  const createARoom = () => {
    history.push('/create-room');
  }

  return (
    <div className='choose-room-container'>
      {error && (
        <div className='spacer'>
          <Card className='error-card' color='red'>
            A sala que você tentou acessar não existe. Por favor, selecione outra
            ou crie uma sala.
          </Card>
        </div>
        
      )}
      <Card color='purple'>
        <h1 className='card-title'>Guess the Drawing</h1>
        <p className='card-subtitle'>
          Escolha uma sala ou então{' '}
          <span onClick={createARoom} className={`highlight no-select`}>crie uma sala</span>
        </p>
        <RoomSelector />
      </Card>
    </div>
  );
};

export default ChooseRoom;
