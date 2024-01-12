import { useEffect, useState } from "react";
import axios from "axios";
import "./StatisticsBox.css"

const StatisticsBox = () => {
    const [clubNb, setClubNb] = useState(0);
    const [membersNbr, setMembersNbr] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001/api/clubs/getNbrClub")
        .then((response) => {
            setClubNb(response.data["nbrClubs"]);
        })
        .catch(function (error) {
            console.log(error);
        })

    axios.get("http://localhost:3001/api/clubsMembers/getNbrMembers")
        .then((response) => {
            setMembersNbr(response.data["nbrMember"]);
        })
        .catch(function (error) {
            console.log(error);
        })
    });

    return (
        <div className="stats-box">
            <h2 className="stats-title">Statistiques</h2>
            <div className="stats-content">
                <div className="stats-club">
                    <h3>Nombre de clubs</h3>
                    <div className="stats-club-info">
                        <img className="stats-club-icon" src="/src/assets/images/home.svg" alt="club icon" />
                        <span>{clubNb}</span>
                    </div>
                </div>
                <div className="stats-members">
                    <h3>Nombre d'adhérants</h3>
                    <div className="stats-members-info">
                        <img className="stats-members-icon" src="/src/assets/images/people.svg" alt="members icon" />
                        <span>{membersNbr}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsBox