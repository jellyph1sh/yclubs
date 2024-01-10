import "./StatisticsBox.css"

const StatisticsBox = () => {
    return (
        <div className="stats-box">
            <h2 className="stats-title">Statistiques</h2>
            <div className="stats-content">
                <div className="stats-club">
                    <h3>Nombre de clubs</h3>
                    <div className="stats-club-info">
                        <img className="stats-club-icon" src="/src/assets/images/home.svg" alt="club icon" />
                        <span>3</span>
                    </div>
                </div>
                <div className="stats-members">
                    <h3>Nombre d'adhérants</h3>
                    <div className="stats-members-info">
                        <img className="stats-members-icon" src="/src/assets/images/people.svg" alt="members icon" />
                        <span>117</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsBox