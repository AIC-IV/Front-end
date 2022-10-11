import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import './Navbar.css';

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
  }

  return <nav>
    <ul class='navbar'>
      <li class='no-select'>Home</li>
      <li class='no-select'>Ranking</li>
      <li class='no-select'>Histórico</li>
      <li class='split' onClick={logout}>Sair</li>
    </ul>
  </nav>;
}

export default Navbar;