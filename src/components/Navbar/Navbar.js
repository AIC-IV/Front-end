import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthContext from '../../store/auth-context';

import styles from './Navbar.module.css';
import userService from '../../services/user.service';

const Navbar = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const user = useSelector(state => state.user);
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
  }

  const home = () => {
    history.push('/choose-room');
  }

  const ranking = () => {
    history.push('/ranking');
  }

  return (
    <nav>
      <ul className={styles.navbar}>
        <div className={styles.leftContainer}>
          <li className='no-select' onClick={home}>
            Home
          </li>
          <li className='no-select' onClick={ranking}>
            Ranking
          </li>
          <li className='no-select'>Histórico</li>
        </div>
        <div className={styles.rightContainer}>
          <li className={styles.smallerMargin}>
            { user.photoId && <img className={styles.image} alt='profile' src={`/images/${user.photoId}.png`}></img> }
            { !user.photoId && <img className={styles.image} alt='profile' src={`/a1.png`}></img> }
          </li>
          <li>
            {user.username}
          </li>
          <li onClick={logout}>
            Sair 
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;