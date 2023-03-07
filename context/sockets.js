import React from 'react';
import socketio from 'socket.io-client';

export const socket = socketio.connect('https://sockets.schoovr.com');
export const SocketContext = React.createContext();
