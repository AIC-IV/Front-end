import React, { useState } from 'react';
import api from '../services/api';

const RoomContext = React.createContext({
  secretWord: '',
  playerDrawing: '',
  setSecretWord: (secretWord) => {},
  setPlayerDrawing: (playerDrawing) => {},
});

export const RoomContextProvider = (props) => {
  const [secretWord, setSecretWord] = useState(null);
  const [playerDrawing, setPlayerDrawing] = useState(null);

  const secretWordHandler = (secretWord) => {
    setSecretWord(secretWord);
  };

  const playerDrawingHandler = (playerDrawing) => {
    setPlayerDrawing(playerDrawing);
  };

  const contextValue = {
    secretWord,
    playerDrawing,
    setSecretWord: secretWordHandler,
    setPlayerDrawing: playerDrawingHandler,
  };

  return (
    <RoomContext.Provider value={contextValue}>
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomContext;
