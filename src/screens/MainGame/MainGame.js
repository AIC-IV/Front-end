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
import RoomRanking from '../../components/RoomRanking/RoomRanking';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomNumber } from '../../utils/numbers';

const SERVER = 'http://192.168.2.107:7070';

const MainGame = () => {
  const history = useHistory();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
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
    if (!user.username) return;

    async function fetchData() {
      const response =  await roomService.doesRoomExist(roomId);
      if (!response.exists) {
        history.push('/choose-room/error');
      } else {
        joinRoom();

        socket.on('updatePlayers', (response) => {
          setPlayers(response.players);
        });

        socket.on('newTurn', (response) => {
          setRoom(response.room);
        })

        socket.on('endGame', (response) => {
          setRoom(response.room);
        })
      }

    }
    
    async function joinRoom() {
      const image = user.photoId || getRandomNumber();
      const response = await roomService.joinRoom(roomId, user.username, image);
      if (response.success) {
        socket.emit('joinRoom', { username: user.username });
        setRoom(response.room);
        setPlayers(response.players);
      } else {
        console.log('err', response);
      }
    }    

    fetchData();
    
  }, [socket, user]);

  const startGameHandler = (theme) => {
    socket.emit('startGame', { theme })
  };

  const isPlayerInTurn = () => {
    return user.username === room.playerInTurn.username;
  }

  const getTopPlayers = () => {
    players.sort((a,b) => b.points - a.points);
    const end = Math.min(players.length, 3);
    return players.slice(0, end);
  }

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
      {!room.endGame && <div className='item3'>
        {room.theme && (
          <Card className='full' color='white'>
            { isPlayerInTurn() && <p className='word'>
              A palavra é: {room.secretWord}
            </p> }
            <iframe
              title='whiteboard'
              src={`http://localhost:7070/?whiteboardid=${roomId}&username=${
                user.username
              }${!isPlayerInTurn() ? '&readOnly=true' : ''}`}
            ></iframe>
          </Card>
        )}
        {!room.theme && room.owner === user.username && (
          <ThemeSelector startGame={startGameHandler} />
        )}
        {!room.theme && room.owner !== user.username && (
          <Card color='purple'>
            <p className='card-subtitle'>Aguarde, o jogo começará em breve.</p>
          </Card>
        )}
      </div> }
      { room.endGame && <div className='item3'>
        <RoomRanking players={getTopPlayers()} />
      </div> }
      <div className='item4'>
        <Chat chatId={`${roomId}-guess`} guess={true} roomId={roomId}></Chat>
      </div>
      <div className='item5'>
        <Chat chatId={`${roomId}-chat`} guess={false} roomId={roomId}></Chat>
      </div>
    </div>
  );
}

export default MainGame;