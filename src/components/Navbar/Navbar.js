import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

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
      <ul className='navbar'>
        <li className='no-select' onClick={home}>
          Home
        </li>
        <li className='no-select' onClick={ranking}>Ranking</li>
        <li className='no-select'>Histórico</li>
        <li className='split' onClick={logout}>
          Sair ({authCtx.username})
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;