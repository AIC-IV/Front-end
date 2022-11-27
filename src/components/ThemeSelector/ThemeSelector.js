import React, { useState } from 'react';
import * as MaterialIcons from 'react-icons/md';

import styles from './ThemeSelector.module.css';
import themes from '../../constants/themes.json';
import Card from '../UI/Card';
import Button from '../UI/Button';

const btnState1 = 'Copiar link da sala';
const btnState2 = 'Link copiado!';

const ThemeSelector = ( { startGame } ) => {
  const [selectedTheme, setSelectedTheme] = useState('Animais');
  const [btnHint, setBtnHint] = useState(btnState1);

  const getIcon = (iconName) => {
    return MaterialIcons[iconName];
  }

  const copyUrl = () => {
    const currUrl = window.location.href;
    navigator.clipboard.writeText(currUrl);
    setBtnHint(btnState2);
    setTimeout(function() {
      setBtnHint(btnState1);
    }, 2000);
  }

  return (
    <Card color='purple'>
      <div className={styles.container}>
        <h1 className='title'>Escolha um tema</h1>
        <div className={styles.themesContainer}>
          {themes.list.map((theme) => {
            return (
              <div
                onClick={() => setSelectedTheme(theme.name)}
                className={`${styles.themeCard} ${
                  selectedTheme === theme.name ? styles.selected : ''
                } no-select`}
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
          <Button type='secondary' onClick={copyUrl}>
            { btnHint }
          </Button>
          <Button onClick={() => startGame(selectedTheme)} type='secondary'>Iniciar</Button>
        </div>
      </div>
    </Card>
  );
}

export default ThemeSelector;