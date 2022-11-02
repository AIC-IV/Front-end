import React from 'react';
import * as MaterialIcons from 'react-icons/md';

import './ThemeSelector.css';

const ThemeSelector = ({ themes }) => {

  const getIcon = (iconName) => {
    return MaterialIcons[iconName];
  }

  return (
    <div className='themes-container'>
      {themes.list.map((theme) => {
        return (
          <div className='theme-card no-select' key={theme.id || theme.name}>
            { theme.players && <div className='room-players'>
              <span className='players-icon'>{MaterialIcons['MdPerson']()}</span>
              2/10
            </div>
            }
            <span className='theme-icon'> {getIcon(theme.icon)()} </span>
            {theme.name}
          </div>
        );
      })}
    </div>
  );
}

export default ThemeSelector;