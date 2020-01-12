import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'

import InfoBar from '../infobar/Infobar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import TextContainer from '../textcontainer/TextContainer';

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'lhttps://react-chatapp-ms.herokuapp.com/';

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    
    socket.emit('join', {name, room}, (error) => {
      if (error) alert(error);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);


  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [messages])


  // sending messages
  const sendMessage = (e) => {
    e.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  
  return (
    <div className="outerContainer">
      <div className="container">

        <InfoBar room={room} />
        <Messages name={name} messages={messages}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>


      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat;
