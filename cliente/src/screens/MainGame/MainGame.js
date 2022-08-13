import React from 'react';
import UserList from '../../components/UserList/UserList';
import Chat from '../../components/Chat/Chat';
import './MainGame.css';
import Card from '../../components/UI/Card';

const MainGame = () => {
  return (
    <div className='grid-container'>
      <div className='item1'>
        <UserList className='full'></UserList>
      </div>
      <div className='item2'>
        <Card color='purple'>
          <h1 className='title'>Guess the Drawing</h1>
        </Card>
      </div>
      <div className='item3'>
        <Card className='full' color='white'>
        </Card>
      </div>
      {/* <div className='item4'>
        <Chat></Chat>
      </div> */}
      <div className='item5'>
        <Chat></Chat>
      </div>
    </div>
  );
}

export default MainGame;