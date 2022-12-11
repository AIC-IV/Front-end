import React from 'react';
import Button from '../button';
import Card from '../card';

import styles from './style.module.css';

const RoomRanking = ({ players }) => {
  return (
    <Card className='full' color='purple'>
      <div className={styles.roomRankingContainer}>
        <h1 className='card-title'>Fim de jogo!</h1>
        <div>
          {players.map((player, index) => {
            return (
              <div className={`${styles.winner} ${styles['winner' + (index + 1)]}`}>
                <span className={styles.rankingUsername}>
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