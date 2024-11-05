const SeasonDropdown = ({ selectedSeason, handleSeasonChange, seasons }) => {
    return (
        <select id='seasonInput' value={selectedSeason} onChange={handleSeasonChange}>
            {seasons.map((season, index) => (
                <option key={index} value={season}>{season}</option>
            ))}
        </select>
    );
}

export default SeasonDropdown;
