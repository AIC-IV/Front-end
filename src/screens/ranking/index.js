import React, { useState, useEffect } from 'react';

import Card from '../../components/card';

import { abbreviateNumber } from '../../utils/numbers';

import rankingService from '../../services/ranking.service';

import styles from './style.module.css';

const Ranking = () => {
  
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const getRanking = async () => {
      const response = await rankingService.getRanking('desc', 1);
      setRanking(response);
    }
    getRanking();
  }, []);

  return <Card color='purple'>
    <h1 className='card-title'>Ranking Geral de Jogadores</h1>
    <div className={styles.table}>
      { ranking.map(((user, index) => {
        return <div className={styles.tableRow}>
          <span>{ index+1 }. { user.username }</span>
          <span title={user.totalPoints}>{ abbreviateNumber(user.totalPoints) }</span>  
        </div>
      }))
    }
    </div>
  </Card>
}

export default Ranking;
