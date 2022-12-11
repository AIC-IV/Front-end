import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi';

import Card from '../../components/card';

import { getRandomNumber } from '../../utils/numbers';

import userService from '../../services/user.service';

import styles from './style.module.css';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const saveImage = async () => {
    try {
      const randomImage = getRandomNumber();
      await userService.update({ id: user.id, photoId: randomImage });
      dispatch({ type: 'photoId', payload: { photoId: randomImage } });
    } catch (e) {
      console.log('Could not save image');
    }
  };

  return (
    <div className={styles.createRoomContainer}>
      <Card color='purple'>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            {user.photoId && (
              <img
                className={styles.image}
                alt='profile'
                src={`/images/${user.photoId}.png`}
              ></img>
            )}
            {!user.photoId && (
              <img
                className={styles.image}
                alt='profile'
                src={`/a1.png`}
              ></img>
            )}
            <GiPerspectiveDiceSixFacesThree
              onClick={saveImage}
              className={styles.diceIcon}
            />
          </div>
          <div>
            <h1 className='card-title'>{user.username || 'username'}</h1>
            <p className={styles.points}>{user.points || '128k'}</p>
            <p className={styles.pointsHelper}>pontos</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
