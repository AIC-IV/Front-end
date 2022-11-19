import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useHistory, useParams } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import Card from '../../components/UI/Card';
import Chat from '../../components/Chat/Chat';
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';
import UserList from '../../components/UserList/UserList';

import roomService from '../../services/room.service';

import './MainGame.css';

const SERVER = 'http://192.168.2.105:7070';

const MainGame = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const roomId = params.roomId;

  const [socket, setSocket] = useState();
  const [room, setRoom] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const newSocket = io(SERVER, { path: '/ws-api' });

    newSocket.on('connect', (socket) => {
      console.log('SOCKET: connected to room ', roomId);
      newSocket.emit('connectToRoom', { roomId });
    });

    // sets newSocket into global state variable
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    async function fetchData() {
      const response =  await roomService.doesRoomExist(roomId);
      if (!response.exists) {
        history.push('/choose-room/error');
      } else {
        joinRoom();

        socket.on('banana', (response) => {
          console.log('hereaaaaa', response.players);
          setPlayers(response.players);
        });
      }

    }
    
    async function joinRoom() {
      const response = await roomService.joinRoom(roomId, authCtx.username);
      if (response.success) {
        socket.emit('joinRoom');
        setRoom(response.room);
        setPlayers(response.room.players);
      } else {
        console.log('err', response);
      }
    }    

    fetchData();
    
  }, [socket]);

  

  return (
    <div className='grid-container'>
      <div className='item1'>
        <UserList className='full' users={players}></UserList>
      </div>
      <div className='item2'>
        <Card color='purple'>
          <h1 className='card-title'>Guess the Drawing</h1>
        </Card>
      </div>
      <div className='item3'>
        {room.theme && (
          <Card className='full' color='white'>
            <p className='word'>A palavra é: árvore</p>
            <iframe
              title='whiteboard'
              src={`http://localhost:7070/?whiteboardid=${roomId}&username=${authCtx.username}`}
            ></iframe>
          </Card>
        )}
        {!room.theme && room.owner === authCtx.username && <ThemeSelector />}
        {!room.theme && room.owner !== authCtx.username && (
          <Card color='purple'>
            <p className='card-subtitle'>Aguarde, o jogo começará em breve.</p>
          </Card>
        )}
      </div>
      <div className='item4'>
        <Chat chatId={`${roomId}-guess`} guess={true}></Chat>
      </div>
      <div className='item5'>
        <Chat chatId={`${roomId}-chat`} guess={false}></Chat>
      </div>
    </div>
  );
}

export default MainGame;