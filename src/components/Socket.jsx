"use client"
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Socket({name}) {
    const [socket, setSocket] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        newSocket.on('gameState', (state) => {
            setGameState(state);
        });

        newSocket.on('playerJoined', ({ playerName }) => {
            console.log(`${playerName} has joined the game.`);
        });

        return () => newSocket.close();
    }, []);

    const joinGame = () => {
        socket.emit('joinGame', { sessionId, playerName });
    };

    return (
        <div>
            <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Player Name" />
            <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} placeholder="Session ID" />
            <button onClick={joinGame}>Join Game</button>
            {gameState && <div>Game State: {/* Render your game state here */}</div>}
        </div>
    );
}