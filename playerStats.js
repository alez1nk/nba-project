// PlayerStats.js
import React from 'react';

const PlayerStats = ({ player, comparisonResults }) => {
  if (!player) return (
    <p>No stats avaliable</p>
  ); // Return null if no player is selected

  return (
    <div>
      <h3>{player.name} Statistics</h3>
      <p id={comparisonResults.ppg === 'player1' ? 'higher' : 'lower'}>PPG: {(player.ppg).toFixed(1)}</p>
      <p id={comparisonResults.rpg === 'player1' ? 'higher' : 'lower'}>RPG: {(player.rpg).toFixed(1)}</p>
      <p id={comparisonResults.apg === 'player1' ? 'higher' : 'lower'}>APG: {(player.apg).toFixed(1)}</p>
    </div>
  );
};

export default PlayerStats;
