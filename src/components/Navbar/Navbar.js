import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory, useParams } from 'react-router-dom';

import './Navbar.css';
import ChooseRoom from '../../screens/ChooseRoom/ChooseRoom';

const Navbar = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
  }

  const home = () => {
    history.push('/choose-room');
  }

  return (
    <nav>
      <ul className='navbar'>
        <li className='no-select' onClick={home}>Home</li>
        <li className='no-select'>Ranking</li>
        <li className='no-select'>Histórico</li>
        <li className='split' onClick={logout}>
          Sair
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;