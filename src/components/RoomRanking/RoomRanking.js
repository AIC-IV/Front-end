import React from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';

import './RoomRanking.css';

const RoomRanking = ({ players }) => {
  return (
    <Card className='full' color='purple'>
      <div className='room-ranking-container'>
        <h1 className='card-title'>Fim de jogo!</h1>
        <div>
          {players.map((player, index) => {
            return (
              <div className={`winner winner--${index + 1}`}>
                <span className='ranking-username'>
                  {index + 1}. {player.username}
                </span>{' '}
                <span>{player.points} pontos </span>
              </div>
            );
          })}
        </div>
        <Button type='secondary'>Jogar de novo</Button>
      </div>
    </Card>
  );
}

export default RoomRanking;