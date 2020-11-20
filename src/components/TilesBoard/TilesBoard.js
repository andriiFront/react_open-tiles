import React, { useState } from 'react';
import './TilesBoard.scss';
import PropTypes from 'prop-types';
import { tiles } from '../../api/tiles';

export const TilesBoard = ({ randomColors }) => {
  const [newTiles, setNewTiles] = useState(tiles);
  const [counter, setCounter] = useState(0);
  const [firstClickColor, setFirstClickColor] = useState('');
  const [firstClickId, setFirstClickId] = useState('');

  const handleTileClick = (tileId, tileColor) => {
    if (tileColor === 'transparent') {
      return;
    }

    if (counter < 1) {
      setFirstClickColor(randomColors[tileId]);
      setFirstClickId(tileId);
    }

    const handledNewTiles = newTiles.map(tile => (
      tile.id === tileId
        ? {
          ...tile, color: randomColors[tileId],
        }
        : tile
    ));

    setCounter(prevState => prevState + 1);
    setNewTiles(handledNewTiles);

    if (counter >= 1) {
      if (firstClickColor === randomColors[tileId]) {
        setTimeout(() => {
          setNewTiles(prev => prev.map(tile => (
            (tile.id === firstClickId || tile.id === tileId)
              ? {
                ...tile, color: 'transparent',
              }
              : tile
          )));
        }, 500);
      } else {
        setTimeout(() => {
          setNewTiles(prev => prev.map(tile => (
            (tile.id === firstClickId || tile.id === tileId)
              ? {
                ...tile, color: 'grey',
              }
              : tile
          )));
        }, 500);
      }

      setCounter(0);
      setFirstClickColor('');
    }
  };

  return (
    <>
      <div className="tilesboard">
        {newTiles.map(tile => (
          <button
            type="button"
            className="tilesboard__tile"
            onClick={() => handleTileClick(tile.id, tile.color)}
            key={tile.id}
            style={{ backgroundColor: tile.color }}
          />
        ))}
      </div>
      {newTiles.every(item => item.color === 'transparent')
        && <h2 className="tilesboard__hero">CONGRATS!!!</h2>
      }
    </>
  );
};

TilesBoard.propTypes = {
  randomColors: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};
