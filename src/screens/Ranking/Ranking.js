import React, { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';

import rankingService from '../../services/ranking.service';
import { abbreviateNumber } from '../../utils/numbers';

import styles from './Ranking.module.css';

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
