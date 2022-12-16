import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

import Card from '../../components/card';
import Chat from '../../components/chat';
import ThemeSelector from '../../components/theme-selector';
import UserList from '../../components/user-list';
import RoomRanking from '../../components/room-ranking';

import { getRandomNumber } from '../../utils/numbers';

import roomService from '../../services/room.service';

import styles from './style.module.css';

import settings from '../../constants/settings.json';

let SOCKET_URL = settings.socketBackendUrl;


const MainGame = () => {
  const history = useHistory();
  
  const user = useSelector((state) => state.user);
  
  const params = useParams();
  const roomId = params.roomId;

  const [socket, setSocket] = useState();
  const [room, setRoom] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { path: '/ws-api' });

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
          if(response.room) setRoom(response.room);
          console.log(response.room);
        });

        socket.on('newTurn', (response) => {
          setRoom(response.room);
        });

        socket.on('endGame', (response) => {
          setRoom(response.room);
        });

        socket.on('newGame', (response) => {
          setRoom(response.room);
        });

        socket.on('deleteRoom', () => {
          history.push('/choose-room');
        });
      }

    }
    
    async function joinRoom() {
      const image = user.photoId || getRandomNumber();
      console.log(user);
      const response = await roomService.joinRoom(roomId, user.username, user.id, image);
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

  const playAgainHandler = () => {
    socket.emit('playAgain');
  }

  const deleteRoomHandler = () => {
    socket.emit('deleteRoom');
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.item1}>
        <UserList className={styles.full} users={players}></UserList>
      </div>
      <div className={styles.item2}>
        <Card color='purple'>
          <h1 className='card-title'>Guess the Drawing</h1>
        </Card>
      </div>
      {!room.endGame && (
        <div className={styles.item3}>
          {room.theme && (
            <Card className='full' color='white'>
              {isPlayerInTurn() && (
                <p className={styles.word}>A palavra é: {room.secretWord}</p>
              )}
              <iframe
                className={styles.iframe}
                title='whiteboard'
                src={`${SOCKET_URL}/?whiteboardid=${roomId}&username=${
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
              <p className='card-subtitle'>
                Aguarde, o jogo começará em breve.
              </p>
            </Card>
          )}
        </div>
      )}
      {room.endGame && (
        <div className={styles.item3}>
          <RoomRanking players={getTopPlayers()} playAgain={playAgainHandler} deleteRoom={deleteRoomHandler} />
        </div>
      )}
      <div className={styles.item4}>
        <Chat chatId={`${roomId}-guess`} guess={true} roomId={roomId}></Chat>
      </div>
      <div className={styles.item5}>
        <Chat chatId={`${roomId}-chat`} guess={false} roomId={roomId}></Chat>
      </div>
    </div>
  );
}

export default MainGame;