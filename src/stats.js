//fetch from api
const fetchPlayerStats = async (season) => {
    try {
        console.log('Calling data from season', season)
        const response = await fetch('http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/'+season);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log("Fetched Data:", data); 
        
        const playersArray = data || []; 

        const uniquePlayersArray = () => {
            const seen = new Set();
            return playersArray.filter(player => {
                const playerName = player.playerName;
                if (seen.has(playerName)) {
                    return false;
                }
                seen.add(playerName);
                return true;
            });
        }

        //console.log("no dupes: ", uniquePlayersArray())

        const playersWithPG = uniquePlayersArray().map(player => ({
        ...player,
        ppg: player.games ? player.points / player.games : 0, 
        rpg: player.games ? player.totalRb / player.games : 0, 
        apg: player.games ? player.assists / player.games : 0, 
        }));

        //console.log("Players with PPG, RPG, APG:", playersWithPG);

        return playersWithPG;

    } catch (error) {
      console.error("Failed to fetch player stats:", error);
      return null; // Return null in case of error
    }

  };

  export default fetchPlayerStats;








/*
//create object stuff
function stats(){
    function Player(name, ppg, rpg, apg) {
        this.name = name;
        this.ppg = ppg;
        this.rpg = rpg;
        this.apg = apg;
    };
    
    let players = [];

    const lebronJames = new Player('LeBron James', 22.2, 6.7, 7.2);
    const kevinDurant = new Player('Kevin Durant', 25.8, 7.0, 3.0);

    players.push(lebronJames);
    players.push(kevinDurant);

    return players;
}

export default stats;

*/