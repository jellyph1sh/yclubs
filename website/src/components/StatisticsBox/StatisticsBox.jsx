import "./StatisticsBox.css"

const StatisticsBox = () => {
    return (
        <div className="stats-box">
            <h2>Statistiques</h2>
            <div className="stats-content">
                <div className="stats-club">
                    <h3>Nombre de clubs</h3>
                    <p>3</p>
                </div>
                <div className="stats-members">
                    <h3>Nombre d'adhérants</h3>
                    <p>117</p>
                </div>
            </div>
        </div>
    );
}

export default StatisticsBox