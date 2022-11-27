import React, { useEffect, useState } from 'react';
import * as MaterialIcons from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import roomService from '../../services/room.service';

import styles from './RoomSelector.module.css';

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
    <div className={styles.container}>
      {rooms.map((room) => {
        return (
          <div className={`${styles.card} no-select`} onClick={() => joinRoom(room.name)} key={room.name}>
            { room.players && <div className={styles.roomPlayers}>
              <span className={styles.playersIcon}>{MaterialIcons['MdPerson']()}</span>
              { room.numOfPlayers} / {room.maxPlayers }
            </div>
            }
            <span className={styles.themeIcon}> {selectIcon(room.theme)()} </span>
            {room.name || 'Tema indefinido'}
          </div>
        );
      })}
      { rooms.length === 0 && <div className={styles.error}>
        Ops, parece que não tem nenhuma sala por enquanto.
        </div>
      }
    </div>
  );
}

export default RoomSelector;