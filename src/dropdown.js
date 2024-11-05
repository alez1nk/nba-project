
//dropdown code
const PlayerDropdown = ({players, selectedPlayer, setSelectedPlayer }) => {
    const handleChange = (e) => {
        setSelectedPlayer(e.target.value);
    }
    
    return(
        /*<select value={selectedPlayer} onChange={handleChange}>
            <option value="" disabled>Select your Player</option>
                {players.map((player, index) => (
                <option key={index} value={player.playerName}>{player.playerName}</option>
            ))}
        </select>*/

        <>
            <input id="playerInput" 
            type='text' 
            value={selectedPlayer} 
            onChange={handleChange} 
            list='playerData' 
            placeholder='Select or type a player name...'>
            </input>
            
            <datalist id='playerData'>
                {players.map((player, index) => (
                    <option key={index} value={player.playerName}>{player.playerName}</option>
                ))}
            </datalist>
        </>
        
    )
}

export default PlayerDropdown;