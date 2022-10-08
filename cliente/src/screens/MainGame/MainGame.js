import React, { useContext } from 'react';
import UserList from '../../components/UserList/UserList';
import Chat from '../../components/Chat/Chat';
import './MainGame.css';
import Card from '../../components/UI/Card';
import { useParams } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const MainGame = (props) => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const roomId = params.roomId;
  // TODO: Insert validation to check if such room exists
  // if not, redirect to the room creation screen with a 
  // message explaining the issue

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
          <p className='word'>A palavra é: banana</p>
          <iframe title='whiteboard' src={`http://localhost:8080/?whiteboardid=${roomId}&username=${authCtx.username}`}></iframe>
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