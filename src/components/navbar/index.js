import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import styles from './style.module.css';
import userService from '../../services/user.service';

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const user = useSelector(state => state.user);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      const response = await userService.whoami();
      const user = await userService.getUser(response.id);
      dispatch({ type: 'user', payload: user });
    };

    if (authCtx.isLoggedIn) {
      loadUserData();
    }
  }, []);

  const logout = () => {
    authCtx.logout();
    history.push('/welcome');
  }

  const home = () => {
    history.push('/choose-room');
  }

  const ranking = () => {
    history.push('/ranking');
  }

  const profile = () => {
    console.log('here');
    history.push('/profile');
  }

  return (
    <nav>
      <ul className={`${styles.navbar} ${styles.ul}`}>
        <div className={styles.leftContainer}>
          <li className={`${styles.li} no-select`} onClick={home}>
            Home
          </li>
          <li className={`${styles.li} no-select`} onClick={ranking}>
            Ranking
          </li>
        </div>
        <div className={styles.rightContainer}>
          <li onClick={profile} className={`${styles.li} ${styles.smallerMargin}`} >
            { user.photoId && <img className={styles.image} alt='profile' src={`/images/${user.photoId}.png`}></img> }
            { !user.photoId && <img className={styles.image} alt='profile' src={`/a1.png`}></img> }
          </li>
          <li onClick={profile} className={`${styles.li} no-select`}>
            {user.username}
          </li>
          <li className={`${styles.li} no-select`} onClick={logout}>
            Sair 
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;