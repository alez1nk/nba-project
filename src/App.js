import './App.css';
import PlayerDropdown from './dropdown';
import PlayerStats from './playerStats';
import SeasonDropdown from './seasonDropdown';
import fetchPlayerStats from './stats';
import React, { useEffect, useState } from 'react';

function App() {
  const [players, setPlayers] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const [selectedSeason, setSelectedSeason] = useState('')

  const generateSeasons = () => {
    const startYear = 2013;
    const newSeasons = [];

    for (let i = 0; i < 11; i++) {
      newSeasons.push(startYear + i);
    }

    setSeasons(newSeasons);
  }
  

  useEffect(() => {
    const getPlayerStats = async () => {
      const data = await fetchPlayerStats(selectedSeason);
      if (data && Array.isArray(data)) { // Check if the fetched data is an array
        //console.log("Player Data:", data); // Log the extracted player data
        setPlayers(data); // Store data
      } else {
        console.error("No valid player data received:", data);
      }
    };

    if (selectedSeason) {
      getPlayerStats();
    }
  }, [selectedSeason]);

  useEffect(() => {
    generateSeasons(); // Generate the list of seasons only once
  }, []);

  const [selectedPlayer1, setSelectedPlayer1] = useState('');
  const [selectedPlayer2, setSelectedPlayer2] = useState('');

  // Find the player objects based on the selected names
  const foundPlayer1 = players.find((p) => p.playerName === selectedPlayer1);
  const foundPlayer2 = players.find((p) => p.playerName === selectedPlayer2);

  const comparePlayer1Stats = () => {
    if (foundPlayer1 && foundPlayer2) {
      return {
        ppg: foundPlayer1.ppg > foundPlayer2.ppg ? 'player1' : 'player2',
        rpg: foundPlayer1.rpg > foundPlayer2.rpg ? 'player1' : 'player2',
        apg: foundPlayer1.apg > foundPlayer2.apg ? 'player1' : 'player2',
      }
    }
    return {};
  }

  const comparePlayer2Stats = () => {
    if (foundPlayer1 && foundPlayer2) {
      return {
        ppg: foundPlayer2.ppg > foundPlayer1.ppg ? 'player1' : 'player2',
        rpg: foundPlayer2.rpg > foundPlayer1.rpg ? 'player1' : 'player2',
        apg: foundPlayer2.apg > foundPlayer1.apg ? 'player1' : 'player2',
      }
    }
    return {};
  }


  const comparisonResults1 = comparePlayer1Stats();
  const comparisonResults2 = comparePlayer2Stats();

  

  return (
    <div className='background'>
      <h1>NBA Player Stat Comparisons</h1>

      <SeasonDropdown
      selectedSeason={selectedSeason}
      handleSeasonChange={(e) => setSelectedSeason(e.target.value)}
      seasons={seasons}
      ></SeasonDropdown>

      <div className='container'>
        <div className='box'>
          <label htmlFor='player1'>Select Player 1: </label>
          <PlayerDropdown
            players={players}
            selectedPlayer={selectedPlayer1}
            setSelectedPlayer={setSelectedPlayer1}
            />

          <PlayerStats 
          player={foundPlayer1} 
          comparisonResults={comparisonResults1} 
          />


        </div>

        <div className='box'>
        <label htmlFor='player1'>Select Player 2: </label>
          <PlayerDropdown
            players={players}
            selectedPlayer={selectedPlayer2}
            setSelectedPlayer={setSelectedPlayer2}
            />

            <PlayerStats 
            player={foundPlayer2} 
            comparisonResults={comparisonResults2}
            />
        </div>
      </div>
    </div>
    
  );
}

export default App;
