import React from 'react';
import * as MaterialIcons from 'react-icons/md';

import styles from './ThemeSelector.module.css';
import themes from '../../constants/themes.json';
import Card from '../UI/Card';
import Button from '../UI/Button';

const ThemeSelector = () => {

  const getIcon = (iconName) => {
    return MaterialIcons[iconName];
  }

  return (
    <Card color='purple'>
      <div className={styles.container}>
        <h1 className='title'>Escolha um tema</h1>
        <div className={styles.themesContainer}>
          {themes.list.map((theme) => {
            return (
              <div
                className={`${styles.themeCard} no-select`}
                key={theme.id || theme.name}
              >
                <span className={styles.themeIcon}>
                  {getIcon(theme.icon)()}
                </span>
                {theme.name}
              </div>
            );
          })}
        </div>
        <div className={styles.btnContainer}>
          <Button type='secondary'>Compartilhar</Button>
          <Button type='secondary'>Iniciar</Button>
        </div>
      </div>
    </Card>
  );
}

export default ThemeSelector;