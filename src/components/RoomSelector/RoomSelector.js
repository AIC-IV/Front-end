import React, { useEffect, useState } from 'react';
import * as MaterialIcons from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import roomService from '../../services/room.service';

import './RoomSelector.css';

const RoomSelector = () => {
  const history = useHistory();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await roomService.getRooms();
      setRooms(response.rooms);
    }

    fetchData();
  }, []);

  const joinRoom = (roomName) => {
    history.replace(`/main-game/${roomName}`);
  }

  const getIcon = (iconName) => {
    return MaterialIcons[iconName];
  }

  return (
    <div className='themes-container'>
      {rooms.map((room) => {
        return (
          <div className='theme-card no-select' onClick={() => joinRoom(room.name)} key={room.name}>
            { room.players && <div className='room-players'>
              <span className='players-icon'>{MaterialIcons['MdPerson']()}</span>
              { room.players.length} / {room.maxPlayers }
            </div>
            }
            <span className='theme-icon'> {getIcon(room.icon || 'MdShuffle')()} </span>
            {room.name || 'Tema indefinido'}
          </div>
        );
      })}
    </div>
  );
}

export default RoomSelector;