import { Manager } from 'socket.io-client';
import Peer from 'simple-peer';

export const manager = new Manager('http://localhost:5000');
export const peer = new Peer({});
