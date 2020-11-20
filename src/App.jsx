import React, { useState, useEffect } from 'react';
import './App.scss';
import { TilesBoard } from './components/TilesBoard';
import { colors } from './api/colors';

export const App = () => {
  const [randomColors, setRandomColors] = useState([]);

  useEffect(() => {
    setRandomColors([...colors].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="container">
      <h1 className="container__header">Open the picture</h1>
      <TilesBoard randomColors={randomColors} />
    </div>
  );
};
