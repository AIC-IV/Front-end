import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import uuid from 'react-uuid';

import './Chat.css';
import socketClient from 'socket.io-client';
import AuthContext from '../../store/auth-context';
import userService from '../../services/user.service';

const SERVER = 'http://192.168.0.132:8080';

const Chat = () => {
  // create state variables
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [socket, setSocket] = useState(null);


  const changeMessageHandler = (event) => {
    setMessageText(event.target.value);
  };

  const addMessageHandler = (message, className) => {
    setMessages((prevMessages) => {
      return [...prevMessages, { ...message, key: uuid(), className }];
    });
  };

  // block responsible for connecting to the server (via sockets) just once
  // useEffect guarantees that everything inside it won't be executed more than once
  useEffect(() => {
    const newSocket = socketClient(SERVER);

    if (!username) {
      newSocket.on('connection', (socket) => {
        console.log('socket connected', socket);
      });
    }

    const getUsername = async () => {
      if (authCtx.username) {
        setUsername(authCtx.username);
      } else {
        const account = await userService.whoami();
        setUsername(account.username);
      }
    }
    
    getUsername();

    // sets newSocket into global state variable
    setSocket(newSocket);
    return () => newSocket.disconnect({username});
  }, []);

  // useEffect block that depends on the username state
  // whenever state is updated, this will be executed again
  useEffect(() => {
    // the first time this is executed, the socket state
    // will be null, so we will reach the return clause
    if (!socket) return;

    // emit username_defined event, so server can save the socket info alongside username
    socket.emit('username_defined', { username });

    // listens to message event
    // whenever event is received, validates if message author 
    // is not equal to the current username
    socket.on('message', (receivedMessage) => {
      if (receivedMessage.author !== username) {
        addMessageHandler(receivedMessage, 'sent-by-others');
      }
    });
  }, [username]);

  // handler to send message whenever enter is pressed
  const submitWhenEnterIsPressed = (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) {
      sendMessage();
    }
  };

  // send message to the server
  const sendMessage = () => {
    // validate if message is not empty
    if (!messageText) return;

    const message = { author: username, text: messageText };
    socket.emit('message', message);
    addMessageHandler(message, 'sent-by-me');
    setMessageText('');
  };

  return (
    <div className='chat-container'>
      <div className='chat'>
        <span className='scroll-start-at-top'></span>
        {messages.map((message) => (
          <div
            className={`${message.className} message-container`}
            key={message.key}
          >
            <div className={`message message--${message.className}`}>
              {message.author !== username && (
                <p
                  className='message-author'
                  style={{ color: message.color || 'black' }}
                >
                  {message.author}
                </p>
              )}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='new-message'>
        <input
          value={messageText}
          onChange={changeMessageHandler}
          onKeyDown={submitWhenEnterIsPressed}
        ></input>
      </div>
    </div>
  );
};

export default Chat;