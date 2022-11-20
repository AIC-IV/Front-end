import React, { useEffect, useState } from 'react';
import * as MaterialIcons from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import roomService from '../../services/room.service';

import './RoomSelector.css';

const RoomSelector = () => {
  const history = useHistory();

  const [rooms, setRooms] = useState([]);

  const icons = new Map([
    ['animais', 'MdPets'],
    ['comida', 'MdFastfood'],
    ['objetos', 'MdChair'],
    ['profissões', 'MdSchool'],
    ['verbos', 'MdChatBubble'],
    ['lugares', 'MdOutlinePublic'],
  ]);

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

  const selectIcon = (iconName) => {
    const icon = icons.get(iconName);
    return MaterialIcons[icon || 'MdShuffle'];
  }

  return (
    <div className='themes-container'>
      {rooms.map((room) => {
        return (
          <div className='theme-card no-select' onClick={() => joinRoom(room.name)} key={room.name}>
            { room.players && <div className='room-players'>
              <span className='players-icon'>{MaterialIcons['MdPerson']()}</span>
              { room.numOfPlayers} / {room.maxPlayers }
            </div>
            }
            <span className='theme-icon'> {selectIcon(room.theme)()} </span>
            {room.name || 'Tema indefinido'}
          </div>
        );
      })}
    </div>
  );
}

export default RoomSelector;